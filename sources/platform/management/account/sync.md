page_main_title: Account Profile View
main_section: Platform
sub_section: Management
sub_sub_section: Account
page_title: Account Profile - Shippable DevOps Assembly Lines
page_description: Account Profile of the logged in User
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Account Sync

Shippable relies on OAuth authentication against your source control system and then does the following to keep all information synchronized:

* Listen to webhook events that are required to trigger a Shippable action. An example is opening a pull request or committing to a repository
* Every four hours, synchronize all information against your source control provider

In some scenarios, you might want to force a sync to see information from your source control within Shippable. A great example is when you add a new repository to source control and immediately want to enable it on Shippable, before the auto-sync occurs.

You can force a sync by clicking on **Profile** in the left navbar, and clicking on **Sync**. This will synchronize all your git identities.
