page_main_title: Amazon ECS - Naming conventions
main_section: Deploy
sub_section: Amazon ECS

# Naming Conventions

Shippable uses a default naming convention for its deployment in ECS and the reference for it can be found from here.

| Deploy Method | Default Naming Convention |
|--------------|---------------------------|
| blueGreen | <ul><li>taskDefinition : deployJobName-manifestJobName</li><li>service : deployJobName-manifestJobName-buildNumber<ul> |
| upgrade | <ul><li>taskDefinition : deployJobName-manifestJobName</li><li>service : deployJobName-manifestJobName<ul> |
| replace | <ul><li>taskDefinition : deployJobName-manifestJobName</li><li>service : deployJobName-manifestJobName<ul> |

## Managed
Shippable allows overriding the default naming convention of an ECS service, that was created by running a deploy job. `deployName` can be used in order to achieve this.

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

In this case, the deploy job uses the service name as the value given for `deployName` tag. Note that blueGreen deployments will have a suffix of build number in its service name. So service will be of format deployName-buildNumber in case blueGreen deployments.

Note that, upgrade and replace deployments expect `deployName` to be present during the first deployment. The name of the first deployed service will be the name that will be used in subsequent deployments for upgrade/replace deploy methods. Hence, modifying the deployName will not take effect in a job for those types.

## Unmanaged

In an unmanaged scenario, you'll be using a runCLI job with an AWS cliConfig [as described in the unmanaged section of our basic scenario](./amazon-ecs#unmanaged-deployments).

Name of the task definition can be given in the taskDefinition.json and service name could be changed via `--service` option in aws command line.
