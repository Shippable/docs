page_main_title: What is release management?
main_section: CD
sub_section: Shippable managed deployments
sub_sub_section: Advanced topics
page_title: Automating release management in Shippable
page_description: How to automate release management in Shippable

# Managing releases with semantic versioning

Shippable can help you semantically version your manifests before they are deployed to an environment. This functionality is available through the `release` job, which can be used with `manifest` and `deploy` jobs in a CD workflow. Using this combination of managed jobs, you can keep track of what is included in each release.

Consider the following scenario:

- Your application is deployed to the Test environment and passes all checks.
- A new release candidate (RC) is created automatically and the semantic version number is incremented.
- Your Ops team is notified about the new release creation through a Slack channel. Additionally, your Dev or Product Manager can also be notified.
- Everyone on the team can see the features included in this release candidate.
- Your Ops team or product manager can decide when to trigger a manual deployment to production.

<img src="/images/release/release-workflow.png" alt="Release management">

In a broader end-to-end context, the `release` job is usually an `IN` for a [deploy job](/platform/workflow/job/deploy/) as shown below. However, the release job can be connected at any point in the workflow depending on your scenario.

<img src="/images/release/release-job-context.png" alt="Triggering deployments" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

## Setting initial version

-  Create a `version` resource in the **shippable.yml** file. Specify your initial version in the versionName field.

```
resources:
  # Version resource
  - name: release-version
    type: version
    seed:
      versionName: "1.0.0"
```

A complete reference for the `version` resource is available [here](/platform/workflow/resource/version).

- Create a `release` job in your **shippable.yml**. Specify the `version` resource and your `manifest` or `deploy` jobs as `IN`. In this example
 we provide a `manifest` and `version` as inputs.

```
jobs:
  #Manifest job  
  - name: java-img-manifest
    type: manifest
    steps:
      - IN: ecr-img
      - IN: ecr-img-opts

  #Release job    
  - name: release-job
    type: release
    steps:
      - IN: java-img-manifest
      - IN: release-version
```

- Running the `release` job will set the current version to `1.1.0`, incrementing the minor version. To increment other components of the version, such as major or patch, please see the section on incrementing version numbers.

## Incrementing versions

There are several ways of incrementing versions each time the release job executes. This is done by setting the `bump` tag in the `release` job to one of the supported types, namely `major`, `minor`, `alpha`, `beta`, and`rc`. By default, the platform assumes `minor` if nothing is specified in the config.

Your config will look something like this:

```
jobs:
  # Release job    
  - name: release-job
    type: release
    bump: major | minor | patch | alpha | beta | rc   # set version increment type
    steps:
      - IN: java-img-manifest
      - IN: release-version
```

Assuming you started with an initial version **1.0.0**, running the release job will give you the following results depending on what `bump` is set to:

* `major`: First run will set it to **2.0.0**, subsequent runs increment the first number (3.0.0, 4.0.0, etc)
* `minor`: First run will set it to **1.1.0**, subsequent runs increment the second number (1.2.0, 1.3.0, etc)
* `patch`: First run will set it to **1.0.1**, subsequent runs increment the third number (1.0.2, 1.0.3, etc)
* `alpha`: First run will set it to **1.0.0-alpha**, subsequent runs append a number (1.0.0-alpha.1, 1.0.0-alpha.2, etc)
* `beta`: First run will set it to **1.0.0-beta**, subsequent runs append a number (1.0.0-beta.1, 1.0.0-beta.2, etc)
* `rc`: First run will set it to **1.0.0-rc**, subsequent runs append a number (1.0.0-rc.1, 1.0.0-rc.2, etc)
