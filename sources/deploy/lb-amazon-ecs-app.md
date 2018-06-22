page_main_title: Attaching a load balancer to an ECS cluster
main_section: CD
sub_section: Deploying containers using Shippable managed jobs
sub_sub_section: Using load balancers
page_title: Attaching an Application Load Balancer to an ECS cluster
page_description: How to attach an Application Load Balancer to an ECS cluster in Shippable

# Attaching an Application Load Balancer to an ECS cluster

Load balancers are a must-have for any containerized application that wants to run on a cluster.
You can easily add a load balancer and apply it to the specific image/port that you want exposed. This makes it easy to repeatedly deploy new services while always making them accessible via the load balancer, thus reducing down time.

## Instructions

<img src="/images/deploy/usecases/deploy_ecs_lb.png"/>

###1. Add a load balancer resource

Add a [loadbalancer](/platform/workflow/resource/loadbalancer/#loadbalancer) resource to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file. As an example:

```
resources:
  - name: app_lb
    type: loadBalancer
    pointer:
      role: role_for_ecs_lb
      sourceName: arn:aws:elasticloadbalancing:us-east-1:679404489841:targetgroup/ecs-deploy-alb-tgtgrp/394643319fd6a729
      method: application
```


* The `pointer` attribute in this resource expects three values to be specified.

      - The `role` value is set to the name of an AWS IAM role that has the appropriate policy and trust relationship for service load balancing.  You can find that information [in the AmazonECS service load balancing documentation](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html).  
      - The `sourceName` field is set to the ARN of the target group that was created alongside your ALB.  Make sure this is the ARN of the *target group* and not the ARN of the load balancer itself.
      - The `method` value is always set to `application`.


###2. Update your deploy job

1. Find the `deploy` job where you want to attach the load balancer. In our example for the [single container application](/deploy/continuous-delivery-single-container-docker-application/), this job is named `app_deploy_job`.

2. Add the `applyTo` section in the `deploy` job. The `applyTo` section expects the following values to be set:

      - `manifest` should be the name of the manifest job that needs to be load balanced
      - `image` is the resource name of the specific image within that manifest
      - `port` is the *container port* of that container that is being exposed.

In our example for the [single container application](/deploy/continuous-delivery-single-container-docker-application/), the yml snippet would look like this:

```
jobs:

  - name: app_deploy_job
    type: deploy
    steps:
      - IN: app_service_def
      - IN: op_cluster
      - IN: app_replicas
      - IN: app_lb                      # this should match name of the loadBalancer resource
        applyTo:
          - manifest: app_service_def
            image: app_image
            port: 80
```

Your load balancer will be attached when the deploy job runs next. To trigger it manually, follow [instructions here](/platform/workflow/job/overview/#when-does-a-job-execute).

## Sample project
**Source code:** [devops-recipes/deploy-ecs-elb](https://github.com/devops-recipes/deploy-ecs-lb)

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
