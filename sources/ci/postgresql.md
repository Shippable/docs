page_main_title: PostgreSQL
main_section: CI
sub_section: Configuration
sub_sub_section: Working with services
page_title: Continuous Integration with Postgres
page_description: How to do Continuous Integration with Postgres in Shippable

#Continuous Integration with Postgres

Postgres is pre-installed on all our official images. However, we do not start it by default since not every build needs Postgres.

##Starting Postgres

* To start postgres, include the following in your shippable.yml:

```
services:
  - postgres
```

When started, Postgres binds to 127.0.0.1 by default.

* You should create a user and the database before using it for your application:

```
build:
  ci:
    - psql -c 'create role shippable with superuser;' -U postgres
    - psql -c 'create database myapp_test;' -U postgres

```

* If your test setup uses different credentials or settings to access the test database, you can include these settings in a config file in your repository (config/database.shippable.yml for example) and copy it over in the `ci` section:

```
build:
  ci:
    - cp config/database.shippable.yml config/database.yml

```

##Advanced config

###Custom startup command

To customize the startup command, you need to define the SHIPPABLE_POSTGRES_CMD environment variable in your yml.

For example, the following yml snippet overrides the default startup command for postgres:

```
env:
  global:
    - SHIPPABLE_POSTGRES_VERSION="9.4"
    - SHIPPABLE_POSTGRES_BINARY="/usr/lib/postgresql/$SHIPPABLE_POSTGRES_VERSION/bin/postgres"
    - SHIPPABLE_POSTGRES_CMD="sudo -u postgres $SHIPPABLE_POSTGRES_BINARY -c \"config_file=/etc/postgresql/$SHIPPABLE_POSTGRES_VERSION/main/postgresql.conf\" -c \"fsync=off\" -c \"synchronous_commit=off\""
```

###Using Postgis
We do not have Postgis installed on our official build images. If you want to use it for your build, you will need to install and activate it in your yml.  Check the SHIPPABLE_POSTGRES_VERSION matches the postgis version you are installing.

```
build:
  ci:
    - echo $SHIPPABLE_POSTGRES_VERSION
    - sudo apt-get install postgresql-9.6-postgis-2.3
    - psql -U postgres -c "create database your_database_name;"
    - psql -U postgres -d your_database_name -c "create extension postgis;"
```

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
