page_main_title: Shippable installer
main_section: Platform
sub_section: Tutorials
sub_sub_section: Shippable Server
page_title: Shippable Server installation with 2 servers
page_description: Shippable Server installation with 2 servers with persistent state on one machine and everything else on
another machine.

# Shippable Server EE edition - two server installation scenario

Shippable Server EE comprises of the following -

* Stateless micro services
* Stateful Components - PostgreSQL, Secret Store and GitLab server.
* Transient State Components - Redis and RabbitMQ
* Shippable Server Installer and webapp (Admiral)

This document describes the steps to install Shippable Server EE onto two servers -

* **Server 1** - Contains Admiral web app, transient state, micro services. Machine minimum requirements - [C4.XLarge](https://aws.amazon.com/ec2/instance-types/) or equivalent

* **Server 2** - Contains Stateful components. Machine minimum requirements - [C4.Large](https://aws.amazon.com/ec2/instance-types/) or equivalent

## Pre-requisites

### Open ports

Before we start, you need to open the following ports so that various Shippable Server components can communicate with each other.

#### Server 1
- 22: ssh into the machine
- 5672: amqp
- 15672: amqp admin
- 6379: redis
- 50000: Shippable api
- 50001: Shippable post-login ui
- 50002: Shippable pre-login ui
- 50003: Shippable admin panel
- 443, 5671 and 15671: required to access the message queue admin panel and for build nodes to connect if they belong to a different VPC than the one in which the message queue is provisioned.

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
$ sudo apt-get update
$ sudo apt-get install git-core ssh
```

If you are installing on an Ubuntu 14.04 machine and your kernel version is older than 3.19, you will need to update the kernel by running the following commands:

```
$ sudo apt-get update
$ sudo apt-get install linux-generic-lts-vivid
$ sudo reboot #restart is required after kernel upgrade
```

## Install Shippable Server

**Please make sure you have the Shippable Server Installer access key and secret key before starting the steps below. Contact us [via email](mailto:support@shippable.com) or through the [Server contact form](https://www.shippable.com/enterprise.html#shippable-server-contact) if you need access and secret keys.**

###1. Install Admiral

SSH into **Server 1** and run the following commands:

```
$ git clone https://github.com/Shippable/admiral.git
$ cd admiral
$ git checkout v5.11.1
```

You will see the following output:

```
ubuntu@ip-172-31-29-44:~$ git clone https://github.com/Shippable/admiral.git
Cloning into 'admiral'...
remote: Counting objects: 6100, done.
remote: Compressing objects: 100% (82/82), done.
remote: Total 6100 (delta 48), reused 73 (delta 23), pack-reused 5994
Receiving objects: 100% (6100/6100), 3.57 MiB | 0 bytes/s, done.
Resolving deltas: 100% (3997/3997), done.
Checking connectivity... done.
ubuntu@ip-172-31-29-44:~$ cd admiral/
ubuntu@ip-172-31-4-17:~/admiral$ git checkout v5.11.1
HEAD is now at 9018791... updating version.txt to v5.11.1
```

We have checked out tag v5.11.1, which is the latest tag available as of November 2017. To see previous versions and install a specific version, you can run `git tag` to see all the tags and then checkout the tag you want.

###2. Run Admiral CLI

Ensure you have the installer access key, secret, and public ip address of the state machine.
Admiral will install the Postgres database in this step and download all images. You will be asked to run
a specific script on **Server 2** during this step to authorize ssh access for **Server 1**.

Run the following command on **Server 1**:

```
$ sudo ./admiral.sh install
```

Follow the steps below:

```
ubuntu@ip-172-31-29-44:~/admiral$ sudo ./admiral.sh install
|___ Loading ADMIRAL_ENV from /etc/shippable/admiral.env
|___ SSH keys already present, skipping

# 21:48:29 #######################################
# Shippable Server Software License Agreement
##################################################
|___ BY INSTALLING OR USING THE SOFTWARE, YOU ARE CONFIRMING THAT YOU UNDERSTAND THE SHIPPABLE SERVER SOFTWARE LICENSE AGREEMENT, AND THAT YOU ACCEPT ALL OF ITS TERMS AND CONDITIONS.
|___ This agreement is available for you to read here: /home/ubuntu/admiral/SHIPPABLE_SERVER_LICENSE_AGREEMENT
|___ Do you wish to continue? (Y to confirm)
```
Type **Y** to proceed.

```
|___ Thank you for accepting the Shippable Server Software License Agreement. Continuing with installation.

# 21:48:31 #######################################
# Validating runtime
##################################################
|___ Using release: master
|___ Updating RELEASE in ADMIRAL_ENV file
|___ LOGIN_TOKEN already generated, skipping
|___ Services: /home/ubuntu/admiral/common/scripts/configs/services.json

# 21:48:31 #######################################
# Collecting required information
##################################################
|___ ACCESS_KEY is not set
|___ If you don't have an access key, you can obtain one by contacting us at www.shippable.com/contact.html
|___ Setting installer access key
|___ Please enter the provided installer access key.
```

Enter your access key

```
|___ SECRET_KEY is not set
|___ If you don't have a secret key, you can obtain one by contacting us at www.shippable.com/contact.html
|___ Setting installer secret key
|___ Please enter the provided installer secret key.
```

Enter your secret key

```
|___ ADMIRAL_IP not set
|___ Setting value of admiral IP address
|___ Please enter your current IP address. This will be the address at which you access the installer webpage. Type D to set default (127.0.0.1) value.
```
Enter the IP address of **Server 1** if you want to access the installer web page at that address. This can be the private IP address, or the public IP address if you've set up your network to grant access to incoming ports through the public IP.

Typing **D** will set the IP address to the default value of `127.0.0.1`.

```
|___ Setting value of database IP address
|___ Please enter the IP address of the database or D to set the default (52.72.112.131).
```

If you are not using an existing database, enter the private IP address of **Server 2** since that is where the database will be installed. This can also be the public IP address if you've set up your network to grant access to incoming ports through the public IP.

If you're using an existing database, enter the IP address of that database.

```
|___ Enter I to install a new database or E to use an existing one.
|___ Existing databases must be Postgres 9.5 and have a user named apiuser with full permissions on a database named shipdb.
```
Type **I** to install a new database, or **E** to use an existing one.

```
|___ A new database will be installed
|___ DB_PORT is not set
|___ Setting value of database port
|___ DB_PASSWORD is not set
|___ Setting database password
|___ Please enter the password for your database.
```

Enter a password that is easy to remember.

```
|___ PUBLIC_IMAGE_REGISTRY already set, skipping
|___ These values are easy to set now, but hard to change later! Please confirm that they are correct:
Installer Access Key:     ********************
Installer Secret Key:     *****************************************
Admin Panel Address:      52.72.112.131
Database Address:         174.129.68.195
Database Type:            New
Database Port:            5432
Database Password:        ***********
|___ Enter Y to confirm or N to re-enter these values.
```

Enter **Y**.

```
|___ Confirmation received
|___ Saving values
|___ Saved access key
|___ Saved secret key
|___ Saved admin panel address
|___ Saved database address
|___ Saved database installation type
|___ Saved database port
|___ Saved database password
|___ Run the following command on 174.129.68.195 to allow SSH access:
sudo mkdir -p /root/.ssh; echo ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDG0dECmRM0AEdxdlo5IUk59o47Q2sciQxSFGfxTLwNxPLw6yx33+voa8tYUPSfug3XnA4SW8oZa704Us6FbNCRcPxD2rFJxMIoOl6dvm1B6dLfeugqTq97mXylZKmPSHpB2iB1DXGLxBuP1/RIea0pjdE2fR3uBY5OTcQgOZYKLKMZyqN0EUVapaCC/h7kfH10l5nqV4urSNI0D6C2m+wwJNsBmIrp+rWgJ4Tw4ka0wELFfG747xv69y1yTByHlAtseUwTyUbn8/gSz8vM6vS3Lxzfl9mgJzCh7lWz2K/PayFSe41uvgYiYtWWKl7aWWPu0S6qcoFQDznDVA92dJhF root@ip-172-31-29-44 | sudo tee -a /root/.ssh/authorized_keys;
|___ Enter Y to confirm that you have run this command
```

Enter **Y** after you run the command on **Server 2** or the machine where you have an existing database.

```
|___ Confirmation received

# 21:51:59 #######################################
# Checking dependencies
##################################################
```

Admiral will continue running for a bit and install a whole bunch of things. Once Postgres is installed, you will see a message like this -

```
#------------------------------------------------------
#----------- Shippable Postgres Config ----------------
#------------------------------------------------------
host all  all    0.0.0.0/0  md5
Starting Postgres
 * Starting PostgreSQL 9.5 database server
   ...done.
CREATE ROLE
CREATE ROLE
CREATE TABLESPACE
CREATE DATABASE
REVOKE
GRANT
~

# 22:05:47 #######################################
# Creating vault table in database
##################################################
|___ Validating vault store script
|___ Vault config dir already present
|___ Upserting vault store in db
CREATE TABLE
CREATE INDEX
ALTER TABLE
```

###3. Initialize Infrastructure

*  First, you need to connect to the Admiral web app in your browser. You will see a message like this once Admiral installation completes.

```
# 22:05:48 #######################################
# Booting Admiral UI
##################################################
|___ Checking if admiral is running
|___ Generating admiral ENV variables
|___ Generating admiral mounts
a52aa954c202c917cf6bd09d544f9818debe949816e02b7fc38c6e53b98cd511
|___ Admiral container successfully running
|___ Go to **52.72.112.131:50003** to access the admin panel
|___ Login Token: 16a31009-0faa-460d-957a-0a98740fa1e4
|___ Command successfully completed !!!
```

You can run `sudo ./admiral.sh info` at any time to retrieve your Login token and Admiral URL.

* Launch the browser and navigate to the specified host and port. Enter the admin token. It might be a good idea to bookmark the Admiral URL.

* The **Installer Access key** and **Installer Secret key** should be pre-populated. Do not change these.

<img src="/images/platform/tutorial/server/admiral-install-1.png" alt="Admiral-2-server">

* Leave the **Admiral environment** and **Database** sections as-is for now.

* For the **Secrets** section, select **New Node**. Enter the IP address of **Server 2**. Copy the command, run it on **Server 2**, and then check the box after you have run the command.

<img src="/images/platform/tutorial/server/admiral-install-2.png" alt="Admiral-2-server">

* For the **Messaging** section, leave the **This Node** selected, and then enter an easy to remember password.

<img src="/images/platform/tutorial/server/admiral-install-3.png" alt="Admiral-2-server">

*  For the **State** section, select **New Node**. Enter an easy-to-remember password and the IP address of **Server 2**. Copy the command, run it on **Server 2**, and then check the box after you have run the command.

<img src="/images/platform/tutorial/server/admiral-install-4.png" alt="Admiral-2-server">

* For **Redis** and **Swarm** sections, leave **This Node** checked.

<img src="/images/platform/tutorial/server/admiral-install-5.png" alt="Admiral-2-server">

* Click on **Initialize**.

* Once initialization is complete, you should see `Initialized` status for every section in the
**Initialize Infrastructure** section.

<img src="/images/platform/admiral/Admiral-2server-2.png" alt="Admiral-2-server">

If anything shows **failed** status, read the [**Troubleshooting**](#troubleshooting) section at the bottom of this page for tips. If you still run into issues, please contact us [over email](mailto:support@shippable.com) or through a [github issue](https://www.github.com/Shippable/issues).

###4. Configure Source Control Provider(s)

* Click on **Configure & Install**.

* Leave everything in the **Service Addresses** section as is.

* In the **Authorization and Source Control Management (SCM) Providers** section, you need to configure one
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

* For now, leave the **Build configuration**, **Email**, **IRC**, and **System Settings** as-is. We will come back to them later.

* Click **Install**.

* After the installation is complete, you will see two buttons. Click **Save** and again click **Save** on the confirmation dialog.

* Click on **Restart services** and click on **Yes** in the confirmation dialog.

###5. Enabling caching

You can turn on caching by following the steps below:

* Navigate to the **Build configuration** section in the **Configure and Install** panel.
* Select the **Upload artifacts to AWS** option and enter your AWS Access and Secret Keys.
* Click on **Save** and **Restart Services**.

To learn more about the benefits of caching, go [here](/platform/runtime/caching/#caching).

###6. Configure Services

By default, we run one copy of every microservice, which should be sufficient for most installations. You can skip this section and come back to it later if a specific service becomes a bottleneck.

* Click on **Services**.
* Configure the number of replicas (or use the default values) and click **Save**.

###7. Configure add-ons

If you want your users to be able to connect to third party services through [integrations](/platform/integration/overview), you need to configure them in this section.

* Click on **Add-ons**
* Select the account integrations you want to make available to your users.
* Click **Install Add-ons**.

###8. Setup superuser

* You will first need to log in to Shippable Server with your Admin account for the source control provider. To find the Server URL, look in the **Configure and Install->Service Addresses->Shippable UI** section of the Admiral UI:

 <img src="/images/platform/tutorial/server/shippable-server-url.png" alt="Admiral-2-server">

* From the Shippable Server URL, sign in to Shippable Server with your Admin account for the SCM provider, and authorize the application. You will need to click **Authorize** twice.

* You should see your team/organizations/repositories sync and appear under the **Subscriptions** section of the left navbar.

<img src="/images/platform/tutorial/server/shippable-left-navbar.png" alt="Admiral-2-server">

* Click **Profile** in the left sidebar and note down the `Account Id` at the bottom of the screen.

<img src="/images/platform/admiral/Admiral-accountid.png" alt="Admiral-github">

* Switch back to Admiral UI and scroll the screen all the way down to the **Manage System SuperUsers** section.

* Paste the Account id and click **Add**.

<img src="/images/platform/admiral/Admiral-superuser.png" alt="Admiral-github">

###9. Configure nodes.

You need nodes to run your jobs. The configuration for these is under the **Build configuration->Nodes** section under **Configure and Install**.

By default, a Server installation is configured to support **System Nodes** and **Custom Nodes**. You can turn on **Dynamic Nodes** if you want your nodes to be spun up on demand. We support AWS for dynamic nodes.

<img src="/images/platform/tutorial/server/default-nodes-config.png" alt="Admiral-2-server">

#### System nodes

System nodes are available for all subscriptions and projects across your installation and are always ON and waiting to pick up triggered jobs.

To configure system nodes, follow the instructions below:

* From the Shippable Server UI, click on **Admin** in the left navbar and click on **Nodes** and then on **System**.
* Click on **+** at the top right

<img src="/images/platform/tutorial/server/system-nodes.png" alt="Admiral-2-server">

* Follow instructions to add a node. You can follow guidelines [described at Step 6 onwards on the Add a node page](/platform/tutorial/runtime/custom-nodes/#adding-a-build-node)

* Repeat these steps for the number of system nodes you want to add.

#### Custom nodes

Custom nodes are added at a subscription level and are always ON and waiting to pick up triggered jobs. By default, any admin of a Subscription can add custom nodes.

To restrict addition of Custom Nodes to Shippable Server Admins, check the **Restrict custom node creation to admins only** checkbox in the Admiral UI.

To set up Custom nodes, sign in to Shippable Server with your admin credentials and [follow instructions here](http://docs.shippable.com/getting-started/byon-manage-node/).

#### Dynamic Nodes

Dynamic nodes are spun up when a job is triggered and spun down if no new job is triggered after some idle time. These are the most cost-effective in terms of infrastructure costs since they are not always ON, but are spun up on-demand.

However, please note that nodes on AWS need 2-4 minutes to be spun up, so you will have to live with that overhead for some builds when a fresh node needs to be spun up.

To enable **Dynamic nodes**:

* Check the **Enable dynamic nodes** checkbox
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
