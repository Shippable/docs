page_main_title: Shippable installer
main_section: Reference
sub_section: Admiral
page_title: Admiral - Redis Configuration
page_description: Admiral Redis Configuration
page_keywords: install, redis, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Admiral Redis Configuration
You may want to run Redis on a different machine than Admiral.  Redis can easily be installed on a separate Ubuntu 14.04 machine with the Admiral installer.

## New Redis installation
You can select where to install Redis in the installer's [UI interface](admiral/#the-admiral-ui).

To install Redis on another machine, do the following before clicking "initialize":

- Select "New Node" on the "Redis" line in the "initialize infrastructure" panel.
- Enter the IP address where you would like to install Redis. This should be an Ubuntu 14.04 machine with port 6379 accessible to the other Shippable components and services.
- Run the command displayed to allow Admiral SSH access to the machine on the machine chosen and check the box to confirm that this step was completed.  SSH access is required to run the installation scripts.

<img src="../../images/reference/admiral/admiral-redis-ui-setup.png" alt="Redis UI setup">

Configure all of the other infrastructure components how you would like them installed and click "initialize."  Progress installing and initializing components will be shown on the right side of the initialize panel.

## Checking the configuration and logs
Once Redis is initializing, you'll be able to view the configuration and logs.  The "config" button will show some information about the Redis location and configuration:

<img src="../../images/reference/admiral/admiral-redis-config.png" alt="Redis config">

And the "logs" button will show the logs from installation and initialization.

<img src="../../images/reference/admiral/admiral-redis-logs.png" alt="Redis logs">
