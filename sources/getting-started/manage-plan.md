main_section: Getting started
sub_section: Billing

# Managing your plan

A Subscription on Shippable corresponds to an individual or organizational subscription on GitHub/Bitbucket. Your pricing plans are enforced at a Subscription level, so you need to determine your build minion and pipeline needs for each subscription.

By default, each Subscription is on the free plan which includes:

- One free CI build container (2 core, 3.75GB RAM) that can run unlimited builds for public repositories and 150 builds/month for private repositories.
- One parallel build
- Unlimited users and number of enabled repositories

The free plan lets you run one build in parallel and if additional builds are triggered while a build is in progress, they will be queued.

You should upgrade your Subscription to a paid plan in the following scenarios:

- You need to run more than 150 builds/month for private projects
- You are seeing regularly queued builds and want to get build results faster. Buying more minions will
enable parallel execution of builds and reduce queuing time.

The number of parallel builds you can run for your Subscription is equal to the number of minions in your plan.

##Viewing your current plan

To get to the Subscription Billing page:

- Login to [Shippable](http://www.shippable.com).
- Click on the `Subscriptions` icon at the top left of your screen and select the subscription you want to view.
- Click on the **Settings** tab and then on **Billing** in the left sidebar menu.

<img src="../../images/getting-started/billing-plan.png" alt="View current plan">


##Upgrade your plan

To buy more build minions, simply slide the slider to the number of minions you need.

Choose a credit card, or Enter a new credit card and click on Buy.

We will charge your credit card immediately and send you an invoice. You can also
view past invoices on this page.

##Downgrade your plan

You can downgrade your plan at any time by moving the slider to the number of minions you need.

Please note that any minion count changes due to your plan downgrade will be effective immediately and you will not receive a partial or prorated refund if you make this change in the middle of a billing cycle.

Your new price will be reflected in your next invoice.
