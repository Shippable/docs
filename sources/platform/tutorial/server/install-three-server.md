page_main_title: Shippable installer
main_section: Platform
sub_section: Tutorials
sub_sub_section: Shippable Server
page_title: Shippable Server installation with 3 servers
page_description: Shippable Server installation with 3 servers

# Shippable Server EE Edition - three server installation scenario


* Stateless micro services
* Stateful Components - Database(Postgres), Secret Store and SCM.
* Transient State Components - Redis and RabbitMQ
* Shippable Server Installer and webapp (Admiral)

This document describes the steps to install Shippable Server EE onto three servers -

* **Server 1** - Admiral web app, micro services

Machine minimum requirements - [C4.XLarge](https://aws.amazon.com/ec2/instance-types/) or equivalent
* **Server 2** - Stateful Components

Machine minimum requirements - [C4.Large](https://aws.amazon.com/ec2/instance-types/) or equivalent
* **Server 3** - Transient state

Machine minimum requirements - [T2.medium](https://aws.amazon.com/ec2/instance-types/) or equivalent

##Server 3
###Ports to open
- 22: ssh into the machine
- 5672: amqp
- 15672: amqp admin
- 6379: redis
- 443, 5671 and 15671: required to access the message queue admin panel and for build nodes to connect if they belong to a different VPC than the one in which the message queue is provisioned.

##Server 2
###Ports to open
- 22: ssh into the machine
- 80: internal gitlab server api endpoint
- 443: internal gitlab server secure api endpoint
- 2222: internal gitlab server ssh port
- 5432: database
- 8200: vault

##Server 1
###Ports to open
- 22: ssh into the machine
- 50000: Shippable api
- 50001: Shippable post-login ui
- 50002: Shippable pre-login ui
- 50003: Shippable admin panel

###Packages to be pre-installed
Git and SSH must be installed before running Admiral.  Install these by running the following on the instance:
```
$ sudo apt-get update
$ sudo apt-get install git-core ssh
```

##1. Install Shippable Server Installer (Admiral)
SSH into Server 1 and run the following commands.

```
$ git clone https://github.com/Shippable/admiral.git
$ cd admiral
$ git checkout <latest tag>
```

`ubuntu@ip-172-31-29-44:~$ git clone https://github.com/Shippable/admiral.git
Cloning into 'admiral'...
remote: Counting objects: 6100, done.
remote: Compressing objects: 100% (82/82), done.
remote: Total 6100 (delta 48), reused 73 (delta 23), pack-reused 5994
Receiving objects: 100% (6100/6100), 3.57 MiB | 0 bytes/s, done.
Resolving deltas: 100% (3997/3997), done.
Checking connectivity... done.
ubuntu@ip-172-31-29-44:~$ cd admiral/
ubuntu@ip-172-31-29-44:~/admiral$ git tag
v5.4.1
v5.4.2
v5.4.3
v5.4.4
v5.5.1
v5.5.2
v5.5.3
v5.5.4
v5.5.5
v5.6.1
v5.6.2
v5.6.3
v5.6.4
v5.6.5
v5.7.1
ubuntu@ip-172-31-29-44:~/admiral$ git checkout -b v5.7.1
Switched to a new branch 'v5.7.1'
ubuntu@ip-172-31-29-44:~/admiral$ git branch
  master
* v5.7.1`

##2. Launch Admiral to install Shippable Server EE
Ensure you have the installer access key, secret and public ip address of the state machine.
Admiral will install the postgres database in this step and download all the images. You will be asked to run
a specific script on Server 2 during this step to authorize ssh access for Server 1.

```
sudo ./admiral.sh install
```
As an example,

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
Y
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
XXXXXXXXXXXX
|___ SECRET_KEY is not set
|___ If you don't have a secret key, you can obtain one by contacting us at www.shippable.com/contact.html
|___ Setting installer secret key
|___ Please enter the provided installer secret key.
XXXXXXXXXXXX
|___ ADMIRAL_IP not set
|___ Setting value of admiral IP address
|___ Please enter your current IP address. This will be the address at which you access the installer webpage. Type D to set default (127.0.0.1) value.
52.72.112.131
|___ Setting value of database IP address
|___ Please enter the IP address of the database or D to set the default (52.72.112.131).
174.129.68.195
|___ Enter I to install a new database or E to use an existing one.
|___ Existing databases must be Postgres 9.5 and have a user named apiuser with full permissions on a database named shipdb.
I
|___ A new database will be installed
|___ DB_PORT is not set
|___ Setting value of database port
|___ DB_PASSWORD is not set
|___ Setting database password
|___ Please enter the password for your database.
database123
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
|___ Enter Y to confirm or N to re-enter these values.
Y
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
Y
|___ Confirmation received

# 21:51:59 #######################################
# Checking dependencies
##################################################
```

Once Postgres is installed, you will see a message like this -

You will see a message like this -
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

###3. Connect to Admiral web app in your browser.
* You will see a message like this once Admiral installation completes.
```
# 22:05:48 #######################################
# Booting Admiral UI
##################################################
|___ Checking if admiral is running
|___ Generating admiral ENV variables
|___ Generating admiral mounts
a52aa954c202c917cf6bd09d544f9818debe949816e02b7fc38c6e53b98cd511
|___ Admiral container successfully running
|___ Go to 52.72.112.131:50003 to access the admin panel
|___ Login Token: 16a31009-0faa-460d-957a-0a98740fa1e4
|___ Command successfully completed !!!
```
* Launch the browser and navigate to the specified host and port.
* Select `New Node` check box for the `Secrets` and `State` sections. Specify IP address of **Server 2** and password wherever required for the above two sections. Run the script on Server 2.

* Select `New Node` check box for the `Messaging` and `Redis` sections. Specify IP address
of **Server 3** and password wherever required. Run the script on Server 3.

* Click on `Initialize`.
* Once initialization is complete, you should see `Initilized` status for every section in the
`Initialize Infrastructure` section.

<img src="/images/platform/admiral/Admiral-2server-2.png" alt="Admiral-2-server">

###4. Specify Authorization and Source Control Management (SCM) Providers
* Click on `Configure & Install`.
* In the `Authorization and Source Control Management (SCM) Providers` section, select and configure one
authorization provider.
* As an example, we will configure GitHub.
* Click `Install`.

<img src="/images/platform/admiral/Admiral-github.png" alt="Admiral-github">

##5. Enabling caching
To enable caching, navigate to the `Build configuration` section in the `Configure and Install` panel. Select the `Upload artifacts to AWS` option. Click on `Save` and `Restart Services`. To learn more about the benefits of caching, go [here](/platform/tutorial/runtime/caching/#caching).

###6. Configure Services
* Click on `Services`.
* Configure the #replicas (or use the default values) and click `Save`.

###7. Configure add-ons
* Click on `Add-ons`
* Select the account integrations (you can always enable / disable) add-ons later.
* Click `Install Add-ons`

###8. Login to Shippable Server and setup Super user account.
* Login to Shippable server with your admin account for the SCM provider.You should see your team/organizations/repositories sync. To find the Login URL, click on `Configure and Install`. The URL is in the `Shippable UI` section.

<img src="/images/platform/admiral/Admiral-login.png" alt="Admiral-github">

* After Logging in, grant permissions in the OAuth dialog.
* Click to `Profile` in the left sidebar and note down the `Account Id` at the bottom of the screen.

<img src="/images/platform/admiral/Admiral-accountid.png" alt="Admiral-github">

* Switch back to Admiral and scroll the screen all the way down to the `Manage System SuperUsers` section.
* Paste the Account id and click Add.

<img src="/images/platform/admiral/Admiral-superuser.png" alt="Admiral-github">

###9. Setup System or BYON node.
* After step 7, login to Shippable Server as super user account.
* If you choose the default option of `Enable system nodes` and `Enabled custom nodes`, you will need to
setup the system or custom nodes to run your builds as well as runSh, and runCLI jobs.
* System nodes are system wide and can be used by any subscription for CI jobs. Custom nodes are added for a particular subscription and can only be used for builds in that subscription.
* To setup Custom nodes, go [here](http://docs.shippable.com/getting-started/byon-manage-node/).
* To setup System nodes, click on Admin -> Nodes -> System and click on '+' button. Follow the instructions
on that screen.
