main_section: Deploy
sub_section: Before you start

# Deploying your application

Shippable supported deployments to many endpoints, both for traditional and Docker based applications.

We have put together samples for all common deployment scenarios:

**Artifacts deployment**

- [Deploying tarballs to a node cluster on any cloud](/deploy/vm-basic/)
- [Deploying to Amazon Elastic Beanstalk](/deploy/aws-elastic-beanstalk/)

**Docker deployments**

- [Amazon ECS](/deploy/amazon-ecs/)
- [Kubernetes](/deploy/kubernetes/)
- [GKE](/deploy/gke/)
- [Docker Datacenter](/deploy/docker-datacenter/)
- [Docker Cloud](/deploy/docker-cloud/)
- [Microsoft Azure](/deploy/azure-dcos/)
- [Amazon Elastic Beanstalk (Docker)](/deploy/aws-elastic-beanstalk/)


##Deployment workflow

Consider the following scenario:

- Your CI job creates a package. This can be a JAR/WAR file or a Docker image.
- Every time the package is updated, a new version of the application manifest is created. The manifest is a versioned immutable unit of deployment for your application.
- The updated manifest version automatically triggers a deployment to your Test environment. Your Test team is notified.
- Once tests are completed and the team signs off on them, the manifest version is automatically deployed to Beta.
- As it passed through several validation steps, the application is deployed into successive environments until it finally reaches production.

The deploy steps are shown in the image below:

<img src="../../images/deploy/nodecluster/basic-final-pipeline.png" alt="Final Pipeline">
