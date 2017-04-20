main_section: Deploy
sub_section: Deploying to Amazon ECS

# Amazon ECS Deployment Strategies

## Setup
- one image, one manifest, one deploy


## Managed Deployments
When using Shippable managed deployments, there are several deployment strategies available to you. This section will discuss these options and the impact that they have on Amazon ECS deployments.

### Basic Configuration
These options are controlled through the `TASK` section of the job steps.  By default, most jobs do not require this section, but if you're looking to use one of the non-default options, then your deploy job steps should be updated to contain this section.  It should look like this:

```
- name: DeployTo_cluster-test-1
    type: deploy
    steps:
      - IN: MyECSCluster
      - IN: MyNginxManifest
      - IN: MyRedisManifest
      - TASK: managed
        deployMethod: blueGreen
        deployOptions:
          - serial
```
These are the default values that take effect even if you don't add this section to your deploy job.

#### deployMethod: blueGreen (default)

#### deployMethod: upgrade

#### deployMethod: replace


### Advanced Configuration

#### parallel: true


## Unmanaged Deployments
coming soon
