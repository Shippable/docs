page_main_title: Setting git config
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Setting git config
page_description: How to set options related to git config

Git commands used in the CI builds can be configured by using the `gitConfig` option.

# Using git config

```
gitConfig:
  - http.sslVerify false
  - http.proxy http://proxyuser:proxypwd@proxy.server.com:8080
```

You can set this tag to a list of git configs. The configs specified here will be set before the repository is cloned in the build using the `git config` command. These configs are set globally.
