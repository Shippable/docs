

<a name="single"></a>
## Single package manifest pattern

A single package manifest has only one input `image` or `file` resource. If your microservices/services in your application are decoupled and versioned, then you might want to independently deploy and manage them by using single package manifests.

<img src="../../images/platform/jobs/manifest/singlePackageManifest.png" alt="Single package manifest" style="width:500px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

A manifest is configured in `shippable.jobs.yml` as shown below:

```
jobs:
  - name: <string>                             #required
    type: manifest                             #required
    steps:
      - IN: <image/file>                     	#required
        versionName: <string>           		#optional
      - IN: <dockerOptions>                   	#optional
      - IN: <params>                      		#optional
```

* `name` should be an easy to remember text string. This will appear in the visualization of this job in the SPOG view.
* `type` is always set to manifest
* One `image` or `file` resource is mandatory an an input for a manifest job. Please read documentation on how to define an [image](workflow/resource/image/) or [file](workflow/resource/file/) resource in your resources yml.
	* By default, the latest version of the image/file resource will be used to generate the manifest. If you want to pin a specific version of the image/file, you can do so by including the `versionName` or `versionNumber` tags.
* `dockerOptions` is an optional tag and customizes the memory, cpu shares, port mappings, etc. Read more on [dockerOptions resource](workflow/resource/dockeroptions/).
* `params` is an optional tag and adds a list of environment params required for the manifest. This can include any key value pairs, for example database connection details. Read more on [params resource](workflow/resource/params/).
* `replicas` is an optional input resource that lets you scale the number of instances of your manifest that you want to deploy. The default value for replicas is 1. Read more on [replicas resource](workflow/resource/replicas/).

<a name="multi"></a>
## Multi package manifest pattern
There are some cases where your services are not completely decoupled. For example, your UI component might be tightly coupled with your caching component. In those cases, a manifest with 2 different images might be required. This is defined with the multi package manifest pattern.

<img src="../../images/platform/jobs/manifest/multiPackageManifest.png" alt="Multi package manifest" style="width:500px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

A multi-package manifest is configured in `shippable.jobs.yml` as shown below:

```
jobs:
  - name: <string>                             #required
    type: manifest                            	#required
    steps:
      - IN: <image/file>                       #required
        versionName: <string>            		#optional
      - IN: <image/file>                       #required
        versionNumber: <number>           		#optional
      - IN: <dockerOptions>                	#optional
      - IN: <replicas>							#optional
      - IN: <params>                      		#optional
        applyTo:
          - <image>
```

* `name` should be an easy to remember text string. This will appear in the visualization of this job in the SPOG view.
* `type` is always set to manifest
* You can define as many `image` or `file` resources as needed. Please read documentation on how to define an [image](workflow/resource/image/) or [file](workflow/resource/file/) resource in your resources yml.
	* By default, the latest version of the image/file resource will be used to generate the manifest. If you want to pin a specific version of the image/file, you can do so by including the `versionName` or `versionNumber` tags.
* `dockerOptions` is an optional tag and customizes the memory, cpu shares, port mappings, etc. Read more on [dockerOptions resource](workflow/resource/dockeroptions/).
	* 	By default, values specified in dockerOptions apply to all images in the manifest. If you want the custom values to only apply to specific images, use the `applyTo` tag and provide a list of images you want to apply them to.
* `params` is an optional tag and adds a list of environment params required for the manifest. This can include any key value pairs, for example database connection details. Read more on [params resource](workflow/resource/params/).
	* 	By default, values specified in params applies to all images in the manifest. If you want them to only apply to specific images, use the `applyTo` tag and provide a list of images you want to apply them to.
* `replicas` is an optional input resource that lets you scale the number of instances of your manifest that you want to deploy. The default value for replicas is 1. Read more on [replicas resource](workflow/resource/replicas/).
