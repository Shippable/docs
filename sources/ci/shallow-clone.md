page_main_title: Using shallow clone
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Using shallow clone
page_description: How to use shallow clone

Git commands used in the CI builds can be configured by using the `depth` option.

# Using shallow clone

```
depth: 50
```

You can set this tag to a positive integer. The depth specified in this tag will be used in the `git clone` and `git fetch` commands for shallow cloning the repository. Please note that setting this value to a very low number may result in failed builds due to insufficient depth, if the SHA to run the build against is not found.
