page_main_title: Cassandra
main_section: CI
sub_section: Working with services
page_title: Continuous Integration with Cassandra
page_description: How to do Continuous Integration with Cassandra in Shippable

#Continuous Integration with Cassandra

Cassandra is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs Cassandra. Cassandra versions 3.6-3.11 are broken for oracle java due to a recent release. To use Cassandra, you should run it with openjdk8 for it to work correctly. This will be patched as soon as newer version of Cassandra is available.

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
