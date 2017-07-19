page_main_title: Support
main_section: Getting started
sub_section: support

# Support
This document lists the FAQs that we've received through our [Support repository](https://github.com/Shippable/support/issues) and speaking with our customers, on running Continuous Integration. If you have specific CI errors that you would like to troubleshoot, then refer troubleshooting sections under [Continuous Integration](/ci/troubleshooting/).

## How can I upgrade or downgrade my plan?

The Continuous Delivery plan gives you a minimum of 1 free minion & 1 free pipeline. Upgrading or downgrading your CI  simply means increasing or decreasing the number of build minions in your subscription. Similarly upgrading or downgrading your Pipelines means increasing or decreasing the number of pipelines and containers in your subscription.

You can do this by going to the 'Billing' Tab on your Subscription Dashboard and clicking the 'Update plan' button. Use the slider to indicate the number of containers you want for CI and/or the number of pipelines you want for CD. Click on the 'Save changes' button when you are done.

Plan upgrades are effective immediately and your bill will be pro-rated for the current month. Plan downgrades are effective immediately, however we do not issue refunds for minions that were already paid for during the current month.

Check our blog on [upgrading your CI/CD subscription](http://blog.shippable.com/how-to-upgrade-your-ci-cd-subscription) that includes additional details on when to upgrade using your organizational details.

---
## My builds stopped working. How do I know if Shippable is down?

You can get the current status of the Shippable UI and API by going to our [Service Status page](http://status.shippable.com). Our status page also shows the status of some of our third party integrations like Amazon EC2, Quay.io, Digital Ocean, as well the response time of our API.

The service status page can be viewed from our product UI by going to the heart ekg icon in your top navbar.

For additional details, check our blog on [Shippable status page](http://blog.shippable.com/features_amazon_ecr_regions_status_page_github_tags_and_more#status_page).

---
## What does the term Minion mean in Shippable?
Minions are Docker based containers that run your CI builds.

When your build is triggered, we determine which Docker image to use in order to spin up your build minion. By default, the minion will container popular versions of the language specified in your yml, as well as popular tools and services used with that language. All this happens under the hood and 'just works'.

If you're a Docker enthusiast and want to spin up your build minion based on your custom Docker image or build an image from Dockerfile, you can do so by following instructions here.

Your build minions are transient and spin up when a build is triggered and are destroyed when a build completes.

Each minion has 2 cores and 4GB RAM. If you use your own infrastructure to run your builds with [Bring Your Own Node (BYON)](/getting-started/byon-overview) option, you can spin up bigger containers for your builds since we do not restrict resources for containers running on customers' infrastructure.

---
## Do I need to create an Account on Shippable?
You do not need to explicitly create an account on Shippable to start using it. However, since we allow you to connect multiple source control providers and clouds to Shippable, the term 'account' is used to encompass all of these identities. So for example, 'sync' at an account level means syncing your information across all source control providers and connected third party services. Read the [Git identities section](/getting-started/git-identities/) for more details.

---
## Can you explain what a Subscription on Shippable means?
A subscription on Shippable corresponds to an organization or personal account on GitHub or Bitbucket. So if you sign in to Shippable with GitHub credentials and your username is abcfoo and you're a member of orgs org1foo and org2foo, you will have 3 subscriptions on Shippable.

Our billing plans are at a subscription level, so you can upgrade or downgrade each of your subscriptions independently. Also, we mirror permissions from your source control provider, so if someone has access to organizational repositories on GitHub/Bitbucket, they will also have access to view and run builds on Shippable. These permissions are synced automatically and you do not have to do anything to make this work.

---
## What is a Project?
A project on Shippable corresponds to a repository on your source control provider. As with subscriptions, project permissions are also synced with your source control provider.

Once a project is enabled, we build all commits and pull requests for that project, irrespective of who commits and opens the pull request. Refer the [projects section](/ci/enable-project/) for additional details.

---
## What is the difference between a Build Container (cexec) and Shippable Agent (genExec) on the Shippable platform?
A Build Container (also called cexec) is a Docker Container that is spun up on the host Node machine that executes the Continuous Integration related tasks. These include installing the required dependencies, cloning information from the source control system repository, executing unit tests and running test/code coverage reports, all of which have to be specified in the `shippable.yml` file.  

Shippable Agent (genExec) on the other hand is also a Docker Container that is spun up on the host Node machine. The main function of the Shippable Agent is to interact with the Shippable platform and the Build Container and, performs actions outside the build container. Within the `shippable.yml` file, the `pre_ci`, `pre_ci_boot` and the `push` sections are executed on the Shippable Agent. Pipeline related enhancements and runSH jobs are also executed on the Shippable Agent.

---
## Why can't I see some of my repositories in my Shippable account?

This happens due to one of the following reasons:

- You haven't enabled private repositories in your Shippable account. Go to Account Settings (gear icon on the top right hand navigation bar), in the 'Accounts' tab and under 'Git Identities' section, click 'Enable' under 'GitHub' 'Click to enable private access'.
- Your account hasn't yet been synced with the latest permissions from GitHub. To force sync your account, go to your Account Settings and click on the `Force Sync` icon next to your Account Id.
-  You're a Bitbucket user and you have mercurial repositories. We do not support mercurial at this time, so you will need to convert them to git or use another platform for CI/CD.

---
## Why do I get an error when I try to enable a project that is listed on my dashboard?

This usually happens if you are a collaborator on a project and the owner of the project has not given Shippable access to the project. You can verify this by confirming that the owner of the project can see the project on their Shippable dashboard.

---
## How can I validate my shippable YML?

You can use either of the tools below to validate if your YML is valid:

* [YAML Lint](http://www.yamllint.com/)
* [YAML Online Parser](http://yaml-online-parser.appspot.com/)

---
## Why can't I see my BitBucket repos in my Shippable account?

Shippable only supports git based repositories, so if you have mercurial
repositories in your BitBucket account, you will not see them in the
Shippable repository list. If you cannot see git based repos, please
open an issue on our [GitHub Support
repo](<https://github.com/Shippable/support>).

---
## Why can't Shippable see my org on GitHub?

GitHub's default policy when a new org is created is 'access
restricted'. In order for Shippable to be able to see the org, you must
manually grant access to Shippable. This can be resolved by going to the
third-party access section for the org, and clicking 'Remove
restrictions' Under the 'Third-party application access policy' section.

---
## How do I link my GitHub and Bitbucket accounts?

Please read our documentation on [linking GitHub and Bitbucket accounts](/getting-started/integrations/). In addition, refer our [blog](http://blog.shippable.com/how-to-link-github-and-bitbucket-accounts) on this topic.

---
## Why am I not able to see Bitbucket org repos after deleting and recreating my account on Shippable?

Deleting the shippable account will also delete the permissions
associated with the account. If you recreate your account, bitbucket
will not allow us to pull all the permissions you have, unless the owner
of that organization logs in back to shippable and then click on the
sync repos button to see the repos.

---
## Why is my project showing up as "empty" after I enable it? It is certainly not empty in github!

A project is empty in Shippable if there are zero builds associated with it. A new project that you have just enabled shows up as an empty project. To avoid cluttering the project page with projects that are never built, the projects page doesn't show projects that have no builds unless you explicitly use the check box to let us know you want to see all projects. An exception to this is if you have just enabled a project; we do check this box during the enable process, so you are able to see your new project. We are continuously iterating on the user experience, so please write to us at support@shippable.com if you have any feedback on the feature.

---
## I converted a public repository (enabled as a project on Shippable) to a private repo. Should I change any setting in Shippable?

When public or private repo on GitHub/Bitbucket (and enabled as a project on Shippable) is converted to a private or public repo, all you need to do is reset the enabled project on Shippable. To do so:

- Click on your project from the Shippable dashboard
- Click the `Settings` tab
- Scroll all the way down and click the `Reset` button under the 'Reset' section
- Click `Confirm`.

The reset action will do the following things:

1. Reset the webhook for Shippable
2. Generate a new deploy key and update the repository

If you are using encrypted variables for this project, they'll need to be re-encrypted. Integrations and other settings will not be affected.

---
## Is mariadb supported on Shippable?

Shippable [supports](/ci/services-overview/) lots of different services, tools and third party services. If you have a service or a tool that is currently unsupported, you can still use it to run CI within Shippable in either of the two ways listed:

1. Use Shippable's default images based on the language you use & install 'mariadb' as a dependency in the `build: ci` step.
2. If you have an existing Docker image with 'mariadb' and other dependencies installed, then you can [override Shippable's default image](/ci/custom-docker-image/#pulling-your-custom-image-and-using-it-for-ci) and use it for CI. You can also [build your own Docker image](/ci/custom-docker-image/#building-an-image-to-use-for-ci) with all the dependencies including 'mariadb' and use it for CI.

---
## Why are some of the standard environment variables like `SHIPPABLE_POSTGRES_VERSION` not available in my CI environment?

1. [Machine Images](/platform/machine-images-overview/) from versions v5.4.1 to v5.6.1 do not have some of the [standard environment variables](/ci/env-vars/#stdEnv) related to [shippable services](/ci/services-overview/) because of a bug. This is fixed in machine image version v5.7.1 onwards. Please [upgrade](/platform/machine-images-overview/#changing-the-subscription-machine-image) your machine image to v5.7.1 to use the shippable services related environment variables.
