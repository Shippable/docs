page_main_title: Memcached
main_section: CI
sub_section: Configuration
sub_sub_section: Working with services
page_title: Continuous Integration with Memcached
page_description: How to do Continuous Integration with Memcached

#Continuous Integration with Memcached

Memcached is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs Memcached.

##Starting memcached

To start Memcached, include the following in your `shippable.yml`:

```
services:
  - memcached
```

When started, Memcached runs on default port 11211 and binds to localhost.

##Advanced config
###Custom startup command

To customize the startup command, you should define the SHIPPABLE_MEMCACHED_CMD environment variable in your yml.

For example, the following yml snippet overrides the default startup command for Memcached:

```
env:
  global:
    - SHIPPABLE_MEMCACHED_CMD="<command>"

```
