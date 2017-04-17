main_section: CI
sub_section: Overview

#Enabling a project

The first step to building your project with Shippable is to enable it for CI.

To enable a project, first navigate to the subscription that contains the project you want to enable.

- <i class="ion-ios-minus-empty"> </i>  [Sign in to Shippable](https://app.shippable.com)
- <i class="ion-ios-minus-empty"> </i>  Click on the list icon at the top left of your screen to see a list of all your Subscriptions. Select the Subscription that contains the project you want to enable.

<img src="../../images/ci/list-subscriptions.png" alt="List all Subscriptions">

- <i class="ion-ios-minus-empty"> </i>  If this is the first project being enabled for your Subscription, you will automatically be taken to the **Enable Project** screen. If not, click on the **Enable Project** option in the left sidebar menu.

<img src="../../images/ci/enable-project-menu.png" alt="List all Subscriptions">

- <i class="ion-ios-minus-empty"> </i> This brings you to the page with the list of repositories that are not yet enabled within your Subscription. Click on the `Enable` button to enable a particular repository. If you have a long list of repositories, pull it up by typing the name of the repo to filter
by name and enable it.


- <i class="ion-ios-minus-empty"> </i> If you have recently added a repository to github/bitbucket and do not see it in the list, click on the Sync button. Once the sync is complete, you should see
the new repository in the list, for you to enable.

After enabling a project, you will be redirected to the project's page on Shippable. You can now run a manual build or make a commit to your source control to automatically trigger a build.

Please remember that you will need a `shippable.yml` at the root of your repository in order to run the build. This is the configuration file for your build and tells us the commands you need to run as part of your CI workflow.
