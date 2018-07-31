page_main_title: Installing Shippable Server
main_section: Shippable Server
sub_section: Installation instructions
page_title: Installing Shippable Server
page_description: Install the Shippable CI/CD and DevOps platform behind your firewall
page_keywords: ci, continuous integration, devops, docker, on-premises


# Shippable Server installation guide

Shippable Server comprises of the following -

* Control plane
    * Stateless micro services  
    * Stateful Components - PostgreSQL, Secret Store and GitLab server.
    * Transient State Components - Redis and RabbitMQ
    * Shippable Server Installer and webapp (Admiral)
* Build plane
    * Node pools

This document describes the steps to install Shippable Server onto two servers.

<img src="/images/platform/tutorial/server/shippable-server-requirements.png" alt="Admiral-github">

## Pre-requisites

### OS versions

We support the following Operating systems:

- Ubuntu 16.04 LTS
- CentOS 7
- RHEL 7
- Ubuntu 14.04 LTS

### Open ports

Before we start, you need to open the following ports so that various Shippable Server components can communicate with each other.

#### Server 1
- 22: ssh into the machine
- 5672: messaging
- 15672: messaging admin
- 6379: redis
- 50000: Shippable API
- 50001: Shippable UI
- 50003: Shippable installer webapp

#### Server 2

- 22: ssh into the machine
- 80: internal gitlab server api endpoint
- 443: internal gitlab server secure api endpoint
- 2222: internal gitlab server ssh port
- 5432: database
- 8200: vault

### Pre-install packages

You need to install Git and SSH on **Server 1** before downloading and running Admiral, the Shippable Server installer.  Install these by running the following on **Server 1**:

```
$ sudo apt-get update && sudo apt-get install git-core ssh
```

## Install Shippable Server

Please have the following information handy before you start the installation:

* IP addresses for **Server 1** and **Server 2**.
* Shippable Server Installer access key
* Shippable Server Installer secret key

**If you do not have an access key and secret ket, please contact us [via email](mailto:support@shippable.com) or through the [Server contact form](https://www.shippable.com/enterprise.html#shippable-server-contact).**

###1. Install Admiral CLI

SSH into **Server 1** and run the following commands:

```
$ git clone https://github.com/Shippable/admiral.git
$ cd admiral
$ git checkout v6.3.4
```

You will see the following output:

```
ubuntu@ip-172-31-29-44:~$ git clone https://github.com/Shippable/admiral.git
Cloning into 'admiral'...
remote: Counting objects: 15276, done.
remote: Compressing objects: 100% (97/97), done.
remote: Total 15276 (delta 85), reused 105 (delta 58), pack-reused 15121
Receiving objects: 100% (15276/15276), 13.10 MiB | 12.15 MiB/s, done.
Resolving deltas: 100% (9106/9106), done.
ubuntu@ip-172-31-29-44:~$ cd admiral/
ubuntu@ip-172-31-4-17:~/admiral$ git checkout v6.3.4
HEAD is now at 9018791... updating version.txt to v6.3.4
```

**Important:** We have checked out tag `v6.3.4`, which is the latest tag available as of March 2018. To see the complete list of versions and install a specific version, you can run `git tag` to see all the tags and then checkout the tag you want. Please note that versions more recent that v6.3.4, will be available April 2018 onwards and we recommend installing the latest version (which you can find out by running `git tag`).

###2. Run Admiral CLI

Ensure you have the installer access key, secret, and public ip address of the state machine.
Admiral will install the Postgres database in this step and download all images. You will be asked to run
a specific script on **Server 2** during this step to authorize ssh access for **Server 1**.

Run the following command on **Server 1**:

Follow the steps below:

```
root@802727a5be4e:/admiral# sudo ./admiral.sh install --installer-access-key XXXXXXXXXXXXXXXX --installer-secret-key XXXXXXXXXXXXXXXX
|___ ADMIRAL_ENV does not exist, creating
'/admiral/common/scripts/configs/admiral.env.template' -> '/etc/shippable/admiral.env'
|___ Successfully created admiral env
|___ SSH keys not available, generating
|___ SSH keys successfully generated

# 01:31:02 #######################################
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

# 01:31:03 #######################################
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

# 01:31:03 #######################################
# Collecting required information
##################################################
|___ ACCESS_KEY already set, skipping
|___ SECRET_KEY already set, skipping
|___ Do you want to install all the stateful services(rabbitmq, redis, gitlab, vault) on this machine? This will be a onebox install. (Y/n)
n
|___ ADMIRAL_IP not set
|___ Setting value of admiral IP address
|___ List of your machine IP addresses including default:
|___ 1 IP addresses available for the host
|___ 1 - (127.0.0.1)
|___ 2 - (172.17.0.2)
|___ Please pick one of the IP addresses from the above list by selecting the index (1, 2, etc) or enter a custom IP```
```

Enter or select the IP address of **Server 1**.

```
2
|___ 172.17.0.2 was selected as admiral IP
|___ Admiral IP is set to 172.17.0.2
|___ Setting value of database IP address
|___ Do you want to install the database on this machine? (Y/n)
```

Choose `n`.

```
n
|___ Please enter the IP address of the database
```

Enter the IP address of `Server 2`.

```
54.210.100.250
|___ Enter I to install a new database or E to use an existing one.
|___ Existing databases must be Postgres 9.5 and have a user named apiuser with full permissions on a database named shipdb.
```

Enter `I`.

```
I
|___ A new database will be installed
|___ DB_PORT is not set
|___ Setting value of database port
|___ DB_PASSWORD is not set
|___ Setting database password
|___ Please enter the password for your database. This password will also be used for gitlab & rabbitmq, by default. This can be changed from the Admiral UI, if required.
```

Enter a password that is easy to remember.

```
I
|___ A new database will be installed
|___ DB_PORT is not set
|___ Setting value of database port
|___ DB_PASSWORD is not set
|___ Setting database password
|___ Please enter the password for your database. This password will also be used for gitlab & rabbitmq, by default. This can be changed from the Admiral UI, if required.
database1234
|___ PUBLIC_IMAGE_REGISTRY already set, skipping
|___ These values are easy to set now, but hard to change later! Please confirm that they are correct:
Admin Panel Address:      34.230.29.178
Database Address:         54.172.2.206
Database Type:            New
Database Port:            5432
Database Password:        ************
Onebox mode:               false
|___ Enter Y to confirm or N to re-enter these values.
```

Enter `Y`.

```
Y
|___ Confirmation received
|___ Saving values
|___ Saved admin panel address
|___ Saved database address
|___ Saved database installation type
|___ Saved database port
|___ Saved database password
|___ Saved onebox configuration
|___ Run the following command on 54.172.2.206 to allow SSH access:
sudo mkdir -p /root/.ssh; echo ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQClMhyMvcE6gBv7e2SzbQywlkRY0i40qb417+NlWvfzjktv6qFNSF5qhdjXh+9FBFjYMRY5H3brQVH8GeYjhGrYE5s39oAPduSfYvp3kuUzGW2GD/goXtB6c9UkAPGkXpd5ZALKsUDgBQ+9Jpjd7JH6AGBoAyxYDBUTq1Qptzygzt8ePKEVsxAekiBRxoN2JfHY0ejn11VFyoqDDotUiSdof29bm7gmjRds8Cc6xdwuG9n3On4OkSbyxYp4n/kScGI3rGBh5Y0TfbLZxr6AzOTDkq6JSCdwgFHFZ08s57APvIOX02mY5tfdISQh2dfhAtDXI0HjX0y4wIjh9HbPPaHR root@ip-172-31-17-36 | sudo tee -a /root/.ssh/authorized_keys;
|___ Enter Y to confirm that you have run this command
```

Enter **Y** after you run the command on **Server 2**.

Admiral will continue running for a bit and install a whole bunch of things. You will see a message like this once Admiral installation completes.

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


###3. Initialize Control plane

*  First, you need to connect to the Admiral web app in your browser by entering IP address and port, for example `http://54.172.2.206:50003`. It might be a good idea to bookmark this Admiral URL.

* Enter the admin token.

<img src="/images/platform/tutorial/server/admiral-login.png">

* You will see a page like this, which indicates that none of the server components are initialized yet:

<img src="/images/platform/tutorial/server/controlplane-two-server-1.png">.

* No changes are needed for the **SWARM** section.

* For the **Secrets** section, change the password if you so want to. Select **New Node**. Enter the IP address of **Server 2**. Check the box below the command, since we have already run the command earlier while installing the database on **Server 2**. Click on **Save changes**.

<img src="/images/platform/tutorial/server/controlplane-two-server-2.png" alt="admiral-two-server-install-secrets">

* For the **Messaging** section, select **This Node** and change the password if you want to.

* For the **State** section, change the password if you so want to. Select **New Node**. Enter the IP address of **Server 2**. Check the box below the command, since we have already run the command earlier while installing the database on **Server 2**..

<img src="/images/platform/tutorial/server/controlplane-two-server-3.png" alt="admiral-two-server-install-state">

* For the **Redis** section, select **This Node** and change the password if you want to.

* Click on **Apply**.

* Click `Yes`.

<img src="/images/platform/tutorial/server/controlpane-accept.png">

* Admiral will now start initializing all the components such as Database, Redis etc. If you scroll up, you can see the state of all the components in the `Summary` panel.

<img src="/images/platform/tutorial/server/controlplane-two-server-4.png">

* Once initialization is complete, you should see `Initialized` status for these sections (after collapsing those section panes).

<img src="/images/platform/tutorial/server/controlpane-5.png">

If anything shows **failed** status, read the [**Troubleshooting**](#troubleshooting) section at the bottom of this page for tips. If you still run into issues, please contact us [over email](mailto:support@shippable.com) or through a [github issue](https://github.com/Shippable/support/issues).

* Expand the **Authorization and Source Control Management (SCM) Providers** section. You will need to configure one
authorization provider.

* For **GitHub**, follow instructions on the [GitHub configuration page](/platform/server/auth-source-control/#github)

* For **GitHub Enterprise**, follow instructions on the [GitHub Enterprise configuration page](/platform/server/auth-source-control/#github-enterprise)

* For **Bitbucket Server**, follow instructions on the [Bitbucket Server configuration page](/platform/server/auth-source-control/#bitbucket-server)

* For **Bitbucket Cloud**, follow instructions on the [Bitbucket Cloud configuration page](/platform/server/auth-source-control/#bitbucket-cloud).

* For **Gitlab (Cloud, CE, EE)**, follow instructions on the [GitLab configuration page](/platform/server/auth-source-control/#gitlab-cloud-ce-eeb).

* Click **Apply**.

###3. Initialize Build plane

* Click on `Build plane` in the left navigation bar.

* Expand the `BUILD CONFIGURATION` panel and change any settings you might want to change. The default settings will also work.

<img src="/images/platform/tutorial/server/buildplane-1.png">

* You need nodes to run your jobs. For more on different node types and detailed instructions on choosing and configuring a type, please read our docs on [Choosing and configuring a node type](/platform/server/build-config/#choosing-node-types)

* Choose the appropriate `Default cluster type`, which is the operating system and version of your build nodes. For example, if you want to build your repositories on a Ubuntu 16.04 build machine, you would choose `custom__x86_64_Ubuntu_16.04`. Do not choose any type starting with `dynamic`.

<img src="/images/platform/tutorial/server/buildplane-cluster.png">

* Scroll down and set `default build timeout` in the `Settings` panel.

 <img src="/images/platform/server/shippable-server-timeout.png" alt="Admiral-2-server">

This is the default time(in milliseconds) after which you want your CI and runSh jobs to timeout. This timeout is used when your [CI project](/platform/management/project/settings/), [runSh job](/platform/workflow/job/runsh/), the [Node Pool](/platform/management/subscription/node-pools/) on which the CI or runSh job is running and [Subscription](/platform/management/subscription/settings/) do not have any timeout specified.
Timeout values are given preference in the order `Job(CI or runSH) level timeout > Node Pool level timeout > Subscription level timeout > Default timeout`.

**NOTE:** Please note that the actual default timeout value applied to your jobs is **twice** of the value you specified in the setting above.

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

<img src="/images/platform/server/admiral-system-settings.png" alt="admiral-system-settings">

* Paste the Account id and click **Add**.

<img src="/images/platform/tutorial/server/systemsettings-2.png" alt="Admiral-github">

###6. Create a Shared Node pool to run builds

* Switch back to the Shippable Server UI in your browser and click refresh. You will now see an `Admin` dropdown at the bottom of the left navigation bar.

<img src="/images/platform/server/admin-dropdown.png" height="512px" alt="Admiral-github">

* Expand `Admin->Nodes` and click on `Shared Node pools`.

<img src="/images/platform/server/shared-node-pool-option.png" height="512px" alt="Admiral-github">

* Click on the `+` button on the top right corner of the screen.

<img src="/images/platform/server/shared-node-pool.png" alt="Admiral-github">

* Create a Node pool using instructions found [here](/platform/management/subscription/node-pools/#creating-a-node-pool).

* Click on the `Add node` button to add a build node using instructions found [here](http://docs.shippable.com/platform/management/subscription/node-pools/#creating-a-node-pool).

* Now you can [run a sample CI project](/getting-started/ci-sample/), [setup Continuous Delivery](/getting-started/cd-sample/) or [enable your first CI project for your repository](/ci/enable-project/).

## Advanced options

- [Database (Postgres) config](/platform/server/install-db)
- [Secrets (Vault) config](/platform/server/install-vault)
- [Redis config](/platform/server/install-redis)
- [RabbitMQ config](/platform/server/install-rabbitmq)
- [Swarm config](/platform/server/install-swarm-workers)
- [Managing node types](/platform/server/build-config/#choosing-node-types)
