page_main_title: Continuous Delivery tutorials
main_section: CD
sub_section: Before you start

# Continuous Delivery tutorials

## Deployment targets

### Amazon ECS

- [Deploy using AWS CLI](/deploy/deploy-amazon-ecs-cloud-native-cli/)

### Kubernetes

- [Deploy using kubectl](/deploy/tutorial/deploy-to-self-kube-kubectl)

### Google Kubernetes Engine (GKE)

- [Deploy using kubectl](/deploy/tutorial/deploy-to-gcp-gke-kubectl)

### AWS Elastic Beanstalk

- [Deploying single-container environments](/deploy/aws-elastic-beanstalk)
- [Deploying multi-container environments](/deploy/aws-elastic-beanstalk-multiple-containers)
- [Multi-stage deployments](/deploy/aws-elastic-beanstalk-multiple-environments)

## Deploy containers using Shippable managed jobs

- [Deploying a single container](/deploy/continuous-delivery-single-container-docker-application)
- [Deploying a multi-container application](/deploy/continuous-delivery-multi-container-docker-application)

### Using load balancers
- [Overview](/deploy/lb-overview)
- [Amazon ECS Classic Load Balancer](/deploy/lb-amazon-ecs-classic)
- [Amazon ECS Application Load Balancer](/deploy/lb-amazon-ecs-app)
- [Kubernetes](/deploy/lb-kubernetes)
- [GKE](/deploy/lb-gke)  

### Advanced scenarios
- [Multi-stage deployments](/deploy/multi-stage-deployments)
- [Gated deployments](/deploy/gated-deployments)
- [Specifying deployment methods](/deploy/deployment-methods-overview)
- [Customizing container options](/deploy/tutorial/customizing-container-options)
- [Setting environment variables inside deployed container](/deploy/tutorial/set-environment-deployed-container)
- [Scaling service instances](/deploy/tutorial/scaling-services)
- [Specifying the version to deploy](/deploy/deploying-specific-version)
- [Rolling back deployments](/deploy/rollback)
- [Sending notifications upon deployments](/deploy/deployment-notifications)
- [Customizing deployed service names](/deploy/customize-service-names)
- [Pausing deployments](/deploy/pause-deployments)
- [Deleting a deployed service](/deploy/deleting-a-service)

## Deploy non-container application packages

- [Deploying from S3 to a single VM cluster](/deploy/vm-basic)
- [Deploying from JFrog Artifactory to a single VM cluster](/deploy/vm-jfrog)
- [Deploying from a git repository to a single VM cluster](/deploy/vm-gitRepo)
- [Deploying from Nexus to EC2 using Ansible](/deploy/tutorial/deploy-war-nexus-ec2-ansible)

## Run test suites

- [Overview](/validate/devops-validate/)
- [Running Performance tests using Nouvola](/validate/nouvola)
- [Running integration tests with Sauce Labs](/validate/sauce-labs)

## Manage release versions

- [Overview](/release/overview)
- [Create a release from a single component](/release/single-component)
- [Setting version number](/release/set-version-number)
- [Incrementing version numbers](/release/increment-version-number)
