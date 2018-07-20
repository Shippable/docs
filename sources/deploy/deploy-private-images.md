page_main_title: Deploying private Docker images to Kubernetes or similar platforms
page_description: Deploying private Docker images to Kubernetes or similar platforms
main_section: CD
sub_section: Shippable managed deployments

# Deploying private Docker images

Our basic [managed jobs tutorial](/deploy/continuous-delivery-single-container-docker-application/) shows how you can deploy a Docker container to a supported Orchestration platform like Kubernetes, Amazon ECS, or GKE.

If you're deploying a private image, your cluster needs to be authenticated against your private registry in order for the deployment to be successful. This is achieved outside of Shippable when you set up the cluster. This document explains how you can set up your cluster to authenticate against your private registry.

## Authenticating private images for Amazon ECS

When you create a cluster on Amazon ECS, you need to authenticate it against your private Docker registry by following the steps in this document: [Private registry authentication](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/private-auth.html)


## Authenticating private images for Kubernetes

The Kubernetes documentation provides a pretty comprehensive explanation of how to authenticate against a private registry: [Pull an image from private registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).

## Authenticating private images for GKE

The steps for authenticating your GKE cluster against a private registry are the same as mentioned in the Kubernetes docs: [Pull an image from private registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).
