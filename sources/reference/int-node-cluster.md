page_main_title: Node Cluster
main_section: Reference
sub_section: Integrations
page_title: Node cluster integration

# Node cluster integration

A Node cluster is one or more nodes, to which Shippable could deploy your artifacts.

The nodes (VMs) could be from any cloud provider or self hosted. Shippable interacts with the nodes using IP Address and SSH keys.

##Adding the Account Integration.

You will need to configure this integration to deploy artifacts to a cluster of nodes.

* Click on the gear icon for Account Settings in your top navigation bar and then click on the **Integrations** section.

<img src="../../images/reference/integrations/account-settings.png" alt="Add node cluster integration">

* Click on the **Add Integration** button.
* For **Integration type**, choose **Node Cluster** from the list of choices.
* For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **app-cluster**
* Enter the IP address of the nodes.
* Choose the subscriptions, in which the integration can be accessible.
* Click on **Save**

<img src="../../images/reference/integrations/node-cluster-int.png" alt="Add node cluster integration">

* After saving, a script will be generated, which is used for creating a user called **shippable** and adding a public SSH key on all the nodes specified in the list.
* Copy the script and run it on all of the nodes.
* Click on **Done**, once the script is executed on all of the nodes.

##Editing your node cluster integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your node cluster integration. You can then change integration name and nodes.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your node cluster integration

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