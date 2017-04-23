main_section: Reference
sub_section: Resources

# resource-cliconfig


A cliConfig resource contains the information required to configure a command line utility and is used as an input to [runCLI jobs](job-runcli/). Multiple cliConfigs may be used in a single runCLI job, but in most cases only one resource should be specified for each third party service.

You can create an cliConfig resource by adding it to `shippable.resources.yml`

```
resources:
  - name: <string>
    type: cliConfig
    integration: <string>
    pointer:
      region: <string>               #required for some integration types
      clusterName: <string>          #optional
```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'cliConfig'.

* `integration` should be the name of the integration that connects to the third party platform or service you want to be configured in your [runCLI jobs](job-runcli/).

* `region` is the AWS region or Google Cloud zone, for example 'us-east-1' or 'europe-west1-c.' It is required when `integration` is an [AWS]()[TODO: when new links are updated] or [Amazon EC2 Container Registry (ECR)](int-amazon-ecr/) integration and is optional for [Google Container Engine (GKE)](int-gcr/) integrations.

* `clusterName` is optional when using a [Google Container Engine (GKE)](int-gcr/) integration. This should be the name of a cluster on GKE. If a `clusterName` is given, `gcloud` and `kubectl` will be configured to use that cluster. Specifying a `clusterName` without a `region` is not supported.
