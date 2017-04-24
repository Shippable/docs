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
* Paste the contents into the **KubeConfig File** textbox.
* Assign this integration to the Subscription(s) containing the repo with your pipelines config. Since you're likely a member of many organizations, you need to specify which of them can use this integration.
* Click on **Save**.
* You will see a script section which contains a script you need to run on your Bastion host. Run the script and then click on **Done**.

<img src="../../images/reference/integrations/kubernetes-bastion-integration.png" alt="Add Kubernetes integration">

You can now use this integration in your pipeline YML config to deploy to your Kubernetes pod.

For more information on this, please check out our docs on [deploy job](./job-deploy.md) and [cluster resource](./resource-cluster.md)..

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
- Once you have delete the integration from all Subscriptions, you can go back to **Account Settings** and delete the integration.