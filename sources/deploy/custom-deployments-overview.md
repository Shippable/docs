page_main_title: Deploying Docker containers with CLIs/SDKs/tools
page_description: Deploying Docker containers with CLIs/SDKs/tools
main_section: CD
sub_section: Custom deployments with CLIs/SDKs/tools

# Custom deployments of Docker applications

The Shippable platform can be used to deploy Docker applications in one of two ways:

* **Shippable managed deployments** using the `deploy` job, which helps you deploy Docker containers without writing complex scripts. These are fully managed deployments where you specify what you want to deploy and the platform handles the complexity of creating task definitions and deployments. This is a great way to get started with Shippable and as long as you don't have highly custom requirements such as running custom scripts as part of the deployment, automatic rollbacks, etc, this approach will be sufficient for your needs. Please refer to our [Deploying containers using Shippable managed jobs](/deploy/deploy-docker-overview/) section to get started with managed jobs.

* **Custom deployments** using the `runSh` job, where you write your deployments scripts which are executed when the job is triggered. The main advantage of this approach is that there is no "magic", since the platform is only executing your scripts. You have complete control over your deployments and you can handle complex scenarios with your custom scripts. Popular cloud-native CLIs/SDKs/tools are already installed on our build machines to make this approach easier.

This section of the documentation contains several tutorials that demonstrate how you can use the [`runSh` job](/platform/workflow/job/runsh) to deploy Docker applications using popular CLIs/SDKs/tools:

* [Deploy to Amazon ECS using AWS CLI](/deploy/deploy-amazon-ecs-cloud-native-cli/)
* [Deploy to Kubernetes using kubectl](/deploy/tutorial/deploy-to-self-kube-kubectl/)
* [Deploy to GKE using kubectl](/deploy/tutorial/deploy-to-gcp-gke-kubectl/)
* [Deploy to AWS Beanstalk using EB CLI](/deploy/aws-elastic-beanstalk/)
* [Deploy to AWS EC2 using Ansible](/deploy/tutorial/deploy-war-nexus-ec2-ansible/)
