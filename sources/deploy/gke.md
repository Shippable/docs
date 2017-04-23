main_section: Deploy
sub_section: Deploying to Amazon ECS

# Deploying with Google Container Engine (GKE)

NOTE: [This page on kubernetes](./kubernetes) is the preferred way to deploy to a k8s cluster on Shippable. This documentation is valid but it is unlikely that any future enhancements will be made to this type of deployment.

## Setup

Shippable will use Google Cloud service account credentials to communicate with GKE on your behalf. You can add this to Shippable via [TODO Add link] Account Integrations, so that we can internally use those keys to issue commands to GKE.

- Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
- Click on **Integrations** in the left sidebar menu and then click on **Add Integration**.
- Locate **Google Container Engine** of type **deploy** in the list and click **Create Integration**.
- Give your integration a name, and provide your JSON key for your service accont
- From the dropdown, select the subscription that you'll be using to create your pipelines.
- Click **Save**

<img src="../../images/deploy/gke/create-gke-deploy-integration.png" alt="Add GKE credentials">


This key should have the appropriate permissions and roles described [TODO add reference link] here.  Now that the key is added on Shippable, we can reference it when we create pipeline yml blocks.  In this case, we want to create a `cluster` type block in our `shippable.resources.yml` file.  This must reference a cluster that has already been created on GKE.

```
resources:

  - name: deploy-gke-basic-gke-cluster
    type: cluster
    integration: dr-gke
    pointer:
      sourceName : "deploy-gke-basic" #name of the cluster to which we are deploying
```

You'll also need to create a type `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using Amazon ECR since it integrates nicely with Amazon ECS.

```
resources:

  - name: deploy-gke-basic-gke-cluster
    type: cluster
    integration: dr-gke
    pointer:
      sourceName : "deploy-gke-basic" #name of the cluster to which we are deploying

  - name: deploy-gke-basic-image
    type: image
    integration: dr-gcr
    pointer:
      sourceName: tbd
    seed:
      versionName: "latest"

```

With those two resources, you're ready to start writing jobs that will help you deploy.
