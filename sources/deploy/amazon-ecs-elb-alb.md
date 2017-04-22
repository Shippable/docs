main_section: Deploy
sub_section: Deploying to Amazon ECS

# Using Classic and Application Load Balancers with Amazon ECS
Load balancers are a must-have for any containerized application that wants to run on an Amazon ECS cluster.  When running on ECS, the agent has control over when and where your tasks spawn.  This means that you cannot necessarily depend on any particular machine running your service at any particular time.  A load balancer helps mitigate this uncertainty by directing traffic to the correct spot, no matter where the container is running.

## Setup
Make sure you have a cluster set up on Amazon ECS, then create an integration and cluster resource [as described in the setup section here](./amazon-ecs)

This scenario will require the following resources:

```
resources:

  - name: deploy-ecs-lb-image
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-lb"
    seed:
      versionName: "latest"

  - name: deploy-ecs-lb-elb
    type: loadBalancer
    pointer:
      sourceName: deploy-ecs-elb
      role: role-for-ecs-lb

```
The loadBalancer sourceName is exactly what you find in the `name` field of your load balancer on AWS.

For the `role` section of the loadBalancer resource, you need to provide the name of an AWS IAM role that has the appropriate policy and trust relationship for service load balancing.  You can find that information [in the AmazonECS service load balancing documentation](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html).  Once you've created a role that matches the requirements specified there, you can reference it in your `loadBalancer` yml.


Now lets set up our manifest.

```
jobs:

  - name: deploy-ecs-lb-manifest
    type: manifest
    steps:
     - IN: deploy-ecs-lb-image
     - IN: deploy-ecs-lb-docker-options

```


## Managed
When you use a load balancer in a Shippable managed deploy task, much of the work is done for you. Shippable will automatically add that load balancer to your service definition and apply it to the specific image/port that you want exposed.  This makes it easy to repeatedly deploy new services while always making them accessible via load balancer, thus reducing down time.

### Application Load Balancer
Application load balancers (ALB) are well suited to container applications in that you can configure them such that you don't need to care what host port your container is assigned. A random port will be used to map the external port through the ALB to the container port inside your Amazon ECS task.

To tell Shippable that you intend to use an ALB, you need one extra piece of information in your `loadBalancer` resource:
```
- name: deploy-ecs-lb-elb
  type: loadBalancer
  pointer:
    sourceName: arn:aws:elasticloadbalancing:us-east-1:679404489841:targetgroup/ecs-deploy-alb-tgtgrp/394643319fd6a729
    method: application
    role: role-for-ecs-lb
```

The default method is "classic" which you can read about in the next section.

For ALBs, the sourceName field should be the ARN of the target group that was created alongside your ALB.  Make sure this is the ARN of the *target group* and not the ARN of the load balancer itself.

<img src="../../images/aws/ecs-deploy-alb-tgtgrp.png" alt="Target group ARN">


Now you can use that ALB in your deploy job:
```
jobs:

  - name: deploy-ecs-lb-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-lb-manifest
      - IN: deploy-ecs-lb-ecs-cluster
      - IN: deploy-ecs-lb-alb
        applyTo:
          - manifest: deploy-ecs-lb-manifest
            image: deploy-ecs-lb-image
            port: 80

```

We also need to tell Amazon ECS that we plan to expose a port. We can do this by configuring a dockerOptions resource like this:
```
- name: deploy-ecs-lb-docker-options
  type: dockerOptions
  version:
    portMappings:
      - 0:80

```
Since we're using an ALB, we don't need to restrict ourselves to a single host port. Instead, we'll let Amazon ECS randomly assign us a host port, which will automatically be registered to our ALB.

Now, even though you're exposing a port, you can run multiple copies of your service on a single box, and all traffic will be directed through the ALB by way of whichever random port was assigned.  Lets add a `replicas` resource to test this:

```
- name: deploy-ecs-lb-replicas
  type: replicas
    version:
      count: 3
```

Now we should use both the `replicas` and `dockerOptions` resources as INs to our manifest.

```
- name: deploy-ecs-lb-manifest
  type: manifest
  steps:
   - IN: deploy-ecs-lb-replicas
   - IN: deploy-ecs-lb-image
   - IN: deploy-ecs-lb-docker-options

```

Now you should see multiple targets registered to you target group. They may even end up on the same host machine:

<img src="../../images/aws/ecs-deploy-alb-healthy.png" alt="Healthy target group">


### Classic Load Balancer
The default load balancer type on Shippable is what Amazon calls "classic".  Classic load balancers require that you define your listeners up front, and they can only direct traffic to one instance port per load balancer listener.  For example, if you have an API service listening to port 80, and your cluster has two machines, you will not be able to run more than two copies of your API service, because the classic load balancer needs to know exactly which port to direct its traffic to, and each host can only allow one service to utilize the port.

We've already defined and configured our load balancer in the "setup" phase. Now we just need to create a deploy job that uses it.

```
jobs:

  - name: deploy-ecs-lb-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-lb-manifest
      - IN: deploy-ecs-lb-ecs-cluster
      - IN: deploy-ecs-lb-elb
        applyTo:
          - manifest: deploy-ecs-lb-manifest
            image: deploy-ecs-lb-image
            port: 80

```

When using a loadBalancer in a deploy job, you must include this `applyTo` section.  This tells Shippable exactly how to configure your load balancer within your service during deployment.  

- `manifest` should be the name of the manifest resource that the load balancer will direct traffic towards.
- `image` is the resource name of the specific container that is exposing a port within that manifest.
- `port` is the *container port* of that container that is being exposed.

If you've configured your job correctly, you should see a few extra lines appear in the deploy logs compared to a deployment without load balancing.

<img src="../../images/spog/ecs-deploy-lb-logs.png" alt="Load balancing logs">

Here are some of the most common errors from attempts to load balancer, along with the solutions.

```
Error creating service: InvalidParameterException: Unable to assume role and validate the listeners configured on your load balancer.
```
- this implies that the role that was specified in the resource does not have the correct permission.  please see the Amazon ECS Service Load Balancing documentation on how to create a role for this purpose.
```
Could not find required IAM role
```

- This means you've either given an incorrect role in your LB resource, or if you didn't give a role, it means Shippable could not automatically find a suitable role to use for deployment.

Once your deployment succeeds you should be able to visit the DNS name of your LB plus whatever port you've exposed and access your running application.  If you're having trouble, you may want to verify that your health check is properly set up.

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS with a load balancer.

**Source code:**  [devops-recipes/deploy-ecs-elb](https://github.com/devops-recipes/deploy-ecs-elb).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/deploy-ecs-elb/runs/14/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58faa57fbaa5e307002bd3ae/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-ecs-lb)



## Unmanaged
coming soon
