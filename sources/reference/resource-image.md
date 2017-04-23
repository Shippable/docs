main_section: Reference
sub_section: Resources

# resource-image
An `image` resource is used to add a reference to a docker image to your pipeline. It is used as an input for [manifest jobs](job-manifest/).

You can create an `image` resource by adding it to `shippable.resources.yml`:

```
resources:
  - name: <string>                           	 #required
    type: image                               	 #required
    integration: <string>                   	 #required
    pointer:
      sourceName: "org/repo"                    #required
    seed:
      versionName: "<string>"                	 #optional
```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'image'.

* `integration` should be the name of the integration that connects to the Docker Registry provider where the image is located. To learn how to create integrations for a specific Docker Registry, please select from the list below and read the **Adding an integration** section on that page:

	- [Docker Hub](../../integrations/imageRegistries/dockerHub/)
	- [Docker Private Registry](../../integrations/imageRegistries/privateRegistry/)
	- [Docker Trusted Registry](../../integrations/imageRegistries/dockerTrustedRegistry/)
	- [Google Container Registry (GCR)](../../integrations/imageRegistries/gcr/)
	- [Amazon Elastic Container Registry (ECR)](../../integrations/imageRegistries/ecr/)
	- [Quay.io](../../integrations/imageRegistries/quay/)

Please make sure your integration is also [enabled for your subscription](../../navigatingUI/subscriptions/settings/#adding-integrations) and you use that  integration name here.

* `pointer` section provides information about the image.
	* `sourceName` is the fully qualified name of the image. This is dependent on the registry where the image is located. For Docker Hub, this can be <repo name>/<image name>, e.g. manishas/demoImage

* `versionName` should be set to a starting value for the image tag. It will be used by the first run of any job that has this image as an input, unless the `versionName` is changed prior to the first run by an upstream job or CI workflow. The default value for this is `latest`. You can also use this to re-seed the image resource with a specific tag.
