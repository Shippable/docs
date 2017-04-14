main_section: CI
sub_section: Working with services


#Continuous Integration with Rabbitmq

Rabbitmq is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs Rabbitmq.

##Starting RabbitMQ
To start Rabbitmq, include the following in your `shippable.yml`:

```
services:
  - rabbitmq
```

When started, Rabbitmq binds to 127.0.0.1 by and uses the default configuration:

- <i class="ion-ios-minus-empty"> </i> vhost: /
- <i class="ion-ios-minus-empty"> </i> username: guest
- <i class="ion-ios-minus-empty"> </i> password: guest

You can add more vhosts and roles in the `ci` section of your yml.

##Advanced config
###Custom startup command

To customize the startup command, you can define the SHIPPABLE_RABBITMQ_CMD environment variable in your yml.

For example, the following yml snippet overrides the default startup command for RabbitMQ:

```
env:
  global:
    - SHIPPABLE_RABBITMQ_CMD="<command>"
```
