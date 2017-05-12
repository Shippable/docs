page_main_title: release
main_section: Reference
sub_section: Jobs
page_title: Unified Pipeline Jobs - release
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# release

`release` jobs are used to create, manage, or increment semantic versions.

`release` jobs are usually connected to `deploy` jobs as an input, though they can also be used as an input for other `release` jobs. The common scenario is this:

<img src="../../images/reference/jobs/release/releaseCommonScenario.png" alt="Common use case for release jobs" style="width:600px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

The configuration shown above will trigger a deployment each time a new release is created.

You can create a release consisting of one or more manifest jobs and/or one or more deploy jobs. The idea is to create immutable, unique version numbers that be used as deployment inputs. You can include releases jobs at any stage of your deployment pipeline depending on your requirements.

## Manifest release
If your release job has one or more manifests jobs as inputs and does not have input deploy jobs, it is called a manifest release.

<img src="../../images/reference/jobs/release/manifestRelease.png" alt="Single manifest releases" style="width:500px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

A manifest release is configured in `shippable.jobs.yml` as shown below:

```
jobs:
  - name: <string>								#required
    type: release								#required
    steps:
      - IN: <version>							#required
        switch: on/off							#optional
      - IN: <manifest>							#required
        switch: on/off							#optional
      - IN: <manifest>							#optional
        switch: on/off							#optional
      - TASK:	managed							 #required
        bump: minor								#optional
```

* `name` should be an easy to remember text string. This will appear in the visualization of this job in the SPOG.
* `type` is always set to release
* A `version` resource is a required input, unless the manifests that are included in the release were versioned by another release job upstream in the pipeline. `version` seeds your release with a starting version number. Each time the release job runs, it will bump up the version number based on how the `bump` tag is configured. Read more on [version resources here](resource-version/).
	* `switch` provides a way to specify whether you want the release job to trigger automatically when the `version` resource changes. By default, the value is `on` but you can set it to off here to make sure the release and subsequent workflow will need to be triggered manually. This is a way to provide a manual approval gate in your pipeline.
* You can provide any number of `manifest` jobs as inputs, but you must provide at least one.  This specifies the service(s) that are being versioned. Read more on [manifest jobs here](job-manifest/).
 	* `switch` provides a way to specify whether you want the release job to trigger automatically when the `manifest` job finishes running. By default, the value is `on` but you can set it to off here to make sure the release and subsequent workflow will need to be triggered manually. This is a way to provide a manual approval gate in your pipeline.
* `bump` is an optional input with default value `minor` and can be set to `major`, `minor`, `patch`, `alpha`, `beta` or `rc`. This specifies how the release version should be incremented each time this job runs and a new release is created. We follow <a href="http://semver.org/">semver rules</a> for supported bump values. The release version number is applied to all manifests in the release.

As an example, if the seed version is 4.0.0, here is how we would increment version based on `bump` value:

| **bump value** 	| **incremented version** 	|
|------------	|---------------------	|
| major      	| 5.0.0               	|
| minor      	| 4.1.0               	|
| patch      	| 4.0.1               	|
| alpha      	| 4.0.0-alpha         	|
| beta       	| 4.0.0-beta          	|
| rc         	| 4.0.0-rc            	|
|				|						|

If you want to reset the seed version and start over, you can update the `version` resource and release version numbers will be reseeded.

The `trigger` input is optional and gives you a way to manually create releases.
Read more [on triggers here](shippable-triggers-yml/)

## Deploy release
If your release job has one or more deploy jobs as inputs and does not have input manifest jobs, it is called a deploy release. These releases are created from an application or service that ia already deployed to an environment. The typical use case for this is an application running in a Test environment, which can be promoted to production by creating a release which then triggers production deployment.

<img src="../../images/reference/jobs/release/deployRelease.png" alt="A release can be created from a deployed application from service" style="width:600px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

When a release job is configured to run after a deploy job(s), the versioning will apply to all the manifests that were inputs to the deploy job(s).

A deploy release is configured in `shippable.jobs.yml` as shown below:

```
jobs:
  - name: <string>							#required
    type: release								#required
    steps:
      - IN: <version>							#optional
        switch: on/off						#optional
      - IN: <deploy>							#required
        switch: on/off						#optional
      - IN: <deploy>							#optional
        switch: on/off						#optional
      - TASK:	managed							#required
        bump: beta							#optional
```

* `name` should be an easy to remember text string. This will appear in the visualization of this job in the SPOG view and in the list of jobs in the Pipelines `Jobs` tab.

* `type` is always set to release

* A `version` resource is a required input, unless the manifests that are included in the release were versioned by another release job upstream in the pipeline. `version` seeds your release with a starting version number. Each time the release job runs, it will bump up the version number based on how the `bump` tag is configured. Read more on [version resources here](resource-version/).
	- `switch` provides a way to specify whether you want the release job to trigger automatically when the `version` resource changes. By default, the value is `on` but you can set it to off here to make sure the release and subsequent workflow will need to be triggered manually. This is a way to provide a manual approval gate in your pipeline.
	- In situations where manifests that are included in the release were versioned by another release job upstream in the pipeline, `version` is not required as an input. You can still include it to override any existing versions of incoming manifests.

* You can provide any number of `deploy` jobs as inputs, but you must provide at least one.  This specifies the service(s) that are being versioned.
 	- `switch` provides a way to specify whether you want the release job to trigger automatically when the `deploy` job finishes running. By default, the value is `on` but you can set it to off here to make sure the release and subsequent workflow will need to be triggered manually. This is a way to provide a manual approval gate in your pipeline.

* `bump` is an optional input with default value `minor` and can be set to `major`, `minor`, `patch`, `alpha`, `beta` or `rc`. This specifies how the release version should be incremented each time this job runs and a new release is created. We follow <a href="http://semver.org/" target="_blank">semver rules</a> for supported bump values. The release version number is applied to all manifests in the release.

As an example, if the seed version is 4.0.0, here is how we would increment version based on `bump` value:

| **bump value** 	| **incremented version** 	|
|------------	|---------------------	|
| major      	| 5.0.0               	|
| minor      	| 4.1.0               	|
| patch      	| 4.0.1               	|
| alpha      	| 4.0.0-alpha         	|
| beta       	| 4.0.0-beta          	|
| rc         	| 4.0.0-rc            	|
|				|						|

If you want to reset the seed version and start over, you can update the `version` resource and release version numbers will be reseeded.

The `trigger` input is optional and gives you a way to manually create releases.
Read more [on triggers here](shippable-triggers-yml/).


## Combination release
You can also include `manifest` and `deploy` jobs as inputs to the same `release` job.This is called a combination release. All descriptions of fields above will still apply to this type of release.
