page_main_title: Shippable Server - Install RabbitMQ for Messaging
main_section: Shippable Server
sub_section: Configuration
page_title: Shippable Server - Install RabbitMQ
page_description: Install RabbitMQ to handle messaging for Shippable Server
page_keywords: ci, continuous integration, devops, docker, on-premises, enterprise, rabbitmq

# Messaging (RabbitMQ) Configuration

Shippable Server uses RabbitMQ for Messaging between various components.

You have a few choices of where you want to run RabbitMQ:

* Fresh installation on the same machine as Installer (**Recommended**)
* Fresh installation on a different machine from the Installer
* Use an existing RabbitMQ instance, either from a previous Shippable installation, or your own instance

Our recommended approach is to install RabbitMQ on the same machine as where you will install Swarm and Microservices. RabbitMQ can also be easily installed on a separate supported OS machine with the Admiral installer by configuring the **Messaging** section.

<img src="/images/platform/server/admiral-rabbitmq-config.png" alt="Configuring RabbitMQ for message queue">

## Installing Messaging

When you first log in to the [Admiral UI](/platform/server/install/#the-admiral-ui), RabbitMQ will not yet be installed or initialized. Follow the instructions below, depending on where you want to install Redis.

### Fresh instance on the same machine

To install RabbitMQ on the same machine as the one where Admiral is installed, select  **This Node** from the dropdown under `Install RabbitMQ on` in the **REDIS** section of the **Control plane** panel in the Admiral UI.

<img src="/images/platform/server/rabbitmq-this-node.png" alt="Installing RabbitMQ on the current node">

You will need to click the **Apply** button after completing other sections.

### Fresh instance on a new machine

You can choose to install RabbitMQ on a separate server from the one where Admiral is installed.

To configure this:

<img width="50%" height="50%" src="/images/platform/server/rabbitmq-new-node.png" alt="Installing RabbitMQ on the current node">

- Select **New Node** from the dropdown under `Install RabbitMQ on` for **MESSAGING** in the **Control plane** panel..
- Choose a password for RabbitMQ.
- Enter the IP address where you want to install RabbitMQ.  This should be a supported OS machine with ports 443, 5671, 5672, 15671, and 15672 accessible to the other Shippable components and services.
- Run the command displayed to allow Admiral SSH access to the machine on the machine chosen and check the box to confirm that this step was completed.  SSH access is required to run the installation scripts.

You will need to click the **Apply** button after completing other sections. Installation progress will be shown on the right side of the Control plane panel.

### Connecting to an existing instance

If you have an existing instance of RabbitMQ, either left over from a previous Shippable installation or your own instance, you can reuse that with Shippable Server.

To configure this:

<img width="50%" height="50%" src="/images/platform/server/rabbitmq-existing.png" alt="Connecting to an existing RabbitMQ">

- Select **Existing** from the dropdown under `Install RabbitMQ on`for **MESSAGING** in the **Control plane** panel.
- Enter a username and password for RabbitMQ.
- Enter the IP address of your RabbitMQ instance.  This should be a supported OS machine with ports 443, 5671, 5672, 15671, and 15672 accessible to the other Shippable components and services.
- Choose the protocol that should be used to connect to RabbitMQ.

If you face issues connecting to existing RabbitMQ instance, refer [rabbitMQ install script](https://github.com/Shippable/admiral/blob/master/common/scripts/installMsg.sh#L64) to verify if its configured correctly.

You will need to click the **Apply** button after completing other sections. Installation progress will be shown on the right side of the Initialize panel.

## Viewing configuration

After RabbitMQ is initialized, you'll be able to view the configuration and logs.

<img src="/images/platform/admiral/admiral-rabbitmq-config.png" alt="RabbitMQ config">

## Viewing logs

The **logs** button (paper clip icon) for **MESSAGING** will show the logs from installation and initialization.

<img width="50%" height="50%" src="/images/platform/admiral/admiral-rabbitmq-logs.png" alt="RabbitMQ logs">
