page_main_title: release
main_section: Reference
sub_section: Jobs
page_title: Unified Pipeline Jobs - release
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Release

`release` jobs are used to create, manage, or increment semantic versions.

`release` jobs can accept manifests, deploy jobs, or other releases as input. One common scenario is this:

<img src="../../images/reference/jobs/release/releaseCommonScenario.png" alt="Common use case for release jobs" style="width:600px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

The configuration shown above will trigger a deployment each time a new release is created.

When a release job runs, it is taking a snapshot of the state of its inputs and tagging them with a particular semantic version number according to the <a href="http://semver.org/" target="\_blank">semver rules</a>.  You can include release jobs at any stage of your deployment pipeline depending on your requirements.

A release job is defined in your `shippable.jobs.yml` like this:
```
jobs:
  - name: <string>                #required
    type: release                 #required
    steps:
      - IN: <version>             #optional
        switch: on/off            #optional
      - IN: <manifest>            #optional
      - IN: <deploy>              #optional
      - IN: <release>             #optional
      - TASK: managed             #optional
        bump: minor               #optional
```

* `name` should be an easy to remember text string. This will appear in the visualization of this job in the SPOG.
* `type` is always set to release
* A `version` resource is a recommended input. It gives you a way to manually control the version being produced, if necessary.  `version` seeds your release with a starting version number. Each time the release job runs, it will bump up the version number based on how the `bump` tag is configured. Read more on [version resources here](resource-version/).
* `switch` provides a way to specify whether you want the job to trigger automatically when the IN object changes.  By default, the value is `on`.  Any `IN` statement can be customized with `switch: on/off`.  This is a way to provide a manual approval gate in your pipeline.
* You can provide any number of `manifest`, `deploy`, or `release` jobs as inputs.  These specify the service(s) that are being versioned.
* `bump` is an optional input with default value `minor` and can be set to `major`, `minor`, `patch`, `alpha`, `beta`, `rc`, or `final`.

## Bumping

`bump` is an optional modifier to the TASK section of the job yml with a default value of `minor`. This specifies how the release version should be incremented each time this job runs and a new release is created.  The release version number is applied to all manifests in the release.

As an example, if the seed version is v4.0.0, here is how we would increment version based on `bump` value:

| **bump value** 	| **incremented version** 	|
|------------	|---------------------	|
| major      	| v5.0.0               	|
| minor      	| v4.1.0               	|
| patch      	| v4.0.1               	|
| alpha      	| v4.0.0-alpha         	|
| beta       	| v4.0.0-beta          	|
| rc         	| v4.0.0-rc            	|

For `bump: final`, any pre-release flags on your incoming version will be removed, so if your input was `v4.0.0-rc.5`, the `bump: final` output version would be `v4.0.0`.

Since inputs to the release job can come from multiple sources, the execution must follow a certain set of rules to determine which number it will use as the base for its "bump" action.  Here are conditions we use to determine which release version will be the base for the job.
- The version resource's "seed" value, if it has changed or if there is no other candidate for a base value
- The higher version number (according to SemVer rules) between the previous output of the release job and an incoming upstream release

See the diagrams below for examples of bump behavior under various conditions.


## Deploying a release
Releases are made to be deployed.  You can use your release job as an input to a deploy job, and all of the manifests that were packaged into your release will be deployed.

By default, Shippable pipeline jobs will always use the latest version of the inputs when they are executed.  This means that when a deploy job runs, it will use the latest available release by default.  This is useful when you're deploying to a development or early testing environment, where you want every change to be deployed as quickly as possible.

Release versions can also be [pinned](../reference/jobs-overview/#pinning-specific-resource-versions) in a deploy job yml section, or in the UI, just like any other resource.  The release version becomes the `versionName` (Shippable always prepends it with a `v`), so if you want to make sure production only deploys a specific release, you can use a yml that looks like this:

```
- name: my-prod-deployment
  type: deploy
  steps:
    - IN: mycluster
      switch: off
    - IN: my-release
      switch: off
      versionName: v1.0.0
```

This yml will ensure that your prod deploy job never auto-deploys, and also that when it runs, it will specifically deploy `v1.0.0` of my-release, even if a later version is available.


## Examples

### Release job with incoming version resource
<img src="../../images/reference/jobs/release/SimpleDiagram.png" alt="simple release job" style="width:600px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>


### Release job with another release as input
<img src="../../images/reference/jobs/release/ReleaseReleaseDiagram.png" alt="release to release job" style="width:600px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>


That's it for the reference section on releases.  For more information, check out our [release management pages](../release/devops-release-management/)
