page_main_title: Customizing deployed service names
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms
sub_sub_section: Advanced topics
page_title: Customizing deployed service names
page_description: How to customizing deployed service names in Shippable

# Customizing deployed service names

Shippable has a default naming convention when running a [deploy](/platform/workflow/job/deploy) job, but also allows you to specify custom names.

## Naming convention of a deployed service

The default naming convention used by Shippable for services created during deployment is as follows:

| Deploy Method | Default Naming Convention |
|--------------|---------------------------|
| blue-green | <ul><li>deploymentName : deployJobName-manifestJobName-buildNumber</li><ul> |
| upgrade | <ul><li>deploymentName : deployJobName-manifestJobName</li><ul> |
| replace | <ul><li>deploymentName : deployJobName-manifestJobName</li><ul> |

## Overriding service names

Set the `deployName` attribute in the [deploy](/platform/workflow/job/deploy) job in your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:
  - name: <job name>
    type: deploy
    method: upgrade | replace | blueGreen
    steps:
      - IN: <manifest>                        #required
        deployName: <custom name>
      - IN: <cluster>                         #required
```

In this case, the deploy job uses the value given for the `deployName` tag as the deployment name. Note that blueGreen deployments will have a suffix of build number in their deployment names. So the deployment name will be of the format deployName-buildNumber in a blueGreen deployment.

Upgrade and replace deployments expect `deployName` to be present during the first deployment. The name used in the previous deployment will be used in subsequent deployments for upgrade or replace deploy methods. Hence, modifying `deployName` in a later deployment will not take effect with an upgrade or replace method.
