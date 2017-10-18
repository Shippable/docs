page_main_title: GKE tutorials: Deploying Docker applications to Google Cloud Platform
main_section: Getting started
sub_section: Quickstarts

# Google Container Engine (GKE) tutorials: Deploying Docker applications

The [Shippable DevOps Assembly Line Platform](/platform/overview/) supports end-to-end deployment pipelines for GKE, including CI, functional testing, release orchestration, and infrastructure provisioning.

## Step-by-step tutorials

###CI

* [Building a Docker image](/ci/build-docker-images/)
* [Pushing a Docker image to GCR](/ci/push-gcr/)

###Deploy

* [Deploying a Single Container application to GKE](/deploy/gke/)
* [Deploying Multiple Containers to GKE](/deploy/continuous-delivery-multi-container-docker-application/)
* [Scaling your application on GKE](/deploy/gke/#scaling-app-instances)
* [Customizing container options](/deploy/gke/#customizing-container-options)
* [Supported deployment methods](/deploy/deployment-methods-overview/)
* [Using a load balancer with your GKE deployments](/deploy/lb-gke/)
* [Rolling back GKE deployments](/deploy/rollback/)

###Release orchestration

* [Multi-stage deployments](/deploy/multi-stage-deployments/)
* [Gated deployments](/deploy/gated-deployments/)
* [Semantic versioning for releases](/release/single-component/)

## Sample application

* [devops-recipes/deploy-gke-basic](https://github.com/devops-recipes/deploy-gke-basic)

## Reference

* [GKE docs](https://cloud.google.com/container-engine/docs/)
* [Shippable CI YML structure](/ci/yml-structure/)
* [Shippable Workflow Docs](/platform/workflow/overview/)
