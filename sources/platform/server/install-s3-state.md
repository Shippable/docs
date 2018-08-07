page_main_title: Shippable Server - Install State storage
main_section: Shippable Server
sub_section: Configuration
sub_sub_section: State Storage
page_title: Shippable Server - S3 State storage
page_description: Install with S3 for storing state for Shippable Server
page_keywords: ci, continuous integration, devops, docker, on-premises, enterprise, s3

# State Storage (S3) Configuration

Shippable Server can use GitLab to store state, which consists of files that contain information for a version of a job or resource and can be retrieved by downstream jobs in your Assembly Line.

In order to store state in S3, you need an AWS access key and secret key that have S3 access.

<img src="/images/platform/server/admiral-s3state-config.png" alt="Configuring S3 for state store">


## Installing State

When you first log in to the [Admiral UI](/platform/server/install/#the-admiral-ui), the default state selection will be S3. Input your AWS access key and secret key to be used to save state in your AWS account. The same bucket will be used for both state and cache, if enabled. The bucket name box may be left blank to generate a bucket name or you can select your own new or existing bucket name.

You will need to click the **Apply** button after completing other sections.

## Viewing configuration

Once S3 State storage is initializing, you'll be able to view the configuration and logs.

<img src="/images/platform/server/admiral-s3state-config.png" alt="S3 state config">

## Viewing logs

The **Logs** button (paper clip icon) for **STATE** will show the logs from installation and initialization.

<img width="50%" height="50%" src="/images/platform/admiral/admiral-gitlab-logs.png" alt="State logs">

## Changing state

When switching from a different state option after first installing Shippable Server, make sure to click the toggle button to confirm this.

If you are switching to S3 from GitLab storage, state will be copied from GitLab to S3 when the update is applied. After the state migration is complete and you have confirmed that all of your state contents are still available, you can remove the GitLab instance.

If you are adding S3 storage and did not previously have state storage, no state will be available for any jobs that previously ran. Jobs that run after the update is applied will have state.
