page_main_title: Amazon ECS tutorials: Deploying Docker applications
main_section: Getting started
sub_section: Quickstarts

# Amazon ECS tutorials: Deploying Docker applications

The [Shippable DevOps Assembly Line Platform](/platform/overview/) supports end-to-end deployment pipelines for Amazon ECS, including CI, functional testing, release orchestration, and infrastructure provisioning.

## Step-by-step tutorials

###CI

* [Building a Docker image](/ci/build-docker-images/)
* [Pushing a Docker image to Amazon ECR](/ci/push-amazon-ecr/)

###Deploy

* [Deploying a Single Container application to Amazon ECS](/deploy/amazon-ecs/)
* [Deploying Multiple Containers to Amazon ECS](/deploy/continuous-delivery-multi-container-docker-application/)
* [Scaling your application on Amazon ECS](/deploy/amazon-ecs/#scaling-app-instances)
* [Customizing container options](/deploy/amazon-ecs/#customizing-container-options)
* [Supported deployment methods](/deploy/deployment-methods-overview/)
* [Using a Classic load balancer with your Amazon ECS deployments](/deploy/lb-amazon-ecs-classic/)
* [Using an Application load balancer with your Amazon ECS deployments](/deploy/lb-amazon-ecs-app/)
* [Rolling back Amazon ECS deployments](/deploy/rollback/)

###Release orchestration

* [Multi-stage deployments](/deploy/multi-stage-deployments/)
* [Gated deployments](/deploy/gated-deployments/)
* [Semantic versioning for releases](/release/single-component/)

### Infrastructure provisioning

* [Provisioning AWS VPC with Terraform](/provision/tutorial/provision-aws-vpc-terraform/)
* [Provisioning AWS EC2 instances with Terraform](/provision/tutorial/provision-aws-ec2-terraform/)
* [Provisioning Amazon ECS cluster with Terraform](/provision/tutorial/provision-aws-ecs-terraform/)
* [Provisioning AWS VPC with Ansible](/provision/tutorial/provision-aws-vpc-ansible/)
* [Provisioning AWS EC2 instances with Ansible](/provision/tutorial/provision-aws-ec2-ansible/)

## Sample application

* [devops-recipes/deploy-ecs-basic](https://github.com/devops-recipes/deploy-ecs-basic)

## Reference

* [Amazon ECS docs](https://aws.amazon.com/documentation/ecs/)
* [Shippable CI YML structure](/ci/yml-structure/)
* [Shippable Workflow Docs](/platform/overview/)
