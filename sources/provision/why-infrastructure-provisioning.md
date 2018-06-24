page_description: Automating IT Operations activities such as infrastrucure provisioning, image building,
main_section: IT Ops
sub_section: Before you start

# Automation of IT Operations activities

In addition to CI and deployment workflows, you need to automate activities like infrastructure provisioning, image building, and security patching, to avoid configuration drift, ensure predictability and repeatability, and make your software delivery process much more reliable.

For example, intermediate environments like Test and Staging should be perfect reproductions of production so you can catch all bugs that might occur in production and easily reproduce them in any environment. Your infrastructure should be provisioned exactly the same way each time to avoid problems due to config errors.

Shippable helps you automate IT Operations by providing the following functionality:

- We integrate with popular tools like [Terraform](/provision/tutorial/provision-aws-vpc-terraform/), [Ansible](/provision/tutorial/provision-aws-vpc-ansible/), Chef, and Puppet to help automate and config of your environments. You can store your provisioning scripts in your source control repository and any time your scripts change, the environment is updated and this triggers the rest of your DevOps workflow. You can even manage your VPCs and Networking configuration as code.
- You can easily create a dependency tree of all applications that are deployed into your environments. If there is an update to an environment, applications can automatically be re-deployed if needed.
- You can easily transfer information like subnet_id, security_group_id to downstream activities. for e.g. EC2 provisioners as part of your workflow. No more manual copy-paste.
- You can templatize your scripts and inject variables at runtime to make sure the right context is set for each execution.
- The platform offers in-built state, so if you need to store information such as Terraform state files, you don't need to maintain it someplace else. It's stored as part of your workflow and available to any job that needs it.
- You have a complete history of your config and reproducing a previous config is a one click rollback action.
- Your infrastructure provisioning can be part of your overall DevOps workflow, so you can implement advanced scenarios like configuring Shippable to bring up on-demand Test environments when a new version of your application is available. You can also automate triggering your tests automatically and tearing down your test environment if all tests pass. Save big with transient test environments!

The set of documents under this section focus on scenarios related to provisioning and managing your infrastructure. To read more about CI or CD support, please read the [CI section](/ci/why-continuous-integration/) and [CD section](/deploy/why-deploy).

## Tutorials

To get started with IT Ops automation, you can click through the left navigation menu or take a look at the [Tutorials page](/provision/tutorials).

A complete list of all Shippable tutorials is available [here](/getting-started/tutorials)

To start with basics of the Shippable platform and how jobs and resources work, please read the [Platform section](/platform/overview) of the docs.
