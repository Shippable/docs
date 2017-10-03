page_main_title: GKE Basic scenario
main_section: Deploy
sub_section: GKE

# Deploying to Google Container Engine (GKE) using gcloud CLI

If managed jobs don't work for your scenario, Shippable also gives you the ability to fully customize exactly how you want your deployments to behave.  By using an unmanaged job type, you have full control over the commands and options passed in to GKE via gcloud and kubctl utilities.

### Basic Configuration

First, you'll want to create a resource that helps configure the gcloud and kbuectl tools with your integration.

```
resources:
  - name: MyGkeConfig
    type: cliConfig
    integration: MyGKECredentials
```
For more details on the `cliConfig` resource, [see here](../platform/workflow/resource/cliconfig). Now you'll need a particular job that can utilize that resource

```
jobs:
  - name: myCustomDeployment
    type: runCLI
    steps:
      - IN: MyGkeConfig
      - TASK:
        - script: kubectl get namespaces
```
For now, we'll just add a simple command to list our namespaces.


In your job's logs, you should see the results of the `get namespaces` command.

Next, we'll include a gitRepo that contains a static pod spec json object, which we update any time we want to deploy a new image version.  To add this resource, you'll need a subscription integration for your github credentials.
```
resources:
  - name: MyPodSpecRepo
    type: gitRepo
    integration: MyGithubIntegration
    pointer:
      sourceName: shippablesamples/podTemplates
      branch: master

```

Now your pipeline should look something like this:
<img src="../../images/deploy/gke/basic-deployment-unmanaged.png" alt="Alternate Pipeline">

Now, update the job to use this gitRepo as an `IN`, and add some extra commands to create the replicationController on the cluster.

- list the namespaces
- use kubectl to create the controller
- describe the RCs in the namespace

```
jobs:
  - name: myCustomDeployment
    type: runCLI
    steps:
      - IN: MyAwsConfig
      - IN: MyPodSpecRepo
      - TASK:
        - script: kubectl get namespaces
        - script: kubectl create -f ${MYPODSPECREPO}/templates/sample.yaml --namespace=shippable
        - script: kubectl describe replicationControllers --namespace=shippable

```

Inside the 'templates' directory in my `gitRepo`, I have a file called `sample.yaml` that contains this task definition:

```
apiVersion: v1
kind: ReplicationController
metadata:
  name: sample-app
spec:
  replicas: 2
  selector:
    app: sample
  template:
    metadata:
      name: sample-app
      labels:
        app: sample
    spec:
      containers:
      - name: node-app
        image: gcr.io/sample-gke/basic-node-deploy-gke
        ports:
        - containerPort: 80

```

The `runCLI` job will automatically configure kubectl based on the json key associated with your GKE integration.  This means that you don't have to do any setup yourself. Your script can be focused on the actions you want to take.  In this case, we are creating a new replication controller in the `shippable` namespace to run our sample app and expose it on port 80.
