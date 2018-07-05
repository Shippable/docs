page_description: Scaling service instances
main_section: CD
sub_section: Deploying containers using Shippable managed jobs
sub_sub_section: Advanced topics

# Scaling service instances

By default, we always deploy one instance of your application. You can scale it as needed by including a  [replicas](/platform/workflow/resource/replicas) resource in your service definition `manifest`.

## Instructions

###1. Add a replicas resource

Add a `replicas` resource to your [shippable.yml](/platform/workflow/config/) file. For example, to scale your application to 5 instances:

```
resources:

  - name: app_replicas
    type: replicas
    version:
      count: 5
```

For a complete reference for `replicas`, read the [resource page](/platform/workflow/resource/replicas).

###2. Update deploy job

Next, you should update your `deploy` with this new resource:

```
jobs:

  - name: app_deploy_job
    type: deploy
    steps:
      - IN: app_service_def
      - IN: op_cluster
      - IN: app_replicas
```

For a complete reference for `deploy`, read the [job page](/platform/workflow/job/deploy).

###3. Commit your shippable.yml

Commit your **shippable.yml** and the workflow will be updated automatically. Next time your deploy job runs, the your service will be scaled up as expected.
