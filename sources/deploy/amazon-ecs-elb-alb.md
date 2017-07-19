page_main_title: Amazon ECS Using an ELB/ALB
main_section: Deploy
sub_section: Amazon ECS

# Using Classic and Application Load Balancers with Amazon ECS

Load balancers are a must-have for any containerized application that wants to run on an Amazon ECS cluster.  When running on ECS, the agent has control over when and where your tasks spawn.  This means that you cannot necessarily depend on any particular machine running your service at any particular time.  A load balancer helps mitigate this uncertainty by directing traffic to the correct spot, no matter where the container is running.

If you are deploying to Amazon ECS using the managed [deploy job](/platform/job-deploy/), you can easily add a Classic or Application load balancer and apply it to the specific image/port that you want exposed. This makes it easy to repeatedly deploy new services while always making them accessible via the load balancer, thus reducing down time.

Amazon ECS supports two types of load balancers:

- Classic load balancer
- Application load balancer

## The Goal
The goal of this page is to accomplish the following scenario using Shippable Pipelines.

- Create a pipeline manifest using a docker image on Amazon ECR
- Use the manifest as an input for a deploy job
- Deploy the manifest to Amazon ECS
- Load balance the service on ECS by adding a loadBalancer to your pipeline

In the end, your pipeline will look like this:
<img src="../../images/deploy/amazon-ecs/lb-final-pipeline.png" alt="Final Pipeline">

## Classic Load Balancer

The default load balancer type on Shippable is what Amazon calls "classic".  Classic load balancers require that you define your listeners up front, and they can only direct traffic to one instance port per load balancer listener.  For example, if you have an API service listening to port 80, and your cluster has two machines, you will not be able to run more than two copies of your API service, because the classic load balancer needs to know exactly which port to direct its traffic to, and each host can only allow one service to utilize the port.

###1: Set up basic deployment

As a pre-requisite for these instructions, you should already have set up deployment to ECS.

You can follow the tutorial on [Managed deployments](/deploy/amazon-ecs/). This will give you the resources and jobs required to deploy a single container to ECS.

###2: Create resources

We need several resources for this scenario. These are defined in `shippable.resources.yml`.

####loadBalancer

Add the load balancer resource:

```
- name: deploy-ecs-lb
  type: loadBalancer
  pointer:
    sourceName: deploy-ecs-elb    
    role: role-for-ecs-lb
```

The loadBalancer `sourceName` is exactly what you find in the name field of your load balancer on AWS.

The `role` value needs to be the name of an AWS IAM role that has the appropriate policy and trust relationship for service load balancing.  You can find that information [in the AmazonECS service load balancing documentation](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html).  

####dockerOptions

Since we plan to expose a port, we need to add a [dockerOptions](/platform/resource-dockeroptions/) resource like this:

```
- name: deploy-ecs-lb-docker-options
  type: dockerOptions
  version:
    portMappings:
      - 0:80

```

You don't need to restrict this to a single host port. Instead, we'll let Amazon ECS randomly assign us a host port, which will automatically be registered to our ALB.

####replicas

Even though we're exposing a port, we can run multiple copies of the service on a single box, and all traffic will be directed through the ALB by way of whichever random port was assigned.  Lets add a `replicas` resource to test this:

```
- name: deploy-ecs-lb-replicas
  type: replicas
    version:
      count: 3
```

###3. Update your jobs

You will need to update your `manifest` job to include the `dockerOptions` and `replicas` resources we just created. The `deploy` job need to accept the `loadBalancer` as an Input.

These updates are done in `shippable.jobs.yml`.

####Update manifest job

You should use both the `replicas` and `dockerOptions` resources as INs to our manifest.

```
- name: deploy-ecs-basic-manifest
  type: manifest
  steps:
   - IN: deploy-ecs-basic-image
   - IN: deploy-ecs-lb-replicas
   - IN: deploy-ecs-lb-docker-options

```

####Update deploy job

Next, add the load balancer to your deploy job:

```
jobs:

  - name: deploy-ecs-basic-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-basic-manifest
      - IN: deploy-ecs-basic-ecs-cluster
      - IN: deploy-ecs-lb
        applyTo:
          - manifest: deploy-ecs-basic-manifest
            image: deploy-ecs-basic-image
            port: 80

```

When using a loadBalancer in a deploy job, you must include this `applyTo` section.  This tells Shippable exactly how to configure your load balancer within your service during deployment.  

- `manifest` should be the name of the manifest resource that the load balancer will direct traffic towards.
- `image` is the resource name of the specific container that is exposing a port within that manifest.
- `port` is the *container port* of that container that is being exposed.


###4. Update your pipeline

Push your changes to your **syncRepo** and right click and run your `deploy-ecs-basic-manifest` job!

If you've configured your job correctly, you should see a few extra lines appear in the deploy logs compared to a deployment without load balancing.

<img src="../../images/deploy/amazon-ecs/ecs-deploy-lb-logs.png" alt="Load balancing logs">

Now you should see multiple targets registered to you target group. They may even end up on the same host machine:

<img src="../../images/deploy/amazon-ecs/ecs-deploy-alb-healthy.png" alt="Healthy target group">

Once your deployment succeeds you should be able to visit the DNS name of your LB plus whatever port you've exposed and access your running application.  If you're having trouble, you may want to verify that your health check is properly set up.

##Application load balancer

Application load balancers (ALB) are well suited to container applications in that you can configure them such that you don't need to care what host port your container is assigned. A random port will be used to map the external port through the ALB to the container port inside your Amazon ECS task.

To attach an ALB (Application Load Balancer), there is just one difference when compared to the steps to attach a Classic Load Balancer.

The `loadBalancer` resource in `shippable.resources.yml` is a little different:

```
- name: deploy-ecs-lb
  type: loadBalancer
  pointer:
    sourceName: arn:aws:elasticloadbalancing:us-east-1:679404489841:targetgroup/ecs-deploy-alb-tgtgrp/394643319fd6a729
    method: application
    role: role-for-ecs-lb
```

You need to specify `method: application`.

The `role` value needs to be the name of an AWS IAM role that has the appropriate policy and trust relationship for service load balancing.  You can find that information [in the AmazonECS service load balancing documentation](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html).  

The `sourceName` field should be the ARN of the target group that was created alongside your ALB.  Make sure this is the ARN of the *target group* and not the ARN of the load balancer itself.

<img src="../../images/deploy/amazon-ecs/ecs-deploy-alb-tgtgrp.png" alt="Target group ARN">

##Troubleshooting

Here are some of the most common errors from attempts to attach a load balancer, along with the solutions.

###Error creating service

You see the following in your logs:

```
Error creating service: InvalidParameterException: Unable to assume role and validate the listeners configured on your load balancer.
```

This implies that the role that was specified in the resource does not have the correct permission.  please see the Amazon ECS Service Load Balancing documentation on how to create a role for this purpose.

###Could not find required IAM role

You see the following in your logs:

```
Could not find required IAM role
```

This means you've either given an incorrect role in your LB resource, or if you didn't give a role, it means Shippable could not automatically find a suitable role to use for deployment.

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS with a load balancer.

**Source code:**  [devops-recipes/deploy-ecs-elb](https://github.com/devops-recipes/deploy-ecs-lb)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58faa57fbaa5e307002bd3ae/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-ecs-lb)
