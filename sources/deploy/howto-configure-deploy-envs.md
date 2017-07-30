main_section: Deploy
sub_section: HowTo

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |
| Simple concept of params + deployment|  Open |
| multi stage concept of params + deployment|  Open |

# Scenarios
These are the following use cases that will be covered in this tutotial

* Deploying a Docker container to an orchestration service and setting up environment variables during deployment
* Multi-stage Continuous Delivery of a Docker container through Dev, Test & Prod environments and dynamically changing the environment variables as the container moves through the delivery workflow


# Pre-requisites
In this tutorial, we are going to be using the following entities of Shippable DevOps Assembly Lines

* Integrations
	* AWS
	* Docker

* Resources
	* cluster 
	* params
	* image

* Jobs
	* deploy
	* manifest


## Using params resources as inputs to manifest and deploy jobs
If a params resource is added as an input, the key-value pairs contained in the params resource will be set as environment variables when the application or service starts in the target environment.

### Overriding params
`params` can also be used to override settings that were set in an upstream stage of the pipeline.

For example, if you want to use different environment parameters (say database settings) in Test and Production environments, you can do so by overriding the resource.

<img src="../../images/platform/resources/overrideParams.png" alt="Overriding Params image">

In the picture above, `deploy-test` takes `params-1` as an input. After testing, a release is created with the `release` job. This triggers production deployment with the `deploy-prod` job, which takes `params-2` as an input. For this production deployment, we will use a superset of settings from `params-1` and `params-2`, with values for any common settings being chosen from `params-2`.

## Using params resources as inputs to runSh and runCLI jobs
If a params resource is added as an input, the key-value pairs contained in the params resource are set as environment variables in the runSh or runCLI job. The variables can be used by

- following the naming convention for those variables available in the documentation on [runSh environment variables](jobs-runsh/#resource-variables).
- directly using the variable name. If there are multiple params resources as INs to the runSh/runCLI jobs and if there are keys shared across the params resources, then the last value of that key will be used. This works similar to Bash export of variables. 



##Configuration

Your pipelines are defined through three yml-based configuration files:

- `shippable.jobs.yml` is contains definitions of the Jobs in your pipeline.

- `shippable.resources.yml` contains definitions of the Resources in your pipeline.

- `shippable.triggers.yml` contains definitions of manual triggers for Jobs in your pipeline. You can manually trigger any job in your pipeline and by pushing a change to this file. This file is optional since you can also run jobs manually through the UI.

Pipeline configuration files should be committed to a repository in your source control. This repository is called a [sync repository](#sync). You can keep these config files with the source code for your application or keep it separate in its own repository.

<a name="sync"></a>
##Sync repository

A source control repository that contains your pipeline configuration files is called a **Sync Repository**. Each sync repository contains one or more of `shippable.jobs.yml`, `shippable.resources.yml`, and `shippable.triggers.yml` files.

You must seed your pipeline with at least one sync repository through the Shippable UI. Subsequent sync repositories can also be added through the UI following the same process. Instructions are in the [Adding a sync repository](#seedPipeline) section below.

You may have the entire pipeline configuration maintained in one repository, split it across directories within the same repository, or split up the configuration across multiple sync repositories. This decision depends on your organizational preferences, as well as [security and permissions requirements](#permissions). For example, you may have pipeline configuration for source control through your first test environment in one repo, configuration for subsequent test environments in another repo, and configuration for your production environment in yet another repo. In this way, you can manage who can configure and execute different areas of your pipeline based on the permissions set on each repo.


<a name="seedPipeline"></a>
###Adding a sync repository

You can add a sync repository by following the steps below:

* First, add a subscription integration for the source control provider where your sync repository is located. Instructions are here - [Source Control Provider Integrations](/platform/integration/overview#source-control-providers).
* Go to your Organization's page on Shippable. A list of all available Organizations can be accessed by clicking on the Subscriptions menu at the top left of your screen:

<img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="List of subscriptions">

* Click on the **Pipelines** tab
* If you have never added a sync repository, your Single Pane of Glass will be empty. Click the **+** button at upper right to add a sync repository.
* Complete the **Add Resource** fields:
	* The subscription integration dropdown should show the integration you created in the first step. If not, you will need to go through the flow of adding the integration.
	* The **Select Project** dropdown will show all repositories in the source control you just connected with the integration. Choose your sync repository.
	* Select the branch of the sync repository that contains your pipeline configuration files.
	* Name your sync repository with an easy to remember name.
* Click on **Save** to apply your sync repository configuration.

At this point, Shippable will parse all configuration files in the sync repository and create your pipeline(s). You will see a visualization of the the jobs and resources from your `shippable.jobs.yml` and your `shippable.resources.yml` in the Single Pane of Glass (SPOG).

###Troubleshooting pipeline errors

If your rSync job fails or you do not see what you expected, you likely have a configuration error. Click on the rSync job in the SPOG view to see the console. Expand the **Executing Managed Task: rSync** section and then the **/home/shippable/micro/nod/stepExec/managed/rSync/run.sh** sections. This is the section that shows the console for your configuration. Configuration errors are shown highlighted in red at the end of this section as shown below.

<img src="/images/getting-started/rsync-errors.png" alt="Errors during pipelines config import"">

<a name="permissions"></a>
## Permissions

Permissions for your deployment pipelines are tightly coupled with permissions for your sync repositories. Consequently, pipeline elements are only visible and accessible to perform actions to users with **Owner**, **Collaborator/Write**, or **Read** access to the sync repository that holds the configuration files. Users that do not have access to your sync repository will not have access to that portion of your pipeline, even if they are members of your organization.
