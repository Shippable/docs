main_section: CI
sub_section: Pushing artifacts 

#Pushing Artifacts to S3

You can push your artifacts to S3 in any section [of your yml](../reference/ci-yml/).

##Setup

Before you start, you will need to connect your Amazon S3 account with Shippable so we have the credentials to push artifacts on your behalf.

-  Go to your **Subscriptions Settings** tab and click  on the **Encrypt** in the left side bar.
-  Encrypt your **AWS_SECRET_ACCESS_KEY** and **AWS_ACCESS_KEY_ID**.
-  Keep the encrypted values in hand as they will be used in the yml.

## Config

After completing the Setup step, add the following to the `shippable.yml` for your project. This snippet tells our service to login into S3 using your keys and pushes the artifacts the `on_success` section.

```
env:
  global:
    #secure variable contains values for AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
    - secure: HKwYujx/qmsyQQdHvR2myu8HLUDtcLeDyYV149YJuxIV4J7Hk3SxeY8X3D6aTlR8mvMnd/ZFY+tGNUh4G0xtLLjjZcPsBgvFlB

build:

  on_success:
    - aws s3 sync $SHIPPABLE_BUILD_DIR "s3://bucket_name" --region "us-east-1"

```

**Source code:**  [devops-recipes/push-docker-hub](https://github.com/devops-recipes/push-docker-hub).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/push-docker-hub/runs/1/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58f002c7c585000700aef8ca/badge?branch=master)](https://app.shippable.com/github/devops-recipes/push-docker-hub)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
