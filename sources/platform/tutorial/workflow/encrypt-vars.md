page_main_title: Securing environment variables
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: DevOps Assembly Line Triggers
page_description: How to encrypt and decrypt environment variables
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Working with environment variables

Our recommended approach for abstracting sensitive information like passwords, keys, etc is to use the `key-value` integration.

However, there are times when you just want to encrypt something so you can use it in your yml, for example in your `shippable.yml` or configuring a `params` resource.  

## Encrypting information

* From the left navbar, select your Subscription.

<img src="/images/getting-started/account-settings.png" alt="Add Account Integration">

* On the Subscription page, click on the **Gears** icon and click on **Settings**. You'll be taken to the Settings page.

* Go to the **Encrypt** section. Enter your variables in the text box and click on `Encrypt`. This will give you the encrypted string that you can use in your yml.

<img src="/images/ci/encrypt-env-vars.png" alt="Encrypt Environment Variables" style="width:800px;"/>

You can then include the encrypted string in your yml using the `secure` tag. The variables are then available during your build:

As an example, you can use the encrypted variable in `shippable.yml` as shown below:

```
env:
  - secure: <encrypted output>

build:
  ci:
    - echo $FOO  
```

## Decrypting an encrypted string

Owners of a subscription can decrypt an encrypted string through the **Decrypt** section of Subscription settings.
