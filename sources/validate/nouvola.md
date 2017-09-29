page_main_title: Nouvola
main_section: Validate
sub_section: Running performance tests

# Running Performance tests using Nouvola

Once you have deployed your application to your staging / pre-production environment, you might want to run
performance tests on your application using a third party tool.

[**Nouvola**](http://www.nouvola.com/) is a popular third-party service that offers real-world performance & load testing for web, mobile, API and IoT apps so developers, DevOps and engineering managers can release better code faster

You can automatically trigger your test suite authored in Nouvola, after your application has been deployed using Shippable. This tutorial demonstrates how to run Nouvola test plans using [runSH](/platform/workflow/job/runsh/) jobs on a service you have already deployed.

## Prerequisites

1. This tutorial executes a test plan on a NodeJS application, whose deployment is covered in
[this](/deploy/cd_of_single_container_applications_to_orchestration_platforms/) document. The test plan is a simple application availability test that loads
the landing page of the app, using 2 virtual concurrent users.

2. Define your test plan in Nouvola and note the Plan ID.
![test plan](https://github.com/devops-recipes/test-api-nouvola/raw/master/nouvola-test-plan.png)

## Specify the Nouvola API key and test plan id in your shippable.resources.yml file.

1. Find your Nouvola API key using this [document](http://blog.nouvola.com/divecloud-api-now-available).
2. Create a secure environment variable by going to your Subscription settings -> Encrypt.
![Secure API env key](https://github.com/devops-recipes/test-api-nouvola/raw/master/encrypt-nouvola-key.png)
3. Copy the secure key to the clipboard by clicking on Copy.
4. Specify the secure key and plan id in your shippable.resources.yml file.
```
resources:

  - name: api
    type: params
    flags:
      - test-api-nouvola
    version:
      params:
        NOUVOLA_PLAN_ID: "4609"
        #secure NOUVOLA_API_KEY environment variable
        secure: QbUdwdZzHSnFlKPxcsjJMp/qyICw4DPa2+VkqG9G42rYGCIAbecTVdIC933mljlJ1Z+OKhxk2zEevrczi7FxqLR+ts16AtvXHgRgwdmLLWmxX3trjfXDSWXOE5+GNHYmaZOQLm8qQjouogP8Kkx8njYj9Uut4ONaNZUsHvVroVSyfwiPktyKjQP8iEIzaV/Jb1wWwLHsDf1n4GaCcbm1VuloxoNuJkG5VftcnMqULWyN9YeZTxQ43PiflTWFqBHV9hPpbVU+N5Jt1kGfhBlj6FdiIiB69KrXXd/ooBwz7UuuNgPyXEjZtUC0tp0CzZlovnNPBdrMRiZ/yE1ZgbuDbQ==
```
5. You can find the Plan ID in the test plan page, in parenthesis (xxx), next to the test Name in the Nouvola dashboard.
6. We are going to call a script that executes Nouvola API calls in our runSH job. In order to do so, we need to also specify our repository as a resource in the shippable.resources.yml file.

```
# GitHub repo holding scripts to be used in runsh pipeline job
- name: github-repo
  type: gitRepo
  integration: dr-github # replace with your GitHub integration name
  pointer:
    sourceName: devops-recipes/test-api-nouvola # replace with source code location (e.g. GitHub) where you cloned this sample project
    branch: master
  flags:
    - test-api-nouvola
```

## Call the Nouvola API to execute your test plan in shippable.jobs.yml file.
```
jobs:

# jobs for the Nouvola sample application

################################

# add pipeline job
# Run API tests on Nouvola cloud
  - name: test-api-nouvola-run-tests
    type: runSh
    steps:
      - IN: api
      - IN: github-repo
        switch: off
      - TASK:
        #key value pairs declared in PARAMS resources are exported as
        #${RESOURCE NAME}_PARAMS_{KEY}
        - script: echo "API KEY "$API_PARAMS_NOUVOLA_API_KEY
        - script: echo "PLAN ID "$API_PARAMS_NOUVOLA_PLAN_ID
        - script: . $GITHUBREPO_PATH/gitRepo/run-nouvola-tests.sh
    flags:
      - test-api-nouvola
```

The run-nouvola-tests.sh script, which you can find in the sample below, performs
API calls on Nouvola to queue and poll the test plan execution. It uses the
environment variables from the params resources.

After you add your repository to the pipeline and run the test-api-nouvola-run-tests job,
you will see something like this in your console -


![console-view](https://github.com/devops-recipes/test-api-nouvola/raw/master/runshjob-console-view.png)


The build will complete when status transitions from Waiting->Starting->Working->Analyzing->Emailed.

## Connecting the runSH job to your deploy job in the pipeline

If you have created a pipeline with a deploy job and want to run these tests after your deploy job completes, there is a simple way to connect your runSH job to your deploy job. We will connect the deploy job specified in[ECS deploy](/deploy/cd_of_single_container_applications_to_orchestration_platforms/) using an OUT directive.

```
  - name: deploy-ecs-basic-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-basic-manifest
      - IN: deploy-ecs-basic-ecs-cluster
      - OUT: test-api-nouvola-run-tests
```

## Sample project

We have a working sample for the scenario described here. Instructions to run this sample are in the README.md file.

We invite you to explore the full sample in this [GitHub repository](https://github.com/devops-recipes/test-api-nouvola) and clone it to test drive it.
