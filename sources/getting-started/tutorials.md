page_main_title: Continuous integration and deployment tutorials
main_section: Getting started
sub_section: Quickstarts

# Continuous integration and Deployment tutorials

The [Shippable DevOps Assembly Line Platform](/platform/overview/) supports end-to-end deployment pipelines for all applications, regardless of platform, programming language, and toolchain.

While you can explore our Platform, CI, and other Docs sections, this page is meant to be an exhaustive list of all end-to-end tutorials that will help you get started.

## Platform

### Configuration

- [Enabling a CI project](/ci/enable-project): Enabling your project for CI sets up webhooks, so that your CI workflow can be automatically triggered when your source code changes.
- [Adding an Assembly Line](/platform/tutorial/workflow/add-assembly-line): If you want Shippable to read your jobs and resources config, you need to add an Assemnly Line  that points to a repository containing the config.
- [Testing your Assembly Line config](/platform/tutorial/workflow/test-assembly-line-config)
- [Breaking up your workflow into jobs](/platform/tutorial/workflow/break-workflow-into-jobs)
- [Triggering a job](/platform/workflow/job/overview/#when-does-a-job-execute)
- [Scheduling workflows to trigger at a specific time](/platform/tutorial/workflow/scheduled-triggers)
- [Pausing/Restarting a job](/platform/tutorial/workflow/crud-job/#pausing-jobs)
- [Executing a job with specific input versions](/platform/tutorial/workflow/pin-versions)
- [Inserting an approval gate](/platform/tutorial/workflow/insert-approval-gate)
- [Sending status notifications](/platform/tutorial/workflow/send-job-status-notifications)
- [Filtering your SPOG view](/platform/tutorial/workflow/filter-spog-view)
- [Viewing version history for jobs and resources](/platform/tutorial/workflow/view-version-history)
- [Sharing information across jobs](/platform/tutorial/workflow/share-info-across-jobs)
- [Inserting secrets into jobs](/platform/tutorial/workflow/insert-secrets-in-job)
- [Running a job on a specific node pool](/platform/tutorial/workflow/run-job-on-specific-node-pool)
- [Running a job directly on the node](/platform/tutorial/workflow/run-job-on-node)
- [Using a custom image](/platform/tutorial/workflow/use-custom-image)
- [Using alpine custom image with runSh](/platform/tutorial/workflow/use-alpine-custom-image-runsh)
- [Sending pull request status to source control](/platform/tutorial/workflow/sending-status-to-scm)
- [Setting environment for a job](/platform/tutorial/workflow/set-env-vars-in-job)
- [Setting job timeouts](/platform/tutorial/workflow/set-job-timeout)
- [Using cliConfig for supported CLIs](/platform/tutorial/workflow/using-cliconfig)
- [Creating Jira issues](/platform/tutorial/workflow/create-jira-issues)
- [Using the shipctl utility to read/write to INs and OUTs](/platform/tutorial/workflow/using-shipctl)
- [Running jobs on Windows Server 2016](/platform/tutorial/workflow/jobs-windows)
- [Running jobs on Mac OS](/platform/tutorial/workflow/jobs-macos)
- [Running jobs on CentOS](/platform/tutorial/workflow/jobs-centos)

### Runtime

- [Managing node pools](/platform/tutorial/runtime/manage-node-pools)
- [Turning on node caching](/platform/tutorial/runtime/turn-on-node-caching)
- Buying specific node SKUs
- Choosing build images
- Upgrading Docker version
- Setting timeout for jobs running on a node pool
- [Managing BYON Nodes](/platform/tutorial/runtime/manage-byon-nodes)

### Integration

- Creating an integration
- Granting integration permissions to an organization or project
- Deleting an integration
- Updating an integration
- Using an integration in a CI job
- Using an integration in a runSh job

### Security

- [Encrypting Information](/platform/tutorial/security/encrypt-vars)
- Controlling workflow access based on roles
- Abstracting secrets from automation scripts


## CI

- [Enabling a project](/ci/enable-project)
- [Triggering your CI job](/ci/trigger-job)
- [Triggering other jobs after CI](/ci/trigger-pipeline-jobs)
- [Permissions](/ci/permissions)
- [Troubleshooting](/ci/troubleshooting)
- [Yml structure](/ci/yml-structure)
- Preparing your environment:
    - [Setting language and runtime](/ci/set-language)
    - [Choosing a build image](/ci/build-image)
    - [Specifying branches to build](/ci/specify-branches)
    - [Working with env variables](/ci/env-vars)
- Working with services:
    - [Overview](/ci/services-overview)
    - [Cassandra](/ci/cassandra)
    - [CouchDB](/ci/couchdb)
    - [Elasticsearch](/ci/elasticsearch)
    - [Memcached](/ci/memcached)
    - [MongoDB](/ci/mongodb)
    - [MySQL](/ci/mysql)
    - [Neo4j](/ci/neo4j)
    - [PostgreSQL](/ci/postgresql)
    - [RabbitMQ](/ci/rabbitmq)
    - [Redis](/ci/redis)
    - [Riak](/ci/riak)
    - [RethinkDB](/ci/rethinkdb)
    - [Selenium](/ci/selenium)
    - [SQLite](/ci/sqlite)
- Building and testing your project:
    - [Configuring CI commands](/ci/build-and-test)
    - [Building Docker images](/ci/build-docker-images)
    - [Running tests in parallel](/ci/parallelize-tests)
    - [Status code](/ci/build_status)
- Configuring test/code coverage:
    - [Basic config](/ci/test-code-coverage-reports)
    - [JaCoCo reports](/ci/jacoco-reports)
- Sending notifications:
    - [Overview](/ci/send-notifications)
    - [Sending messages to Slack](/ci/slack-notifications)
    - [Sending messages to Email](/ci/email-notifications)
    - [Sending messages to Hipchat](/ci/hipchat-notifications)
    - [Sending messages to IRC](/ci/irc-notifications)
- Pushing artifacts:
    - [Overview](/ci/push-artifacts)
    - [Push artifacts to S3](/ci/push-to-s3)
    - [Push to JFrog Artifactory](/ci/push-to-artifactory)
    - [Push Docker image to Docker Hub](/ci/push-docker-hub)
    - [Push Docker image to Amazon ECR](/ci/push-amazon-ecr)
    - [Push Docker image to GCR](/ci/push-gcr)
    - [Push Docker image to Quay](/ci/push-quay)
    - [Push Docker image to Docker registry](/ci/push-docker-registry)
- Deployments:
    - [Overview](/ci/deployment-overview)
    - [Heroku](/ci/deploy-to-heroku)
    - [Amazon EC2](/ci/deploy-to-ec2)
    - [AWS Opsworks](/ci/deploy-to-aws-opsworks)
    - [AWS EBS](/ci/deploy-to-aws-beanstalk)
    - [Digital Ocean](/ci/deploy-to-digital-ocean)
- Advanced config:
    - [Caching](/ci/caching)
    - [Using a custom Docker image](/ci/custom-docker-image)
    - [Running Docker Compose](/ci/docker-compose)
    - [Building pull requests](/ci/pull-request-builds)
    - [Skipping a build](/ci/skip-builds)
    - [Using git submodules](/ci/git-submodules)
    - [Retrying a command](/ci/retry-command)
    - [Using SSH keys](/ci/ssh-keys)
    - [Canceling builds](/ci/cancel-builds)
    - [Customizing timeouts](/ci/custom-timeouts)
    - [Console logs](/ci/console-logs)
    - [Build badges](/ci/build-badges)
    - [Scheduled builds](/ci/scheduled-builds)
    - [Running builds as non-root user](/ci/non-root)
    - [Triggering webhooks](/ci/webhook)
    - [Triggering parallel jobs](/ci/matrix-builds)
- Language guide:
    - [Overview](/ci/supported-languages)
    - [Node.js](/ci/nodejs-continuous-integration)
    - [Python](/ci/python-continuous-integration)
    - [Java](/ci/java-continuous-integration)
    - [Ruby](/ci/ruby-continuous-integration)
    - [Go](/ci/go-continuous-integration)
    - [Scala](/ci/scala-continuous-integration)
    - [PHP](/ci/php-continuous-integration)
    - [Clojure](/ci/clojure-continuous-integration)
    - [C/C++](/ci/cpp-continuous-integration)
    - [Unsupported languages](/ci/unsupported-languages)
- Debugging:
    - [SSH Access to Build Machine](/ci/ssh-access)
- E2E Tutorials:
    - [Build and push Docker image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
    - [Building a custom Docker image to use for CI](/ci/tutorial/build-custom-ci-image)
    - [Build and Push Docker Image to JFrog Artifactory](/ci/tutorial/build-push-image-to-jfrog)
    - [Build and Push Java WAR file to Nexus Repository with Maven](/ci/tutorial/build-push-java-war-nexus-maven)

## CD

### Deploy using popular tools

* [Deploying to Google Kubernetes Engine (GKE) using kubectl](/deploy/tutorial/deploy-to-gcp-gke-kubectl)
* [Deploying to a self-hosted Kubernetes cluster using kubectl](/deploy/tutorial/deploy-to-self-kube-kubectl)
* [Deploying to Google Kubernetes Engine (GKE) using Helm](/deploy/tutorial/deploy-to-gcp-gke-helm)
* [Deploying a WAR from Nexus to EC2 using Ansible](/deploy/tutorial/deploy-war-nexus-ec2-ansible)
* [Deploying to a self-hosted Kubernetes cluster using Helm](/deploy/tutorial/deploy-to-self-kube-helm)
* [Deploying to Amazon EKS using kubectl](/deploy/tutorial/continuous-deployment-to-amazon-eks-kubectl)
* [Deploying to Amazon ECS using Shippable](/deploy/tutorial/deploy-to-amazon-ecs-shippable)


### Managed jobs: deploy

- [Deploying a single container](/deploy/continuous-delivery-single-container-docker-application)
- [Deploying a multi-container application](/deploy/continuous-delivery-multi-container-docker-application)
- Using load balancers:
    - [Overview](/deploy/lb-overview)
    - [Amazon ECS Classic Load Balancer](/deploy/lb-amazon-ecs-classic)
    - [Amazon ECS Application Load Balancer](/deploy/lb-amazon-ecs-app)
    - [Kubernetes](/deploy/lb-kubernetes)
    - [GKE](/deploy/lb-gke)  
- Advanced scenarios:
    - [Multi-stage deployments](/deploy/multi-stage-deployments)
    - [Gated deployments](/deploy/gated-deployments)
    - [Deployment strategies](/deploy/deployment-methods-overview)
    - [Customizing container options](/deploy/tutorial/customizing-container-options)
    - [Setting environment variables inside deployed container](/deploy/tutorial/set-environment-deployed-container)
    - [Scaling service instances](/deploy/tutorial/scaling-services)
    - [Specifying the version to deploy](/deploy/deploying-specific-version)
    - [Rolling back deployments](/deploy/rollback)
    - [Sending notifications upon deployments](/deploy/deployment-notifications)
    - [Customizing deployed service names](/deploy/customize-service-names)
    - [Pausing deployments](/deploy/pause-deployments)
    - [Deleting a deployed service](/deploy/deleting-a-service)
- Specific cloud providers:
    - Amazon ECS:
        - [Single-container app](/deploy/amazon-ecs)
        - [Multi-container app](/deploy/amazon-ecs-multiple-containers)
        - [Resetting a deploy job](/deploy/amazon-ecs-deploy-reset)
    - Kubernetes:
        - [Single-container app](/deploy/kubernetes)
        - [Multi-container app](/deploy/kubernetes-multiple-containers)
        - [Multi-stage deployments](/deploy/kube-multi-stage-deployments)
    - GKE:
        - [Single-container app](/deploy/gke)
    - Docker Datacenter:
        - [Single-container app](/deploy/docker-datacenter)
    - Docker Cloud:
        - [Single-container app](/deploy/docker-cloud)
    - Azure DC/OS:
        - [Single-container app](/deploy/azure-dcos)

### Deployments to VMs

- [Deploying from S3 to a single VM cluster](/deploy/vm-basic)
- [Deploying from JFrog Artifactory to a single VM cluster](/deploy/vm-jfrog)
- [Deploying from a git repository to a single VM cluster](/deploy/vm-gitRepo)
- [Deploying from Nexus to EC2 using Ansible](/deploy/tutorial/deploy-war-nexus-ec2-ansible)
- Advanced scenarios for package based deployments:
    - Multi-stage deployments
    - Gated deployments
    - Scaling service instances
    - Setting environment variables on VM
    - Specifying the version to deploy
    - Rolling back deployments
    - Sending notifications upon deployments
    - Pausing deployments
    - Deleting a deployed service

### Deployments using cloud-native CLI:

- AWS Elastic Beanstalk:
    - [Deploying single-container environments](/deploy/aws-elastic-beanstalk)
    - [Deploying multi-container environments](/deploy/aws-elastic-beanstalk-multiple-containers)
    - [Multi-stage deployments](/deploy/aws-elastic-beanstalk-multiple-environments)

### Running test suites:
- [Overview](/validate/devops-validate)
- [Running performance tests with Nouvola](/validate/nouvola)
- [Running integration tests with Sauce Labs](/validate/sauce-labs)

### Managing release versions:
- [Overview](/release/devops-release-management)
- [Semantic versioning](/release/single-component)
- [Setting version number](/release/set-version-number)
- [Incrementing version numbers](/release/increment-version-number)


## IT Ops

### Building machine images

* [Build AWS EC2 AMI using Packer](/provision/tutorial/build-aws-ec2-ami-packer)
* [Build Google Compute Engine(GCE) virtual machine image using Packer](/provision/tutorial/build-google-compute-engine-image-packer)
* [Build Azure Virtual Hard Disk(VHD) using Packer](/provision/tutorial/build-azure-virtual-hard-disk-packer)

### Provisioning virtual machines

* [Provision AWS EC2 virtual machines with Ansible](/provision/tutorial/provision-aws-ec2-ansible)
* [Provision GCP virtual machines with Ansible](/provision/tutorial/provision-gcp-vm-ansible)
* [Provision Azure virtual machines with Ansible](/provision/tutorial/provision-azure-vm-ansible)
* [Provision AWS EC2 virtual machines with Terraform](/provision/tutorial/provision-aws-ec2-terraform)
* [Provision GCP virtual machines with Terraform](/provision/tutorial/provision-gcp-vm-terraform)
* [Provision Azure virtual machines with Terraform](/provision/tutorial/provision-azure-vm-terraform)

### Provisioning private clouds

* [Provision AWS VPC with Ansible](/provision/tutorial/provision-aws-vpc-ansible)
* [Provision GCP VPC with Ansible](/provision/tutorial/provision-gcp-vpc-ansible)
* [Provision Azure Virtual Network with Ansible](/provision/tutorial/provision-azure-vnet-ansible)
* [Provision AWS VPC with Terraform](/provision/tutorial/provision-aws-vpc-terraform)
* [Provision GCP VPC with Terraform](/provision/tutorial/provision-gcp-vpc-terraform)
* [Provision Azure Virtual Network with Terraform](/provision/tutorial/provision-azure-vnet-terraform)
* [Provision AWS ECS with Terraform](/provision/tutorial/provision-aws-ecs-terraform)

### Provisioning Kubernetes clusters
* [Using KOPS to provision a self-hosted Kubernetes cluster on AWS](/provision/tutorial/provision-kubernetes-cluster-with-kops-aws)
* [Using KOPS to provision a self-hosted Kubernetes cluster on GCP](/provision/tutorial/provision-kubernetes-cluster-with-kops-gcp)
* [Using KOPS to provision a self-hosted Kubernetes cluster on Azure](/provision/tutorial/provision-kubernetes-cluster-with-kops-azure)
* [Using AWS CLI to provision a self-hosted Kubernetes cluster on AWS](/provision/tutorial/provision-kubernetes-cluster-with-aws-cli)
* [Using gcloud SDK to provision a self-hosted Kubernetes cluster on GCP](/provision/tutorial/provision-kubernetes-cluster-with-gcloud-sdk)
* [Using Azure CLI to provision a self-hosted Kubernetes cluster on Azure](/provision/tutorial/provision-kubernetes-cluster-with-azure-cli)
