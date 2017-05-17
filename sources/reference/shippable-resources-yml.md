page_main_title: shippable.resources.yml
main_section: Reference
sub_section: Configuration

# shippable.resources.yml reference

Resources are defined through `shippable.resources.yml`. They all follow a similar format, with some fields being custom depending on the type of resource. A more detailed explanation of what resources are is in the [Resources overview](/reference/resources-overview/)

The anatomy of the resources configuration generally follows the structure below:

```
resources:
  - name: <string>
    type: <resource type>
    integration: <string>				
    pointer:
    version:
    seed:

```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view and in the list of resources in the Pipelines Grid View.

* `type` is always set to type of resource

* `integration` is used when the resource points to something that is stored in your account with a third-party provider. Examples include Docker images stored in Amazon ECR and files stored in JFrog Artifactory. This is also needed when your pipeline needs to interact with a third-party provider; to send Slack notifications for example.

* The `pointer` section is used when the resource needs to reference something. For example, a [cluster](resource-cluster/) resource has a pointer section which needs cluster name, region name, etc.

* The `version` section is relevant for resources that have versioned data. For example, [dockerOptions](resource-dockeroptions/) and [params](resource-params/) have several tags under the `version` section. Any time the information in this section changes, a new version of the resource is created.

* The `seed` section is used to specify a starting value for a resource. This is relevant for resources like [image](resource-image/) since this tells Shippable what value to use for this resource when running for the first time.

For a detailed explanation of the yml for each resource type, visit the reference page for that specific resource:

- [ciRepo](resource-cirepo/): Represents a project in Shippable CI
- [cliConfig](resource-cliconfig/): Configuration information for command-line tools
- [cluster](resource-cluster/): Cluster that defines a container service
- [dockerOptions](resource-dockeroptions/): Options for docker images
- [file](resource-file/): Specifies a file
- [gitRepo](resource-gitRepo/): Source repository for your code
- [image](resource-image/): Docker image definition
- [integration](resource-integration/): Credentials for third party services
- [loadBalancer](resource-loadbalancer/): AWS Classic and Application Load Balancers, or Google Container Engine (GKE) services.
- [notification](resource-notification/): Notifications for job success or failure
- [params](resource-params/): Parameters for your apps/services/microservices
- [replicas](resource-replicas/): Number of copies of the service to run
- [time](resource-time/): Trigger a job at a specific day and time
- [version](resource-version/): Semantic versions
