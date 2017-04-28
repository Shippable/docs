main_section: Validate
sub_section: Running performance tests

# Running Performance tests using Nouvola

Once you have deployed your application to your staging / pre-production environment, you might want to run 
performance tests on your application using a third party tool. 

**Nouvola** is a popular third party service that allows you to define your API performance tests. You can 
run test plans authored in Nouvola, after your application has been deployed from Shippable. This 
tutorial helps you to create a CI project for the above.

## Prerequisites

1. This tutorial executes a test plan on a NodeJS application, whose deployment is covered in 
[this](../deploy/amazon-ecs.md) document. The test plan is a simple application availability test that loads
the landing page of the app, using 2 virtual concurrent users.

2. Define your test plan in Nouvola and note the Plan ID.
![test plan](https://github.com/devops-recipes/test-api-nouvola/raw/master/nouvola-test-plan.png)
 
## Specify the Nouvola API key and test plan id in your Shippable.yml file.

1. Find your Nouvola API key using this [document](http://blog.nouvola.com/divecloud-api-now-available).
2. Create a secure environment variable by going to your Subscription settings -> Encrypt.
![Secure API env key](https://github.com/devops-recipes/test-api-nouvola/raw/master/encrypt-nouvola-key.png)
3. Copy the secure key to the clipboard by clicking on Copy.
4. Specify the secure key and plan id in your Shippable.yml file.
```
env:
  global:
    - NOUVOLA_PLAN_ID=4609
    # NOUVOLA_API_KEY env variable encrypted
    - secure: QbUdwdZzHSnFlKPxcsjJMp/qyICw4DPa2+VkqG9G42rYGCIAbecTVdIC933mljlJ1Z+OKhxk2zEevrczi7FxqLR+ts16AtvXHgRgwdmLLWmxX3trjfXDSWXOE5+GNHYmaZOQLm8qQjouogP8Kkx8njYj9Uut4ONaNZUsHvVroVSyfwiPktyKjQP8iEIzaV/Jb1wWwLHsDf1n4GaCcbm1VuloxoNuJkG5VftcnMqULWyN9YeZTxQ43PiflTWFqBHV9hPpbVU+N5Jt1kGfhBlj6FdiIiB69KrXXd/ooBwz7UuuNgPyXEjZtUC0tp0CzZlovnNPBdrMRiZ/yE1ZgbuDbQ==
```
5. You can find the Plan ID in the test plan page, in parenthesis (xxx), next to the test Name in the Nouvola
dashboard.

## Call the Nouvola API to execute your test plan in the build/ci section of Shippable.yml file.
```
    # Install JQ for parsing JSON response from Nouvola API
    - sudo apt-get update
    - sudo apt-get install jq
    # Get test_id from Nouvola
    - 'TEST_ID=$(curl -X POST -H Content-Type:application/json -H "x-api:$NOUVOLA_API_KEY" https://divecloud.nouvola.com/api/v1/plans/$NOUVOLA_PLAN_ID/run --silent | jq -r ".test_id")'
```

## Poll the API until the test completes.
```
- echo $TEST_ID
    - TEST_STATUS=""
    - >
        while [[ "$TEST_STATUS" != "Emailed" ]]; do
          TEST_STATUS=$(curl -X GET -H "Content-Type:application/json" -H "x-api:$NOUVOLA_API_KEY" https://divecloud.nouvola.com/api/v1/test_instances/$TEST_ID --silent | jq -r ".status")
          echo "Status of the test run is "$TEST_STATUS
          echo "Waiting for 10 seconds"
          sleep 10
        done
```

When you build your project, you will see something like this in your console -
![console view](https://github.com/devops-recipes/test-api-nouvola/raw/master/build-console-view.png)
The build will complete when status transitions from Waiting->Starting->Working->Analyzing->Emailed.

## Connecting the CI project to your deploy job in the pipeline

If you have created a pipeline with a deploy job and want to run these tests after your deploy job completes, there is 
a simple way to connect your CI project to your deploy job. We will connect the deploy job specified in 
[ECS deploy](../deploy/amazon-ecs.md) to this CI project using an OUT directive on the deploy job.

```
  - name: deploy-ecs-basic-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-basic-manifest
      - IN: deploy-ecs-basic-ecs-cluster
      - OUT: test-api-nouvola_runCI
```
Here **test-api-nouvola** is the sample project that implements this scenario, which you will replace with your
repository name.

## Sample project

We have a working sample for the scenario described here. Instructions to run this sample are in the README.md file.

We invite you to explore the full sample in this [GitHub account](https://github.com/devops-recipes/test-api-nouvola).
