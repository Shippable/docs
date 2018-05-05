page_main_title: Specifying branches to build
main_section: CI
sub_section: Configuration
sub_sub_section: Preparing your environment
page_title: Including or Excluding branches for Continuous Integration
page_description: How to include or exclude branches in your CI/CD config
page_keywords: shippable, branches, config, yml, master, branch, GitHub, Bitbucket, GitLab


# Specifying which branches you want to build

By default, Shippable builds all branches for enabled repositories. Even if a branch does not have a `shippable.yml` at its root, we will create a build and show an error in the build console.

You can choose to build specific branches by using the `branches` sections in your yml.

Please note that specific branch that is being included/excluded needs to have this configuration, and not just the `master` branch. When we get a webhook for an enabled repository, we read the `shippable.yml` from the branch that changed and trigger a build using that yml. So unless the yml in the branch to be included/excluded has the right settings, we are not aware of it and will trigger a build as expected.  

Wildcard entries for branches and git-flow branches, are supported.

## Excluding specific branches

Here is an example of how you can exclude specific branches with the `except` tag:

```
# this config will build all branches except: test1, all branches beginning with "dev" and all git-flow branches in the "feature" branch

branches:
  except:
    - test1
    - dev*
    - feature/*
```

## Including specific branches

Here is an example of how you can include specific branches with the `only` tag:

```
# this config will only build the following branches: stage,  prod, all branches beginning with "beta" and all git-flow branches in the "release" branch

branches:
  only:
    - stage
    - prod
    - beta*
    - release/*
```
