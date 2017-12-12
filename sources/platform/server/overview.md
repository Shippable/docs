page_main_title: Shippable Server overview
main_section: Platform
sub_section: Shippable Server
page_title: Shippable Server overview
page_description: Run the Shippable CI/CD and DevOps platform on-premises behind your firewall
page_keywords: ci, continuous integration, devops, docker, on-premises

# Shippable Server overview

In addition to our [Hosted SaaS service](https://app.shippable.com), the Shippable CI/CD and DevOps automation platform is available as an on-premises Server product which you can install and manage behind your firewall.

The driving factors behind the decision to self-host Shippable usually include:

* You have stringent Security requirements that prevent you from using any software that's offered as SaaS
* You are using an on-premises source control like Github Enterprise, Bitbucket Server (Stash), or Gitlab Enterprise.
* You like having everything in your control, even at the expense of spending more time babysitting your CI/CD platform

## Basic architecture

Shippable Server natively integrates with the following source control providers:

* GitHub Enterprise
* Github
* Bitbucket Server (Stash)
* Bitbucket
* All versions of Gitlab

Once configured, you can sign in with your source control provider credentials and all features and functionality for end users will work just like it does with our SaaS service. All SaaS docs are therefore valid once you have configured Shippable Server for your organization.

Shippable Server can be installed on any cloud, or on your own physical machines. The requirements for most Server installations are as follows:

<img src="/images/platform/tutorial/server/shippable-server-requirements.png" alt="Admiral-github">

Please note that the topology can be scaled out for larger teams or enterprise installations. It is also possible to use any existing components you might have, such as Vault for storing secrets, or your own Postgres instance.

## Authentication

Shippable Server leverages your source control authentication credentials for authentication. If your source control provider is using LDAP, SSH, or SAML, Shippable Server will also use the authentication supported by your central SSO.

The big advantage of this is that you do not need to manage separate accounts on Shippable Server.

## Trial installations

If you are interested in trying Shippable Server, we will help you with a 30 day hands-on Trial for FREE. This is a special offer that has enabled teams to be up and running with end-to-end deployment pipelines in less than a week.

The Trial contract includes the following:

* Shippable Server trial license valid for 30 days
* Direct access to the Shippable team, including customer success engineers and developers, through a dedicated Slack channel
* Installation assistance
* Help with configuration of an Assembly Line for any application of your choice

[Contact us](https://www.shippable.com/enterprise.html#shippable-server-contact) to take advantage of this offer. You can choose to make the Trial as hands-on or off as you need. Help is always a Slack message away :-)
