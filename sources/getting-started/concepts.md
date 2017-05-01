main_section: Getting started
sub_section: Overview

#concepts


##Terminology

###Account

You do not need to explicitly create an account on Shippable to start using it. However, since we allow you to connect multiple source control providers and clouds to Shippable, the term 'account' is used to emcompass all of these identities. So for example, 'sync' at an account level means syncing your information across all source control providers and connected third party services.

###Subscription
A subscription on Shippable corresponds to an organization or personal account in your source control provider. So if you sign in to Shippable with GitHub credentials and your username is abcfoo and you're a member of orgs org1foo and org2foo, you will have 3 subscriptions on Shippable.

Billing is handled per subscription.

###Projects
A project on Shippable corresponds to a repository on your source control provider. As with subscriptions, project permissions are also synced with your source control provider.

###Minions
Minions are the build machines that are spun up to run your builds on Shippable Hosted. They are also called build machines or build containers at some places in the documentation.

##Signing in to Shippable

You do not need to explicitly create an account on the Hosted version of Shippable to start using it. You can sign in using your GitHub or Bitbucket credentials. We use OAuth authentication so you will need to authorize Shippable the first time you sign in. We sync all organizations from your source control, so if you click on the <i class="fa fa-bars" aria-hidden="true"></i> menu at the top left of your screen, you will see a list of your organizations (aka subscriptions on Shippable). You can then click into any organization to [enable projects](enable-project/).
