page_description: Configuring Kubernetes cluster to pull from private Docker registries
main_section: Deploy
sub_section: Kubernetes

# Accessing private Docker images from Kubernetes

Most organizations store proprietary Docker images in private Docker registries. This tutorial talks about how to configure a Kubernetes cluster to access those private images.

The tutorial assumes that you have working knowledge of Docker and Kubernetes and understand the following concepts:

* [Docker Getting Started](https://docs.docker.com/v17.09/get-started/part1/)
* [Docker Registry](https://docs.docker.com/registry/)
* [Kubernetes Intro](https://kubernetes.io/docs/user-journeys/users/application-developer/foundational/)
* [kubectl command](https://kubernetes.io/docs/reference/kubectl/overview/)
* [ImagePullSecrets](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod)

## Step by Step instructions
In this tutorial, we will use ImagePullSecrets which is a type of secret that allows you to pull from private Docker registries.

### Connect to your cluster using kubectl
Make sure you are authenticated to your cluster with kubectl. For a self hosted Kubernetes, follow these [instructions](/deploy/tutorial/create-kubeconfig-for-self-hosted-kubernetes-cluster).

### Create an ImagePullSecret
We will leverage `kubectl create secret` command to create a `docker-registry` secret. Run this command to create a secret named `myRegSecret` on the cluster

```
kubectl create secret docker-registry myRegSecret --docker-username="<username>" --docker-password="<password>" --docker-server="<server url>" --docker-email="<some email address"
```
Replace username, password, url and email to match your account

### Using imagePullSecrets in a Deploy Spec
In your application deployment spec, add the following section to pull from your private registry

```
imagePullSecrets:
  - name: myRegSecret
```
**sample deployment spec**

```
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  namespace: default
  name: ${APP_LABEL}
spec:
  replicas: 1
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  minReadySeconds: 5
  template:
    metadata:
      labels:
        app: ${APP_LABEL}
    spec:
      imagePullSecrets:
        - name: myRegSecret
      containers:
        - name: ${APP_LABEL}
          image: ${APP_IMG}:${APP_TAG}
          ports:
          - containerPort: 80
          resources:
            requests:
              cpu: 250m
            limits:
              cpu: 500m
```
Make sure you replace the wildcards `${APP_LABEL}`, `${APP_IMG}` and `${APP_TAG}` in the file with information that applies to your scenario.


## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
