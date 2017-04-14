main_section: CI
sub_section: Preparing your environment

#Working with environment variables

You can customize your build workflow by using environment variables that are set at runtime and available during your build.

Shippable provides a standard list of environment variables that are available during each build. For example, you can use the $BRANCH variable to call different scripts depending on which branch is being built.

You can also define your custom environment variables in the env section of your shippable.yml:

```
env:
  - TEST=1 FOO=foo
```

The yml snippet above makes the variables $TEST and $FOO available during your build workflow.

**Please note** that environment variables set in the `pre_ci` section are not available in the `ci`, `post_ci`, `on_success`, and `on_failure` sections since `pre_ci` commands are run on the build machine and not inside the ci container.`
