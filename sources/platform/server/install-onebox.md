page_main_title: Shippable installer
main_section: Platform
sub_section: Tutorials
sub_sub_section: Shippable Server
page_title: Admiral - Installing on a single machine
page_description: How to install Shippable
page_keywords: install, onebox, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Onebox installation guide

Shippable Server comprises of the following -

* Control plane
    * Stateless micro services  
    * Stateful Components - PostgreSQL, Secret Store and GitLab server.
    * Transient State Components - Redis and RabbitMQ
    * Shippable Server Installer and webapp (Admiral)
* Build plane
    * Node pools

This document describes the steps to install Shippable Server on a single server. This is useful for server installations that are not used very heavily because it reduces the resources required.  For more information about the installer in general and other installation choices, see [admiral](/platform/tutorial/server/install/).

<img src="/images/platform/tutorial/server/admiral-onebox.png" alt="Admiral-github">

## Pre-requisites

### OS versions

We support the following Operating systems:

- Ubuntu 16.04 LTS
- Ubuntu 14.04 LTS
- CentOS 7
- RHEL 7

### Machine Requirements

You will need a machine/VM with:

- 4 cores
- 8 GB memory
- 100 GB disk space

The minimum requirements for a VM on AWS for example is a [C4.XLarge](https://aws.amazon.com/ec2/instance-types/) machine.

### Ports to open

- 22: ssh into the machine
- 5672: amqp
- 50000: Shippable api
- 50001: Shippable post-login ui
- 50003: Shippable installer webapp

### Pre-install packages

You need to install Git and SSH  before downloading and running Admiral, the Shippable Server installer.  Install these by running the following:

```
$ sudo apt-get update && sudo apt-get install git-core ssh
```

## Install Shippable Server

Please have the following information handy before you start the installation:

* IP address for Server.
* Shippable Server Installer access key
* Shippable Server Installer secret key

**If you do not have an access key and secret ket, please contact us [via email](mailto:support@shippable.com) or through the [Server contact form](https://www.shippable.com/enterprise.html#shippable-server-contact).**

###1. Install Admiral CLI
SSH into the machine where you are installing Admiral and run the following commands.

```
$ git clone https://github.com/Shippable/admiral.git
$ cd admiral
$ git checkout v6.3.4
```

You will see the following output:

`ubuntu@ip-172-31-29-44:~$ git clone Cloning into 'admiral'...
remote: Counting objects: 15276, done.
remote: Compressing objects: 100% (97/97), done.
remote: Total 15276 (delta 85), reused 105 (delta 58), pack-reused 15121
Receiving objects: 100% (15276/15276), 13.10 MiB | 8.18 MiB/s, done.
Resolving deltas: 100% (9106/9106), done.
Checking connectivity... done.
ubuntu@ip-172-31-29-44:~$ cd admiral/
ubuntu@ip-172-31-4-17:~/admiral$ git checkout v6.3.4
HEAD is now at 9018791... updating version.txt to v6.3.4
`

We have checked out tag v6.3.4, which is the latest tag available as of March 2018. To see the complete list of versions and install a specific version, you can run `git tag` to see all the tags and then checkout the tag you want. Please note that versions more recent that v6.3.4, will be available April 2018 onwards and we recommend installing the latest version (which you can find out by running `git tag`).

###2. Run Admiral CLI

Ensure you have the installer access key, secret and public ip address of the state machine.
Admiral will install the postgres database in this step and download all the Shippable docker images.

Run the following command:

```
sudo ./admiral.sh install --onebox --installer-access-key <access_key> --installer-secret-key <secret_key>
```

Follow the steps below:

```
root@802727a5be4e:/admiral# sudo ./admiral.sh install --onebox --installer-access-key XXXXXXXXXXXXXXXX --installer-secret-key XXXXXXXXXXXXXXXXXXXX
|___ ADMIRAL_ENV does not exist, creating
'/admiral/common/scripts/configs/admiral.env.template' -> '/etc/shippable/admiral.env'
|___ Successfully created admiral env
|___ SSH keys not available, generating
|___ SSH keys successfully generated

# 22:27:15 #######################################
# Shippable Server Software License Agreement
##################################################
|___ BY INSTALLING OR USING THE SOFTWARE, YOU ARE CONFIRMING THAT YOU UNDERSTAND THE SHIPPABLE SERVER SOFTWARE LICENSE AGREEMENT, AND THAT YOU ACCEPT ALL OF ITS TERMS AND CONDITIONS.
|___ This agreement is available for you to read here: /admiral/SHIPPABLE_SERVER_LICENSE_AGREEMENT
|___ Do you wish to continue? (Y to confirm)
```

Choose `Y`. The installation will continue.

```
Y
|___ Thank you for accepting the Shippable Server Software License Agreement. Continuing with installation.

# 22:27:16 #######################################
# Validating runtime
##################################################
|___ Using release: master
|___ Updating RELEASE in ADMIRAL_ENV file
|___ LOGIN_TOKEN not defined, generating
|___ Generating login token
|___ Successfully generated login token
|___ Updating LOGIN_TOKEN in ADMIRAL_ENV file
|___ LOGIN_TOKEN updated in ADMIRAL_ENV file
|___ Services: /admiral/common/scripts/configs/services.json

# 22:27:16 #######################################
# Collecting required information
##################################################
|___ ACCESS_KEY already set, skipping
|___ SECRET_KEY already set, skipping
|___ ONEBOX_MODE already set, skipping
|___ ADMIRAL_IP not set
|___ Setting value of admiral IP address
|___ List of your machine IP addresses including default:
|___ 1 IP addresses available for the host
|___ 1 - (127.0.0.1)
|___ 2 - (172.17.0.2)
|___ Please pick one of the IP addresses from the above list by selecting the index (1, 2, etc) or enter a custom IP
```

Choose of the above IP addresses or another IP.

```
|___ 172.17.0.2 was selected as admiral IP
|___ Admiral IP is set to 172.17.0.2
|___ DB_IP already set, skipping
|___ DB_INSTALLED already set, skipping
|___ DB_PORT already set, skipping
|___ DB_PASSWORD is not set
|___ Setting database password
|___ Please enter the password for your database. This password will also be used for gitlab & rabbitmq, by default. This can be changed from the Admiral UI, if required.
```

Enter a password that is easy to remember. Thereafter, Admiral will continue running for a bit and install a whole bunch of things. You will see a message like this once Admiral installation completes.

```
# 17:16:55 #######################################
# Booting Admiral UI
##################################################
|___ Checking if admiral is running
|___ Generating admiral ENV variables
|___ Generating admiral mounts
4737408e9638340ffe8be3465aaab2772281e6b35f19d9589c404ba883fa7111
|___ Admiral container successfully running
|___ Go to 35.172.229.57:50003 to access the admin panel
|___ Login Token: fcd956d9-e471-4811-91d5-13c663f63b66
|___ Command successfully completed!
```

Please note down the `Login Token` and the IP address/port of the admin panel. You can run `sudo ./admiral.sh info` at any time to retrieve your Login token and Admiral URL.

###3. Initialize Control pane

*  First, you need to connect to the Admiral web app in your browser by entering IP address and port, for example `http://35.172.229.57:50003`. It might be a good idea to bookmark this Admiral URL.

* Enter the admin token.

<img src="/images/platform/tutorial/server/admiral-login.png">

* You will see a page like this:

<img src="/images/platform/tutorial/server/controlpane-1.png">

* Scroll to the bottom of the page and click `Apply`.

<img src="/images/platform/tutorial/server/controlpane-2.png">

* Click `Yes`.

<img src="/images/platform/tutorial/server/controlpane-accept.png">

* Admiral will now start initializing all the components such as Database, Redis etc.

<img src="/images/platform/tutorial/server/controlpane-3.png">

* If you scroll up, you can see the state of all the components in the `Summary` panel.

<img src="/images/platform/tutorial/server/controlpane-4.png">

* Once initialization is complete, you should see `Initialized` status for these sections.

<img src="/images/platform/tutorial/server/controlpane-5.png">

* Expand the **Authorization and Source Control Management (SCM) Providers** section. You will need to configure one
authorization provider.

* For **GitHub**, you will need a **Client ID** and **Client Secret**. You can get these by [adding Shippable Server as an OAuth application in GitHub](https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/registering-oauth-apps/).
    * Check **GitHub** in the **Authorization** column.
    * In your Github account, go to your [Settings->Developer settings->OAuth Apps](https://github.com/settings/developers) and click on **New OAuth App**.
    * Enter an easy to remember **Application name**. You need to enter something for **Homepage URL**, but this value isn't relevant to our scenario.
    * Copy the **Callback URL** from your Admiral UI:

    <img src="/images/platform/tutorial/server/callback-url-for-github.png" alt="Admiral-2-server">

    * Paste the Callback URL into the **Authorization callback URL** field in the GitHub UI and click on **Register Application**
    * Copy the **Client ID** and **Client Secret** for your new application.
    * Paste the values into the Admiral UI.

* For **GitHub Enterprise**, follow instructions on the [GitHub Enterprise configuration page](/platform/tutorial/server/install-ghe)

* For **Bitbucket Server (Stash)**, follow instructions on the [Bitbucket Server config page](/platform/tutorial/server/install-bbs)

* For **Bitbucket Cloud**, [follow instructions to add an OAuth app](https://confluence.atlassian.com/bitbucket/oauth-on-bitbucket-cloud-238027431.html) and note down the client ID and secret which you will need to enter in the Admiral UI.

* For **Gitlab**:
    * Follow instructions to [register a new application within your Gitlab instance](https://docs.gitlab.com/ee/integration/github.html). You should use the **Callback URL** from the Admiral UI for the **Authorization callback URL** field.
    * Copy the **Client ID** and **Client secret** and paste them in the Admiral UI.
    * For on-premises Gitlab installations, you need to update the **URL** field in the Admiral UI. The URL should be in the format `https://(GitLab URL)/api/(api version)`. For example, if your Gitlab URL is `my.gitlab.com`, you should enter `https://my.gitlab.com/api/v4`. Please note that if you're using Gitlab version 9.0 or later, you should use `v4` for api version. If you're using Gitlab version 8.17 or earlier, you should use `v3` for api version. API v3 is unsupported from Gitlab 9.5 according to this [Gitlab notice](https://docs.gitlab.com/ce/api/v3_to_v4.html)

* Click **Apply**.

###3. Initialize Build pane

* Click on `Build plane` in the left navigation bar.

* Expand the `BUILD CONFIGURATION` panel and change any settings you might want to change. The default settings will also work.

<img src="/images/platform/tutorial/server/buildplane-1.png">

* By default, system and custom nodes are enabled and this is what most customers end up using. If you want to use dynamic nodes, please contact `support@shippable.com` for further instructions.

Choose the appropriate `Default cluster type`, which is the operating system and version of your build nodes. For example, if you want to build your repositories on a Ubuntu 16.04 build machine, you would choose `custom__x86_64_Ubuntu_16.04`. Do not choose any type starting with `dynamic`.

<img src="/images/platform/tutorial/server/buildplane-cluster.png">

* Click on `Save and Restart services` in the left navigation bar.

<img src="/images/platform/tutorial/server/buildplane-2.png">

* Click `Yes`.

<img src="/images/platform/tutorial/server/buildplane-3.png">

###4. Configure add-ons

If you want your users to be able to connect to third party services through [integrations](/platform/integration/overview), you need to configure them in this section.

* Click on **Add-ons**

<img src="/images/platform/tutorial/server/addons-1.png">

* Expand the `CLOUD PROVIDERS`, `NOTIFICATIONS`, `REGISTRIES` or `OTHERS` panels and choose the integrations you want to enable.

<img src="/images/platform/tutorial/server/addons-2.png">
<img src="/images/platform/tutorial/server/addons-3.png">
<img src="/images/platform/tutorial/server/addons-4.png">

* You can turn on caching by following the steps below:
    * Expand the `OTHERS` panel.
    * Toggle `Enable build artifact caching using AWS S3`.
    * Enter your AWS Access and Secret Keys.

<img src="/images/platform/tutorial/server/addons-caching.png">

To learn more about the benefits of caching, go [here](/platform/runtime/caching/#caching).

* Click **Install Add-ons**.

###5. Setup superuser

* You will first need to log in to Shippable Server with your Admin account for the source control provider. To find the Server URL, look in the **Control plane->UI** section of the Admiral UI:

<img src="/images/platform/tutorial/server/shippable-server-url.png" alt="Admiral-2-server">

* From the Shippable Server URL, sign in to Shippable Server with your Admin account for the SCM provider, and authorize the application. You will need to click **Authorize** twice.

* You should see your team/organizations/repositories sync and appear under the **Subscriptions** section of the left navbar.

<img src="/images/platform/tutorial/server/shippable-left-navbar.png" alt="Admiral-2-server">

* Click **Profile** in the left sidebar and note down the `Account Id` at the bottom of the screen.

<img src="/images/platform/admiral/Admiral-accountid.png" alt="Admiral-github">

* Switch back to Admiral UI and click on **System Settings->Manage System SuperUsers (+ icon)** section.

<img src="/images/platform/tutorial/server/systemsettings-1.png" alt="Admiral-github">

* Paste the Account id and click **Add**.

<img src="/images/platform/tutorial/server/systemsettings-2.png" alt="Admiral-github">

###6. Configure nodes.

You need nodes to run your jobs. The configuration for these is under the **Build configuration->Nodes** section under **Configure and Install**.

By default, a Server installation is configured to support **System Nodes** and **BYON Nodes**. You can turn on **On-demand Nodes** if you want your nodes to be spun up on demand. We support AWS for On-demand nodes.

<img src="/images/platform/tutorial/server/default-nodes-config.png" alt="Admiral-2-server">

#### System nodes

System nodes are available for all subscriptions and projects across your installation and are always ON and waiting to pick up triggered jobs.

To configure system nodes, follow the instructions below:

* From the Shippable Server UI, click on **Admin** in the left navbar and click on **Nodes** and then on **System**.
* Click on **+** at the top right

<img src="/images/platform/tutorial/server/system-nodes.png" alt="Admiral-2-server">

* Follow instructions to add a node. You can follow guidelines [described at Step 6 onwards on the Add a node page](/platform/tutorial/runtime/custom-nodes/#adding-a-build-node)

* Repeat these steps for the number of system nodes you want to add.

#### BYON nodes

BYON nodes are added at a subscription level and are always ON and waiting to pick up triggered jobs. By default, any admin of a Subscription can add BYON nodes.

To restrict addition of BYON Nodes to Shippable Server Admins, check the **Restrict BYON node creation to admins only** checkbox in the Admiral UI.

To set up BYON nodes, sign in to Shippable Server with your admin credentials and [follow instructions here](http://docs.shippable.com/getting-started/byon-manage-node/).

#### On-demand Nodes

On-demand nodes are spun up when a job is triggered and spun down if no new job is triggered after some idle time. These are the most cost-effective in terms of infrastructure costs since they are not always ON, but are spun up on-demand.

However, please note that nodes on AWS need 2-4 minutes to be spun up, so you will have to live with that overhead for some builds when a fresh node needs to be spun up.

To enable **On-demand nodes**:

* Check the **Enable On-demand nodes** checkbox
* Enter your AWS Access and Secret keys.
* Choose an instance size. Our default is c4.large.
* You can leave the other settings as-is.
* Click on **Save** for the **Configure and Install** section.

## Troubleshooting

###RabbitMQ initialization fails

* Check your kernel version by running the following command on **Server 1**:

```
$ uname -a
```

<img src="/images/platform/tutorial/server/kernel-version.png" alt="Admiral-github">

* If your kernel version is less than **3.19**, you need to run the following commands:

```
$ sudo apt-get update
$ sudo apt-get install linux-generic-lts-vivid
$ sudo reboot #restart is required after kernel upgrade
```

* After the reboot, you will need to restart Admiral:

```
$ sudo ./admiral.sh restart
```

* Re-open the admiral UI and click on **Initialize** in the **Initialize Infrastructure** section.

### Missing subscriptions

If you sign in to Shippable Server and are missing some subscriptions (organizations or teams) from your SCM, click on **Profile** in your left navbar and then click on **Sync**. Recheck if the missing organizations are now visible under **Subscriptions**.
