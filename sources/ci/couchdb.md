main_section: CI
sub_section: Working with services

#Continuous Integration with CouchDB

CouchDB is pre-installed on all our official build images. However, we do not start it by default since not every build needs CouchDB.

##Starting CouchDB

To start CouchDB, include the following in your `shippable.yml`:

```
services:
  - couchdb
```

When started, CouchDB binds to the default localhost 127.0.0.1 and runs on default port 5984.

Before using your database, you should create it in the `ci` section of your yml:

```
build:
  ci:
    - curl -X PUT localhost:5984/mytestdb
```

##Advanced config

###Custom startup command

To customize the startup command, you should define the SHIPPABLE_COUCHDB_CMD environment variable in your yml.

For example, the following yml snippet overrides the default startup command for CouchDB:

```
env:
  global:
    - SHIPPABLE_COUCHDBCouchDB_CMD="<command>"
```
