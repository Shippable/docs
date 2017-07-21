page_main_title: Shippable installer
main_section: Platform
sub_section: Admiral
page_title: Admiral - Installing Shippable
page_description: How to install Shippable
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Admiral, the Shippable Server installer

Admiral is used to install Shippable Server. It installs the services required to run Shippable and the Shippable microservices. A server license is required to install Shippable. For more information, <a href="https://www.shippable.com/contact.html">contact us</a>.

Admiral contains a CLI to install the basic dependencies and a user interface to complete the installation and manage the configuration of options. Both of these are available in the <a href="https://github.com/Shippable/admiral"> Admiral GitHub repository</a>.

To get started with Admiral, check that you have the prerequisites, clone the repository, and check out the tag you plan to install:
```
$ git clone https://github.com/Shippable/admiral.git
$ cd admiral
$ git checkout <selected tag>
```
Then you can run `./admiral.sh install` and follow the prompts.

## Prerequisites
###Instance Requirements
Minimum requirements to run Admiral and all core Shippable services and components on one instance:

- Ubuntu 14.04 LTS (Only Ubuntu 14.04 is supported at this time.)
- Kernel 3.19 (or above)
- 4 cores
- 8 GB memory
- 100 GB disk space

The following ports must be exposed on the instance, either externally or to the network in
which they will run:

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

Git and SSH must be installed before running Admiral.  Install these by running the following on the instance:
```
$ sudo apt-get update
$ sudo apt-get install git-core ssh
```

If you are installing on a AWS Ubuntu 14.04 AMI, you may need to update the kernel.  The following commands will update to 3.19:
```
$ sudo apt-get update
$ sudo apt-get install linux-generic-lts-vivid
$ sudo reboot #restart is required after kernel upgrade
```

### Load balancers
The usual (and recommended) way of exposing Shippable service end points is via loadbalancers. The loadbalancers are not required to be exposed to the public facing internet but should be accessible to all users in a VPN. A typical setup creates the following routing:

    User (shippable.mycompany.com) -> Route 53 -> Internal LB -> Shippable API
    (running on one or more machines)

Shippable requires 4 loadbalancers with listeners on these ports:

- **API, port 50000**: Shippable api will be used by all the microservices and should be available via IP/DNS.
- **WWW, port 50001**: This service is what users access to use Shippable.
- **Admin, port 50003**: This is where the Shippable admin panel (Admiral) runs
- **Message queue, ports 443, 5671 and 15671**: required to access the message queue admin panel and for build nodes to connect if they belong to a different VPC than the one in which the message queue is provisioned.

## The Admiral CLI
The CLI supports the following commands.

```bash
$ ./admiral.sh --help
Usage:
    ./admiral.sh <command> [flags]

  Examples:
    ./admiral.sh install --help

  Commmands:
    install         Run Shippable installation
    upgrade         Run silent upgrade without any prompts
    restart         Restart all services
    help            Print this message
    clean           Remove shippable containers and configurations
    info            Print information about current installation
    list            Print available admiral versions
    switch          Switch admiral to a given version
```

### install
This command will install dependencies, pull any updated images, install the database, and start the Admiral UI. From the cloned Admiral repository, run `./admiral.sh install`.

Install will first generate SSH keys for internal use (if they don't already exist), determine which version was selected from the checked-out tag, generate a login token for use with the UI, and prompt for any information it needs to set up. These are the things it will prompt for:

- Installer Access Key: This is the key you were provided by Shippable with your server license. If you don't have one, <a href="https://www.shippable.com/contact.html">contact us</a>.
- Installer Secret Key: The secret key you received with the installer access key.
- Current IP Address: This should be an accessible address for the current machine. It will be the address at which you will access the installer UI and is used for any other services you decide to install on this machine. In most cases, this will be the external IP address.
- Database IP Address: Enter "D" to run the database on this instance as a container. If you would like it installed somewhere else, enter that address. If you select another location, you will also be asked if it is a new or existing database. Enter "I" to install a new database at that location.
- Database password: This will be the password for the database user `apiuser`. Enter a secure password to be set in the database installation.

Confirm that the required values have been entered correctly. If you have decided to install your database in a different location, copy the command displayed and run it on that machine as well to grant SSH access for the installer.

Admiral will then install dependencies, pull Docker images, and install the database. This may take several minutes. When it is complete, the location of the Admiral UI and the login token are printed. Navigate to the UI location in a web browser and enter the given access key to access the installer UI. The rest of the services will be started from there.

### upgrade
This command will upgrade the Shippable installation. To list the available
versions, run `git tag` command inside `admiral` directory. To install the
Shippable version corresponding to any tag, run `git checkout <tag>` and then
run `./admiral.sh upgrade`.
All Shippable services will be upgraded to the new tag.

### restart
This is a helper command to recover from unexpected machine shutdown or
reboot. If one (or more) Shippable services go down for any reason,
this command can be used to restart those services.
`./admiral.sh restart` will go through all the components of the system and
(re)start them. This command is idempotent, so running it multiple times has no
side effects on the system.

### info
The `info` command displays some basic information about the current installation. Running `./admiral.sh info` from the cloned Admiral repository will print the current version installed, the addresses of the Admiral UI and database, and the login token for Admiral. The version shown may not be the version running if Admiral has been updated but the services have not yet been upgraded.

## list
The `list` command will list all the available versions for admiral. Running `./admiral.sh list` command will fetch latest tags from git and list them. You can switch admiral to any given version using `./admiral.sh switch <version_name>`. This command is available for `v5.7.4` and above.

## switch
The `switch` command checks out the admiral version listed in `./admiral.sh list` command. You can update your admiral server using `./admiral switch <version_name>` then run `./admiral.sh upgrade` to run against the version that has been checked out. Please note that this feature is available for admiral `v5.7.4` and above, so switching to an earlier version would mean manually checking out latest version using `git checkout tags/<version>`

## The Admiral UI
After running `./admiral.sh install`, the Admiral UI will be available. All further configuration of a new installation takes place here.

There are three distinct sections in the Admiral UI: initializing infrastructure, installing core components, and enabling add-ons.

### Initializing infrastructure
The first panel is to initialize infrastructure. Select where each of the listed components will run, enter the passwords, and click initialize. Components running on the same node as Admiral will be started in Docker containers, and components elsewhere will be installed outside of a container.

### Installing core components
After initializing the infrastructure, select which provider(s) will be available on your installation and which mail service you will use, entering the details requested for both. Then click install. At this point, you will be able to log into your local version of Shippable.

### Enabling add-ons
Additional optional services and integrations may be enabled from this panel. For example, you can enable various hub integrations for your users to push or pull from Docker registries.

## /etc/shippable
The installer stores files in `/etc/shippable`. These files include configuration information, keys, and initialization scripts. The following are found in `/etc/shippable`.

### admiral.env
The `admiral.env` file contains values used by Admiral for your installation. Any values requested by the CLI are stored here, as are other values which only Admiral needs to access. Editing your `admiral.env` file directly is not recommended.

The following values are stored in `admiral.env`:

- LOGIN_TOKEN: The token used to log into the Admiral user interface. This is also shown at the end of `./admiral.sh install` and displayed by `./admiral.sh info`.
- DB_IP: The location of the database set when first running `./admiral.sh install`. This is also displayed by `./admiral.sh info`.
- ADMIRAL_IP: The location of Admiral set when first running `./admiral.sh install`. This is also displayed by `./admiral.sh info`.
- ACCESS_KEY: The installer access key entered when first running `./admiral.sh install`. This is used to pull Docker images.
- SECRET_KEY: The installer secret key entered when first running `./admiral.sh install`. This is used to pull Docker images.
- SERVICE_USER_TOKEN: The Shippable API token created for the internal service user. This will be set by Admiral when initializing the database.
- RELEASE: The current Admiral release version. Set by `./admiral.sh install`, this will be set to the repository tag.
- IS_SERVER: This should be `true`.
- DB_PORT: The database port, set by `./admiral.sh install`.
- DB_USER: The user that Admiral and Shippable API will use to connect to the database. This will be `apiuser`.
- DB_NAME: The name of the database used by Admiral and Shippable API. This will be `shipdb`.
- DB_PASSWORD: The Postgres password for `apiuser`.
- DB_DIALECT: This will be `postgres`.
- DB_INSTALLED: A Boolean denoting if the database has been installed. It will be set to `true` when connecting to an existing database or once the database is installed.
- RUN_MODE: This may be `dev` or `production` and determines the log level of Shippable services.
- SSH_USER: This will be `root`.
- PUBLIC_IMAGE_REGISTRY: The registry containing the public images used by the installer.
- PRIVATE_IMAGE_REGISTRY: The registry containing the private images used by the installer.
- VAULT_URL: The location of Vault. This will be set by Admiral when initializing infrastructure.
- VAULT_TOKEN: The root token for Vault. This is also set by Admiral when Vault is initialized.
- VAULT_UNSEAL_KEY1: The first of five unseal keys for Vault, this is set when Admiral installs Vault. This will not be set when connecting to an existing Vault installation.
- VAULT_UNSEAL_KEY2: The second of the five unseal keys.
- VAULT_UNSEAL_KEY3: The third of the five unseal keys.
- VAULT_UNSEAL_KEY4: The fourth of the five unseal keys.
- VAULT_UNSEAL_KEY5: The fifth of the five unseal keys.
- SWARM_WORKER_JOIN_TOKEN: The worker join token for Docker Swarm. This will be set by Admiral when initializing the swarm master.

### machinekey and machinekey.pub
Admiral creates a SSH key pair to use to connect to other hosts. The keys are stored in `machinekey` and `machinekey.pub` and will be used when installing components on other nodes. It will also be used as the SSH key when initializing system nodes.

### db
This folder contains SQL scripts run by Admiral in database initialization and when upgrading to a new version.

### msg
This folder contains files relating to the message queue infrastructure component with `rabbitmq.conf` and a `scripts` folder.

### redis
This folder contains files for the Redis initialization including `redis.conf` and a `scripts` folder.

### secrets
This folder contains files for Vault initialization including `config.hcl` and `local.json` and a `scripts` folder with `policy.hcl` and `vault.conf`.

### state
This folder contains files for initializing the state storage infrastructure component such as `gitlab.rb`, `gitlab-secrets.json`, `ssh_host_ecdsa_key`, `ssh_host_ecdsa_key.pub`, `ssh_host_ed25519_key`, `ssh_host_ed25519_key.pub`, `ssh_host_rsa_key`, `ssh_host_rsa_key.pub` and `scripts` and `Trusted-certs` folders.

### vault
This folder contains files for initializing the state storage infrastructure component such as `gitlab.rb`, `gitlab-secrets.json`, `ssh_host_ecdsa_key`, `ssh_host_ecdsa_key.pub`, `ssh_host_ed25519_key`, `ssh_host_ed25519_key.pub`, `ssh_host_rsa_key`, `ssh_host_rsa_key.pub` and `scripts` and `trusted-certs` folders.

### workers
This folder contains files for initializing the Swarm workers.

## /var/lib/shippable
The installer also stores files in `/var/lib/shippable`. These files contain data for the components and services started by the installer. The following subdirectories are in `/var/lib/shippable`.

### db
The `db` folder contains a `data` folder that is used to store the database information when installing the database on the same node. This folder allows the container to be restarted if necessary.

### logs
The `logs` folder contains logs saved by the installer. The logs are organized by component.

### msg
The `msg` folder contains a `data` folder. This is used as a mounted volume when running RabbitMQ in a container.

### redis
The `redis` folder contains a `data` folder. This is used as a mounted volume when running Redis in a container.

### secrets
The `secrets` folder contains a `data` folder. This is used as a mounted volume when running Vault in a container.

### state
The `state` folder contains `data` and `logs` subdirectories. These are both used as mounted volumes when running GitLab in a container.

### master
The `master` folder may contain a `data` folder. It's not used at this time.

### workers
The `workers` folder contains a `data` folder. It's not used at this time.

