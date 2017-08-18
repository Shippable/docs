page_main_title: Platform Overview
main_section: Platform
sub_section: Overview
page_title: Platform Overview

# Platform Overview
There are a plethora of DevOps tools for infrastructure provisioning, configuration management, continuous integration, deployments and so on. Today, a majority of DevOps activities are being automated in functional silos, making the software delivery process disjointed. Valuable resources and time are spent trying to connect "Islands of Automation" with ad-hoc homegrown scripts. These scripts are brittle and cumbersome to create, maintain, and reuse. More importantly, they add friction to your Continuous Delivery initiative.

So we came up with [Shippable's DevOps Assembly Lines Platform](https://www.shippable.com/devops-assembly-lines.html). The best way to visualize the platform is to think of it as an expanded view of the cube below:  

<img src="/images/platform/assembly-lines.jpg" alt="Shippable DevOps Assembly Lines Platform" style="width:600px;"/>

A cube is formed by 6 equal squares, so is our DevOps Platform.  With 6 equally important areas of focus, we believe we have a clear solution to "DevOps Nirvana."

## Facets of our DevOps platform

### Use Cases
DevOps activities span the entire Software Delivery Lifecycle. These are performed by many teams with a diverse set of tools. Most of these activities can be broadly classified into 5 buckets:

- [Continuous Integration (CI)](/ci/why-continuous-integration/): For every code change, build, unit test, and package your application. You can also push your package to an endpoint, such as a PaaS/IaaS or artifact repository.

- [Validate](/validate/devops-validate/): Run functional/integration/performance tests when your application is deployed to a Test environment.

- [Release](/release/devops-release-management/): At any point in your workflow, apply a semantic version to your package to identify it. Configure approval gates for specific parts of the pipeline, such as production deployments.

- [Deploy](/deploy/why-deploy/): Deploy your application to any endpoint, including Docker orchestration platforms like Kubernetes or Amazon ECS, PaaS endpoints like AWS Elastic Beanstalk, or just a Virtual Machine cluster running on any cloud.

- [Provision](/provision/why-infrastructure-provisioning/): Automate your provisioning workflows with Ansible, Terraform, Chef, or Puppet.

Our DevOps platform makes it easy to automate activities in these buckets and easily connect them to achieve Continuous Delivery. It is highly flexible and provides a lot of native functionality while also integrating with your favorite tools.

###Workflow
[Workflow](workflow/overview) makes it easy to connect all of the "Islands of Automation" into DevOps assembly lines across all environments, projects, and tools. A workflow is a dependency chart where upstream activities broadcast events and job state to downstream activities. This helps co-ordinate tasks centrally across diverse DevOps tools without custom DIY scripts. The platform also manages state and job output information across the workflow so that all dependent jobs can access the information they need in order to execute.  Workflows are authored through a simple declarative yml-based language.

### Integrations
[Integrations](/platform/integration/overview) are used to connect your Shippable CI or CD workflows to third party platforms or services and manage secrets like keys, tokens, passwords that are needed for your applications. Integrations are created and owned by users, who then choose to make these integrations available to specific organizations/repositories for use in their CI or CD configuration.  

###Runtime
[Runtime](/platform/runtime/overview/) is used to execute the DevOps activities configured in the Assembly Line. The platform prepares the runtime by installing all packages and dependencies needed by your automation scripts, securely injecting necessary secrets, and configuring any CLIs that are required.

For example, if you have authored a job that copies a file to `S3`, Runtime will automatically spin up an environment that has the AWS CLI and configure it with the supplied AWS credentials. You can just run your `S3` command without worrying about all the prep.  

### Visibility
[Visibility](/platform/visibility/overview) is a critical piece that shows you a real time, interactive, visual representation of all Assembly Lines across your organization in a single view. You can also create custom views that let you focus on specific Assembly Lines. This lets you quickly identify problem areas and bottlenecks and streamline your Continuous Delivery process. It also provides reporting, audit, and analytics on the status and performance of your software delivery workflows.

### Management
[Management](/platform/management/overview) gives you the ability to control the flow of deployable units across your entire Assembly Line. It gives you the option to implement "Automation with a human touch," i.e., **Jidoka**. Management can help with operational tasks like pausing or unpausing activities, rolling back, upgrading your deployment, managing runtime images, etc.

##Configuration

Your Assembly Lines are defined through four yml-based configuration files:

**CI config**

`shippable.yml` is used to configure your continuous integration (CI) workflow. This is the only file you need if you want to only use Shippable for CI. It must reside at the root of your repository. [Read more...](/platform/tutorial/workflow/shippable-yml/)

If you're using Shippable for CI only, follow [these instructions](/ci/enable-project/) to enable your repository.

**Assembly Line config**

`shippable.jobs.yml` contains definitions of the Jobs in your Assembly Line. If you only want to use Shippable for CI, you do not need this file. [Read more...](/platform/tutorial/workflow/shippable-jobs-yml/)

`shippable.resources.yml` contains definitions of the Resources in your Assembly Line. If you only want to use Shippable for CI, you do not need this file. [Read more...](/platform/tutorial/workflow/shippable-resources-yml/)

`shippable.triggers.yml` contains definitions of manual triggers for Jobs in your Assembly Line. You can manually trigger any job in your Assembly Line by pushing a change to this file. This file is optional since you can also run jobs manually through the UI. [Read more...](/platform/tutorial/workflow/shippable-triggers-yml/)

Assembly Line configuration files should be committed to a repository in your source control. This repository is called a **Sync repository**. If you have separate deployment pipelines for different environments or applications, you can put config files for each environment or application in separate repositories. You can add your Sync Repository by following instructions in the [How to work with syncRepo](/platform/tutorial/workflow/crud-syncrepo/) tutorial.

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [Quick Start to CD](/getting-started/cd-sample)
