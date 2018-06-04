page_main_title: Using SSH keys
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Using SSH keys
page_description: How to use SSH keys to clone your project


# SSH keys

SSH keys are used to access your projects on the source control. Shippable provides two SSH keys.

*  A **Subscription SSH key** is created when a subscription is created on Shippable. The public key for this is the one on the Subscription Settings tab. By default this key does not have access to any projects. Adding the deploy key to your account on source control gives this key access to all the projects in your account.

<img src="../../images/ci/deploy-key.png" alt="Deployment key for your subscription">

*  A **Project SSH key** is created when a project is enabled on shippable. Any private project will have a deploy key added to the repository and all the private projects are cloned using this key. Public projects will not have this key added to the repository. This key has access to only a particular project and cannot be used to pull or push to/from other repositories.

Every command that runs in your build is executed within an ssh-agent session that contains all the keys present in `/tmp/ssh`. The subscription key and the project key are also present at this location. `00_sub` is the subscription key and `01_deploy` is the project key. The sequence of the keys offered for any SSH operation is strictly in alphabetical order. Besides `00_sub` and `01_deploy`, `/tmp/ssh/` will also contain all of the SSH and PEM key subscription integrations enabled. If there are no such integrations, the sequence is to offer `00_sub` first, and `01_deploy` next.

We recommend you use the subscription SSH key to pull other repositories (for example, private submodules) and project SSH key to pull/push to the same repository. You may sometimes want to specify a key when performing a SSH operation. For example, to select the project key when cloning a repository you can use the following command:
```
ssh-agent bash -c 'ssh-add /tmp/ssh/01_deploy; git clone git@github.com/orgName/repoName.git /path/to/clone/'
```

## Adding your own SSH key

Apart from these two keys you can also set up key integrations and use those keys to access your projects on source control. For example, create a [SSH key integration](/platform/integration/sshKey/). Add this newly created key integration to both the Subscription Settings and the `shippable.yml` of every project you want to use it in.

Example `shippable.yml` integration:

```
integrations:
  key:
    - integrationName: my_custom_key
      type: sshKey
```
Your SSH key will be available on your build container in the `/tmp/ssh/` directory.
<img src="/images/ci/view-keys.png" alt="SSH Keys list">

You can use this key similarly to a subscription key or project key.
To specify this key when performing an SSH operation, include the path to the key in the `ssh-agent` command. For example, to specify your custom key when cloning a repository you can use the following command.

```
ssh-agent bash -c 'ssh-add /tmp/ssh/my_custom_key; git clone git@github.com/orgName/repoName.git /path/to/clone/'
```
