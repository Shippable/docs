page_main_title: Setting git options
main_section: CI
sub_section: Configuration
sub_sub_section: Preparing your environment
page_title: Setting git options
page_description: How to set options related to git

# Setting git options

Git commands used in the CI builds can be configured by using `depth` and `gitConfig` options.

```
depth: 50
```

You can set this tag to a positive integer. The depth specified in this tag will be used in the `git clone` and `git fetch` commands for shallow cloning the repository. Please note that setting this value to a very low number may result in failed builds due to insufficient depth, if the SHA to run the build against is not found.

```
gitConfig:
  - http.sslVerify false
  - core.editor vim
```

You can set this tag to list of git configs. The configs specified here will be set before the repository is cloned in the build using the `git config` command. These configs are set globally.
