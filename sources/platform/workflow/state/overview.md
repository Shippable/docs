page_main_title: Overview
main_section: Platform
sub_section: Workflow
sub_sub_section: State
page_title: State - DevOps Assembly Lines
page_description: State(ful) workflow means that it is designed to remember the data from preceding events. Since DevOps automation is creating "Islands of Automation" due to fragmented tools, this component is a key element to achieve frictionless CI/CD.
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# State
State(ful) workflow means that it is designed to remember the data from preceding events. Since DevOps automation is creating "Islands of Automation" due to fragmented tools, this component is a key element to achieve frictionless CI/CD.

All activities of DevOps create information that is critical to some other activity in your software delivery workflow. This information could be as simple as the status of the activity all the way up to data about the access key, IP addresses, network configurations, and so on. This information needs to be accessible from a systems perspective if you want to achieve Continuous Delivery. Every piece of this information, if not accessible through an API or through an automated workflow, will create friction in your software delivery.

Let's look at an example, a Continuous Integration activity would need to generate data about the commit SHA, Build Number, image tag, storage location of build output, test results, etc. This is necessary for the Test team to be able to deploy the right version of the service into test environments. If the Test team has to constantly ping the Dev team for this information, it is not a frictionless process and will be error prone.

Typical use cases for State are the following

* Storing network configuration like VPC info, subnets, security groups, etc.
* List of security approved machine images for VM deployments
* Environment information like IP Addresses, Access Keys, Bastion hosts, etc.
* Storing output information from popular DevOps tools, e.g., Terraform output that needs to be present to rerun the activity
* Status of CI jobs like build number, commit SHA, tags, coverage reports, and test reports
* Release version list, time of release, components that make up the release with immutable tags
* Deployment state, time, versions, and so on
* Environment variables and configurations required to run the app

There are many more use cases where this applies, like service discovery, key-value stores, load balancers, and so on.

<a name="types"></a>
## Types
Shippable Assembly Lines platform has three forms of state.

* **Key-value state**: is stored as a property in the immutable version of a resource or job. Every job that uses the resource will have access to the version and in turn has access to the key-value pair that was stored in that version.

* **File based state**: is available only in jobs and state files up to 1MB can be stored for every version, i.e. run, of a job. Every subsequent job that has this as an input has access to those files. This makes it easy to transfer stateful data from one job to another.

* **Shared state resource**: state always flows from left to right. However, there are some scenarios where a shared state is needed. For example, Terraform creates a statefile when `terraform apply` is run. But if you need to run this in a multi-stage manner where subsequent jobs make changes to this state, it somehow needs to flow back to the first job that created it. Our Assembly Lines has a special shared `state` resource that allows this state to be stored centrally and shared across the jobs.  

## Further Reading
* [Resource](/platform/workflow/resource/overview)
* [Job](/platform/workflow/job/overview)
* [Quick Start to CI](/getting-started/ci-sample)
* [Quick Start to CD](/getting-started/cd-sample)
* [How to store custom key-value information about a Job](/platform/tutorial/workflow/sharing-data-between-runs.md)
* [Writing key-value information to an OUT Resource](/platform/tutorial/workflow/writing-keyvalues-to-output-resource.md)
* [How to create and use state that can be shared back and forth between Jobs ](/platform/tutorial/workflow/sharing-data-between-jobs.md)
* [How to use state from prior run of a Job](/platform/tutorial/workflow/sharing-data-between-runs.md)
