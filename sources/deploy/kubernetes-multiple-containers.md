main_section: Deploy
sub_section: Deploying to Amazon kubernetes

# Deploying Multiple Containers to Kubernetes
The strength of Kubernetes is in its ability to orchestrate multi-container applications across a cluster of machines. There are several ways to accomplish this on Shippable.  This page will discuss the three most common ways to use Shippable to deploy multiple containers to Kubernetes:

1. separate pipelines
2. two images, one manifest
3. multi-manifest deployment

## Setup
Make sure you have a cluster set up on Kubernetes, then create an integration and cluster resource [as described in the setup section here](./kubernetes)

We'll start with some basic pipeline building blocks: one image, one manifest, one deploy job.

`shippable.resources.yml`
```
  - name: deploy-kubernetes-multi-container-image
    type: image
    integration: dr-dockerhub    #replace with your Docker Hub integration name
    pointer:
      sourceName: "docker.io/devopsrecipes/deploy-kubernetes-multi-container"  #replace with your image name on Docker Hub
      isPull: false
    seed:
      versionName: "master.1"  #replace with your image tag on Docker Hub
    flags:
      - deploy-kubernetes-multi-container

#kubernetes cluster
  - name: deploy-mc-kube-cluster
    type: cluster
    integration: dr-kube-cluster    #replace with your Kubernetes integration name
    flags:
      - deploy-kubernetes-multi-container

```

`shippable.jobs.yml`
```
jobs:

  - name: deploy-kubernetes-multi-container-manifest
    type: manifest
    flags:
      - deploy-kubernetes-multi-container
    steps:
     - IN: deploy-kubernetes-multi-container-image

 - name: deploy-kubernetes-multi-container-deploy
   type: deploy
   flags:
     - deploy-kubernetes-multi-container
   steps:
     - IN: deploy-kubernetes-multi-container-manifest
     - IN: mc-kube-cluster

```

## Managed Deployments


### Basic Configuration

The main idea behind the basic configuration is that since the cluster resource is reusable, we can keep our workflows separate while deploying to the same endpoint.

To accomplish this, we'll simply add another image, manifest, and deploy job in parallel to the original, while keeping the cluster input the same.

Now the updated ymls should look like this:

```
resources:

  - name: deploy-kubernetes-multi-container-image
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-kubernetes-multi-container"
    seed:
      versionName: "latest"

  - name: deploy-kubernetes-multi-container-nginx
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/nginx"
    seed:
      versionName: "1.12.0"

  - name: mc-kube-cluster
    type: cluster
    integration: dr-kube-cluster
    pointer:
      sourceName : "deploy-kubernetes-basic" #name of the cluster to which we are deploying
      region: "us-east-1"

```

```
jobs:

  - name: deploy-kubernetes-multi-container-manifest-3a
    type: manifest
    steps:
     - IN: deploy-kubernetes-multi-container-image

  - name: deploy-kubernetes-multi-container-manifest-3b
    type: manifest
    steps:
      - IN: deploy-kubernetes-multi-container-nginx

  - name: dkmc-deploy-3a
    type: deploy
    steps:
      - IN: deploy-kubernetes-multi-container-manifest-3a
      - IN: mc-kube-cluster

  - name: dkmc-deploy-3b
    type: deploy
    steps:
      - IN: deploy-kubernetes-multi-container-manifest-3b
      - IN: mc-kube-cluster
```

Once you push these changes, your pipeline should look like this:

![deploy3a3b-pipeline-view](https://github.com/devops-recipes/deploy-kubernetes-multi-container/blob/master/public/resources/images/deploy3a3b-pipeline-view.png")

```
Deployment data using kubectl

ambarishs-MacBook-Pro:deploy-kubernetes-multi-container ambarish$ kubectl get deployment
NAME                                                  DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
dkmc-deploy-1-b3a9ddbc-e90c-434f-9fd8-750deba156b4    1         1         1            1           34m
dkmc-deploy-2-054577fd-81b4-4914-a62b-a38c8e469ea7    1         1         1            1           33m
dkmc-deploy-2-7868301e-bf87-443f-ab6c-d20c8c6541c1    1         1         1            1           33m
dkmc-deploy-3a-775ea3cb-7896-4eff-91e9-c4d531d6f9c3   1         1         1            1           37m
dkmc-deploy-3b-03294818-3c6f-4733-b4cc-7a37d442516a   1         1         1            1           38m
dkmc-deploy-3b-40f58d6a-1312-4c21-b2dc-03fe6ec58f97   1         1         1            1           22h
ambarishs-MacBook-Pro:deploy-kubernetes-multi-container ambarish$ kubectl describe deployment dkmc-deploy-3b-03294818-3c6f-4733-b4cc-7a37d442516a
Name:			dkmc-deploy-3b-03294818-3c6f-4733-b4cc-7a37d442516a
Namespace:		default
CreationTimestamp:	Mon, 24 Apr 2017 19:49:24 -0700
Labels:			shippable.deploymentName=dkmc-deploy-3b-03294818-3c6f-4733-b4cc-7a37d442516a
			shippable.jobName=dkmc-deploy-3b
Annotations:		deployment.kubernetes.io/revision=1
			kubectl.kubernetes.io/last-applied-configuration={"kind":"Deployment","apiVersion":"extensions/v1beta1","metadata":{"name":"dkmc-deploy-3b-03294818-3c6f-4733-b4cc-7a37d442516a","namespace":"default","...
Selector:		shippable.deploymentName=dkmc-deploy-3b-03294818-3c6f-4733-b4cc-7a37d442516a,shippable.jobName=dkmc-deploy-3b
Replicas:		1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:		RollingUpdate
MinReadySeconds:	0
RollingUpdateStrategy:	1 max unavailable, 1 max surge
Pod Template:
  Labels:	shippable.deploymentName=dkmc-deploy-3b-03294818-3c6f-4733-b4cc-7a37d442516a
		shippable.jobName=dkmc-deploy-3b
  Containers:
   deploy-kubernetes-multi-container-manifest-3b-0:
    Image:	679404489841.dkr.ecr.us-east-1.amazonaws.com/nginx:1.12.0
    Port:	
    Limits:
      memory:		400Mi
    Environment:	<none>
    Mounts:		<none>
  Volumes:		<none>
OldReplicaSets:		<none>
NewReplicaSet:		<none>
Events:
  FirstSeen	LastSeen	Count	From			SubObjectPath	Type		Reason			Message
  ---------	--------	-----	----			-------------	--------	------			-------
  38m		38m		1	deployment-controller			Normal		ScalingReplicaSet	Scaled up replica set dkmc-deploy-3b-03294818-3c6f-4733-b4cc-7a37d442516a-4089932028 to 1
```

### Advanced Configuration: two images in one manifest

When two containers depend on each other, it might make more sense to combine them into the same manifest.

Shippable natively supports this, and it's quite simple to implement.  In your manifest job, just include both images as separate IN statements like this:

```
jobs:

  - name: deploy-kubernetes-multi-container-manifest-1
    type: manifest
    steps:
     - IN: deploy-kubernetes-multi-container-image
     - IN: deploy-kubernetes-multi-container-nginx

  - name: dkmc-deploy-1
    type: deploy
    steps:
      - IN: deploy-kubernetes-multi-container-manifest-1
      - IN: mc-kube-cluster

```

This will result in a single service being created or updated with a single task definition that contains two container definitions.  The pipeline should look like this:

![deploy1-pipeline-view](https://github.com/devops-recipes/deploy-kubernetes-multi-container/blob/master/public/resources/images/deploy1-pipeline-view.png")

```
Deployment data using kubectl

ambarishs-MacBook-Pro:deploy-kubernetes-multi-container ambarish$ kubectl get deployment
NAME                                                  DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
dkmc-deploy-1-b3a9ddbc-e90c-434f-9fd8-750deba156b4    1         1         1            1           27m
dkmc-deploy-2-054577fd-81b4-4914-a62b-a38c8e469ea7    1         1         1            1           26m
dkmc-deploy-2-7868301e-bf87-443f-ab6c-d20c8c6541c1    1         1         1            1           26m
dkmc-deploy-3a-775ea3cb-7896-4eff-91e9-c4d531d6f9c3   1         1         1            1           30m
dkmc-deploy-3b-03294818-3c6f-4733-b4cc-7a37d442516a   1         1         1            1           30m
dkmc-deploy-3b-40f58d6a-1312-4c21-b2dc-03fe6ec58f97   1         1         1            1           22h
ambarishs-MacBook-Pro:deploy-kubernetes-multi-container ambarish$ kubectl describe deployment dkmc-deploy-1-b3a9ddbc-e90c-434f-9fd8-750deba156b4
Name:			dkmc-deploy-1-b3a9ddbc-e90c-434f-9fd8-750deba156b4
Namespace:		default
CreationTimestamp:	Mon, 24 Apr 2017 19:53:05 -0700
Labels:			shippable.deploymentName=dkmc-deploy-1-b3a9ddbc-e90c-434f-9fd8-750deba156b4
			shippable.jobName=dkmc-deploy-1
Annotations:		deployment.kubernetes.io/revision=1
			kubectl.kubernetes.io/last-applied-configuration={"kind":"Deployment","apiVersion":"extensions/v1beta1","metadata":{"name":"dkmc-deploy-1-b3a9ddbc-e90c-434f-9fd8-750deba156b4","namespace":"default","c...
Selector:		shippable.deploymentName=dkmc-deploy-1-b3a9ddbc-e90c-434f-9fd8-750deba156b4,shippable.jobName=dkmc-deploy-1
Replicas:		1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:		RollingUpdate
MinReadySeconds:	0
RollingUpdateStrategy:	1 max unavailable, 1 max surge
Pod Template:
  Labels:	shippable.deploymentName=dkmc-deploy-1-b3a9ddbc-e90c-434f-9fd8-750deba156b4
		shippable.jobName=dkmc-deploy-1
  Containers:
   deploy-kubernetes-multi-container-manifest-1-0:
    Image:	679404489841.dkr.ecr.us-east-1.amazonaws.com/nginx:1.12.0
    Port:	
    Limits:
      memory:		400Mi
    Environment:	<none>
    Mounts:		<none>
   deploy-kubernetes-multi-container-manifest-1-1:
    Image:	docker.io/devopsrecipes/deploy-kubernetes-multi-container:master.5
    Port:	
    Limits:
      memory:		400Mi
    Environment:	<none>
    Mounts:		<none>
  Volumes:		<none>
OldReplicaSets:		<none>
NewReplicaSet:		<none>
Events:
  FirstSeen	LastSeen	Count	From			SubObjectPath	Type		Reason			Message
  ---------	--------	-----	----			-------------	--------	------			-------
  27m		27m		1	deployment-controller			Normal		ScalingReplicaSet	Scaled up replica set dkmc-deploy-1-b3a9ddbc-e90c-434f-9fd8-750deba156b4-948434943 to 1
```

### Advanced Configuration: multiple manifest deployment

It is also possible to deploy several manifests in the same deploy job.  Shippable by default will deploy them in the order that they are supplied in the steps section of the job.  This is a nice way to organize your pipeline and keep together manifests that end up on the same cluster.

Lets start with our two images and our cluster:

```
resources:

  - name: deploy-kubernetes-multi-container-image
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-kubernetes-multi-container"
    seed:
      versionName: "latest"

  - name: deploy-kubernetes-multi-container-nginx
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/nginx"
    seed:
      versionName: "1.12.0"

  - name: mc-kube-cluster
    type: cluster
    integration: dr-aws
    pointer:
      sourceName : "deploy-kubernetes-basic" #name of the cluster to which we are deploying
      region: "us-east-1"
```

And now lets add a second manifest job and modify the deploy job to take both manifests as INs

```
jobs:

  - name: deploy-kubernetes-multi-container-manifest-2a
    type: manifest
    steps:
     - IN: deploy-kubernetes-multi-container-image

  - name: deploy-kubernetes-multi-container-manifest-2b
    type: manifest
    steps:
      - IN: deploy-kubernetes-multi-container-nginx

  - name: dkmc-deploy-2
    type: deploy
    steps:
      - IN: deploy-kubernetes-multi-container-manifest-2a
      - IN: deploy-kubernetes-multi-container-manifest-2b
      - IN: mc-kube-cluster

```

Once these changes are pushed, your pipeline will look like this:

![deploy2-pipeline-view](https://github.com/devops-recipes/deploy-kubernetes-multi-container/blob/master/public/resources/images/deploy2-pipeline-view.png")


```
Kubernetes deployment using kubectl

ambarishs-MacBook-Pro:deploy-kubernetes-multi-container ambarish$ kubectl get deployment
NAME                                                  DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
dkmc-deploy-1-b3a9ddbc-e90c-434f-9fd8-750deba156b4    1         1         1            1           39m
dkmc-deploy-2-054577fd-81b4-4914-a62b-a38c8e469ea7    1         1         1            1           38m
dkmc-deploy-2-7868301e-bf87-443f-ab6c-d20c8c6541c1    1         1         1            1           38m
dkmc-deploy-3a-775ea3cb-7896-4eff-91e9-c4d531d6f9c3   1         1         1            1           42m
dkmc-deploy-3b-03294818-3c6f-4733-b4cc-7a37d442516a   1         1         1            1           43m
dkmc-deploy-3b-40f58d6a-1312-4c21-b2dc-03fe6ec58f97   1         1         1            1           23h
ambarishs-MacBook-Pro:deploy-kubernetes-multi-container ambarish$ kubectl describe deployment dkmc-deploy-2-054577fd-81b4-4914-a62b-a38c8e469ea7
Name:			dkmc-deploy-2-054577fd-81b4-4914-a62b-a38c8e469ea7
Namespace:		default
CreationTimestamp:	Mon, 24 Apr 2017 19:54:17 -0700
Labels:			shippable.deploymentName=dkmc-deploy-2-054577fd-81b4-4914-a62b-a38c8e469ea7
			shippable.jobName=dkmc-deploy-2
Annotations:		deployment.kubernetes.io/revision=1
			kubectl.kubernetes.io/last-applied-configuration={"kind":"Deployment","apiVersion":"extensions/v1beta1","metadata":{"name":"dkmc-deploy-2-054577fd-81b4-4914-a62b-a38c8e469ea7","namespace":"default","c...
Selector:		shippable.deploymentName=dkmc-deploy-2-054577fd-81b4-4914-a62b-a38c8e469ea7,shippable.jobName=dkmc-deploy-2
Replicas:		1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:		RollingUpdate
MinReadySeconds:	0
RollingUpdateStrategy:	1 max unavailable, 1 max surge
Pod Template:
  Labels:	shippable.deploymentName=dkmc-deploy-2-054577fd-81b4-4914-a62b-a38c8e469ea7
		shippable.jobName=dkmc-deploy-2
  Containers:
   deploy-kubernetes-multi-container-manifest-2b-0:
    Image:	679404489841.dkr.ecr.us-east-1.amazonaws.com/nginx:1.12.0
    Port:	
    Limits:
      memory:		400Mi
    Environment:	<none>
    Mounts:		<none>
  Volumes:		<none>
OldReplicaSets:		<none>
NewReplicaSet:		<none>
Events:
  FirstSeen	LastSeen	Count	From			SubObjectPath	Type		Reason			Message
  ---------	--------	-----	----			-------------	--------	------			-------
  38m		38m		1	deployment-controller			Normal		ScalingReplicaSet	Scaled up replica set dkmc-deploy-2-054577fd-81b4-4914-a62b-a38c8e469ea7-45181092 to 1
```

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Docker hib. It also contains all of the pipelines configuration files for deploying to Kubernetes for all of the scenarios described above.

**Source code:**  [devops-recipes/deploy-kubernetes-multi-container](https://github.com/devops-recipes/deploy-kubernetes-multi-container)

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-multi-container/runs/6/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58f98b298c0a6707003b237a/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-multi-container)
