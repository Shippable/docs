page_main_title: Continuous Delivery tutorials
main_section: CD
sub_section: Before you start

# Continuous Delivery tutorials

The Shippable platform can be used to deploy Docker applications to any orchestration platform such as Kubernetes, GKE, or Amazon ECS, in one of two ways:

* Using the `deploy` job, which helps you deploy Docker containers without writing complex scripts. These are fully managed deployments where you specify what you want to deploy and the platform handles the complexity of creating task definitions and deployments. This is a great way to get started with Shippable and as long as you don't have highly custom requirements such as running custom scripts as part of the deployment, automatic rollbacks, etc, this approach will be sufficient for your needs. Please refer to our [Shippable managed deployments](#shippable-deployments) section for an overview and tutorials showing how you can deploy to various Docker orchestration platforms.

* Using the `runSh` job, where you write your deployments scripts which are executed when the job is triggered. The main advantage of this approach is that there is no "magic", since the platform is only executing your scripts. You have complete control over your deployments and you can handle complex scenarios with your custom scripts. Popular cloud-native CLIs/SDKs/tools are already installed on our build machines to make this approach easier. Please refer to our [Custom deployments](#custom-deployments) section for an overview and tutorials showing how you can deploy to various Docker orchestration platforms.

This section also shows you how you can execute your test suites after deploying your application. Refer to the [Run test suites](#test-suites) section for tutorials showing how to include test suites in your workflow.

<a name="custom-deployments"></a>
## Custom deployments with SDKs/CLIs/tools

- [Custom deployments overview](/deploy/deploy-docker-overview)

### Amazon ECS

- [Deploy using AWS CLI](/deploy/deploy-amazon-ecs-cloud-native-cli/)

### Kubernetes

- [Deploy using kubectl](/deploy/tutorial/deploy-to-self-kube-kubectl)

### Google Kubernetes Engine (GKE)

- [Deploy using kubectl](/deploy/tutorial/deploy-to-gcp-gke-kubectl)

### AWS EC2

- [Deploying from Nexus to EC2 using Ansible](/deploy/tutorial/deploy-war-nexus-ec2-ansible)

### AWS Elastic Beanstalk

- [Deploying single-container environments](/deploy/aws-elastic-beanstalk)
- [Deploying multi-container environments](/deploy/aws-elastic-beanstalk-multiple-containers)
- [Multi-stage deployments](/deploy/aws-elastic-beanstalk-multiple-environments)

<a name="shippable-deployments"></a>
## Shippable managed deployments

- [Shippable managed deployments overview](/deploy/deploy-docker-overview)
- [Deploying a simple application](/deploy/continuous-delivery-single-container-docker-application)

### Using load balancers
- [Overview](/deploy/lb-overview)
- [Amazon ECS Classic Load Balancer](/deploy/lb-amazon-ecs-classic)
- [Amazon ECS Application Load Balancer](/deploy/lb-amazon-ecs-app)
- [Kubernetes](/deploy/lb-kubernetes)
- [GKE](/deploy/lb-gke)  

### Advanced scenarios

- [Deploying private images](/deploy/deploy-private-images)
- [Deploying multiple containers](/deploy/deploy-multiple-containers)
- [Multi-stage deployments](/deploy/multi-stage-deployments)
- [Gated deployments](/deploy/gated-deployments)
- [Specifying deployment methods](/deploy/deployment-methods-overview)
- [Customizing container options](/deploy/tutorial/customizing-container-options)
- [Setting environment variables inside deployed container](/deploy/tutorial/set-environment-deployed-container)
- [Scaling service instances](/deploy/tutorial/scaling-services)
- [Specifying the version to deploy](/deploy/deploying-specific-version)
- [Managing releases with semantic versioning](/release/devops-release-management)
- [Rolling back deployments](/deploy/rollback)
- [Sending notifications upon deployments](/deploy/deployment-notifications)
- [Customizing deployed service names](/deploy/customize-service-names)
- [Pausing deployments](/deploy/pause-deployments)
- [Deleting a deployed service](/deploy/deleting-a-service)
- [Resetting a deploy job](/deploy/amazon-ecs-deploy-reset)

<a name="test-suites"></a>
## Run test suites

- [Overview](/validate/devops-validate/)
- [Running Performance tests using Nouvola](/validate/nouvola)
- [Running integration tests with Sauce Labs](/validate/sauce-labs)
