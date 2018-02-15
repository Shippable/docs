page_main_title: Running CI as a non-root user
main_section: CI
sub_section: Advanced config
page_title: Running CI as a non-root user
page_description: How to run CI as a non-root user
page_keywords: non root user

# Running CI as a non-root user

All Shippable builds run as a the root user. Only the root user has permissions on the repository that is checked out in the build container. There are two approaches to running your build as a non-root user.

## Use a custom docker image.

This is the simplest and recommended approach. The custom image should have the non-root user account created. Thereafter
in the `pre_ci_boot`, you can set the non-root user's home directory and run all the commands in your yml as the non-root user.

```
pre_ci_boot:
    image_name: image/name
    image_tag: tag
    pull: true
    options: "--user buildslave -e HOME=/home/buildslave"
```

## Use a Shippable image.

If you want to continue using your Shippable image, the recommended approach is as follows:

- Create a new user.
- Copy the checked out repository to a folder in the new user's home directory.
- Grant permissions to the copied folder.
- Run every build command as the created user.
- If you are executing unit tests and running code coverage reports and would like to see the results in the Shippable dashboard, copy the test folder to $SHIPPABLE_BUILD_DIR after the tests are completed.

Here is one approach to complete the first three steps:

```
- adduser --disabled-password --gecos "" ciuser
- CIUSER_BUILD_DIR=/home/ciuser/build
- cp -r $SHIPPABLE_BUILD_DIR $CIUSER_BUILD_DIR
- chown -R ciuser:ciuser $CIUSER_BUILD_DIR```
```

To run a build command such as `gradle` as the created user, do this:

```
- su -c "cd $CIUSER_BUILD_DIR && gradle" ciuser
```

To copy your test results, do this:

```
- cp -fR ./tests $SHIPPABLE_BUILD_DIR/shippable/testresults
```

Here is a complete yml to run a maven build.

```
language: java

build:
  ci:
    - adduser --disabled-password --gecos "" ciuser
    - CIUSER_BUILD_DIR=/home/ciuser/build
    - cp -r $SHIPPABLE_BUILD_DIR $CIUSER_BUILD_DIR
    - chown -R ciuser:ciuser $CIUSER_BUILD_DIR
    - su -c "cd $CIUSER_BUILD_DIR && mvn clean install -B" ciuser
```
