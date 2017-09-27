page_main_title: Attaching a load balancer to an ECS cluster
main_section: Deploy
sub_section: Using load balancers

# Attaching a load balancer to an ECS cluster

Load balancers are a must-have for any containerized application that wants to run on a cluster.
You can easily add a load balancer and apply it to the specific image/port that you want exposed. This makes it easy to repeatedly deploy new services while always making them accessible via the load balancer, thus reducing down time.

## Assumptions

We will use the [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms) as a starting point and demonstrate how to attach a load balancer to it.

## Topics Covered

* Attaching an Elastic load balancer to an application deployed to an ECS cluster.
* Attaching a Classic load balancer to an application deployed to an ECS cluster.

## Steps for attaching an ELB

<img src="/images/deploy/usecases/deploy_ecs_lb.png"/>

###1. Add a load balancer resource called `app_lb`.

* **Description:** `app_lb` represent a [loadbalancer](/platform/workflow/resource/loadbalancer/#loadbalancer) resource.

    The `pointer` attribute in this resource expects three values to be specified.

      - The `role` value is set to the name of an AWS IAM role that has the appropriate policy and trust relationship for service load balancing.  You can find that information [in the AmazonECS service load balancing documentation](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html).  
      - The `sourceName` field is set to the ARN of the target group that was created alongside your ALB.  Make sure this is the ARN of the *target group* and not the ARN of the load balancer itself.
      - The `method` value is always set to `application`.

* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
- name: app_lb
  type: loadBalancer
  pointer:
    role: role_for_ecs_lb
    sourceName: arn:aws:elasticloadbalancing:us-east-1:679404489841:targetgroup/ecs-deploy-alb-tgtgrp/394643319fd6a729
    method: application
```

###2. Update `app_deploy_job`.
* **Description:** Specify the `applyTo` section in `app_deploy_job`.

    The `applyTo` section expects the following values to be set:

      - `manifest` should be the name of the manifest job.
      - `image` is the resource name of the specific image within that manifest.
      - `port` is the *container port* of that container that is being exposed.

**Steps**
Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  jobs:

    - name: app_deploy_job
      type: deploy
      steps:
        - IN: app_service_def
        - IN: op_cluster
        - IN: app_replicas
        - IN: app_lb
          applyTo:
            - manifest: app_service_def
              image: app_image
              port: 80
```

## Steps for attaching a Classic load balancer

<img src="/images/deploy/usecases/deploy_ecs_lb.png"/>

###1. Add a load balancer resource called `app_lb`.

* **Description:** `app_lb` represent a [loadbalancer](/platform/workflow/resource/loadbalancer/#loadbalancer) resource.

    The `pointer` attribute in this resource expects three values to be specified.

      - The `role` value is set to the name of an AWS IAM role that has the appropriate policy and trust relationship for service load balancing.  You can find that information [in the AmazonECS service load balancing documentation](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html).  
      - The `sourceName` field is set to the name of your load balancer on AWS.

* **Required:** Yes.

**Steps**
Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
- name: deploy_ecs_lb
  type: loadBalancer
  pointer:
    role: role_for_ecs_lb
    sourceName: deploy_ecs_elb
```

###2. Update `app_deploy_job`.
* **Description:** Specify the `applyTo` section in `app_deploy_job`.

    The `applyTo` section expects the following values to be set:

      - `manifest` should be the name of the manifest job.
      - `image` is the resource name of the specific image within that manifest.
      - `port` is the *container port* of that container that is being exposed.

**Steps**
Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  jobs:

    - name: app_deploy_job
      type: deploy
      steps:
        - IN: app_service_def
        - IN: op_cluster
        - IN: app_replicas
        - IN: app_lb
          applyTo:
            - manifest: app_service_def
              image: app_image
              port: 80
```

## Sample project

Here is a sample project for a working sample of this scenario.

**Source code:** [devops-recipes/deploy-ecs-elb](https://github.com/devops-recipes/deploy-ecs-lb)
