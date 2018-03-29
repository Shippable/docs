page_main_title: Shippable Server | Adding admins
main_section: Platform
sub_section: Shippable Server
sub_sub_section: Configuration
page_title: Adding admins | Shippable Server
page_description: Add admins to your Shippable Server instance through Admiral
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, vault

# Shippable Server admins

Admins are users who have visibility into all accounts, organizations, and projects across your Shippable Server instance. They can search for user accounts, view build activity, or trigger certain actions on behalf of another user. However, they cannot view any sensitive information like integration details, passwords, tokens, keys, etc.

You should restrict admin access to those who absolutely need it.

## Adding an admin

In your Admiral UI, click on `System Settings` and scroll to the bottom and view the section on **MANAGE SYSTEM SUPERUSERS**.

Enter the account ID of the user you want to upgrade to admin status. You can find the account ID by clicking
on  **Profile** in the left sidebar and note down the `Account Id` at the bottom of the screen.

<img src="/images/platform/server/find-account-id.png" alt="Admiral-findaccount">

* Paste the account id and click **Add**.

<img src="/images/platform/admiral/Admiral-superuser.png" alt="Admiral-superuser">

## Removing an admin

Click on the **Remove** button in front of an admin to remove them. They will be demoted to a normal user with visibility restricted to their own accounts, organizations, and projects.
