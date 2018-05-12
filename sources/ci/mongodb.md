page_main_title: MongoDB
main_section: CI
sub_section: Configuration
sub_sub_section: Working with services
page_title: Continuous Integration with MongoDB
page_description: How to do Continuous Integration with MongoDB in Shippable

#Continuous Integration with MongoDB

MongoDB is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs MongoDB.

##Starting MongoDB

To start MongoDB, include the following in your `shippable.yml`:

```
services:
  - mongodb
```

When started, MongoDB binds to 127.0.0.1 by default. You do need to create a database or authenticate up front.

###Creating users

Create users for your database with the sample yml snippet below:

```
build:
  ci:
    - mongo mytestdb --eval 'db.addUser("shippable", "test");'

```

##Advanced config
###Custom startup command

To customize the entire startup command, you should define the SHIPPABLE_MONGODB_CMD environment variable in your yml.

For example, the following yml snippet overrides the default startup command:

```
services:
  - mongodb
env:
  global:
    - SHIPPABLE_MONGODB_CMD="<command>"
```

###Custom config

If you want to start mongodb with custom configuration, you can do this by not specifying `mongodb` in the `services` secrion, and starting it up in your `ci` section instead.

```
build:
  ci:
    - mongod --config ./config.yml

```
config.yml in the above example should contain the custom configuration.
