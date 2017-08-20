page_main_title: Shippable installer
main_section: Platform
sub_section: Tutorials
sub_sub_section: Shippable Server
page_title: Admiral - Message Configuration
page_description: Admiral Message Configuration
page_keywords: install, RabbitMQ, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Admiral Message Queue Configuration
There may be reasons that you want the Shippable message queues to run on a separate machine.  You can quite easily install RabbitMQ on a separate Ubuntu 14.04 machine when installing with the Admiral installer.

## New RabbitMQ installation
When you log into the installer's [UI interface](/platform/tutorial/server/install/#the-admiral-ui) for the first time, you can select where you would like RabbitMQ installed.

To install RabbitMQ on another machine, do the following before clicking "initialize":

- Select "New Node" on the "Messaging" line in the "initialize infrastructure" panel.
- Enter a password for the new RabbitMQ users.  Two users will be created for this installation, `shippable` and `shippableRoot`.  The `shippableRoot` user is used internally, but you can change the password for `shippable` through the RabbitMQ interface after the installation is complete.
- Enter the IP address where you would like to install RabbitMQ.  This should be an Ubuntu 14.04 machine with ports 5672 and 15672 exposed.
- Run the command displayed to allow Admiral SSH access to the machine on the machine chosen and check the box to confirm that this step was completed.  SSH access is required to run the installation scripts.

<img src="/images/platform/admiral/admiral-rabbitmq-ui-setup.png" alt="RabbitMQ UI setup">

Configure all of the other infrastructure components how you would like them installed and click "initialize."  Progress installing and initializing components will be shown on the right side of the initialize panel.

## Checking the configuration and logs
Once RabbitMQ is initializing, you'll be able to view the configuration and logs.  The "config" button for messaging will show some information about the RabbitMQ configuration:

<img src="/images/platform/admiral/admiral-rabbitmq-config.png" alt="RabbitMQ config">

And the "logs" button will show the logs from installation and initialization.

<img src="/images/platform/admiral/admiral-rabbitmq-logs.png" alt="RabbitMQ logs">
