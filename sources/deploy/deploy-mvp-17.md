page_main_title: Attaching a classic load balancer to a single container application deployed to Amazon ECS.
main_section: Deploy
sub_section: How To

# Attaching a classic load balancer to a single container application deployed to Amazon ECS.

Load balancers are a must-have for any containerized application that wants to run on an Amazon ECS cluster.
You can easily add a Classic load balancer and apply it to the specific image/port that you want exposed. This makes it easy to repeatedly deploy new services while always making them accessible via the load balancer, thus reducing down time.

Classic load balancers require that you define your listeners up front, and they can only direct traffic to one instance port per load balancer listener. For example, if you have an API service listening to port 80, and your cluster has two machines, you will not be able to run more than two copies of your API service, because the classic load balancer needs to know exactly which port to direct its traffic to, and each host can only allow one service to utilize the port

##1. Building blocks

You will need to get familiar with the following platform building blocks:

**Resources**
  - [cluster](/platform/workflow/resource/cluster/) resource that represents a set of machines on a container orchestration system.
  - [image](/platform/workflow/resource/image/) resource that references a Docker image on a specific docker registry.
  - [dockerOptions](/platform/workflow/resource/dockeroptions/) resource used to add a list of docker options that can be appended to a docker image.
  - [replicas](/platform/workflow/resource/replicas/) resource that holds the number of instances of the container to deploy. It is used specifically to deploy Docker containers.
  - [loadBalancer](/platform/workflow/resource/loadbalancer/) resource.

**Jobs**
  - [manifest](/platform/workflow/job/manifest/) which creates a versioned, immutable service definition of a deployable unit for your application.
  - [deploy](/platform/workflow/job/deploy/) which deploys a [manifest](/platform/workflow/job/manifest/) to a cluster.

###2: Create account integrations

You need two account integrations for this scenario:

####AWS
Shippable will use an AWS key/secret pair to communicate with ECS on your behalf. [See here](/platform/integration/aws-ecs) for directions on adding an ECS account integration to Shippable for this.

This key should have the appropriate permissions and roles described [here](/platform/integration/aws-ecs#policy).  Now that the key is added on Shippable, we can reference it when we create pipeline yml blocks.  

####Amazon ECR
You also need to configure an integration to ECR so that we can pull your image. Follow instructions in the [Amazon ECR integration](/platform/integration/aws-ecr/) page.

###3: Create resources

You need the following three resources in your `shippable.resources.yml` file:

####cluster

First, we need a `cluster` resource which references a cluster that has already been created on Amazon ECS.

```
resources:

  - name: deploy_ecs_cluster    # resource friendly name
    type: cluster
    integration: int_aws                   # replace with integration name from step 1          
    pointer:
      sourceName: "deploy_ecs"     # name of the cluster to which we are deploying
      region: "us-east-1"                 # AWS region where cluster is located
```

For a complete reference, check out the [cluster](/platform/workflow/resource/cluster/) page.

####image

Next, we need an `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using Amazon ECR since it integrates nicely with Amazon ECS.

```
resources:

  - name: deploy_ecs_image          # resource friendly name
    type: image
    integration: int_ecr                      # replace with integration name from step 1          
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-basic"   # image pointer
    seed:
      versionName: "latest"     # Tag value for first deployment
```

For a complete reference, check out the [image](/platform/workflow/resource/image/) page.

####loadBalancer

Add the load balancer resource:

```
- name: deploy_ecs_lb
  type: loadBalancer
  pointer:
    sourceName: deploy_ecs_elb
    role: role_for_ecs_lb
```

The loadBalancer `sourceName` is exactly what you find in the name field of your load balancer on AWS.

The `role` value needs to be the name of an AWS IAM role that has the appropriate policy and trust relationship for service load balancing.  You can find that information [in the AmazonECS service load balancing documentation](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html).  

####dockerOptions

Since we plan to expose a port, we need to add a [dockerOptions](/platform/workflow/resource/dockeroptions/) resource like this:

```
- name: deploy_ecs_docker_options
  type: dockerOptions
  version:
    portMappings:
      - 0:80
```

You don't need to restrict this to a single host port. Instead, we'll let Amazon ECS randomly assign us a host port, which will automatically be registered to our ALB.

####replicas

Even though we're exposing a port, we can run multiple copies of the service on a single box, and all traffic will be directed through the ALB by way of whichever random port was assigned.  Lets add a `replicas` resource to test this:

```
- name: deploy_ecs_lb_replicas
  type: replicas
    version:
      count: 3
```

###4: Define jobs

Jobs are defined in your `shippable.jobs.yml`.

You need two jobs for this scenario:

####[Manifest](/platform/workflow/job/manifest/)

We need to package the image in a way that it can easily be deployed to any endpoint.  Shippable provides users with a managed task type `manifest` that accomplishes this goal.  Define this in your `shippable.jobs.yml`.

```
jobs:

- name: deploy_ecs_manifest
  type: manifest
  steps:
   - IN: deploy_ecs_image             #friendly name of image created in step 2
   - IN: deploy_ecs_lb_replicas
   - IN: deploy_ecs_docker_options
```

####[Deploy](/platform/workflow/job/deploy/)

Now we can take that manifest, and use it as input to a `deploy` type job.

```
jobs:
  - name: deploy_ecs_deploy
    type: deploy
    steps:
      - IN: deploy_ecs_manifest
      - IN: deploy_ecs_cluster
      - IN: deploy_ecs_lb
        applyTo:
          - manifest: deploy_ecs_manifest
            image: deploy_ecs_image
            port: 80
```

When using a loadBalancer in a deploy job, you must include this `applyTo` section.  This tells Shippable exactly how to configure your load balancer within your service during deployment.  

- `manifest` should be the name of the manifest resource that the load balancer will direct traffic towards.
- `image` is the resource name of the specific container that is exposing a port within that manifest.
- `port` is the *container port* of that container that is being exposed.

###5. Update your pipeline

Push your changes to your **syncRepo** and right click and run your `deploy-ecs-basic-manifest` job!

If you've configured your job correctly, you should see a few extra lines appear in the deploy logs compared to a deployment without load balancing.

<img src="/images/deploy/amazon-ecs/ecs-deploy-lb-logs.png" alt="Load balancing logs">

Now you should see multiple targets registered to you target group. They may even end up on the same host machine:

<img src="/images/deploy/amazon-ecs/ecs-deploy-alb-healthy.png" alt="Healthy target group">

Once your deployment succeeds you should be able to visit the DNS name of your LB plus whatever port you've exposed and access your running application.  If you're having trouble, you may want to verify that your health check is properly set up.


## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS with a load balancer.

**Source code:** [devops-recipes/deploy-ecs-elb](https://github.com/devops-recipes/deploy-ecs-lb)
