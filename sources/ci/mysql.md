page_main_title: MySQL
main_section: CI
sub_section: Configuration
sub_sub_section: Working with services
page_title: Continuous Integration with MySQL
page_description: How to do Continuous Integration with MySQL

#Continuous Integration with MySQL

MySQL is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs MySQL.

##Starting MySQL

To start MySQL, include the following in your `shippable.yml`:

```
services:
  - mysql
```

When started, MySQL binds to 127.0.0.1 by default. You will need to create a database and user before using it for your builds:

```
build:
  ci:
    - mysql -e "CREATE USER shippable@localhost IDENTIFIED BY ''; GRANT ALL ON *.* TO shippable@localhost; FLUSH PRIVILEGES;"
    - mysql -e 'create database mytestdb;'
```

##Advanced config
###Custom startup command

To customize the startup command, you should define the SHIPPABLE_MYSQL_CMD environment variable in your yml.

For example, the following yml snippet overrides the default startup command for MySQL:

```
env:
  global:
    - SHIPPABLE_MYSQL_CMD="<command>"
```
