page_main_title: Set environment for deployed application container
page_description: Set environment for deployed application container
main_section: CD
sub_section: Shippable managed deployments
sub_sub_section: Advanced topics

# Set environment for deployed container

You can also include environment variables needed by your application in your service definition `manifest`. To do this, you need a [params](/platform/workflow/resource/params) resource that lets you include key-value pairs.

## Instructions

###1. Add a params resource

Add a `params` resource to your [shippable.yml](/platform/workflow/config/) file. For example, to set environment variables needed to connect to your database:

```
resources:

  - name: app_env
    type: params
    version:
      params:
        DB_URL: "my.database.local"
        DB_PORT: 3306
        DB_NAME: "foo"
```

For a complete reference for `params`, read the [resource page](/platform/workflow/resource/params).

###2. Update service definition

Next, you should update your `manifest` with this new resource:

```
jobs:

  - name: app_service_def
    type: manifest
    steps:
     - IN: app_image
     - IN: app_env
```

For a complete reference for `manifest`, read the [job page](/platform/workflow/job/manifest).

###3. Commit your shippable.yml

Commit your **shippable.yml** and the workflow will be updated automatically. Next time your deploy job runs, the new environment variables will be added to your deployed container.
