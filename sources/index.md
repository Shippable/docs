page_main_title: Shippable DevOps Automation Platform
page_title: Shippable DevOps Automation Platform
page_description: Learn about DevOps and why you need a standard automation platform
page_keywords: DevOps, Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation
main_section: Getting started
sub_section: Overview


# Shippable DevOps Assembly Lines Platform

Shippable is a DevOps Assembly Lines Platform that helps developers and DevOps teams achieve CI/CD and make software releases frequent, predictable, and error-free. We do this by connecting all your DevOps tools and activities into a event-driven, stateful workflow.

## Why do you need it?

There are a plethora of DevOps tools for provisioning, configuration management, continuous integration, deployments and so on. Today, a majority of DevOps activities are being automated in functional silos, making the software delivery process disjointed with many "Islands of automation". Organizations use cultural collaboration or ad-hoc scripting to manage dependencies between these tools and activities. These approaches are inefficient, besides being brittle and cumbersome to create, maintain and reuse. More importantly, they add friction to your Continuous Delivery initiatives.

Our DevOps Assembly Lines Platform helps you easily and rapidly build end-to-end continuous delivery workflows that are event-driven and stateful. As a result, your team can focus on delivering business value to your customers rather than building homegrown ad-hoc scripts to achieve DevOps automation.

<img src="/images/getting-started/codeToProdPipelines.png" alt="Shippable Continuous Integration and Delivery" style="width:1200px;"/>

We offer a very practical, systematic, and measurable approach to DevOps. We believe that DevOps efforts must start with automation and that you need a standard platform on which you can build reusable automation rapidly. Your first pipeline can take a couple of days, but the next pipeline should take a day, the third half a day, and so on. You can read more about this philosophy in our [DevOps Assembly Lines whitepaper](https://www.shippable.com/devops-assembly-lines.html) and [Platform](platform/overview) pages.

## Use Cases
DevOps activities span the entire Software Delivery Lifecycle. These are performed by many teams and many tools. However, most of these activities can be broadly classified into 5 buckets

- [Continuous Integration (CI)](ci/why-continuous-integration/): For every code change, build, unit test, and package your application. You can also push your package to a PaaS/IaaS or artifact repository.

- [Continuous Delivery (CD)](deploy/continuous-delivery/): Create event-driven workflows for application release automation, with multi-stage deployments, semantic versioning, and execution of test suites.

- [IT Operations](provision/why-infrastructure-provisioning/): Automate your infrastructure provisioning, image building, and security patching workflows with Ansible, Terraform, Puppet, or Chef. Connect IT Ops and CD workflows to create a dependency graph that eliminates the need for manual exchange of information.

Shippable makes it easy to automate activities in these buckets and then connect them to achieve Continuous Delivery. It is highly flexible and provides a lot of native functionality, while also integrating with your favorite tools.

However, it is important to remember that Shippable lets you automate almost anything. Want to deploy using voice commands on Alexa? Check. Want to set your smart coffee machine to start a pot at 8am every morning? Check!

We have optimized the platform for DevOps with a bunch of [pre-defined Jobs](platform/workflow/job/overview/) that make it very easy to automate DevOps activities. However, for anyone with programming skills and an imagination, the sky is the limit with a plain old [shell Job](platform/workflow/job/runsh/).

## How do I get Shippable?

Shippable is available as a [Hosted SaaS offering](https://app.shippable.com) as well as a [Server](/platform/server/overview).

There is also a third hybrid option through [BYON Nodes](/platform/runtime/nodes), where build orchestration happens through the SaaS service, but your jobs run on your own nodes.

### Using Shippable SaaS

You do not need to explicitly create an account on the Hosted version of Shippable to start using it. You can [sign in](https://app.shippable.com/) using your GitHub or Bitbucket credentials. We use OAuth authentication so you will need to authorize Shippable the first time you sign in. We sync all organizations/repos from your source control based on the access granted. You can then click into any organization to [enable projects](/ci/enable-project/).

If you want the benefits of using a SaaS platform, but still want to run your jobs on your own nodes, you can attach BYON nodes to your Shippable subscription. More on BYON nodes is [described here](/platform/runtime/nodes/#custom-nodes).


### Using Shippable Server
Shippable is also available as a Server. Please visit our <a href="https://www.shippable.com/enterprise.html">Enterprise</a> page for more information. Instructions on installing Server are [available here](/platform/server/overview/). We offer a 30 day free pilot license for Shippable Server to help organizations evaluate it.


## How is this documentation structured?

We believe achieving Continuous Delivery through DevOps is a journey that needs a systematic approach. The idea is to automate the different buckets of DevOps activities mentioned above in a structured manner.

As a result, we have structured documentation as follows:

* The [Platform section](/platform/overview) provides an overview of all platform components, a [reference to config and definitions](/platform/reference), and a [list of base tutorials](/platform/tutorials) that will be useful regardless of your specific scenario.

* The [CI section](/ci/why-continuous-integration) explains the config needed for basic CI workflows, and includes a set of tutorials for common scenarios.

* The [CD section](/deploy/continuous-delivery) contains tutorials for Docker and non-Docker deployments, running test suites, and managing semantic versions for releases.

* If you need to run Shippable on-premises, you should check out the [Shippable Server](/platform/server/overview) docs for guidance with installation and config.

## Some core concepts
These are some of the core concepts that we use across the docs.

### Account
You do not need to explicitly create an account on Shippable to start using it. However, since we allow you to connect multiple Source Control providers and Clouds to Shippable, the term 'account' is used to encompass all of these identities. So for example, **Sync** at an account level means syncing your information across all source control providers and connected third party services.

### Subscription
A Subscription on Shippable corresponds to an organization or personal account in your source control provider. So if you sign in to Shippable with GitHub credentials and your username is abcfoo and you're a member of orgs org1foo and org2foo, you will have 3 subscriptions on Shippable.

Billing is handled per subscription.

### Projects
A Project on Shippable corresponds to a repository on your source control provider. As with Subscriptions, project permissions are synced with your source control provider.

### Minions
Minions are the build machines that are spun up to run your builds on Shippable Hosted. They are also called build machines or build containers at some places in the documentation.


## Further Reading
* [What do we support?](getting-started/what-is-supported)
* [Platform Overview](platform/overview)
* [Quick Start to CI](getting-started/ci-sample)
* [Quick Start to CD](getting-started/cd-sample)
