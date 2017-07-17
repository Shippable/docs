page_main_title: Shippable installer
main_section: Reference
sub_section: Admiral
page_title: Shippable Server installation with 3 servers and an existing database.
page_description: Shippable Server installation with 3 servers and an existing database.

# Shippable Server EE Edition - three server installation scenario with an existing database.

Shippable Server EE comprises of the following -

* Stateless micro services
* Stateful Components - Database(Postgres), Secret Store and SCM.
* Transient State Components - Redis and RabbitMQ
* Shippable Server Installer and webapp (Admiral)

This document describes the steps to install Shippable Server EE onto three servers -

* **Server 1** - Admiral web app, micro services
Machine minimum requirements - [C4.XLarge](https://aws.amazon.com/ec2/instance-types/) or equivalent
* **Server 2** - Stateful Components (sans database)
Machine minimum requirements - [C4.Large](https://aws.amazon.com/ec2/instance-types/) or equivalent
* **Server 3** - Transient state
Machine minimum requirements - [T2.medium](https://aws.amazon.com/ec2/instance-types/) or equivalent
* **Server 4** - Existing Database


##Server 4
###Ports to open
- 5432: default database port. If your database is listening for connections on another port, please open this
port to Server 1.

###Prerequisites
- Database must be `Postgres` version `9.5` or higher.
- Database must have a user called `apiuser`.
- User `apiuser` must have full privileges on a database called `shipdb`.

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
* Ensure you have the installer access key, secret and public ip address of the database machine.
Admiral will download all the images and created tables on your database.
* During installation, specify `E` when Admiral prompts you for information regarding your database.

```
sudo ./admiral.sh install
```
As an example,

```
ubuntu@ip-172-31-29-44:~/admiral$ sudo ./admiral.sh install
|___ ADMIRAL_ENV does not exist, creating
'/home/ubuntu/admiral/common/scripts/configs/admiral.env.template' -> '/etc/shippable/admiral.env'
|___ Successfully created admiral env
|___ SSH keys not available, generating
|___ SSH keys successfully generated

# 01:49:57 #######################################
# Shippable Server Software License Agreement
##################################################
|___ BY INSTALLING OR USING THE SOFTWARE, YOU ARE CONFIRMING THAT YOU UNDERSTAND THE SHIPPABLE SERVER SOFTWARE LICENSE AGREEMENT, AND THAT YOU ACCEPT ALL OF ITS TERMS AND CONDITIONS.
|___ This agreement is available for you to read here: /home/ubuntu/admiral/SHIPPABLE_SERVER_LICENSE_AGREEMENT
|___ Do you wish to continue? (Y to confirm)
Y
|___ Thank you for accepting the Shippable Server Software License Agreement. Continuing with installation.

# 01:49:58 #######################################
# Validating runtime
##################################################
|___ Using release: master
|___ Updating RELEASE in ADMIRAL_ENV file
|___ LOGIN_TOKEN not defined, generating
|___ Generating login token
|___ Successfully generated login token
|___ Updating LOGIN_TOKEN in ADMIRAL_ENV file
|___ LOGIN_TOKEN updated in ADMIRAL_ENV file
|___ Services: /home/ubuntu/admiral/common/scripts/configs/services.json

# 01:49:58 #######################################
# Collecting required information
##################################################
|___ ACCESS_KEY is not set
|___ If you don't have an access key, you can obtain one by contacting us at www.shippable.com/contact.html
|___ Setting installer access key
|___ Please enter the provided installer access key.
AKIAIOVYCZYM6FZVAAVA
|___ SECRET_KEY is not set
|___ If you don't have a secret key, you can obtain one by contacting us at www.shippable.com/contact.html
|___ Setting installer secret key
|___ Please enter the provided installer secret key.
zD5SlYSO99OIFhAsBjIpeIlxKIu8rOnbwmwaF0/g
|___ ADMIRAL_IP not set
|___ Setting value of admiral IP address
|___ Please enter your current IP address. This will be the address at which you access the installer webpage. Type D to set default (127.0.0.1) value.
52.72.112.131
|___ Setting value of database IP address
|___ Please enter the IP address of the database or D to set the default (52.72.112.131).
54.84.214.94
|___ Enter I to install a new database or E to use an existing one.
|___ Existing databases must be Postgres 9.5 and have a user named apiuser with full permissions on a database named shipdb.
E
|___ An existing database will be used for this installation
|___ DB_PORT is not set
|___ Setting value of database port
|___ Please enter the database port or D to set the default (5432).
5432
|___ DB_PASSWORD is not set
|___ Setting database password
|___ Please enter the password for your database.
database123
|___ PUBLIC_IMAGE_REGISTRY already set, skipping
|___ These values are easy to set now, but hard to change later! Please confirm that they are correct:
Installer Access Key:     ********************
Installer Secret Key:     *****************************************
Admin Panel Address:      52.72.112.131
Database Address:         54.84.214.94
Database Type:            Existing
Database Port:            5432
Database Password:        ***********
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

# 02:01:09 #######################################
# Checking database connection
##################################################
|___ 'psql' already installed
|___ Checking connection to database
|___ Successfully connected to database
# 02:01:09 #######################################
# Checking dependencies
##################################################
|___ 'rsync' already installed
|___ 'ssh' already installed
|___ 'jq' already installed
|___ 'docker' already installed, checking version
|___ 'docker' 1.13 installed
|___ 'awscli' already installed
|___ 'psql' already installed

# 02:01:09 #######################################
# Pulling latest service images
##################################################
|___ Registry: drydock
|___ Pulling drydock/admiral:master
master: Pulling from drydock/admiral
3f992ab3df53: Already exists
0aa0bd28396f: Already exists
db7bb15088de: Already exists
1b6d2bb5ddaa: Already exists
a2bc8c956e6b: Already exists
a55235f8d0e2: Already exists
e26663b90d00: Already exists
a3ed95caeb02: Already exists
d67322272cee: Already exists
c032a9685db7: Already exists
53a41759f477: Already exists
50e38be21e5d: Already exists
f9a9a6c7539c: Already exists
8bfb05529564: Already exists
Digest: sha256:824a75d13c45c0b6a8c42e093b97a78c959384484e2b6d56b35051a0750c4fc7
Status: Image is up to date for drydock/admiral:master
|___ Pulling drydock/postgres:master
master: Pulling from drydock/postgres
6d827a3ef358: Already exists
9d7f5459c169: Already exists
ecb14191664d: Already exists
ecd885727396: Already exists
e1fc7408190a: Already exists
a3cf57a1b661: Already exists
ed067dfd9fa0: Already exists
b521d237ee60: Already exists
3ee512509160: Already exists
ab834064cf65: Already exists
7778ac4a9d29: Already exists
922b16efeda5: Already exists
32dce215f75d: Already exists
Digest: sha256:00911147112362cc67cb1490039dc916eae0cea4741f0b6a0852701fc315a3d6
Status: Image is up to date for drydock/postgres:master
|___ Pulling drydock/vault:master
master: Pulling from drydock/vault
b7f33cc0b48e: Already exists
b5786273e234: Already exists
6dd88ede0189: Already exists
cda17f6b9c66: Already exists
Digest: sha256:7d60371feac084885fc1184e557bb8bed038d9790d1643cf5e58428e3392fcf1
Status: Image is up to date for drydock/vault:master
|___ Pulling drydock/rabbitmq:master
master: Pulling from drydock/rabbitmq
Digest: sha256:06029b5b911c909c88a546d3a2084581f2c82397355b1515ddd3a8d23986d65e
Status: Image is up to date for drydock/rabbitmq:master
|___ Pulling drydock/gitlab:master
master: Pulling from drydock/gitlab
90d6565b970a: Already exists
40553bdb8474: Already exists
c3129e7479ab: Already exists
091663bd70db: Already exists
a3ed95caeb02: Already exists
ac80df74458a: Already exists
a6f41c12c491: Already exists
5e281a69c9c2: Already exists
f4ac5cb23241: Already exists
aca34f4fa14d: Already exists
7e4ca84c2821: Already exists
Digest: sha256:2291f2273b6a19aa6bb4ef6d13c2cfe1815648543fd9865c5953cbb0311a657b
Status: Image is up to date for drydock/gitlab:master
|___ Pulling drydock/redis:master
master: Pulling from drydock/redis
Digest: sha256:2aa91693d8c9581d3e4c538f7cd447dc6319d66cd06eff2dfad54a6d88143659
Status: Image is up to date for drydock/redis:master
|___ Registry: 374168611083.dkr.ecr.us-east-1.amazonaws.com
|___ Updating docker credentials to pull Shippable images
'/tmp/credentials' -> '/home/ubuntu/.aws/credentials'
|___ Docker login generated, logging into ecr
Flag --email has been deprecated, will be removed in 1.14.
Login Succeeded
|___ Pulling 374168611083.dkr.ecr.us-east-1.amazonaws.com/api:master
master: Pulling from api
3f992ab3df53: Already exists
0aa0bd28396f: Already exists
db7bb15088de: Already exists
1b6d2bb5ddaa: Already exists
a2bc8c956e6b: Already exists
a55235f8d0e2: Already exists
e26663b90d00: Already exists
a3ed95caeb02: Already exists
d67322272cee: Already exists
c032a9685db7: Already exists
734097f41273: Already exists
690b96ca7374: Already exists
cb3ae2d283e2: Already exists
5df541b00cde: Already exists
Digest: sha256:a7f1c944e9d3e3c0c9e2c6739d0291c2f8344836b4505f6f56c2f0b4bb853468
Status: Image is up to date for 374168611083.dkr.ecr.us-east-1.amazonaws.com/api:master
|___ Pulling 374168611083.dkr.ecr.us-east-1.amazonaws.com/www:master
master: Pulling from www
3f992ab3df53: Already exists
0aa0bd28396f: Already exists
db7bb15088de: Already exists
1b6d2bb5ddaa: Already exists
a2bc8c956e6b: Already exists
a55235f8d0e2: Already exists
e26663b90d00: Already exists
a3ed95caeb02: Already exists
d67322272cee: Already exists
c032a9685db7: Already exists
2fcb66bb9bf1: Already exists
889bb59b645c: Already exists
a56467587ead: Already exists
58f22f26020c: Already exists
Digest: sha256:bee64195f3d66943a9b4cf12cecc7b1598051253edbad8e02aa5b8ab61331c9a
Status: Image is up to date for 374168611083.dkr.ecr.us-east-1.amazonaws.com/www:master
|___ Pulling 374168611083.dkr.ecr.us-east-1.amazonaws.com/micro:master
master: Pulling from micro
3f992ab3df53: Already exists
0aa0bd28396f: Already exists
db7bb15088de: Already exists
1b6d2bb5ddaa: Already exists
a2bc8c956e6b: Already exists
a55235f8d0e2: Already exists
e26663b90d00: Already exists
a3ed95caeb02: Already exists
d67322272cee: Already exists
c032a9685db7: Already exists
2723661ccb05: Already exists
46fe5def9dab: Already exists
Digest: sha256:f1adf3a62ccbc35e867c7c32122604b9529e22bcee4cc8ea790f534b3a1f13af
Status: Image is up to date for 374168611083.dkr.ecr.us-east-1.amazonaws.com/micro:master
|___ Pulling 374168611083.dkr.ecr.us-east-1.amazonaws.com/mktg:master
master: Pulling from mktg
3f992ab3df53: Already exists
0aa0bd28396f: Already exists
db7bb15088de: Already exists
1b6d2bb5ddaa: Already exists
a2bc8c956e6b: Already exists
a55235f8d0e2: Already exists
e26663b90d00: Already exists
a3ed95caeb02: Already exists
d67322272cee: Already exists
c032a9685db7: Already exists
384c414d3993: Already exists
849b957fb6a5: Already exists
e2238bde329e: Already exists
c828851cfec8: Already exists
Digest: sha256:e694b9ea5e4e06abfe56700ff28dc4039843e229cd7241c627e1a38d90a0c070
Status: Image is up to date for 374168611083.dkr.ecr.us-east-1.amazonaws.com/mktg:master
|___ Pulling 374168611083.dkr.ecr.us-east-1.amazonaws.com/nexec:master
master: Pulling from nexec
3f992ab3df53: Already exists
0aa0bd28396f: Already exists
db7bb15088de: Already exists
1b6d2bb5ddaa: Already exists
a2bc8c956e6b: Already exists
a55235f8d0e2: Already exists
e26663b90d00: Already exists
a3ed95caeb02: Already exists
d67322272cee: Already exists
c032a9685db7: Already exists
e59cd1338972: Already exists
968ce64d1083: Already exists
1a0c17f0814d: Already exists
Digest: sha256:af5f3814a8a3e76adfdee8c85d586705e29038b9e6c3e87c6767ee5369178995
Status: Image is up to date for 374168611083.dkr.ecr.us-east-1.amazonaws.com/nexec:master

# 02:01:11 #######################################
# Pulling latest service images on workers
##################################################
|___ DB installed, checking initialize status
|___ 'systemSettings' table exists, finding workers
|___ Found 1 workers
|___ Images already pulled on admiral host, skipping

# 02:01:11 #######################################
# Installer runtime variables
##################################################
|___ RELEASE: master
|___ IS_UPGRADE: false
|___ NO_PROMPT: false
|___ ADMIRAL_IP: 52.72.112.131
|___ DB_IP: 54.84.214.94
|___ DB_PORT: 5432
|___ DB_USER: apiuser
|___ DB_PASSWORD: 11
|___ DB_NAME: shipdb
|___ Login Token: bc01004d-aa89-4c27-a79d-6d15c1292c29

# 02:01:11 #######################################
# Installing database
##################################################
|___ Validating db ENV variables
|___ Validating db data mounts from host
|___ Creating data directory /var/lib/shippable/db/data
|___ Creating config directory /etc/shippable/db/
|___ Skipping database installation
|___ Creating a test table to verify database connection
CREATE TABLE
|___ Dropping a test table
DROP TABLE
|___ Successfully tested connection to 54.84.214.94 5432

# 02:01:11 #######################################
# Creating vault table in database
##################################################
|___ Validating vault store script
|___ Vault config dir not present, creating
|___ Upserting vault store in db
psql:/home/ubuntu/admiral/common/scripts/configs/vault_kv_store.sql:7: NOTICE:  relation "vault_kv_store" already exists, skipping
CREATE TABLE
psql:/home/ubuntu/admiral/common/scripts/configs/vault_kv_store.sql:8: NOTICE:  relation "parent_path_idx" already exists, skipping
CREATE INDEX
ALTER TABLE

# 02:01:11 #######################################
# Booting Admiral UI
##################################################
|___ Checking if admiral is running
|___ Generating admiral ENV variables
|___ Generating admiral mounts
5b1fa1504d239b570460ff016e10430803792169d582a37e12d4c799b2825d23
|___ Admiral container successfully running
|___ Go to 52.72.112.131:50003 to access the admin panel
|___ Login Token: bc01004d-aa89-4c27-a79d-6d15c1292c29
|___ Command successfully completed !!!
```

###3. Connect to Admiral web app in your browser.
* You will see a message like this once Admiral installation completes.
```
# 02:01:11 #######################################
# Booting Admiral UI
##################################################
|___ Checking if admiral is running
|___ Generating admiral ENV variables
|___ Generating admiral mounts
5b1fa1504d239b570460ff016e10430803792169d582a37e12d4c799b2825d23
|___ Admiral container successfully running
|___ Go to 52.72.112.131:50003 to access the admin panel
|___ Login Token: bc01004d-aa89-4c27-a79d-6d15c1292c29
|___ Command successfully completed !!!
```
* Launch the browser and navigate to the specified host and port.
* Select `New Node` check box for the `Secrets` and `State` sections. Specify IP address of **Server 2** and password wherever required for the above two sections. Run the script on Server 2.

* Select `New Node` check box for the `Messaging` and `Redis` sections. Specify IP address
of **Server 3** and password wherever required. Run the script on Server 3.

* Click on `Initialize`.
* Once initialization is complete, you should see `Initilized` status for every section in the
`Initialize Infrastructure` section.

<img src="/images/reference/admiral/Admiral-2server-2.png" alt="Admiral-2-server">

###4. Specify Authorization and Source Control Management (SCM) Providers
* Click on `Configure & Install`.
* In the `Authorization and Source Control Management (SCM) Providers` section, select and configure one
authorization provider.
* As an example, we will configure GitHub.
* Click `Install`.

<img src="/images/reference/admiral/Admiral-github.png" alt="Admiral-github">

###5. Configure Services
* Click on `Services`.
* Configure the #replicas (or use the default values) and click `Save`.

###6. Configure add-ons
* Click on `Add-ons`
* Select the account integrations (you can always enable / disable) add-ons later.
* Click `Install Add-ons`

###7. Login to Shippable Server and setup Super user account.
* Login to Shippable server with your admin account for the SCM provider.You should see your team/organizations/repositories sync. To find the Login URL, click on `Configure and Install`. The URL is in the `Shippable UI` section.

<img src="/images/reference/admiral/Admiral-login.png" alt="Admiral-github">

* After Logging in, grant permissions in the OAuth dialog.
* Click to `Profile` in the left sidebar and note down the `Account Id` at the bottom of the screen.

<img src="/images/reference/admiral/Admiral-accountid.png" alt="Admiral-github">

* Switch back to Admiral and scroll the screen all the way down to the `Manage System SuperUsers` section.
* Paste the Account id and click Add.

<img src="/images/reference/admiral/Admiral-superuser.png" alt="Admiral-github">

###8. Setup System or BYON node.
* After step 7, login to Shippable Server as super user account.
* If you choose the default option of `Enable system nodes` and `Enabled custom nodes`, you will need to
setup the system or custom nodes to run your builds as well as runSh, and runCLI jobs.
* System nodes are system wide and can be used by any subscription for CI jobs. Custom nodes are added for a particular subscription and can only be used for builds in that subscription.
* To setup Custom nodes, go [here](http://docs.shippable.com/getting-started/byon-manage-node/).
* To setup System nodes, click on Admin -> Nodes -> System and click on '+' button. Follow the instructions
on that screen.
