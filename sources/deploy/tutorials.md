page_main_title: Continuous Delivery tutorials
main_section: CD
sub_section: Before you start

# Continuous Delivery tutorials

## Deploy containers using popular tools

### Amazon ECS

- [Deploy using AWS CLI](/deploy/tutorial/deploy-amazon-ecs-cloud-native-cli)

### Kubernetes

- [Deploy using kubectl](/deploy/tutorial/deploy-to-self-kube-kubectl)

### Google Kubernetes Engine (GKE)

- [Deploy using kubectl](/deploy/tutorial/deploy-to-gcp-gke-kubectl)


- AWS Elastic Beanstalk:
    - Deploying single-container environments: deploy/aws-elastic-beanstalk.md
    - Deploying multi-container environments: deploy/aws-elastic-beanstalk-multiple-containers.md
    - Multi-stage deployments: deploy/aws-elastic-beanstalk-multiple-environments.md

## Deploy containers using Shippable managed jobs

- [Deploying a single container](/deploy/continuous-delivery-single-container-docker-application)
- [Deploying a multi-container application](/deploy/continuous-delivery-multi-container-docker-application)

### Deployment methods
- [Overview](/deploy/deployment-methods-overview)
- [Blue-green](/deploy/deployment-method-blue-green)
- [Upgrade](/deploy/deployment-method-upgrade)
- [Replace](/deploy/deployment-method-replace)
- [Parallel](/deploy/deployment-method-parallel)

### Using load balancers
- [Overview](/deploy/lb-overview)
- [Amazon ECS Classic Load Balancer](/deploy/lb-amazon-ecs-classic)
- [Amazon ECS Application Load Balancer](/deploy/lb-amazon-ecs-app)
- [Kubernetes](/deploy/lb-kubernetes)
- [GKE](/deploy/lb-gke)  

### Advanced scenarios
- [Multi-stage deployments](/deploy/multi-stage-deployments)
- [Gated deployments](/deploy/gated-deployments)
- [Scaling service instances](/deploy/scale-service-instances)
- [Customizing container options](/deploy/customizing-container-options)
- [Setting environment variables inside deployed container](/deploy/set-environment-deployed-container)
- [Specifying the version to deploy](/deploy/deploying-specific-version)
- [Rolling back deployments](/deploy/rollback)
- [Sending notifications upon deployments](/deploy/deployment-notifications.)
- [Customizing deployed service names](/deploy/customize-service-names)
- [Pausing deployments](/deploy/pause-deployments)
- [Deleting a deployed service](/deploy/deleting-a-service)

## Deploy non-container application packages

- [Deploying from S3 to a single VM cluster](/deploy/vm-basic)
- [Deploying from S3 to multiple VM clusters](/deploy/vm-multiple-environments)
- [Deploying from JFrog Artifactory to a single VM cluster](/deploy/vm-jfrog)
- [Deploying from a git repository to a single VM cluster](/deploy/vm-gitRepo)
- [Deploying from Nexus to EC2 using Ansible](/deploy/tutorial/deploy-war-nexus-ec2-ansible)
