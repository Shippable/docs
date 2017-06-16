page_main_title: Node Cluster
main_section: Reference
sub_section: Integrations
page_title: Node cluster integration

# Node cluster integration

A Node cluster is one or more nodes, to which Shippable could deploy your artifacts.

The nodes (VMs) could be from any cloud provider or self hosted. Shippable interacts with the nodes using IP Address and SSH keys.

##Adding the Account Integration.

You will need to configure this integration to deploy artifacts to a cluster of nodes.

* Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/reference/integrations/account-settings.png" alt="Add Node cluster credentials">

* Select **deploy** as the Integration family.
* Choose **DNode cluster** from the list of integration types.
* For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **app-cluster**
* Enter the IP address of the nodes.
* Choose the subscriptions, in which the integration can be accessible.
* Click on **Save**

<img src="../../images/reference/integrations/node-cluster-int.png" alt="Add node cluster integration">

* After saving, a script will be generated, which is used for creating a user called **shippable** and adding a public SSH key on all the nodes specified in the list.
* Copy the script and run it on all of the nodes.
* Click on **Done**, once the script is executed on all of the nodes.

##Editing your node cluster integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name and nodes.

##Deleting your node cluster integration

If you no longer need the integration, you can delete it by following the steps below.

- Click on **Integrations** in the left sidebar menu, and click on your integration.
- Scroll to the bottom of the page and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img width="50%" height="50%" src="../../images/reference/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img width="50%" height="50%" src="../../images/reference/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - Locate your subscription in the left sidebar menu and click on the dependent Subscription.

    <img width="30%" height="30%" src="../../images/reference/integrations/list-subscriptions.png" alt="List subscriptions">

    - Click on the **gears** icon and then on **Integrations**.
    - Click on the integration and the **Delete** button.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to your integration and delete the integration.
