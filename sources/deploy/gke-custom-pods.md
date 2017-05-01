main_section: Deploy
sub_section: GKE

# Customizing your Google Container Engine Pods

Pods are loaded with features to fit various scenarios. This page will describe how you can set up some of the more advanced sections in your Shippable pipeline.

## Setup

Make sure you have a cluster set up on Google Container Engine (GKE), then create an integration and cluster resource [as described in the setup section here](./gke)

Pods are fully customizable through the `dockerOptions` type resource, so you'll need one of those:
```
resources:

- name: deploy-gke-docker-options
  type: dockerOptions
  version:
      # add settings here

```
You can also look at the complete reference for this type of resource [here](../reference/resource-dockeroptions).

## Managed

The `dockerOptions` resource is made to be used with Shippable managed jobs including `manifest` and `deploy`.  It can be applied to an entire manifest, multiple manifests, or even a single image within a manifest.  Many of the core replicationController and pod spec options are directly modifiable through certain keywords in the dockerOptions.  Here's a table of the features we directly support.  The left column is how the option is added to the `dockerOptions` resource, and the right column is the setting that it maps to on GKE.

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
  - name: <string>
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
## Unmanaged

In an unmanaged scenario, you'll be using a runCLI job with a GKE cliConfig [as described in the unmanaged section of our basic scenario](./gke#unmanaged-deployments).

If you've completed the basic scenario, you've already done everything required to support these options.  Just update your replicationController.yaml to include any additional settings you'd like, and update your cluster via `kubectl` commands. Refer directly to the kubernetes documentation for all possible available options.
