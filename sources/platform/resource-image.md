page_main_title: image
main_section: Platform
sub_section: Resources

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |

# image
`image` resource is used to add a reference to a docker image to your pipeline.

You can create an cliConfig resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			image
    integration: 	<string>
    pointer:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `image`

* **`integration`** -- name of the integration. Currently supported integrations are 
	- [Docker Hub](int-docker-hub/)
	- [Docker Private Registry](int-docker-trusted-registry/)
	- [Docker Trusted Registry](int-docker-trusted-registry/)
	- [Google Container Registry (GCR)](int-gcr/)
	- [Amazon Elastic Container Registry (ECR)](int-amazon-ecr/)
	- [Quay.io](int-quay/)

* **`pointer`** -- is an object which contains integration specific properties

```
  pointer:
    sourceName: < Fully Qualified Name of the image, can be just repo/image in case of Docker Hub
```
* **`seed`** -- is an object which contains initial version properties

```
  seed:
    versionName: <Name of the image tag>
```

# Used in JOBs
This resource is used as an IN for the following jobs

* runCLI
* runSH
* runCI
* manifest


# Further Reading
* GKE integration
* AWS integration
* how to ourput image tag from runCI or runSH
