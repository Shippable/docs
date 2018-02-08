page_main_title: Cassandra
main_section: CI
sub_section: Working with services

#Continuous Integration with Cassandra

Cassandra is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs Cassandra.

##Starting Cassandra

To start Cassandra, include the following in your `shippable.yml`:

```
services:
  - cassandra
```

When started, Cassandra runs on port 9160 by default.

##Advanced config
###Custom startup command

To customize the startup command, you should define the SHIPPABLE_CASSANDRA_CMD environment variable in your yml.

For example, the following yml snippet overrides the default startup command for Cassandra:

```
env:
  global:
    - SHIPPABLE_CASSANDRA_CMD="<command>"
```
