page_main_title: Deploying Docker applications to Container Orchestration Platforms
main_section: CD
sub_section: Shippable managed deployments
page_title: Deploy to Container Orchestration Platforms
page_description: How to deploy to Container Orchestration Platforms in Shippable

# Deploying Docker applications to Container Orchestration Platforms

The Shippable platform can be used to deploy Docker applications in one of two ways:

* Using the `deploy` job, which helps you deploy Docker containers without writing complex scripts. These are fully managed deployments where you specify what you want to deploy and the platform handles the complexity of creating task definitions and deployments. This is a great way to get started with Shippable and as long as you don't have highly custom requirements such as running custom scripts as part of the deployment, automatic rollbacks, etc, this approach will be sufficient for your needs.

* Using the `runSh` job, where you write your deployments scripts which are executed when the job is triggered. The main advantage of this approach is that there is no "magic", since the platform is only executing your scripts. You have complete control over your deployments and you can handle complex scenarios with your custom scripts. Popular cloud-native CLIs/SDKs/tools are already installed on our build machines to make this approach easier. Please refer to our [Custom deployments](/deploy/deploy-docker-overview/) section to get started with this approach.

The main advantage of using the managed `deploy` job are:

* **Quick configuration** with a few lines of declarative YAML
* **Hybrid cloud:** You can use the same deployment workflow to deploy to multiple clouds
* **No lock-in:** If you move to a different orchestration platform, your deployment workflow config can be updated with changes to a couple of lines

This section of the documentation contains several tutorials that demonstrate how you can use the managed [`deploy` job](/platform/workflow/job/deploy) to deploy Docker applications:

* [Deploying a simple Docker application](/deploy/continuous-delivery-single-container-docker-application)
- [Deploying private images](/deploy/deploy-private-images)
- [Deploying multiple containers](/deploy/deploy-multiple-containers)
- [Multi-stage deployments](/deploy/multi-stage-deployments)
- [Gated deployments](/deploy/gated-deployments)
- [Specifying deployment methods](/deploy/deployment-methods-overview)
- [Specifying the version to deploy](/deploy/deploying-specific-version)
- [Rolling back deployments](/deploy/rollback)
- [Sending notifications upon deployments](/deploy/deployment-notifications)
- [Customizing container options](/deploy/tutorial/customizing-container-options)
- [Setting environment variables](/deploy/tutorial/set-environment-deployed-container)
- [Scaling service instances](/deploy/tutorial/scaling-services)
- [Customizing deployed service names](/deploy/customize-service-names)
- [Pausing deployments](/deploy/pause-deployments)
- [Deleting a deployed service](/deploy/deleting-a-service)
- [Resetting a deploy job](/deploy/amazon-ecs-deploy-reset)
