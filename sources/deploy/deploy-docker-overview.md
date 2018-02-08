page_main_title: Deploying Docker applications to Container Orchestration Platforms
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms

# Deploying Docker applications to Container Orchestration Platforms

Docker has made it very easy to package your application in a portable, lightweight container that can be deployed to any cloud. The Docker CLI also supports basic commands that let you push the container as an image to a Docker registry and run the container on any machine.

However, most applications are more complex and need multiple Docker images packaged into several services. Orchestration platforms like Amazon ECS, Kubernetes, Azure Container Service, Docker Swarm, etc extend lifecycle management capabilities to complex, multi-container workloads deployed on a cluster of machines. By abstracting the underlying infrastructure, orchestration platforms allow users to treat the entire cluster as a single deployment target.  

Shippable supports deploying simple or complex Docker applications from any [supported Docker registry](/platform/integration/overview/#supported-docker-registry-integrations) to the following Orchestration Platforms:

- [Amazon ECS](https://aws.amazon.com/ecs/)
- [Kubernetes](https://kubernetes.io/)
- [Google Container Engine](https://cloud.google.com/container-engine/)
- [Azure DC/OS](https://docs.microsoft.com/en-us/azure/container-service/dcos-swarm/container-service-mesos-marathon-ui)
- [Docker Cloud](https://cloud.docker.com/)
- [Docker Datacenter](https://www.docker.com/enterprise-edition)
- [Joyent Triton](https://www.joyent.com/triton/compute)
- [Azure Container Service (AKS)](https://azure.microsoft.com/en-us/services/container-service/)

You can deploy using one of two methods:

* [Using the `deploy` job](#easy-deploy) that abstracts the underlying Container Orchestration Platform and provides a consistent way to deploy your application
* [Using the `runSh` job](#custom-deploy) which lets you script the deployment using the cloud native CLI, offering complete control

<a name="easy-deploy"></a>
## Easy deployments with `deploy`

The deploy job allows you to deploy a complex application to any supported orchestration platform with just a few lines of declarative YAML. The complexities of the underlying platform are abstracted, leading to the following advantages:

* **Quick configuration** with a few lines of declarative YAML
* **Hybrid cloud:** You can use the same deployment workflow to deploy to multiple clouds
* **No lock-in:** If you move to a different orchestration platform, your deployment workflow config can be updated with changes to a couple of lines

To get started, check out our tutorials:

- [Continuous Delivery of a single-container Docker app to an orchestration platform](/deploy/continuous-delivery-single-container-docker-application/)
- [Continuous Delivery of a multi-container Docker app to an orchestration platform](/deploy/continuous-delivery-multi-container-docker-application/)

<a name="custom-deploy"></a>
## Custom deployments with Cloud-Native CLIs

You can also use cloud-native CLIs to configure your deployments yourself. The advantage is that you have full control over your deployments. However, this does not give you cross-cloud compatibility since moving to a different orchestration platform will require you to rewrite your deployment job.

For deployments using the appropriate cloud-native CLI, please visit our [Deploy with Cloud-Native CLI docs](/deploy/deploy-cloud-native-overview/).
