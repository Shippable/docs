page_main_title: Run your first build
main_section: Getting started
sub_section: ci sample
page_title: Running your first sample build
page_description: Setup up documentation for a sample build
page_keywords: getting started, build, quick start, documentation, shippable, continous integration

# Run a sample CI build

This tutorial walks through the process of running a sample build using Shippable's Continuous Integration feature. We will walk through how to enable a simple Node.js sample application for CI. The sample application includes a few tests so you will see how Shippable runs tests on every code change in the repository.  

###1. Fork our sample project

Fork the following GitHub repository in order to complete the tutorial:

<https://github.com/devops-recipes/basic-node>

If you do not have GitHub account, you can also use Bitbucket and follow these instructions to import code from our sample repository: [Import code into Bitbucket](https://confluence.atlassian.com/bitbucket/import-or-convert-code-from-an-existing-tool-795937450.html)

###2. Sign in to Shippable
Login to [Shippable](http://www.shippable.com) using your GitHub credentials.

###3. Enable the project

The first step is to enable continuous integration for your forked repository.

- On the [Shippable landing page](https://www.shippable.com) , select your subscription from the `Subscriptions` dropdown. This should be the subscription where you forked the repository.

<img width="30%" height="30%" src="/images/reference/integrations/list-subscriptions.png" alt="Add Account Integration">

- On the Subscription page, click on the **Enable Project** button. If you have not enabled any projects on Shippable, you will be directly be taken to this page which shows a list of your repositories.

-  Find the `basic-node` project and click on the **Enable** button.

- If `basic-node` repo is not shown  in the list, click on the **Sync** button next to the Search box. This syncs your Shippable subscription with your source control account. Find the `basic-node` project and enable it.

###4. Run a build
Your sample project already has a config file `shippable.yml` at the root of the repository.

- After enabling the project, you will be redirected to the Project page for `basic-node`.

- Click the **Build** button to trigger your build.

- You can also commit a simple change to any file in the repository, e.g. README.md. A build will be automatically triggered for your project.

###5. View build status

**Congratulations!** You have successfully run your first build on Shippable.

<img src="/images/getting-started/basic-node-console.png" alt="Console for basic-node sample">

###6. View tests and code coverage

You can click on the **Tests** or **Code coverage** tabs on your build results page to see your Test report and Code coverage report.

<img src="/images/getting-started/view-test-report.png" alt="Add Account Integration">

<img src="/images/getting-started/view-coverage-report.png" alt="Add Account Integration">
