page_main_title: Push artifacts to S3
main_section: CI
sub_section: Pushing artifacts

#Pushing Artifacts to S3

You can push your artifacts to S3 in any section [of your yml](../platform/shippable-yml/).

##Setup

Before you start, you will need to connect your Amazon S3 account with Shippable so we have the credentials to push artifacts on your behalf.

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.
<img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="List subscriptions">
- Click on the **gear icon** on the Subscription page and then on **Settings**.
-  Locate the **Encrypt** section.
-  Enter the **AWS_SECRET_ACCESS_KEY** and **AWS_ACCESS_KEY_ID** name-value pairs separated by a space.
-  Keep the encrypted values in hand as they will be used in the yml.

## Config

After completing the Setup step, add the following to the `shippable.yml` for your project. This snippet tells our service to login into S3 using your keys and pushes the artifacts in the `on_success` section.

```
env:
  global:
    #secure variable contains values for AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
    - secure: HKwYujx/qmsyQQdHvR2myu8HLUDtcLeDyYV149YJuxIV4J7Hk3SxeY8X3D6aTlR8mvMnd/ZFY+tGNUh4G0xtLLjjZcPsBgvFlB

build:

  on_success:
    - aws s3 sync $SHIPPABLE_BUILD_DIR "s3://bucket_name" --region "us-east-1"

```

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes artifacts to Amazon S3.

**Source code:**  [devops-recipes/ci-push-to-s3](https://github.com/devops-recipes/ci-push-to-s3).

**Build link:** <a href="https://app.shippable.com/github/himanshu0503/ci-push-to-s3/runs/1/summary" target="_blank"> CI build on Shippable</a>

**Build status badge:** [![Run Status](https://api.shippable.com/projects/5900943a28b7f006008d355d/badge?branch=master)](https://app.shippable.com/github/himanshu0503/ci-push-to-s3)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
