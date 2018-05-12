page_main_title: Using git submodules
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Using git submodules in your Continuous Integration/Continuous Delivery projects
page_description: How to to use git submodules in your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml, GitHub, Bitbucket, GitLab, Docker

# Using git submodules

If you're building a big project, you might want to break it down into smaller chunks and use git submodules to make everything work.

If you have a `.gitmodules` file at the root of the repo, it is automatically initialized as part of your build by default.

## Public submodules
If your submodules are in a public repository, use the public Git URL in your `.gitmodules` file:

```
https://github.com/someuser/somelibrary.git

```

## Private submodules
If your submodules are in a private repository, you will need to add your Shippable subscription's deploy key to the private repository on your source control, so that we have access to pull from the repository.

-  First, go to your Subscription's **Settings** tab and copy the deploy key (key in image is redacted for privacy):

<img src="../../images/ci/deploy-key.png" alt="deploy key for git submodules">

-  Next, go to the private repository in your source control that contains the required submodule and add a deploy key in your repository settings (key in image is redacted for privacy):

<img src="../../images/ci/deploy-key-github.png" alt="deploy key for git submodules">

-  You can now include the path of your submodule repo in the `.gitmodules` file of the repository you're building:

```
git@github.com:someuser/somelibrary.git
```

For a more detailed explanation, check out our ["SSH keys"](ssh-keys) page.

##Turning off submodules

To turn off submodules for your build, include the following in your yml:
```
git:
   submodules: false
```
