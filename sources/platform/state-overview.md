page_main_title: Overview
main_section: Platform
sub_section: State
page_title: State - DevOps Assembly Lines
page_description: State(ful) workflow means that it is designed to remember the data from preceding events. Since DevOps automation is creating "Islands of Automation" due to fragmented tools, this component is a key element to achieve frictionless CI/CD.
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |

# State
State(ful) workflow means that it is designed to remember the data from preceding events. Since DevOps automation is creating "Islands of Automation" due to fragmented tools, this component is a key element to achieve frictionless CI/CD.

All activities of DevOps creates information that is critical to some other actitivy in your software delivery workflow. This information could be as simple as the status of the activity all the way up to data about the access key, IP addresses, configurations about the network and so on. This information needs to be accesible from a systems perspective if you want to achieve Continuous Delivery. Every piece of this information if not accessible through an API or through an automated workflow will create friction in your software delivery.

Lets look at an example, a Continuous Integration activity would need to generate data about the commit SHA, Build Number, image tag, storage location of build output, test results, etc. This is necessary for the Test team to be able to deploy the right version of the service into test environments. If the Test team has to constantly ping the Dev team for this information, it is not a frictionless process and will be error prone.

Typical use cases for State are the following

* Storing netowrk configuration like VPC info, subnets, security groups etc.
* List of security approved machine images for VM deployments
* Environment information like IP Addresses, Access Keys, Bastion hosts etc.
* Storing output information from popular DevOps tools e.g. Terraform output that needs to be present to rerun the activity
* Status of CI jobs like Build Number, commit SHA, tags, coverage reports, test reports
* Release version list, time of release, components that make up the release with immutable tags
* Deployment state, time, versions and so on
* Environment variables and configurations required to run the app

There are many more use cases where this applies likes Service Discovery, Key-value stores, Load-balancers and so on.

<a name="types"></a>
# Types
Shippable Assembly Lines platform has three forms of state.

* **Key-value state**: is stored as a property in the immutable version of the Resource or a Job. Every Job that uses the resoruce will have access to the version and in turn has access to the Kev-value that was stored in that version.

* **File based state**: is available only in Jobs and state files upto 1MB can be stored for every version i.e. run of a Job. Every subsequent Job that has this as an input has access to those files. This makes it easy to trasfer stateful data from one Job to another

* **Shared State Resource**: state always flows from left to right. However, there are some scenarios where a shared state is needed. For e.g. Terraform creates a statefile when `terraform apply` is run. But if you need to run this in a mult-stage manner where subsequent Jobs make changes to this state, it some needs to flow back to the first job that created it. Our Assembly Lines has a special shared `state` Resource that allows this state to be stored centrally and shared across the jobs.  


# Further Reading
* Working with Resources
* Working with Integrations
* How to store custom key-value information about a Job
* How to store files that are output when the Job executes
* How to output custom key-value information to a Resource
* How to use state from another Job/Resource in a Job
* How to create and use state that can be shared back and forth between Jobs