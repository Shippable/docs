page_main_title: Shippable installer
main_section: Platform
sub_section: Tutorials
sub_sub_section: Shippable Server
page_title: Admiral - GitHub Enterprise Integration
page_description: Shippable Server and GitHub Enterprise Integration

# GitHub Enterprise integration

Integration with [GitHub Enterprise](https://enterprise.github.com/home) is supported with Shippable Server. This document describes the steps needed to configure Shippable Server and GitHub Enterprise. After completion of these steps,
you will be able to sign into your on-premises Shippable server with your GitHub Enterprise account and run CI/CD workflows
on your GitHub Enterprise repositories. For more information about the Shippable Server installer in general, see [admiral](/platform/tutorial/server/install/).

## Prerequisites

* GitHub Enterprise setup on a server with SSL configuration.
We need SSL for securely exchanging OAuth tokens between GHE and Shippable server.
* Shippable Server installation.
If you haven't installed Shippable Server, please install it using instructions found [here](/platform/tutorial/server/install-onebox) for a one-box installation.


##1. Shippable Server (Admiral) Setup

* Launch the Admiral web app and login using the token.
* Click on `Configure and Install` and scroll to the `Authorization and Source Control Management (SCM) Providers`.
* Select `GitHub enterprise`.
* Note down the `Callback URL` and the `Url` in the `Shippable UI` section just above the `Authorization and Source Control Management (SCM) Providers` section.
* Keep this tab open in your browser as we will come back here after completing Step 2.

##2. Setup OAuth on your GitHub Enterprise server.

These steps setup OAuth on your GitHub Enterprise and grant permissions to Shippable to access all your organizations and public repositories. Granting access to private repositories can be done at a later stage.

* Login to GitHub Enterprise server using your admin account.
* Click on `Settings -> OAuth applications`.
* Click on `Register a new application`.

<img src="/images/platform/tutorial/admiral/ghe-oauth1.png">

* Specify `Shippable` for `Application name`.
* Specify the Url value you noted down in Step 1 for `Homepage URL`.
* Specify the Callback URL value you noted down in Step 1 for `Authorization callback URL`.

<img src="/images/platform/tutorial/admiral/ghe-oauth2.png">

* Click on `Register application`.
* In the next screen, note down the `Client ID` and `Client Secret`.

<img src="/images/platform/tutorial/admiral/ghe-oauth3.png">

This completes the GitHub Enterprise setup.

##3. Complete Admiral configuration

* Switch back to Admiral in your browser, we need to complete the configuration for the `GitHub enterprise` scm.
* Specify the `Client ID` and `Client Secret` that you noted down in Step 2.

<img src="/images/platform/tutorial/admiral/ss-ghe.png">

* Click on `Save` and `Restart Services`.

This completes Admiral setup. If you came to this page to configure GitHub Enterprise while
installing Shippable server for the first time, you can skip the remaining section and go back to the installation
document to follow the remaining steps.

##4. Log into Shippable Server with your GitHub Enterprise account.

* The Shippable server url can be found in the `Url` field just above the `Authorization and Source Control Management (SCM) Providers` section. Paste this url in your browser or simply click on the `here` located right below.
* Click on `Login` and `GitHub Enterprise`.

<img src="/images/platform/tutorial/admiral/server-login.png">

* You will see an OAuth permissions screen. Click on `Authorize`.

<img src="/images/platform/tutorial/admiral/oauth-authorize.png">

You will now be logged into the Shippable dashboard. Shippable will now start syncing your GitHub Enterprise organizations and you should see your organizations under `Subscriptions` in the left pane.
