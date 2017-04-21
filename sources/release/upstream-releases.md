main_section: Release
sub_section: Creating a release

# Creating a release from upstream release jobs

This tutorial demonstrates how to version every stage of deployment, as your code moves across different environments, 
in a staged manner. 

In this tutorial, you will learn how to specify the output of one release job as input to another release job. 
This passes the version state from one release job to another, while allowing each release job to bump the 
specific component of the version it so desires. For example, before deploying to the beta deployment, a release job
increments the beta tag, while after deploying to beta, another release job increments the rc tag, with both jobs 
retaining the same major/minor/patch version number.

##Setup
The basic setup needs a manifest job for each component that has to be versioned in the shippable.resources.yml file.

This tutorial uses docker images built by -
- <i class="ion-ios-minus-empty"></i>[Node tutorial](https://github.com/devops-recipes/release-single-component) 
that builds a node docker image and pushes the image to Docker hub.
- <i class="ion-ios-minus-empty"></i>[Java tutorial](https://github.com/devops-recipes/ci-java-push-ecr) 
that builds a java war docker image and pushes the image to EC2 Container Registry.

## Basic Config

- Once you have completed the Setup, add a version resource that will be used as an input to the upstream Release job 
in the shippable.resources.yml file. This resource specifies the version seed, that will flow throughout the pipeline.
```
  - name: upstream-release-version
    type: version
    seed:
      versionName: "1.0.0"
    flags:
      - release-from-upstream-release-jobs
```

- Next add the upstream Release job to shippable.jobs.yml file of **type release**. This job takes as input two docker
images that we want to version before deployment to the ECS cluster.
```
  #Manifest job
  - name: release-from-upstream-release-node-img-manifest-job
    type: manifest
    steps:
      - IN: node-img
      - IN: node-img-opts
      - TASK: managed
    flags:
      - release-from-upstream-release-jobs
      
  #Manifest job
  - name: release-from-upstream-release-java-img-manifest-job
    type: manifest
    steps:
      - IN: java-img
      - IN: java-img-opts
      - TASK: managed
    flags:
      - release-from-upstream-release-jobs

  #Release job
  - name: release-from-upstream-release-upstream-release-job
    type: release
    steps:
      - IN: release-from-upstream-release-node-img-manifest-job
      - IN: release-from-upstream-release-java-img-manifest-job
      - IN: upstream-release-version
      - TASK: managed
        bump: beta
    flags:
      - release-from-upstream-release-jobs
```

When this release job runs, it increments the beta version and set the version to 1.1.0-beta.

**Release job screenshot**![Release job screenshot](https://github.com/devops-recipes/release-from-upstream-release-jobs/blob/master/public/resources/images/beta-release-version.png)

- Next add the downstream Release job to shippable.jobs.yml file of **type release**. This job takes as input the deploy
job. It does **not** have its own version resource, since the upstream release job is specified as input to the deploy job.
This results in the version of the upstream release job being fed as input to itself.
```
    - name: release-from-upstream-release-deploy-ecs-job
      type: deploy
      steps:
        - IN: release-from-upstream-release-upstream-release-job
        - IN: release-from-upstream-release-ecs-cluster
        - TASK: managed
      flags:
        - release-from-upstream-release-jobs
  
    - name: release-from-upstream-release-downstream-release-job
      type: release
      steps:
        - IN: release-from-upstream-release-deploy-ecs-job
        - TASK: managed
          bump: rc
      flags:
        - release-from-upstream-release-jobs
```

When this release job runs, it increments the rc version and set the version to 1.1.0-rc.

**Release job screenshot**![Release job screenshot](https://github.com/devops-recipes/release-from-upstream-release-jobs/blob/master/public/resources/images/release-job-view.png)

## Sample project

Here are some links to a working sample of this scenario.

**Source code:**  [devops-recipes/release-from-upstream-release-jobs](https://github.com/devops-recipes/release-from-upstream-release-jobs).

**Pipeline screenshot link:** [Pipeline screenshot](https://github.com/devops-recipes/release-from-upstream-release-jobs/blob/master/public/resources/images/pipeline-view.png)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
