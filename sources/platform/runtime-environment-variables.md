page_main_title: Job Runtime Environment Variables
main_section: Platform
sub_section: Job Runtime
page_title: Environment Variables

# TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |

# Environment variables
Environment variables are used to control the context of your DevOps activity. 

This can be very error prone and missed configurations can cause serious trouble. You might be actually working on production system when you thought you had your laptop configured to use your test system. To avoid this, Job Runtime provides very many easy ways to inject this into your Job Runtime before you start your activity and also clear the state completely once the activity finishes. 

Typical use cases for this are

* Configuring your AWS Credentials to connect to a VPC
* SSH Keys to access your VMs 
* Login to your Docker hub
* Stage specific application configurations e.g. Dev Settings vs Test Settings
* Logging verbosity for different stages of Software Delivery 
* Docker options for multi stage deployments

## Methods to set Environment Variables
Shippable DevOps Assembly Lines provide multiple ways to control how environment variables are injected into your Job Runtime. This also varies a bit depending on the [Resource Type]() you are using. This is to introduce the concepts and more detail information on how to use it is documented in the respective Job/Resource pages. 

The building block of [Assembly Line workflows]() are [Resources]() and they supply information to [Jobs]() which are activities. So resources are the way to push this information into jobs. These are some common ways to use resources for environment variables

* [Resources]() -- every resources provides a common set of environment variables that can be used inside a job. A full [list]() of these common Environment Variables
* [Params]() Resource - There is a special resource to supply additional user defined environment variables. These user defined key-values are sourced into the Job Runtime before your activity is executed. This is in clear text and visible in the scripts
* [Key-Pair]() Integration - In case you need to enrypt your Environment variables, you can use this as the data held by integrations is encrypted at rest and in flight. Every integrations can be wrapped as a resource and then supplied as `IN` to a job
* [runCI]() Job - This is a special CI job where environment variables can be supplied directly in a script. This can also be used to create [Matrix]() build functionality

## Securing Environment Variables
Environment Variables in the end will be set in clear text in Job Runtime. But that being said, there is really no reason to put sensitive information in clear text, embedded into your DevOps Automation scripts. Shippable provides 2 ways to secure these

* Integrations - Shippable has a plethora of pre-built integrations into most popular DevOps services and tools, Clouds, Hubs etc. and your sensitive connection information can be stored as these integration and you can refer to them in your scripts with named pointers. This data is encrypted at rest and only decrypted when the activity executes
* Secure String - We provide you a way to encrypt any string and use the encrypted value in your scripts. Only the members of that source control Organization can decrypt it and jobs that are defined in that Organizational realm are allowed to decrypt it. This is predominently used in Open Source projects. This approach has variety of problems if you use git forking etc. We do recommend using the first approach as its cleaner and more secure

# Further Reading
* Working with Resources
* Working with Integrations
* Jobs
