page_main_title: What is provisioning
main_section: Provision
sub_section: Before you start

# Infrastructure provisioning

Provisioning infrastructure should be automated to avoid configuration drift, ensure predictability in what is provisioned, and make your software delivery process much more reliable.

All intermediate environments like Test and Staging should be perfect reproductions of production so you can catch all bugs that might occur in production and easily reproduce them in any environment. Your infrastructure should be provisioned exactly the same way each time to avoid problems due to config errors.

Shippable helps you automate infrastructure provisioning by providing the following functionality:

- We integrate with popular tools like [Terraform](/provision/aws-with-terraform/), [Ansible](/provision/aws-with-ansible/), Chef, and Puppet to help automate provisioning of your environments. You can store your provisioning scripts in your source control repository and any time your scripts change, the environment is updated and this triggers the rest of your DevOps workflow. You can even manage your VPCs and Networking configuration as code.
- You have a complete history of your config and reproducing a previous config is a one click rollback action.
- Your infrastructure provisioning is part of your overall DevOps workflow, so you can implement advanced scenarios like configuring Shippable to bring up on-demand Test environments when a new version of your application is available. You can also automate triggering your tests automatically and tearing down your test environment if all tests pass. Save big with transient test environments!
