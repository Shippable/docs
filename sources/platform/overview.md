page_main_title: Platform Overview
main_section: Platform
sub_section: Overview
page_title: Platform Overview

# Platform Overview
There are a plethora of DevOps tools for provisioning, configuration management, continuous integration, deployments and so on. Today, a majority of DevOps activities are getting automated in functional silos making the software delivery process disjointed. Valuable resources and time is being spent on trying to connect these "Islands of Automation" with adhoc homegrown scripts. These solutions are brittle and cumbersome to create, maintain and reuse. More importantly they add friction to your Continuous Delivery initiatives.

So we came up with [Shippable DevOps Assembly Lines Platform](https://www.shippable.com/devops-assembly-lines.html). The best way to visualize the platform is to think of it as an exploded view of the cube as shown above.  

<img src="/images/platform/assembly-lines.jpg" alt="Shippable DevOps Assembly Lines Platform">

A cube is formed by 6 equal squares, so is our DevOps Platform.  With 6 equally important areas of focus we believe we have a clear solution to "DevOps Nirvana"

## Use Cases
DevOps activities span the entire Software Delivery Lifecycle. These are performed by many teams and many many tools. However most of these activities can be broadly classified into 5 buckets

- [Continuous Integration (CI)](/ci/why-continuous-integration/): For every commit, build, unit test, and package your application.You can also push your package to a PaaS/IaaS or artifact repository.

- [Validate](/validate/devops-validate/): Run functional/integration/performance tests when your application is deployed to a Test environment

- [Release](/release/devops-release-management/): At any point in your workflow, apply a semantic version to your package to identify it. Configure approval gates for specific parts of the pipeline, such as production deployments.

- [Deploy](/deploy/why-deploy/): Deploy your application to any endpoint, including Docker orchestration platforms like Kubernetes or Amazon ECS, PaaS endpoints like AWS Elastic Beanstalk, or just a Virtual Machine cluster running on any cloud.

- [Provision](/provision/why-infrastructure-provisioning/): Automate your provisioning workflows with Ansible, Terraform, or Chef.

Our DevOps platform that makes it easy to automate activities in these buckets to achieve Continuous Delivery. It is highly flexible and provides a lot of native functionality, while also integrating with your favorite tools.

## Workflow

[Workflow](workflow/overview) makes it easy to connect all of the "Islands of Automation" into DevOps assembly lines across all environments, projects, and tools. They are actually dependency charts where upstream activities broadcast events and job state to downstream relying activities. This helps co-ordinate tasks centrally across diverse DevOps activities without having to custom build custom DIY scripts to integrate them along with a state database to persist the job output information. Workflows are authored through a simple declarative language

## Runtime
[Runtime](/platform/runtime/overview/) is used to execute the DevOps activities involved in the Assembly Line. The platform prepares the runtime by installing all the packages and their dependencies needed by your automation script, securely injecting the secrets that are necessary and also configuring the CLIs that are needed for the activity. 

For example, if you are authoring a job that copies a file to `S3`, Runtime will automatically spin up an environment that has AWS CLI, configure it with the supplied AWS credentials and get it fully ready to run your first `S3` command.  

## Integrations
[Integrations](/platform/integration/overview) are used to connect your Shippable CI or CD workflows to third party platforms or services and also manage secrets that might be needed by your applications. They are owned by users of our platform and the scope feature allows you to decide which organizations/repos have access to use it in their DevOps activities. 

## Visibility
[Visibility](/platform/visibility/overview) offers reporting, audit and analytics on the status and performance of all DevOps activities.

## Management
[Management](/platform/management/overview) is about managing the assembly line. Creating secrets, ability to pause unpause actitvities, rolling back, upgrades etc. are all activities that Management can help with

## Further Reading
* [Quick Start to CI](getting-started/ci-sample)
* [Quick Start to CD](getting-started/cd-sample)