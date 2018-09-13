page_main_title: Shippable Server authentication and source control
main_section: Shippable Server
sub_section: Configuration
page_title: Connect your source control | Shippable Server
page_description: Connect your source control provider to Shippable server for authentication
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, vault

# Authorization and Source control

Shippable Server uses OAuth for authorization, so you do not have to create a separate account when signing in. The most typical workflow is: you sign in with your source control provider credentials, authorize Shippable to grant access to your repositories the first time you sign in, and we ensure that your Shippable workflows stay in sync with your source control from then onwards.

Shippable Server supports the following source control providers:

- GitHub Enterprise
- Bitbucket Server (Stash)
- GitHub
- Bitbucket Cloud
- Gitlab .com, CE, and EE
- Gerrit

The following sections will show how to configure your Shippable Server instance to connect to supported source control providers for user authorization. All configuration is available in Admiral, the Shippable Server Installer, under **Control plane -> AUTHORIZATION AND SOURCE CONTROL MANAGEMENT (SCM) PROVIDERS** panel.

<img src="/images/platform/server/admiral-auth.png" alt="Configuring authorization for Shippable Server">

## GitHub Enterprise

The following steps configure GitHub Enterprise as an authorization provider for your Shippable Server instance:

### Select GitHub Enterprise Auth

* Select **GITHUB ENTERPRISE**.
* Note down the **Callback URL** and the **Shippable UI URL** that is just above the **Authorization and Source Control Management (SCM) Providers** section
* Keep this tab open in your browser as we will come back here at a later step

### Register new app

* Login to GitHub Enterprise server using your admin account
* Click on **Settings -> OAuth applications**
* Click on **Register a new application**

<img src="/images/platform/tutorial/admiral/ghe-oauth1.png">

* Specify `Shippable` for **Application name**
* Specify the `Shippable UI URL` value you noted down earlier for **Homepage URL**
* Specify the `Callback URL` value you noted down earlier for **Authorization callback URL**

<img src="/images/platform/tutorial/admiral/ghe-oauth2.png">

* Click on **Register application**.
* In the next screen, note down the **Client ID** and **Client Secret**

### Finish Admiral config

* Switch back to Admiral UI in your browser and enter the **Client ID** and **Client Secret**
* Note that the **URL** field must contain the full path to your GitHub Enterprise server's API end point. This will typically end with `/api/v3`. Example: `https://github.example.com/api/v3`.

<img src="/images/platform/server/ss-ghe.png">

* Please note that you will need to click on **Apply** for your changes to be effective.

If you came to this page to configure GitHub Enterprise while installing Shippable server for the first time, please go back to the installation document to follow the remaining steps.

If you already have a working Shippable Server instance and just added GitHub Enterprise auth, you should be able to sign in with your GitHub Enterprise credentials at this time.

## GitHub

The following steps configure GitHub as an authorization provider for your Shippable Server instance. You will need a **Client ID** and **Client Secret**. You can get these by [adding Shippable Server as an OAuth application in GitHub](https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/registering-oauth-apps/).

* Select **GITHUB**.
* In your Github account, go to your [Settings->Developer settings->OAuth Apps](https://github.com/settings/developers) and click on **New OAuth App**.
* Enter an easy to remember **Application name**. You need to enter something for **Homepage URL**, but this value isn't relevant to our scenario.
* Copy the **Callback URL** from your Admiral UI:

<img src="/images/platform/server/ss-github.png" alt="Admiral-2-server">

* Paste the Callback URL into the **Authorization callback URL** field in the GitHub UI and click on **Register Application**
* Copy the **Client ID** and **Client Secret** for your new application.
* Paste the values into the Admiral UI.
* Please note that you will need to click on **Apply** for your changes to be effective.

If you came to this page to configure GitHub while installing Shippable server for the first time, please go back to the installation document to follow the remaining steps.

If you already have a working Shippable Server instance and just added GitHub auth, you should be able to sign in with your GitHub credentials at this time.    

## Bitbucket Server

Integration with BitBucket Server from 4.x up to 5.x is supported with Shippable Server.

The following steps configure Bitbucket Server as an authorization provider for your Shippable Server instance.

### Select Bitbucket Server Auth

* Check **Bitbucket Server**.
* Note down the values for **WWW URL** and **Callback URL**.

### Generate SSH keys

* Create an **SSH** key by [following steps here](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html)
* Export the public key by running the following command - `openssl rsa -in <path to id_rsa> -pubout`. Copy the public key.

### Install add-ons

* Log into your Bitbucket Server dashboard and click on the gear/administration icon. Click on **Find new add-ons** and search for `Shippable`
* Install the **Shippable CI/CD for Bitbucket Server** add-on by clicking on the Install button.
* Install the **Shippable OAuth for Bitbucket Server** add-on by clicking on the Install button.

<img src="/images/platform/admiral/BBS-Addons.png" alt="Install add-ons">

Please use the table below to find the appropriate add-on for your BitBucket Server version:

|  Bitbucket Server Version | Shippable CI/CD for Bitbucket Server   |      Shippable OAuth for Bitbucket Server       |
|:----------:|:-------------:|:------:|
| 5.x, 4.x | 1.1.9-RELEASE | 1.0.3-RELEASE |


### Configure OAuth in Bitbucket Server

* Log into your Bitbucket Server dashboard and click on the gear/administration icon
* Click on **Application Links**
* Enter the **WWW URL** in **Configure Application Links** popup and click on **Create new link**

<img src="/images/platform/admiral/BBS-OAuth-1.png" alt="OAuth Step 1">

* Click **Continue** in the **Configure Application URL** popup

<img src="/images/platform/admiral/BBS-OAuth-2.png" alt="OAuth Step 2">

* Specify `Shippable` in **Application Name**
* Select `Generic Application` for **Application Type**
* Check the **Create incoming link** checkbox
* Leave all other fields empty and click **Continue** to proceed to the **Link Applications** popup

<img src="/images/platform/admiral/BBS-OAuth-3.png" alt="OAuth Step 3">

* Specify any secret/password in **Consumer Key** and write it down, since you will need to plug it into Admiral
* Specify `Shippable` in **Consumer Name**
* Copy and paste the public key from the **Generate SSH keys** step in **Public Key**
* Click on **Continue**

<img src="/images/platform/admiral/BBS-OAuth-4.png" alt="OAuth Step 4">

### Finish Admiral config

* Switch back to Admiral and expand the **Control plane->AUTHORIZATION AND SOURCE CONTROL MANAGEMENT (SCM) PROVIDERS->Bitbucket Server** panel.
* Enter the password/secret specified in Step 4 in **Client ID**.
* Enter the private key (contents of `id_rsa` file from the **Generate SSH keys** step) in **Client Secret**.
* Please note that you will need to click on **Apply** for your changes to be effective.

<img src="/images/platform/server/ss-bbs.png" alt="Admiral-2-server">

If you came to this page to configure Bitbucket Server while installing Shippable server for the first time, please go back to the installation document to follow the remaining steps.

If you already have a working Shippable Server instance and just added Bitbucket Server auth, you should be able to sign in with your Bitbucket Server credentials at this time.  

## Bitbucket Cloud

* [Follow instructions to add an OAuth app to your Bitbucket account](https://confluence.atlassian.com/bitbucket/oauth-on-bitbucket-cloud-238027431.html) and write down the client ID and secret which you will need to enter in the Admiral UI.
* Select **BITBUCKET**.
* Enter **Client ID** and **Client Secret** values.
* Please note that you will need to click on **Apply** for your changes to be effective.

<img src="/images/platform/server/ss-bb.png" alt="Configuring Bitbucket for Shippable Server auth">

If you came to this page to configure Bitbucket while installing Shippable server for the first time, please go back to the installation document to follow the remaining steps.

If you already have a working Shippable Server instance and just added Bitbucket auth, you should be able to sign in with your Bitbucket credentials at this time.  

## Gitlab (Cloud, CE, EE)

The following steps configure Gitlab as an authorization provider for your Shippable Server instance:

* Select **GITLAB**.
* Follow instructions for [GitLab as OAuth2 authentication service provider](https://docs.gitlab.com/ee/integration/oauth_provider.html).
    * Specify `Shippable` in the `Name` field.
    * Copy the **Callback URL** from the Admiral UI into the **Redirect URI** field.
    * Select `api` and `read_user` for `Scopes`.
* Copy the **Application Id** and **Secret** and paste them in the Admiral UI.
* For on-premises Gitlab installations, you need to update the **URL** field in the Admiral UI. The URL should be in the format `https://(GitLab URL)/api/(api version)`. For example, if your Gitlab URL is `my.gitlab.com`, you should enter `https://my.gitlab.com/api/v4`. Please note that if you're using Gitlab version 9.0 or later, you should use `v4` for api version. If you're using Gitlab version 8.17 or earlier, you should use `v3` for api version. API v3 is unsupported from Gitlab 9.5 according to this [Gitlab notice](https://docs.gitlab.com/ce/api/v3_to_v4.html).

<img src="/images/platform/server/ss-gitlab.png" alt="Configuring Bitbucket for Shippable Server auth">

If you came to this page to configure Gitlab while installing Shippable server for the first time, please go back to the installation document to follow the remaining steps.

If you already have a working Shippable Server instance and just added Gitlab auth, you should be able to sign in with your Gitlab credentials at this time.  

## Gerrit

The following steps configure Gerrit as an authorization provider for your Shippable Server instance:

* Select **GERRIT**.
* Enter SCM **name** for Gerrit. SCM name is an optional field.
* Enter your Gerrit **URL** and **Username** and **SSH Port** in the Admiral UI.

<img src="/images/platform/server/gerrit.png" alt="Configuring Gerrit for Shippable Server auth">

If you came to this page to configure Gerrit while installing Shippable server for the first time, please go back to the installation document to follow the remaining steps.

If you already have a working Shippable Server instance and just added Gerrit auth, you should be able to sign in with your Gerrit credentials at this time.  

### Using self-signed SSL certifcates with enterprise SCM installations

For enterprise SCMs with self-signed SSL certificates, refer [Using self-signed SSL certifcates](/platform/server/selfsigned-certificates)
