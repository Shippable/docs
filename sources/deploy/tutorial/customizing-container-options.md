page_description: Customize container options for deployed application container
main_section: CD
sub_section: Deploying containers using Shippable managed jobs
sub_sub_section: Advanced topics

# Customizing container options

By default, we set the following options while deploying your container:

- memory : 400mb
- desiredCount : 1
- cpuShares : 0
- All available CPU
- no ENVs are added to the container

However, you can customize these and many other options by including a [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource in your service definition.

## Instructions

###1. Add a dockerOptions resource

Add a `dockerOptions` resource to your [shippable.yml](/platform/workflow/config/) file. For example, to set memory to 1024MB and expose port 80, you would write the following snippet:

```
resources:

  - name: app_options
    type: dockerOptions
    version:
      memory: 1024
      portMappings:
        - 80:80
```
For a complete reference for `dockerOptions`, read the [resource page](/platform/workflow/resource/dockeroptions/#dockeroptions).

###2. Update service definition

Next, you should update your `manifest` with this new resource:

```
jobs:

  - name: app_service_def
    type: manifest
    steps:
     - IN: app_image
     - IN: app_options
```

###3. Commit your shippable.yml

Commit your **shippable.yml** and the workflow will be updated automatically. Next time your deploy job runs, the new options will take effect.
