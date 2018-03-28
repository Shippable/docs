page_main_title: Installing Shippable Server
main_section: Platform
sub_section: Shippable Server
sub_sub_section: Installation instructions
page_title: Installing Shippable Server
page_description: Install the Shippable CI/CD and DevOps platform behind your firewall
page_keywords: ci, continuous integration, devops, docker, on-premises


# Shippable Server installation guide

<img src="/images/platform/tutorial/server/admiral-network.png" alt="Admiral-github">

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
- 50000: Shippable API
- 50001: Shippable UI
- 50003: Shippable installer webapp

#### Server 2

- 22: ssh into the machine
- 5672: messaging
- 6379: redis
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

`ubuntu@ip-172-31-29-44:~$ git clone https://github.com/Shippable/admiral.git
Cloning into 'admiral'...
remote: Counting objects: 15276, done.
remote: Compressing objects: 100% (97/97), done.
remote: Total 15276 (delta 85), reused 105 (delta 58), pack-reused 15121
Receiving objects: 100% (15276/15276), 13.10 MiB | 12.15 MiB/s, done.
Resolving deltas: 100% (9106/9106), done.
ubuntu@ip-172-31-29-44:~$ cd admiral/
ubuntu@ip-172-31-4-17:~/admiral$ git checkout v6.3.4
HEAD is now at 9018791... updating version.txt to v6.3.4
`

We have checked out tag v6.3.4, which is the latest tag available as of March 2018. To see the complete list of versions and install a specific version, you can run `git tag` to see all the tags and then checkout the tag you want. Please note that versions more recent that v6.3.4, will be available April 2018 onwards and we recommend installing the latest version (which you can find out by running `git tag`).

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


54.210.100.250
|___ Enter I to install a new database or E to use an existing one.
|___ Existing databases must be Postgres 9.5 and have a user named apiuser with full permissions on a database named shipdb.
E
|___ An existing database will be used for this installation
|___ DB_PORT is not set
|___ Setting value of database port
|___ Please enter the database port or D to set the default (5432).
D
|___ DB_PASSWORD is not set
|___ Setting database password
|___ Please enter the password for your database. This password will also be used for gitlab & rabbitmq, by default. This can be changed from the Admiral UI, if required.
database1234
|___ PUBLIC_IMAGE_REGISTRY already set, skipping
|___ These values are easy to set now, but hard to change later! Please confirm that they are correct:
Admin Panel Address:      172.17.0.2
Database Address:         54.210.100.250
Database Type:            Existing
Database Port:            5432
Database Password:        ************
Onebox mode:               false
|___ Enter Y to confirm or N to re-enter these values.
Y






Enter a password that is easy to remember.

```
|___ Setting value of database IP address
|___ Please enter the IP address of the database or D to set the default (52.72.112.131).
```

For a fresh installation, enter the private IP address of **Server 2** since that is where the database should be installed. This can also be the public IP address if you've set up your network to grant access to incoming ports through the public IP.

```
|___ Enter I to install a new database or E to use an existing one.
|___ Existing databases must be Postgres 9.5 and have a user named apiuser with full permissions on a database named shipdb.
```
Type **I** to install a new database.

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

Enter **Y** after you run the command on **Server 2**.

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

If anything shows **failed** status, read the [**Troubleshooting**](#troubleshooting) section at the bottom of this page for tips. If you still run into issues, please contact us [over email](mailto:support@shippable.com) or through a [github issue](https://github.com/Shippable/support/issues).

###4. Configure Source Control Provider(s)

* Click on **Configure & Install**.

* Leave everything in the **Service Addresses** section as is.

* In the **Authorization and Source Control Management (SCM) Providers** section, you need to configure at least one
authorization provider. For instructions on completing this config, choose the provider(s) you want to configure:
    * [GitHub Enterprise](/platform/server/auth-source-control/#github-enterprise)
    * [GitHub](/platform/server/auth-source-control/#github)
    * [Bitbucket Server](/platform/server/auth-source-control/#bitbucket-server)
    * [Bitbucket Cloud](/platform/server/auth-source-control/#bitbucket-cloud)
    * [Gitlab](/platform/server/auth-source-control/#gitlab)

* For now, leave the **Build configuration**, **Email**, **IRC**, and **System Settings** as-is. We will come back to them later.

* Click **Install**.

* After the installation is complete, you will see two buttons. Click **Save** and again click **Save** on the confirmation dialog.

* Click on **Restart services** and click on **Yes** in the confirmation dialog.

Please note that if you make a mistake while entering the fields above and encounter a failure, you should correct the problem , click on **Save**, and then on **Restart services**.

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

###9. Configure nodes

You need nodes to run your jobs. The configuration for these is under the **Build configuration->Nodes** section under **Configure and Install**.

For more on different node types and detailed instructions on choosing and configuring a type, please read our docs on [Choosing and configuring a node type](/platform/server/build-config/#choosing-node-types)

###10. Set default timeout

 <img src="/images/platform/server/shippable-server-timeout.png" alt="Admiral-2-server">

This is the default time(in milliseconds) after which you want your CI and runSh jobs to timeout. This timeout is used when your [CI project](/platform/management/project/settings/), [runSh job](/platform/workflow/job/runsh/), the [Node Pool](/platform/management/subscription/node-pools/) on which the CI or runSh job is running and [Subscription](/platform/management/subscription/settings/) do not have any timeout specified.
Timeout values are given preference in the order `Job(CI or runSH) level timeout > Node Pool level timeout > Subscription level timeout > Default timeout`.

**NOTE:** Please note that the actual default timeout value applied to your jobs is **twice** of the value you specified in the setting above.

## Advanced options

- [Database (Postgres) config](/platform/server/install-db)
- [Secrets (Vault) config](/platform/server/install-vault)
- [Redis config](/platform/server/install-redis)
- [RabbitMQ config](/platform/server/install-rabbitmq)
- [Swarm config](/platform/server/install-swarm-workers)
- [Managing node types](/platform/server/build-config/#choosing-node-types)
