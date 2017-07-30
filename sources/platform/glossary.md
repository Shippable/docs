page_main_title: DevOps Glossary
main_section: Platform
sub_section: Tutorials
sub_sub_section: Glossary
page_title: DevOps Glossary

#Glossary of Terms

As you read this documentation, you'll find some familiar terms, and some not-quite-so-familiar ones. This page is a list of terms used throughout this documentation so you can have the right context at each step.

###Account

This one is a bit tricky since you do not explicitly create an account on Shippable; you just sign in with your source control provider credentials.

However, since we support connecting multiple source control providers, the term **Account** is used to encompass all your identities on Shippable.

###Integration

[Integrations](/platform/integration/overview/) store your credentials to connect to third party providers as part of your CI workflows. These are stored in our Secret Store and are encrypted, so that sensitive information like passwords, tokens, or keys are not exposed by accident.

###Minion

A minions is the build machines that are spun up to run your builds on Shippable. They are also called build machines, build containers, or nodes at some places in the documentation.

###Project

A project on Shippable corresponds to a repository on your source control provider.

###SCM
This is a abbreviation of Source Control Management system.

###Subscription

A subscription on Shippable corresponds to an organization or personal account in your source control provider. So if you sign in to Shippable with GitHub credentials and your username is abcfoo and you're a member of orgs org1foo and org2foo, you will have three subscriptions on Shippable.

Plans and Billing are handled at a Subscription level.
