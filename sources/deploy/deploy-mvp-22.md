page_main_title: Customizing pods for a single container application deployed to Google Container Engine (GKE).
main_section: Deploy
sub_section: How To

# Customizing pods for a single container application deployed to Google Container Engine (GKE).

Pods are loaded with features to fit various scenarios. This page will describe how you can set up some of the more advanced sections in your Shippable pipeline.

##1. Building blocks

You will need to get familiar with the following platform building blocks:

**Resources**

- [cluster](/platform/workflow/resource/cluster/) resource that represents a set of machines on a container orchestration system.
- [image](/platform/workflow/resource/image/) resource that references a Docker image on a specific docker registry.
- [dockerOptions](/platform/workflow/resource/dockeroptions/) resource used to add a list of docker options that can be appended to a docker image.

**Jobs**

- [manifest](/platform/workflow/job/manifest/) which creates a versioned, immutable service definition of a deployable unit for your application.
- [deploy](/platform/workflow/job/deploy/) which deploys a [manifest](/platform/workflow/job/manifest/) to a cluster.

##2. Create account integrations
You need two account integrations for this scenario:

###GKE
Shippable will use Google Cloud service account credentials to communicate with GKE on your behalf. Get started by creating a [Google Container Engine Integration](/platform/integration/gke).

###GCR
You also need to configure an integration to GCR so that we can pull your image. Follow instructions in the [GCR integration](/platform/integration/gcr/) page.

##3. Create resources

You need the following three resources in your `shippable.resources.yml` file:

###cluster

First, we need a `cluster` resource which references a cluster that has already been created on GKE.

```
resources:

  - name: deploy_gke_cluster    # resource friendly name
    type: cluster
    integration: int_gke        # replace with integration name from step 1          
    pointer:
      sourceName: "deploy_gke"     # name of the cluster to which we are deploying
      region: "gke_cluster_region" # AWS region where cluster is located
```

For a complete reference, check out the [cluster](/platform/workflow/resource/cluster/) page.

###image

Next, we need an `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using GCR since it integrates nicely with GKE.

```
resources:

  - name: deploy_gke_image          # resource friendly name
    type: image
    integration: int_gcr                      # replace with integration name from step 1          
    pointer:
      sourceName: "gcr.io/sample_gke/deploy_gke"   # image pointer
    seed:
      versionName: "latest"     # Tag value for first deployment
```

For a complete reference, check out the [image](/platform/workflow/resource/image/) page.


###dockerOptions

Many of the core replicationController and pod spec options are directly modifiable through certain keywords in the dockerOptions.  Here's a table of the features we directly support.  The left column is how the option is added to the `dockerOptions` resource, and the right column is the setting that it maps to on GKE.

| Shippable Tag                            | GKE                |
|-------------------------------|----------------------------|
| **memory**                        | memory                     |
| **cpuShares**                     | cpu                        |
| **portMappings**                  | port                       |
| **hostName**                       | TOP LEVEL -> hostname      |
| **domainName**                    | TOP LEVEL -> subDomain     |
| **user**                          | runAsUser                  |
| **tty**                           | tty                        |
| **stdin**                         | stdin                      |
| **stdinOnce**                     | stdinOnce                  |
| **labels**                        | labels                     |
| **cmd**                           | args                       |
| **entryPoint**                    | command                    |
| **volumes**                       | volumes/volumeMounts       |
| **privileged**                    | privileged                 |
| **readOnlyRootFilesystem**        | readOnlyRootFilesystem     |
| **capAdd**                        | add                        |
| **capDrop**                       | drop                       |
| **restartPolicy**                 | TOP LEVEL -> restartPolicy |
| **workingDir**                    | workingDir                 |

If the setting that you're looking for isn't here, don't worry! We also natively support many of the provider-specific fields.  These are added to special sections of your `dockerOptions` named after the object you're trying to update.

There is one special section for GKE: `pod`. Please refer to the following yml to find the supported options.
```
resources:
  - name: deploy_gke_docker_options
    type: dockerOptions
    version:
      pod:
        terminationGracePeriodSeconds: <number>
        activeDeadlineSeconds: <number>
        dnsPolicy: <string>
        nodeSelector:
          <object>
        serviceAccountName: <string>
        serviceAccount: <string>
        nodeName: <string>
        hostNetwork: <boolean>
        hostPID: <boolean>
        imagePullSecrets:
          - <string>
```

For a complete reference, check out the [image](/platform/workflow/resource/dockeroptions/#dockeroptions) page.

##3. Define jobs

Jobs are defined in your `shippable.jobs.yml`.

You need two jobs for this scenario:

###[Manifest](/platform/workflow/job/manifest/)

We need to package the image in a way that it can easily be deployed to any endpoint.  Shippable provides users with a managed task type `manifest` that accomplishes this goal.  Define this in your `shippable.jobs.yml`.

```
jobs:

- name: deploy_gke_manifest
  type: manifest
  steps:
   - IN: deploy_gke_image             #friendly name of image created in step 2
   - IN: deploy_gke_docker_options
```

###[Deploy](/platform/workflow/job/deploy/)

Now we can take that manifest, and use it as input to a `deploy` type job.

```
jobs:
  - name: deploy_gke_deploy
    type: deploy
    steps:
      - IN: deploy_gke_manifest
      - IN: deploy_gke_cluster
```

##4. Add your pipeline

Once you have these jobs and resources yml files as described above, commit them to your repository. You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

##5. Trigger your pipeline

When you're ready for deployment, right-click on the manifest job, and select **Run Job**.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
