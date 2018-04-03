page_main_title: Shippable Server | Manage addons
main_section: Platform
sub_section: Shippable Server
sub_sub_section: Configuration
page_title: Manage addons | Shippable Server
page_description: Enable and disable integrations available to Shippable Server users
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, vault

# Managing addons

The Shippable platform supports many integrations, which offer users a way to connect their CI/CD and DevOps workflows with their favorite third party tools or services. A complete list of supported integrations is [available here](/platform/integration/overview).

While configuring Shippable Server,  you might want to pick and choose which integrations are available for use by your end users. For example, if you have an internal policy of only using Google services, you can choose to turn off AWS related integrations to prevent your end users from creating them.

By default, all integrations are disabled, i.e. they will not be available to your end users. The **Addons** section of your Admiral UI shows all available integrations you can make available:

<img src="/images/platform/server/available-addons.png" alt="List of integrations available to Shippable Server end users">

Simply checking or unchecking the box for a specific integration and clicking on **Install Add-ons** will enable or disable it.
