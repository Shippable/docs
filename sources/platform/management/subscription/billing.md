page_main_title: Subscriptions Billing
main_section: Platform
sub_section: Management
sub_sub_section: Subscription
page_title: Subscription Billing - Shippable DevOps Assembly Lines
page_description: Billing page of Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Subscription Billing

A Subscription on Shippable corresponds to an individual or organizational subscription on GitHub/Bitbucket. Your pricing plans are enforced at a Subscription level, so you need to determine your build minion and pipeline needs for each subscription. Only a Subscription Owner has permission to edit billing.

Our free plan gives you unlimited builds for public/open source projects, and 150 jobs/month across private projects in that subscription. Free plans are restricted to running one job at a time, so if you trigger additional jobs while already running a job, your jobs will be queued until the current job finishes, and then be run one at a time.

You should upgrade your subscription if:

* You need to run more than 150 jobs/month for private projects
* Your jobs are sometimes queued, and you would rather run them in parallel and get quicker results
* Your jobs are CPU/resource intensive and you need bigger machines

##Viewing your current plan

To view your current plan:

* Click on your Subscription in the left navbar.

<img src="/images/getting-started/account-settings.png" alt="Add Account Integration">

* On the Subscription page, click on the **Gears** icon and click on **Billing**. You'll be taken to the Settings page.

<img src="/images/platform/management/settings-billing-menu.png" alt="Show billing page">

* You'll be taken to the **Billing** page where you can view your current plan an invoices(if any).

<img src="/images/platform/visibility/subscription-billing-view.jpg" alt="Subscription view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

##Upgrade or Downgrade your plan

###Upgrade

<img src="/images/platform/management/upgrade-plan.png" alt="Show billing page">

* To buy more parallel capacity, adjust the number in the **Paid minions** field to the capacity you need.

* To buy bigger machines, choose a larger **Minion size**.

* Enter a coupon code if you have one

* Enter a billing contact. This is required so that we know who to reach out to in case there is a problem with your billing.

* Enter your credit card information card and click on **Upgrade** or **Buy**.

We will charge your credit card immediately and send you an invoice. You can also view past invoices on this page.

###Downgrade

You can downgrade your plan by reducing the **Paid Minions** count on the **Billing** page. Alternatively, you can also choose a smaller machine in the **Minion Size** field.

Please note that any minion count changes due to your plan downgrade will be effective immediately and you will not receive a partial or prorated refund if you make this change in the middle of a billing cycle.

Your new price will be reflected in your next invoice.

##Changing payment method

You can change the credit card being used for a Subscription at any time. Just go to the Subscription **Billing** page and click on the **Card** dropdown to choose another card or add a new one.

## Managing credit cards

Credit cards are managed at an Account level and can be used to pay for any Subscription for which you are an Administrator. To learn how to add/remove cards from your account, read the [Managing credit cards page](/platform/management/account/manage-payment-methods)
