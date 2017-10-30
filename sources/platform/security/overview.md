page_main_title: Security and permissions features of the Shippable platform
main_section: Platform
sub_section: Security
page_title: Security Overview

# Security & Permissions

The Shippable CI/CD and DevOps platform is built keeping in mind that any security lapses are unforgivable and damaging to all organizations. This includes our own organization, since our customers trust us with their intellectual property.

Please read our blog on [Security best practices at Shippable](http://blog.shippable.com/security-best-practices-shippable-ci-cd-devops) for an overview of how we handle security at Shippable.

The sections below talk about security and permissions feature built into the product to ensure that your automation scripts are secure and you can grant the right level of access to every team member.

## Separation of secrets from automation scripts

Most CI/CD providers offer a way for you to encrypt your secrets so that you're not forced to include passwords, token, and other sensitive information in plain text your automation scripts. At Shippable as well, we support secure environment variables which are encrypted key:value pairs you can use in your configuration.

However, we believe that encrypted strings are problematic due to the unwieldiness of managing a completely meaningless sequence of characters. For example:

```
env:
  global:
    - AWS_S3_LOCAL_PATH='site'
    - AWS_S3_BUCKET='s3://rcdocs.shippable.com'
    - AWS_S3_REGION='us-east-1'
    - secure: YtSX204QeZ4hJ89DCrH/3W+XjbGCBfkhWPwJumHCBMVGkmpF4XWwbLqG65IZtQlRMNRlwI3vsTksDhXnK3ng2nsUUBPyzxbcVI7AJMgd2tIGjGzxqcCLemel+sA+ES/2TBFyy5+mlE2/RqohUWw/xRj45nHQqEIC0xwDmQcQvFObaMjLgceI01uv7AxdLVDpOVMO2i7g7Bxwvfru3EtUVZB+siTAUn28WbCesgSFhNIZa56z+4CpYRfTQP6lfrIWlhtcsHPlb6T0rqXO3gRkaFIBgMLj5Ab/eIeHoOfcdJ/YjsV4NjCYqH/9QgMNMj46EEfcsK2IiFCyFu6X/HwCTw==

```

To improve the experience around handling secrets, we have introduced the concept of **Integrations**, which allow users to store their sensitive information with a friendly name that can be used to configure CI or Assembly Line workflows. These Integrations are encrypted at rest and in flight, and are stored in our Vault.

This means you will never again accidentally disclose keys, passwords or other sensitive information, while still retaining the ability to identify who added an integration and which third-party provider it connects to. It is also easy to manage the underlying values in one place without needing to go update all your scripts.

For more on the advantages of using Integrations, [read our docs here](/platform/integration/overview).

## User permissions

We support the following levels of permissions for your Assembly Lines and jobs:

* Ability to view a job or Assembly Line
* Ability to take an action , e.g. run a job or pin a version of a resource
* No ability to view or take an action

You can configure these permissions through your source control provider and the Shippable platform will respect them.

### CI permissions

To understand how CI permissions are handled, please read the [CI permissions document](/ci/permissions/).

### Assembly Line permissions

Since your Assembly Line is added to Shippable through your [Sync repository](/platform/workflow/resource/syncrepo), we determine permissions for each user based on their access to the Sync repository in source control.

For example:

* Someone with **Admin** or **Write** access to the Sync repository will be able to view and take action on all jobs and resources in the Assembly Line defined in that repository
* Someone with **Read** access to the Sync repository will be able to view the Assembly Line in SPOG and Grid views, but will not be able to run any jobs or take any other action that changes or executes the Assembly Line.
* Someone with no access to the Sync repository will not have any access to view or interact with the Assembly Line on Shippable.

This design allows a lot of flexibility in how you design your Assembly Lines. **Remember that one continuous Assembly Line can be split across several Sync repositories.** This enables you to easily implement a model where the team responsible for a portion of the Assembly Line can have complete access to just that portion, and yet have complete visibility into the end-to-end workflow.
