page_main_title: Amazon ECS - Naming conventions
main_section: Deploy
sub_section: Amazon ECS

# Naming Conventions

Shippable uses the following default naming convention for deployments to ECS.

| Deploy Method | Default Naming Convention |
|--------------|---------------------------|
| blueGreen | <ul><li>taskDefinition : deployJobName-manifestJobName</li><li>service : deployJobName-manifestJobName-buildNumber<ul> |
| upgrade | <ul><li>taskDefinition : deployJobName-manifestJobName</li><li>service : deployJobName-manifestJobName<ul> |
| replace | <ul><li>taskDefinition : deployJobName-manifestJobName</li><li>service : deployJobName-manifestJobName<ul> |

## Managed
Shippable allows the default ECS service name to be overridden when running a deploy job by setting `deployName`.
```
jobs:
  - name: <job name>
    type: deploy
    method: upgrade | replace | blueGreen
    workflow: parallel | serial
    steps:
      - IN: <manifest>                        #required
        deployName: <custom name>
      - IN: <cluster>                         #required
```

In this case, the deploy job uses the value given for the `deployName` tag as the service name. Note that blueGreen deployments will have a suffix of build number in their service names. So the service name will be of the format deployName-buildNumber in a blueGreen deployment.

Upgrade and replace deployments expect `deployName` to be present during the first deployment. The name of the previously deployed service will be used in subsequent deployments for upgrade or replace deploy methods. Hence, modifying `deployName` in a later deployment will not take effect with an upgrade or replace method.

## Unmanaged

In an unmanaged scenario, you'll be using a runCLI job with an AWS cliConfig [as described in the unmanaged section of our basic scenario](./amazon-ecs#unmanaged-deployments).

Name of the task definition can be given in the taskDefinition.json and service name could be changed via `--service` option in aws command line.
