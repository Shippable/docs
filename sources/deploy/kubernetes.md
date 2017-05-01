main_section: Deploy
sub_section: Kubernetes

# Deploying to Kubernetes
There are many strategies that can be used to deploy containers to [Kubernetes](https://kubernetes.io/) using Shippable Pipelines.  This page will describe how you can take a single docker image and deploy it as an individual container to your Kubernetes cluster.

## Setup

Shippable will use a Kubernetes integration to communicate with your cluster on your behalf. You can add this to Shippable via Account Integrations.

- Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
- Click on **Integrations** in the left sidebar menu and then click on **Add Integration**.
- Locate **Kubernetes** of type **deploy** in the list and click **Create Integration**.
- Give your integration a name, choose **Kubernete Master** in the Cluster Access type drop down and provide your kubeconfig file for your cluster.
- Here is a an example config which we are using for deploying to our kube cluster:
  ```
  apiVersion: v1
  clusters:
  - cluster:
      certificate-authority-data: <data has been removed since its confidential>
      server: https://api.devops-recipes.com
    name: devops-recipes.com
  contexts:
  - context:
      cluster: devops-recipes.com
      user: devops-recipes.com
    name: devops-recipes.com
  current-context: devops-recipes.com
  kind: Config
  preferences: {}
  users:
  - name: devops-recipes.com
    user:
      client-certificate-data: <data has been removed since its confidential>
      client-key-data: <data has been removed since its confidential>
      password: <data has been removed since its confidential>
      username: admin
  - name: devops-recipes.com-basic-auth
    user:
      password: <data has been removed since its confidential>
      username: admin
  ```
- Your kubeconfig should have all those sections for your cluster.  
- From the dropdown, select the subscription that you'll be using to create your pipelines.
- Click **Save**

<img src="../../images/deploy/kubernetes/create-kube-deploy-integration.png" alt="Add Kubernetes credentials">


Now that the Kubernetes integration is added on Shippable, we can reference it when we create pipeline yml blocks.  In this case, we want to create a `cluster` type block in our `shippable.resources.yml` file.  This must reference a cluster that has been deployed in your environment and for which we created the Kubernetes integration in the previous step.

```
resources:

  - name: deploy-kubernetes-basic-kube-cluster
    type: cluster
    integration: dr-kube-cluster    #replace with your Kubernetes integration name
    flags:
      - deploy-kubernetes-basic

```

You'll also need to create a type `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using an image hosted in Docker hub, that was created by when the repository was built.

```
resources:

  - name: deploy-kubernetes-basic-kube-cluster
    type: cluster
    integration: dr-kube-cluster    #replace with your Kubernetes integration name
    flags:
      - deploy-kubernetes-basic

  - name: deploy-kubernetes-basic-img
    type: image
    integration: dr-dockerhub    #replace with your Docker Hub integration name
    pointer:
      sourceName: "docker.io/devopsrecipes/deploy-kubernetes-basic"  #replace with your image name on Docker Hub
      isPull: false
    seed:
      versionName: "master.1"  #replace with your image tag on Docker Hub
    flags:
      - deploy-kubernetes-basic
```

With these resources, you're ready to start writing jobs that will help you deploy.

Now you're ready for deployment.  Right-click on the manifest job, and select **Run Job**.  Once you do this, the following steps will be taken:

- The manifest job will package your image with default settings
- The deploy job will create a pod. That pod will have the container with the image specified in your manifest.

After running, your pipeline will hopefully change color:
![Pipeline view](https://github.com/devops-recipes/deploy-kubernetes-basic/raw/master/public/resources/images/pipeline-view.png)

And  you can check your pods using kubectl :

```
ambarishs-MacBook-Pro:release ambarish$ kubectl get pods --all-namespaces
NAMESPACE     NAME                                                              READY     STATUS    RESTARTS   AGE
default       kube-deploy-20bc938e-ea98-446b-8054-403d72eea3bd-359291515ltsvz   1/1       Running   0          2h
kube-system   dns-controller-1971817441-jqn32                                   1/1       Running   0          23h
kube-system   etcd-server-events-ip-172-20-103-28.ec2.internal                  1/1       Running   0          23h
kube-system   etcd-server-ip-172-20-103-28.ec2.internal                         1/1       Running   0          23h
kube-system   kube-apiserver-ip-172-20-103-28.ec2.internal                      1/1       Running   4          23h
kube-system   kube-controller-manager-ip-172-20-103-28.ec2.internal             1/1       Running   0          23h
kube-system   kube-dns-v20-3531996453-4yciq                                     3/3       Running   0          23h
kube-system   kube-dns-v20-3531996453-qtr5f                                     3/3       Running   0          23h
kube-system   kube-proxy-ip-172-20-103-28.ec2.internal                          1/1       Running   0          23h
kube-system   kube-proxy-ip-172-20-107-83.ec2.internal                          1/1       Running   0          23h
kube-system   kube-proxy-ip-172-20-124-134.ec2.internal                         1/1       Running   0          23h
kube-system   kube-scheduler-ip-172-20-103-28.ec2.internal                      1/1       Running   0          23h
```

That's all there is to it!

### Advanced Configuration
In the above scenario, several options are set by default that you might want to change.

#### dockerOptions
Using [dockerOptions](http://docs.shippable.com/pipelines/resources/dockerOptions/), all of the advanced configurations of docker are available to you. In this example, we're simply exposing a port.
```
  - name: deploy-kubernetes-basic-img-options
    type: dockerOptions
    version:
      portMappings:
        - 80:80
    flags:
      - deploy-kubernetes-basic
```

#### replicas

[Replicas](http://docs.shippable.com/pipelines/resources/replicas/) is a very simple type of resource. You can use it to define how many copies of a particular manifest you want to be deployed. In this case we'll try to run two copies of our application. Note: since we've specified a port mapping, we can only run one of these containers per container instance.
  - name: deploy-kubernetes-basic-replicas
    type: replicas
    version:
      count: 2

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-kubernetes-basic](https://github.com/devops-recipes/deploy-kubernetes-basic).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-basic/runs/7/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58fcef822ddacd090044cf75/badge?branch=master
)](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-basic)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
