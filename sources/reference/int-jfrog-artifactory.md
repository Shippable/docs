page_main_title: JFrog Artifactory
main_section: Reference
sub_section: Integrations
page_title: JFrog Artifactory integration

# JFrog Artifactory integration

You will need JFrog Artifactory integration if you want to do the following -

- Upload files to JFrog Artifactory
- Download files from JFrog Artifactory
- Deploy files from JFrog Artifactory to a cluster of nodes

##Adding the JFrog Artifactory Integration.

You will need to configure this integration to store credentials to artifactory.

1. Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img src="../../images/reference/integrations/account-settings.png" alt="Add JFrog Artifactory credentials">

2. Select **hub** as the Integration family.
3. Choose **JFrog Artifactory** from the list of integration types.
4. For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **jfrog-integration**
5. Enter your HTTP Endpoint(url), username and password. You can follow instructions in <a href="https://www.jfrog.com/confluence/display/RTF/JFrog+CLI#JFrogCLI-Authentication" target="_blank"> JFrogCLI-Authentication</a>.
* Choose the subscriptions, in which the integration can be accessible.
* Click on **Save**

<img src="../../images/reference/integrations/jfrog-int.png" alt="Add JFrog Artifactory credentials">

##Editing your JFrog Artifactory integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name and http endpoint, username and password.

##Deleting your JFrog Artifactory integration

If you no longer need the integration, you can delete it by following the steps below.

- Click on **Integrations** in the left sidebar menu, and click on your integration.
- Scroll to the bottom of the page and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img src="../../images/reference/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img src="../../images/reference/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - Locate your subscription in the left sidebar menu and click on the dependent Subscription.

    <img src="../../images/reference/integrations/list-subscriptions.png" alt="List subscriptions">

    - Click on the **gears** icon and then on **Integrations**.
    - Click on the integration and the **Delete** button.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to your integration and delete the integration.
