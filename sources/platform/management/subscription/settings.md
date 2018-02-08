page_main_title: Subscriptions Settings
main_section: Platform
sub_section: Management
sub_sub_section: Subscription
page_title: Subscription Settings - Shippable DevOps Assembly Lines
page_description: Overview of all the subscription settings that can be configured on Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Subscription Settings

You can control several aspects of your Subscription from the **Subscription->Settings** page.

## Viewing Subscription settings


* Click on the Subscription in the left navbar.

<img src="/images/getting-started/account-settings.png" alt="Add Account Integration">

* On the Subscription page, click on the **Gears** icon and click on **Settings**. You'll be taken to the Settings page.

<img src="/images/platform/management/subscription-settings.png" alt="Subscription settings view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

The following sections will describe each activity you can control from this page.

## Set technical contact

While this is optional, we **highly recommend** you set a technical contact for your subscription. This allows us to reach out to the right person with breaking changes or any other information that you should be aware of to run jobs on Shippable.

In the **Technical Contact** section, enter the email address and click on **Save**.

## Reset deployment key

You can create a new deployment key for your Subscription by clicking on **Reset all keys**. Please note that you will need to re-encrypt any secure variables you created through Subscription Settings if you reset your keys.

## Encrypt/Decrypt variables

These sections let you encrypt sensitive information like passwords, keys, tokens, etc so you can use it in your yaml configurations. More information on how to encrypt is [here](/platform/tutorial/security/encrypt-vars).

Please note that we recommend using the [key-value pair integration](/platform/integration/key-value) to store sensitive information instead of secure variables. Advantages of using integrations are [listed here](/platform/integration/overview).

## View deployment key

You can view the public key that all your runtime environments will need in case you to access external resources. This key will be regenerated if you reset your Subscription.
