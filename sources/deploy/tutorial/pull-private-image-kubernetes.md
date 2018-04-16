page_main_title: Pulling an image from a private docker registry on a Kubernetes pod
main_section: Tutorial
sub_section: Kubernetes
sub_sub_section: kubectl
page_title: Pulling an image from a private docker registry on a Kubernetes pod
page_description: How to pull an image from a private docker registry on a Kubernetes pod
page_keywords: Kubernetes, kubectl, image pull secret, private docker registry

# Pulling an image from a private docker registry on a Kubernetes pod

Docker images that comprise a production application are often deployed to private repositories in Docker registries. Kubernetes provides a feature called `imagePullSecrets` that allows pods to pull private docker images.

## Creating an imagePullSecrets secret

`imagePullSecrets` is a type of a Kubernete Secret which allows you to pull private images from a Docker registry. To create the secret, you need to specify the Url of the docker registry, credentials for logging in and the image name of your private docker image.

The syntax of the kubectl command is: `kubectl create secret docker-registry <secret name> --docker-username="<username>" --docker-password="<password>" --docker-email="<email address" --docker-server="<server url>"`. For more information, look [here](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-em-secret-docker-registry-em-).

For example, to create a secret for pulling an image from a JFrog docker registry, you would do:

`kubectl create secret docker-registry private-registry-key --docker-username="admin" --docker-password="xxxxxxx" --docker-email="yourname@domain.com" --docker-server="https://<repository-key>.jfrog.io"`

## Using an imagePullSecrets secret in a Deploy spec

Add an `imagePullSecrets` section to your Deploy spec as indicated below.

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
        - name: private-registry-key
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
