page_main_title: Customizing deployed service names
main_section: Deploy
sub_section: Advanced topics

# Customizing deployed service names

Shippable allows overriding the default naming convention of a deployed service, that was created by running a deploy job.

## Naming convention of a deployed service

Shippable uses a default naming convention for the services it creates during deployment.

| Deploy Method | Default Naming Convention |
|--------------|---------------------------|
| blueGreen | <ul><li>deploymentName : deployJobName-manifestJobName-buildNumber</li><ul> |
| upgrade | <ul><li>deploymentName : deployJobName-manifestJobName</li><ul> |
| replace | <ul><li>deploymentName : deployJobName-manifestJobName</li><ul> |

## Overriding service names

Set the `deployName` attribute in the [deploy](/platform/workflow/job/deploy) job in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
jobs:
  - name: <job name>
    type: deploy
    steps:
      - IN: <manifest>                        #required
        deployName: <custom name>
      - IN: <cluster>                         #required
      - TASK: managed
        deployMethod: upgrade | replace | blueGreen
```

In this case, the deploy job uses the deployment name as the value given for `deployName` tag. Note that blueGreen deployments will have a suffix of build number in its deployment name. So deployment will be of format deployName-buildNumber in case blueGreen deployments.

Note that, upgrade and replace deployments expect `deployName` to be present during the first deployment. The name of the first deployment will be the name that will be used in subsequent deployments for upgrade/replace deploy methods. Hence, modifying the deployName will not take effect in a job for those types.
