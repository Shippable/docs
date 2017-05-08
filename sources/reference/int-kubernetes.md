page_main_title: Kubernetes
main_section: Reference
sub_section: Integrations
page_title: Kubernetes integration

# Kubernetes integration

Shippable lets you easily deploy your Dockerized applications to popular Container Services like Kubernetes, Amazon EC2 Container Service (ECS), Google Container Engine (GKE), Docker Cloud/Datacenter, and Joyent Triton.

You will first need to configure an account integration with your credentials or keys in order to interact with these services using Shippable Pipelines.

Follow the steps below to create an account integration with Google's Kubernetes. The steps below assume you already have a Kubernetes cluster which you want to configure for deployment with Shippable.

## Adding the Kubernetes Integration

### Kubernetes master having a public IP address

* Click on the gear icon for Account Settings in your top navigation bar and then click on the **Integrations** section.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Kubernetes integration">

* Click on the **Add Integration** button and choose **Kubernetes** from the list of choices.
* For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **kube-int**.
* **Cluster Access type** should be set to **Kubernetes master**
* Copy the contents of your [kubeconfig](https://kubernetes.io/docs/user-guide/kubeconfig-file/) file, usually found at ~/.kube/config, that contains credentials for accessing your Kubernetes cluster. You may copy the entire kubeconfig file or only the details related to a particular cluster
* If you'd like to create a specific set of credentials for Shippable, check out our section on how to create a kubeconfig file using a serviceAccount [here](#creating-a-kubeconfig-file-for-a-service-account).
* Paste the contents into the **KubeConfig File** textbox.
* Assign this integration to the Subscription(s) containing the repo with your pipelines config. Since you're likely a member of many organizations, you need to specify which of them can use this integration.
* Click on **Save**.

<img src="../../images/reference/integrations/kubernetes-integration.png" alt="Add Kubernetes integration">

You can now use this integration in your pipeline YML config to deploy to your Kubernetes pods.

For more information on this, please check out our docs on [deploy job](./job-deploy.md) and [cluster resource](./resource-cluster.md).

### Kubernetes master with no public IP address

If your Kubernetes master node is not publicly accessible from the internet, Shippable's hosted service cannot communicate with it. To get around this problem, we need you to configure a Bastion host which is publicly accessible and can also communicate with the Kubernetes master node.

The requirement for Bastion host are:
* Bastion host should have an IP address and port 22 open for SSH access
* You can SSH into the Bastion host
* Bastion host can access the Kubernetes master node, i.e. it contains the private SSH key
* Bastion host has kubectl installed. Install it with the following script:

```
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

```

Now, you can create the Shippable account integration:

* Click on the gear icon for Account Settings in your top navigation bar and then click on the **Integrations** section.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Kubernetes integration">

* Click on the **Add Integration** button and choose **Kubernetes** from the list of choices.
* For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **kube-int**.
* **Cluster Access type** should be set to **Bastion Host**.
* SSH into the Bastion host and from there, SSH into your Kubernetes master node and run the following commands. Copy the output of this file which gives you the [kubeconfig](https://kubernetes.io/docs/user-guide/kubeconfig-file/).
```
$ sudo su -
$ cat /etc/kubernetes/admin.conf
```
* Paste the contents into the **KubeConfig File** textbox. *NOTE: if you don't want to use your admin.conf, you can set up a serviceAccount as described [here](#creating-a-kubeconfig-file-for-a-service-account)*.
* Assign this integration to the Subscription(s) containing the repo with your pipelines config. Since you're likely a member of many organizations, you need to specify which of them can use this integration.
* Click on **Save**.
* You will see a script section which contains a script you need to run on your Bastion host. Run the script and then click on **Done**.

<img src="../../images/reference/integrations/kubernetes-bastion-integration.png" alt="Add Kubernetes integration">

You can now use this integration in your pipeline YML config to deploy to your Kubernetes pod.

For more information on this, please check out our docs on [deploy job](./job-deploy.md) and [cluster resource](./resource-cluster.md)..


##Creating a kubeconfig file for a Service Account
The best way to create an isolated set of credentials for use with Shippable Pipelines is to create a Kubernetes Service Account, and set up a kubeconfig file that utilizes it.

#### Create the Service Account

- Make sure you're on a machine that has a kubectl that can interact with your cluster
- Create a `shippable-service-account.yaml` file to represent the service account

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: shippable-deploy #any name you'd like
```
- Use kubectl to create the service account on the master
```
$ kubectl create -f shippable-service-account.yaml
serviceaccount "shippable-deploy" created
```

#### Create the kubeconfig file

- Start by copying the existing kubeconfig from kubectl to a file, and get ready to modify it
```
$ kubectl config view --flatten --minify > myConfig.config
```

- Use kubectl to describe the service account so you can see its details
```
$ kubectl describe serviceAccounts shippable-deploy
Name:		shippable-deploy
Namespace:	default
Labels:		<none>
Annotations:	<none>

Image pull secrets:	<none>

Mountable secrets: 	shippable-deploy-token-h6pdj

Tokens:            	shippable-deploy-token-h6pdj
```
- Now describe the secret token associated with the account
```
$ kubectl describe secrets shippable-deploy-token-h6pdj
Name:		shippable-deploy-token-h6pdj
Namespace:	default
Labels:		<none>
Annotations:	kubernetes.io/service-account.name=shippable-deploy
		kubernetes.io/service-account.uid=da401cc4-3430-11e7-8529-42010a800fc8

Type:	kubernetes.io/service-account-token

Data
====
ca.crt:		1119 bytes
namespace:	7 bytes
token:		eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3Nlcn...
```
- Modify the kubeconfig file to utilize the serviceAccount token.
```
apiVersion: v1
kind: Config
users:
- name: shippable-deploy
  user:
    token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3Nlcn...
clusters:
- name: my-kube-cluster
  cluster:
     server: https://us-central1.sample.com
     certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUREREND...
contexts:
- context:
    cluster: my-kube-cluster
    user: shippable-deploy
  name: shippable-context
current-context: shippable-context
```
- Make sure the `user` is the name of the serviceAccount, and check that it is updated in the `users` section as well as the `context` section.
- Check that the `current-context` states the name of the context that references the correct cluster and the correct serviceAccount user.
- This assumes that the kubeconfig you started with already had the server and certificate authority information.
- Finally, take this kubeconfig file that you created, and use it for your Shippable Kubernetes Integration.

##Editing your Kubernetes integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your Kubernetes integration. You can then change integration name and contents of kube file and ip address to log into bastion node.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your Kubernetes integration

If you no longer need the integration, you can delete it by following the steps below.

-  Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.

<img src="../../images/reference/integrations/account-settings.png" alt="Account settings">

-  Click on **Integrations** in the left sidebar menu
- Locate the integration you want to delete and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img src="../../images/reference/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img src="../../images/reference/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - From the Subsciption dropdown menu at the top left of your Dashboard, click on the dependent Subscription.

    <img src="../../images/reference/integrations/list-subscriptions.png" alt="List subscriptions">

    - Go to the **Settings** tab and click on **Integrations** in the left sidebar.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to **Account Settings** and delete the integration.
