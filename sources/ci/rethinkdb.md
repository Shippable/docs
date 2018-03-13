page_main_title: RethinkDB
main_section: CI
sub_section: Working with services
page_title: Continuous Integration with RethinkDB
page_description: How to do Continuous Integration with RethinkDB in Shippable

#Continuous Integration with RethinkDB

RethinkDB is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs RethinkDB.

##Starting RethinkDB
To start RethinkDB, include the following in your `shippable.yml`:

```
services:
  - rethinkdb
```

When started, RethinkDB binds to the default localhost 127.0.0.1.

##Advanced config
###Custom startup command

To customize the startup command, you should define the SHIPPABLE_RETHINKDB_CMD environment variable in your yml.

For example, the following yml snippet overrides the default startup command for RethinkDB:

```
env:
  global:
    - SHIPPABLE_RETHINKDB_CMD="<command>"
```
