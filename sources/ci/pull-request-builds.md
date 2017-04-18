main_section: CI
sub_section: Advanced config

# Building pull requests

In addition to building commits, we automatically build pull requests for all enabled projects. This is done by pulling the latest code from your your branch, i.e. the branch where the pull request will be merged, merging with the changes in the pull request, and running your build against the merged code. Please note that we only do a temporary merge to run the build and this doesn't affect anything in your source control. If the pull request build passes, you can merge the PR with a high degree of confidence.

##Pull request build status

A PR build is identified in the Shippable UI with the icon in the status indicator:<img src="../../images/ci/pull-request-status.png" alt="Pull request status">

We also show the results of the PR build in the UI of your source control provider as shown below.

<img src="../../images/ci/pull-request-result.png" alt="Pull request results">

## Customizing config for Pull Requests

There are several environment variables available to help you customize config for pull request builds. Fpr example, if you want to do something only if a pull request is opened from `dev` to `master` branch, you can do the following:

```
build:
  ci:
    - if [ "$HEAD_BRANCH" == "dev" ] && [ "$BASE_BRANCH" == "master" ] && [ "$IS_PULL_REQUEST" == true ]; then ./doSomething; fi

```

Here is a list of environment variables related to pull requests:

| Env variable        | Description           |
| ------------- |-------------|
|BASE_BRANCH		 | Name of the target branch into which the pull request changes will be merged.|
|IS_PULL_REQUEST     |Set to **true** if the job is a pull request. If not, this will be set to **false**. |
|PULL_REQUEST		 |Pull request number if the job is a pull request. If not, this will be set to **false**. |
|PULL_REQUEST_BASE_BRANCH | Name of the branch that the pull request will be merged into. It should be the same as BASE_BRANCH.|
|HEAD_BRANCH		 | This is only set for pull requests and is the name of the branch the pull request was opened from.|
