main_section: CI
sub_section: Overview

#Enabling a project

The first step to building your project with Shippable is to enable it for CI.

To enable a project, first navigate to the subscription that contains the project you want to enable.

- [Sign in to Shippable](https://app.shippable.com)
- Click on the list icon at the top left of your screen to see a list of all your Subscriptions. Select the Subscription that contains the project you want to enable.

<img src="../../images/ci/list-subscriptions.png" alt="List all Subscriptions">

- If this is the first project being enabled for your Subscription, you will automatically be taken to the **Enable Project** screen. If not, click on the **Enable Project** option in the left sidebar menu.

<img src="../../images/ci/enable-project-menu.png" alt="List all Subscriptions">

- This brings you to the page with the list of repositories that are not yet enabled within your Subscription. Click on the `Enable` button to enable a particular repository. If you have a long list of repositories, pull it up by typing the name of the repo to filter
by name and enable it.

- If you have a private GitHub repository and do not see it in the list, please make sure your account is [enabled for private repositories.](#private-repos)

- If you have recently added a repository to GitHub/Bitbucket and do not see it in the list, click on the Sync button. Once the sync is complete, you should see the new repository in the list, for you to enable.

After enabling a project, you will be redirected to the project's page on Shippable. You can now run a manual build or make a commit to your source control to automatically trigger a build.

Please remember that you will need a `shippable.yml` at the root of your repository in order to run the build. This is the configuration file for your build and tells us the commands you need to run as part of your CI workflow.

<a name="private-repos"></a>
##Enabling GitHub private repositories

If you want to use Shippable to build private repositories from GitHub, you'll need to authorize Shippable. Please note that you do not have to do this for Bitbucket since  You can do this by following the outlined steps:

-  Ensure you have logged in to [Shippable](https://app.shippable.com) using your GitHub credentials.
-  Click on the Account settings (gear icon on the top navigation bar).
-  In the 'Accounts' section and under 'Git Identities', click 'Enable' under 'GitHub'.
-  Click `Authorize application` in the next page to enable access to private repositories.

<img src="../../images/ci/enablePvtRepoMv.gif" alt="Enable access to GitHub Private Repositories" style="width:700px;"/>
