page_main_title: Use cases
main_section: Getting started
sub_section: Overview

# Use cases

Shippable is a DevOps automation platform that makes it easy to automate every part of your DevOps workflow. It is highly flexible and provides a lot of native functionality, while also integrating with your favorite tools.

To give you an overview of what you can achieve with the platform, we have put together a few use cases:

- [Continuous integration (CI)](#ci)
- [Deployments](#deploy)
- [Automated application validation](#validate)
- [Release management](#release)
- [Infrastructure provisioning](#provision)
- [Putting everything together: Continuous Delivery](#continuous-delivery)

However, it is important to remember that Shippable lets you automate almost anything. Want to deploy using voice commands on Alexa? Check. Want to set your smart coffee machine to start a pot at 8am every morning? Check.

We have optimized the platform for DevOps with a bunch of [managed jobs](/getting-started/pipeline-basics#jobs) that make it very easy to automate DevOps workflows. However, for anyone with programming skills and an imagination, the sky is the limit.

<a name="ci"></a>
##Continuous Integration

The most basic use case is Continuous Integration (CI).

The workflow for CI is simple.

- You **enable** a repository for CI and add a configuration file `shippable.yml`. This repository can be in any supported [source control system](/getting-started/supported-scms/).

- For every change in your source code, a job that executes the instructions in your config is triggered.

- For every pull request to your repository, we will pull the latest code from your your branch, i.e. the branch where the pull request will be merged, merge with the changes in the pull request, and run your CI workflow against the merged code. You can view the results in your source control UI so you can approve or reject the PR with confidence.

- You can view test and code coverage results for your repository along with the job console in the Shippable UI.

Our CI configuration is highly flexible and supports the following advanced scenarios:

- [Matrix builds](/ci/matrix-builds/)
- Docker-based workflows, including using [custom CI containers](/ci/custom-docker-image/), [Docker caching](/getting-started/byon-overview/), and native integrations with all [Docker registries](/getting-started/supported-artifact-repositories/) and [Container Orchestration platforms](/getting-started/supported-deployments/).
- Parallel testing, i.e. you can split your tests across build machines

For more on CI, read our [CI docs](/ci/why-continuous-integration/).

<a name="deploy"></a>
##Deploying to an endpoint

Shippable supported deployments to many endpoints, both for traditional and Docker based applications.

Consider the following scenario:

- Your CI job creates a package. This can be a JAR/WAR file or a Docker image.
- Every time the package is updated, a new version of the application manifest is created. The manifest is a versioned immutable unit of deployment for your application.
- The updated manifest version automatically triggers a deployment to your Test environment. Your Test team is notified.
- Once tests are completed and the team signs off on them, the manifest version is automatically deployed to Beta.

For more on deployments, read our [Deploy docs](/deploy/why-deploy/).

<a name="validate"></a>
##Validating your application

Once your application is deployed into an environment, there are several validation steps that need to be done in order to move the application further down your delivery pipeline.

Let us consider a typical scenario:

- Your application manifest is deployed into a Test environment.
- As soon as the deployment happens, your integration/functional test suite is automatically triggered. The results are communicated to the Test team.
- The application manifest is then deployed into Beta. This triggers your performance test suite. Once again, results are communicated to the Test team.
- Depending on the results of the tests and your configuration, the manifest is then deployed to the next environment, or awaits a manual action.
- Your team can clearly see what is deployed in each environment by [going to a central UI](/getting-started/single-pane-of-glass-spog/).

Automated validation is a very important part of DevOps and eliminates the need for error-prone manual handoffs.

For more on validation, read our [Validate docs](/validate/devops-validate/)

<a name="release"></a>
##Release management

Automating release management helps you avoid manual handoffs and keeps everyone on the same page with respect to what other teams are doing. With Shippable, you can set up your Continuous Delivery pipeline with Zero Touch Automation and complete transparency across teams.

Consider the following scenario:

- Your application is deployed to the Test environment and passes all checks.
- A new release candidate (RC) is created automatically and the semantic version number is incremented.
- Your Ops team is notified about the new release creation through a Slack channel. Additionally, your Dev or Product Manager can also be notified.
- Everyone on the team can see the features included in this release candidate.
- Your Ops team or product manager can decide when to trigger a manual deployment to production.

Shippable supports the scenario above with the following features:

- [Single Pane of Glass (SPOG)](/getting-started/single-pane-of-glass-spog/) view that gives you visibility into the entire end to end workflow.
- Semantic versioning at any stage for consistently identifying a version of the software package.
- Configurable manual and automated gates for complete flexibility in managing the release.

For more on this, read our docs on [release management](/release/devops-release-management/)

<a name="provision"></a>
##Provisioning infrastructure

Provisioning infrastructure should be automated to avoid configuration drift, ensure predictability in what is provisioned, and make your software delivery process much more reliable.

All intermediate environments like Test and Staging should be perfect reproductions of production so you can catch all bugs that might occur in production and easily reproduce them in any environment. Your infrastructure should be provisioned exactly the same way each time to avoid problems due to config errors.

Shippable helps you automate infrastructure provisioning by providing the following functionality:

- We integrate with popular tools like [Terraform](/provision/aws-with-terraform/), [Ansible](/provision/aws-with-ansible/), Chef, and Puppet to help automate provisioning of your environments. You can store your provisioning scripts in your source control repository and any time your scripts change, the environment is updated and this triggers the rest of your DevOps workflow. You can even manage your VPCs and Networking configuration as code.
- You have a complete history of your config and reproducing a previous config is a one click rollback action.
- Your infrastructure provisioning is part of your overall DevOps workflow, so you can implement advanced scenarios like configuring Shippable to bring up on-demand Test environments when a new version of your application is available. You can also automate triggering your tests automatically and tearing down your test environment if all tests pass. Save big with transient test environments!

For more on provisioning, read our [Provision docs](/provision/why-infrastructure-provisioning/)

<a name="continuous-delivery"></a>
##Putting it all together: Continuous Delivery!

While many platforms claim to do CI/CD, i.e. Continuous Integration AND Continuous Delivery, they usually offer a point solution in the form of a job which is triggered on some event, executes a set of instructions, and finishes. This is not sufficient to set up your end to end DevOps workflow. You need a platform that lets you create a true **DevOps pipeline**, a series of jobs connected in sequence or in parallel, along with approval gates at each stage. Shippable gives you just that.

Let us consider the end to end deployment for a single service, with source code maintained in a repository called gitRepo. In Shippable, you easily construct pipelines by defining 'resources' (gray) and 'jobs' (green). For example, here's a sample pipeline scenario you could construct:

<img src="/images/getting-started/codeToProdPipelines.png" alt="Shippable Continuous Integration and Delivery" style="width:1200px;"/>

In this scenario:

* Every time your code changes, it triggers CI. This job is represented by `ci`.

* Upon a successful CI run, a versioned docker image for your service is built and pushed to a Docker registry. This is represented by the `image` resource.

* This triggers creation of a new version of your service manifest, represented by the `manifest` job. This job also takes additional parameters like docker options, environment variables, etc.

* The updated manifest version automatically triggers a deployment to your Test environment. This is represented by the `deploy-Test` job and deploys to the 'cluster-test' resource specified for the test environment (though not pictured, you could also configure Shippable to trigger functional tests each time this environment is updated).

* Each time the Test environment is updated, your Test team is notified through a Slack channel.

* Once ready (e.g. all tests have passed), the `release` job executes, creating a new release candidate and incrementing the version number. Your Ops team is notified about the new release creation through a Slack channel.

* The new release is then automatically deployed via the `deploy-beta` job to the Beta environment running on the `cluster-beta` cluster.

* After further testing in the Beta environment (e.g. stress tests, smoke tests, etc.), it's ready to deploy to Prod (if needed, we could have also inserted another `release` job between Beta and Production deploy jobs).

* **Release day**! You trigger a manual deploy to production! This is represented by the `deploy-Prod` job.
