page_main_title: Shippable Server - Install Redis
main_section: Platform
sub_section: Shippable Server
sub_sub_section: Configuration
page_title: Shippable Server - Install Redis
page_description: Install Redis to handle websockets and www sessions
page_keywords: ci, continuous integration, devops, docker, on-premises, enterprise, gitlab


# Redis Configuration

Shippable Server uses Redis to handle websockets and www sessions.

You have a few choices of where you want to run Redis:

* Fresh installation on the same machine as Installer (**Recommended**)
* Fresh installation on a different machine from the Installer
* Use an existing Redis instance, either from a previous Shippable installation, or your own instance

Our recommended approach is to install Redis on the same machine as where you will install Installer. Redis can also be easily installed on a separate supported OS machine with the Admiral installer by configuring the **Redis** section.

<img src="/images/platform/server/admiral-redis-config.png" alt="Installing Redis">


## Installing Redis

When you first log in to the [Admiral UI](/platform/server/install/#the-admiral-ui), Redis will not yet be installed or initialized. Follow the instructions below, depending on where you want to install Redis.

### Fresh instance on the same machine

To install Redis on the same machine as the one where Admiral is installed, select  **This Node** from the dropdown under `Install Redis on` in the **REDIS** section of the **Control plane** panel in the Admiral UI.

<img src="/images/platform/server/redis-this-node.png" alt="Installing Redis on the current node">

You will need to click the **Apply** button after completing other sections.

### Fresh instance on a new machine

You can choose to install Redis on a separate server from the one where Admiral is installed.

<img src="/images/platform/server/redis-new-node.png" alt="Installing Redis on the current node">

- Select **New Node** from the dropdown under `Install Secrets on` for **REDIS** in the **Control plane** panel.
- Enter the IP address where you would like to install Redis.  This should be a supported OS machine with port 6379 accessible to the other Shippable components and services.
- Run the command displayed to allow Admiral SSH access to the machine on the machine chosen and check the box to confirm that this step was completed.  SSH access is required to run the installation scripts.

You will need to click the **Apply** button after completing other sections. Installation progress will be shown on the right side of the Control plane panel.

### Connecting to an existing instance

If you have an existing instance of Redis, either left over from a previous Shippable installation or your own instance, you can reuse that with Shippable Server.

To configure this:

<img src="/images/platform/server/redis-existing.png" alt="Installing Redis on the current node">

- Select **Existing** from the dropdown under `Install Redis on` for **REDIS** in the **Control plane** panel.
- Enter the IP address of your Redis instance.  This should be a supported OS machine with port 6379 accessible to the other Shippable components and services.

You will need to click the **Apply** button after completing other sections. Installation progress will be shown on the right side of the Control plane panel.

## Viewing configuration

Once Redis is initializing, you'll be able to view the configuration and logs.

<img src="/images/platform/admiral/admiral-redis-config.png" alt="GitLab config">

## Viewing logs

TThe **logs** button (paper clip icon) for **REDIS** will show the logs from installation and initialization.

<img src="/images/platform/admiral/admiral-redis-logs.png" alt="GitLab logs">
