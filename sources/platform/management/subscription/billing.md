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

<img src="/images/getting-started/account-settings.png" alt="Add Integration">

* On the Subscription page, click on the **Gears** icon and click on **Billing**. You'll be taken to the Settings page.

<img src="/images/platform/management/settings-billing-menu.png" alt="Show billing page">

* You'll be taken to the **Billing** page where you can view your current plan and invoices(if any).

<img src="/images/platform/visibility/subscription-billing-view-v2.png" alt="Subscription view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

##Upgrade or Downgrade your plan

###Upgrade

* Click on the **Edit plan** icon to start editing your plan

    <img src="/images/platform/management/edit-plan.png" alt="Edit plan">

* If you only want to enable unlimited builds on private repositories, you can simply check the checkbox against **Enable unlimited private repo builds** and click on **Upgrade**. This will upgrade your existing free node to paid and remove all restrictions on the number of builds you can run against private repositories in this subscription.

    <img src="/images/platform/management/enable-unlimited-private-repo-builds.png" alt="Enable unlimited private repo builds">

* To buy different types or sizes of machines, click on **Add new SKU**.

* In the new row, select **On Demand** to run your builds on Shippable's infrastructure, or **BYON** if you want to use your own infrastructure.

* Select the appropriate architecture and Operating System for your nodes:
    *  On-demand nodes are available for `x86_64` architecture with **Ubuntu 14.04**, **Ubuntu 16.04**, **CentOS**, and **Windows Server 2016** platforms.
    *  BYON nodes are available for `x86_64` architecture with **Ubuntu 14.04**, **Ubuntu 16.04**, **CentOS**,  **Windows Server 2016**, and **MacOS** platforms.
    **NOTE**: MacOS and Windows Server BYON nodes currently only support running [runSh jobs](/platform/workflow/job/runsh/). You will not be able to run [runCI jobs](/platform/workflow/job/runci/) on these platforms yet.
    * `aarch64` architecture is supported on **Ubuntu 16.04**.

* Pick an instance size:
    * L is a build node with 2 cores and 7.75GB RAM
    * XL is a build node with 4 cores and 15GB RAM
    * 2XL is a build node with 8 cores and 30GB RAM

* Check the **cache** checkbox if you want to enable node caching for on-demand nodes. If you are pulling or building Docker images as part of your workflow, this is highly recommended to speed up your builds. Please note that machine image versions that come with Docker 18.03 are currently known to be incompatible with node caching. You must use [machine image version 6.9.4](/platform/runtime/machine-image/ami-v694) or earlier for node caching to be effective. More on [node caching here](/platform/runtime/caching/#node-caching).

* To buy more parallel capacity, adjust the number in the **Quantity** column to the capacity you need for each SKU. This will allow you to run multiple jobs in parallel.

* Enter a coupon code if you have one.

* Enter a billing contact. This is required so that we know who to reach out to in case there is a problem with your billing.

* Enter your credit card information card and click on **Upgrade**.

<img src="/images/platform/management/new-sku-row.png" alt="Configure new SKU">

We will charge your credit card immediately and send you an invoice. You can also view past invoices on this page.

###Downgrade

* Visit the **Billing** page and click on the **Edit plan** icon to start editing your plan

* You can now modify the **Quantity** against each purchased SKU.

* To move to a different type of node, or a different instance size, click on the **Add new SKU** button and configure the SKU of your choosing. You can then remove rows for the node types that you do not wish to keep.

* Click on the **Downgrade** button to confirm your changes.

* To cancel your subscription and move back to a free plan, use the **Downgrade to free** button at the bottom of the billing page.

    <img src="/images/platform/management/downgrade-to-free.png" alt="Downgrade to free">

Please note that any changes due to your plan downgrade will be effective immediately and you will not receive a partial or prorated refund if you make this change in the middle of a billing cycle.

Your new price will be reflected in your next invoice.

### Enabling node cache

**Note:** Machine image versions that come with Docker 18.03 are currently known to be incompatible with node caching. You must use [machine image version 6.9.4](/platform/runtime/machine-image/ami-v694) or earlier for node caching to be effective.

You can upgrade your on-demand nodes to have `cache` addon. To know more about caching [click here](/platform/runtime/caching).

* You can purchase the cache addon for any on-demand SKU.

* Node caching is a chargeable add-on. When you enable caching for a node, the unit price will be updated accordingly.

* Click on the **Upgrade** button once you have selected cache checkboxes for required SKUs.

   <img src="/images/platform/management/enable-cache-billing.png" alt="Enable cache">

##Changing payment method

You can change the credit card being used for a Subscription at any time. Just go to the Subscription **Billing** page, click on **Edit plan** and click on the **Change payment method** icon to choose another card or add a new one.

<img src="/images/platform/management/change-payment-method.png" alt="Change payment method">

## Managing credit cards

Credit cards are managed at an Account level and can be used to pay for any Subscription for which you are an Administrator. To learn how to add/remove cards from your account, read the [Managing credit cards page](/platform/management/account/manage-payment-methods)

## Billing Contacts

By default, receipts are sent on a monthly basis to any email address listed in the "Billing Contact(s)" box.  This can be a single address, or a semicolon-separated list of valid email addresses.

  <img src="/images/platform/management/multiple-billing-emails.png" alt="semicolon separated emails">

## Extra Billing Information

You can enter some custom information (like tax information and billing addresses) to be included on your payment receipts.

  <img src="/images/platform/management/extra-billing-information.png" alt="extra billing information">
