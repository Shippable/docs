page_main_title: Shippable installer
main_section: Platform
sub_section: Admiral
page_title: Admiral - Installing on a single machine
page_description: How to install Shippable
page_keywords: install, onebox, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Installing on One Machine

Shippable may be installed so that everything except build nodes run on one machine.  This is useful for server installations that are not used very heavily because it reduces the resources required.  For more information about the installer in general and other installation choices, see [admiral](admiral/).

## Requirements
One instance with:

- Ubuntu 14.04 LTS (Only Ubuntu 14.04 is supported at this time.)
- Kernel 3.19 (or above)
- 4 cores
- 8 GB memory
- 100 GB disk space

The following ports must be exposed on the instance:

- 22: ssh into the machine
- 80: internal gitlab server api endpoint
- 443: internal gitlab server secure api endpoint
- 2222: internal gitlab server ssh port
- 5432: database
- 5672: amqp
- 15672: amqp admin
- 6379: redis
- 8200: vault
- 50000: Shippable api
- 50001: Shippable post-login ui
- 50002: Shippable pre-login ui
- 50003: Shippable admin panel

If you are installing on a AWS Ubuntu 14.04 AMI, you may need to update the kernel.  The following commands will update to 3.19:
```
$ sudo apt-get update
$ sudo apt-get install linux-generic-lts-vivid
$ sudo reboot #restart is required after kernel upgrade
```

## Installing
Once you have provisioned an instance with the correct exposed ports and checked that you have a supported kernel (run `uname -r` to print the version if you're not sure), install `git` and `ssh`.  These are required to run the installer.
```
$ sudo apt-get update
$ sudo apt-get install git-core ssh
```

Then you can clone the Admiral repository.
```
$ git clone https://github.com/Shippable/admiral.git
```

Navigate to that repository and select the version you would like to install by checking out the appropriate tag.
```
ubuntu@ip-172-31-28-128:~/admiral$ git tag
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
```

To install v5.6.3, for example -

```
$ cd admiral
$ git checkout v5.6.3
```

And start the installer CLI:
```
$ ./admiral.sh install
```

Enter the installer access and secret keys when prompted.  These are provided by Shippable with a server license. If you don't have them, <a href="https://www.shippable.com/contact.html">contact us</a>.

Then enter the IP address of your instance for your current IP address.  In most cases this is the external address you used to SSH into the instance and needs to be accessible from the location(s) where you plan to use Shippable.

Enter "D" when asked for the database address.  This will install the database locally.  Choose a password for the database when prompted.

Check that the values you have entered are correct, and enter "Y" to continue.  At this point, dependencies and the database will be installed and a UI started.  This may take several minutes.

When this step of the installation is complete, you will be shown an address for the admin panel and a login token.  Navigate to the admin panel in a web browser and enter the login token.

After entering the login token, you'll be taken to the installer dashboard.  The first step here is to initialize the infrastructure.  Enter passwords for the messaging and state components and click "initialize."  This will install and initialize all of the infrastructure components and may take a few minutes.

Once the infrastructure has been initialized, expand the second panel to configure and start the core services. You will need to configure the following:

- Select the auth provider(s) you would like to use and enter the values from the OAuth applications or OAuth consumers created on those providers.
- Select an email provider to send email notifications and enter the credentials.
- Select the type(s) of build nodes you will use

And then click "install."  The configuration selected will be saved and the core services started.  When this is complete, your Shippable installation will be accessible on port 50002 and you may log in.

If you would like any extra options enabled, you may select those in the add-ons panel.

## Components
The following components will run on the Admiral instance:

### Core Services

#### db
The Postgres database container.

#### admiral
The UI used to initialize infrastructure, install components, and configure the installation.

#### secrets
The Vault container used to store integration values.

#### msg
RabbitMQ used by Shippable to send messages to microservices.

#### state
A GitLab container used to store state information.

#### redis
The Redis server used by the Shippable UI.

#### api
The Shippable API.

#### charon
Removes soft-deleted pipelines deployments from the cloud providers.

#### cron
Runs periodic processes such as timing out jobs and checking statistics on build nodes.

#### deploy
Runs deploy-type jobs in pipelines.

#### jobRequest
Processes requests for CI jobs, creating the jobs to be queued.

#### jobTrigger
Triggers both CI and pipelines jobs, queuing them to be picked up and processed when minions are available.

#### manifest
Processes manifest-type pipeline jobs.

#### mktg
The pre-login part of the Shippable UI.

#### nexec
Provisions custom and system nodes.

#### nf
Processes notifications, sending messages to the other microservices to deliver the notifications through the correct channels.

#### release
Processes release-type pipeline jobs.

#### rSync
Processes rSync pipeline jobs.

#### sync
Synchronizes user permissions with the SCM providers.

#### timeTrigger
Updates `time` resources in pipelines.

#### versionTrigger
Triggers pipeline jobs.

#### www
The Shippable UI used for enabling projects and viewing builds.

### Optional Services

#### certgen
This will run if either Kubernetes or Joyent Triton Public Cloud is enabled in the add-ons panel and is used to generate certificates.

#### ec2
This is used to provision dynamic build nodes and will run if AWS keys are provided.

#### email
Sends email notifications and will only be started if there is an email provider selected.

#### hipchat
Sends Hipchat notifications and will only run if Hipchat is selected in the add-ons panel.

#### irc
Sends IRC notifications and will only run if IRC is selected in the add-ons panel.

#### jSync
Updates `jenkins` pipeline jobs and will only run if Jenkins is selected in the add-ons panel.

#### logup
Uploads build console logs to S3.  This will only run if AWS keys are provided.

#### marshaller
Part of the dynamic node provisioning; this will only run if AWS keys are provided.

#### provision
Processes provision-type pipeline jobs; this will only run if Google Container Engine is enabled in add-ons.

#### slack
Sends Slack notifications; this only runs if Slack is selected in the add-ons section.

#### webhook
Sends webhook notifications; this will only run if webhook is selected in the add-ons panel.
