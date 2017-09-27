page_main_title: Overview of deploying apps using Cloud Native CLI
main_section: Deploy
sub_section: Deploy using Cloud Native CLI

# Using Cloud Native CLI

Most applications today run in the Cloud. Each cloud provider has a native CLI.

Shippable platform offers very rich support for CLI's by:

  - Preinstalling the CLI runtime.
  - Automatically initializing the CLI with your credentials that are securely stored.  

## Preinstalling the CLI runtime

Our goals is to try and prep your build environment as close to your desired state so that you can spend less time prepping and more time developing applications.

Here is a list of CLIs and their specific versions that we have available as part of our images:

* [Ansible](/platform/runtime/cli/ansible/)
* [AWS](/platform/runtime/cli/aws/)
* [AWS Elastic Beanstalk](/platform/runtime/cli/awseb/)
* [Azure](/platform/runtime/cli/azure/)
* [Docker](/platform/runtime/cli/docker/)
* [GKE](/platform/runtime/cli/gke/)
* [JFrog](/platform/runtime/cli/jfrog/)
* [Packer](/platform/runtime/cli/packer/)
* [Terraform](/platform/runtime/cli/terraform/)
* [Kubectl](/platform/runtime/cli/kubectl/)

## Initializing the CLI runtime

Shippable platform automatically initializes the CLI runtime with your credentials securely. This allows you to focus more on the CLI commands than credentials management and initializing your CLI everytime you need to use it. To learn more, see our CLI tutorials below.

## Further Reading

* [Using the AWS CLI to deploy to ECS](/deploy/cd_with_cloud_native_cli)
* [runSH job](/platform/workflow/job/runsh/)
* [cliConfig](/platform/workflow/resource/cliconfig/#cliconfig) resource.
