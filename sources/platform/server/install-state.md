page_main_title: Shippable Server - Install State storage
main_section: Shippable Server
sub_section: Configuration
sub_sub_section: State Storage
page_title: Shippable Server - State storage options
page_description: Configure state for Shippable Server
page_keywords: ci, continuous integration, devops, docker, on-premises, enterprise, s3

# State Storage Configuration Options

State storage is configured so that Shippable Server can store state, which consists of files that contain information for a version of a job or resource and can be retrieved by downstream jobs in your Assembly Line.  State can either be stored in AWS S3 or GitLab. It's also possible to run Shippable Server without state storage, but some resource and job types will not work without state.

## S3 State

The default state option is S3. With this option, state is stored in an S3 bucket. You'll need an AWS access key and secret key to set up S3 state storage.

## GitLab State

Another option is to store state in a GitLab instance. If GitLab is selected, Shippable Server will install GitLab to store state. No further configuration will be required outside of Admiral.

## No State

Although not recommended, installing without state storage is an option. Only the following job types will work without state:

  * [runCI](/platform/workflow/job/runci)
  * [runSh](/platform/workflow/job/runsh)
  * [rSync](/platform/workflow/job/rsync)

All resource types except [state](/platform/workflow/resource/state) will function as expected without state storage.
