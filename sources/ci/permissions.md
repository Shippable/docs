page_main_title: Permissions
main_section: CI
sub_section: Overview

# Permissions

This page describes who has access to your Shippable subscription and repositories and the actions that different roles are allowed to take.

## OAuth Authentication

We use OAuth authentication.

What this means is if you have either a GitHub or Bitbucket account, you do not need to create a separate account on our platform.

If you want to build repositories in your [GitHub Enterprise](/platform/int-github-enterprise/) instance, you will still need to sign in with GitHub or Bitbucket and add an account integration for GitHub Enterprise.


## Authorizing Shippable

When signing in to Shippable, you will be prompted to give Shippable access to your repos. GitHub and Bitbucket auth behave a little differently as described below.

**GitHub**

When you sign in to Shippable for the first time, we only ask for access to public repos. This is because customers who only want to build open source projects do not want to grant a higher level of access.

If you want to use Shippable to build your private repos, you will need to authorize us for private repositories. This is done from your Account Settings Page. Read [our documentation](/ci/enable-project/#enabling-github-private-repositories) for more details.

**Bitbucket**

The Bitbucket API does not have public/private granularity, so we ask for access to all repos on Bitbucket by default.

> **Note**
>
> We realize that most people do not want to give write access to their repo. However, we need write permissions to add deploy keys to your repos for our webhooks to work. We do not touch anything else in the repo.

## Who has access?

We closely mimic GitHub and Bitbucket permissions for organizations and projects.

Anyone who has access to an organization or repository in GitHub/Bitbucket will also have access to build information and/or repository and build actions on Shippable.

This happens automatically, so if you enable a repository in your organization on Shippable and another team member signs in, they will see the enabled repository and build history already present in their account.

We support 3 roles -

**Admin :** Admins have all privileges for an organization or Project. They can enable, run and delete projects, upgrade pricing plans, and view/run, cancel, and delete builds.

**Collaborator :** Collaborators can enable projects and view/run builds on Shippable. They cannot delete enabled projects or upgrade pricing plans.

**Member :** Members have the most restricted permissions. They can view builds on Shippable.

We map the different SCM roles to these three roles in Shippable. Based on these three Shippable roles, permissions are granted to perform specific actions.

Review the table below to view the different actions available for a specific Shippable role.

## Shippable Role based actions for CI

### Repository (Project) level

<h1 align="left"> </h1>
<table>
  <tbody>
    <tr>
      <th>Categories</th>
      <th>Sub-categories</th>
      <th>Actions</th>
      <th>Member</th>
      <th>Collaborator</th>
      <th>Admin</th>
    </tr>
    <!-- Builds -->
    <tr>
      <th rowspan="7">Builds</th>
      <th rowspan="1">In SCM</th>
      <td>Trigger a Run through commit</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <th rowspan="6">Dashboard</th>
      <td>View</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Run</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Re-run</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Cancel</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Run Custom Build</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Download logs</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>

    <!-- Projects -->
    <tr>
      <th rowspan="15">Projects</th>
      <th>Dashboard</th>
      <td>Enable</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <th rowspan="4">Options</th>
      <td>Synchronize</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Pause/Resume</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Reset</td>
      <td></td>
      <td></td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Delete</td>
      <td></td>
      <td></td>
      <td>Yes</td>
    </tr>
    <tr>
      <th rowspan="7">Runs Config</th>
      <td>Branches to be displayed</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Run types to be displayed</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Configure Webhook Events for Triggering Builds</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Run Parallel Jobs</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Consolidate Reports</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Custom Timeout</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Low Coverage Alert</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <th rowspan="2">Encrypt</th>
      <td>Encrypt</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Decrypt</td>
      <td></td>
      <td></td>
      <td>Yes</td>
    </tr>

    <tr>
      <th>Badges</th>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
</tbody>
</table>

### Organization level
<h2 align="left"> </h2>
<table>
  <tbody>
    <tr>
      <th>Categories</th>
      <th>Sub-categories</th>
      <th>Actions</th>
      <th>Member</th>
      <th>Collaborator</th>
      <th>Admin</th>
    </tr>
    <!-- Subscriptions -->
    <tr>
      <th rowspan="15">Subscriptions</th>
      <th rowspan="5">Options</th>
      <td>Select Machine Image</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Copy Deployment key</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Edit Technical Contact</td>
      <td></td>
      <td></td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Edit Billing Contact</td>
      <td></td>
      <td></td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Reset Subscription</td>
      <td></td>
      <td></td>
      <td>Yes</td>
    </tr>
    <tr>
      <th rowspan="3">Integrations</th>
      <td>Add Integrations</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
    <td>Edit Integrations</td>
    <td></td>
    <td>Yes</td>
    <td>Yes</td>
    </tr>
    <tr>
    <td>Delete Integrations</td>
    <td></td>
    <td>Yes</td>
    <td>Yes</td>
    </tr>
    <tr>
      <th rowspan="2">Encrypt</th>
      <td>Encrypt</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Decrypt</td>
      <td></td>
      <td></td>
      <td>Yes</td>
    </tr>
    <tr>
      <th rowspan="1">Billing</th>
      <td>Update plan</td>
      <td></td>
      <td></td>
      <td>Yes</td>
    </tr>
    <tr>
      <th rowspan="4">Nodes</th>
      <td>Change/configure Node provider</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Edit custom Node</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Reset custom Node</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Delete custom Node</td>
      <td></td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
  </tbody>
</table>

### User level
<h2 align="left"> </h2>
<table>
  <tbody>
    <tr>
      <th>Categories</th>
      <th>Sub-categories</th>
      <th>Actions</th>
      <th>Member</th>
      <th>Collaborator</th>
      <th>Admin</th>
    </tr>
        <!-- Accounts -->
    <tr>
      <th rowspan="9">Account Settings</th>
      <th rowspan="4">Accounts</th>
      <td>Edit email</td>
      <td rowspan="9" colspan="4">All users with a Shippable account can perform these actions for their accounts</td>
    </tr>
    <tr>
      <td>Synchronize</td>
    </tr>
    <tr>
      <td>Enable git identities</td>
    </tr>
    <tr>
      <td>Delete Account</td>
    </tr>
    <tr>
      <th rowspan="3">Integrations</th>
      <td>Add Integrations</td>
    </tr>
    <tr>
      <td>Edit Integrations Cards</td>
    </tr>
    <tr>
      <td>Delete Integrations</td>
    </tr>
    <tr>
      <th rowspan="1">Cards</th>
      <td>Add/Edit/Delete Credit Cards</td>
    </tr>
    <tr>
      <th rowspan="1">API tokens</th>
      <td>Add/Delete API token</td>
    </tr>
    <tr>
  </tbody>
</table>

<br>
Review the mapping of the various SCM roles to the three Shippable roles:

## User/Org Permissions mapping to Shippable Roles

<h2 align="left"> </h2>
<table>
  <tbody>
    <tr>
      <th>Scm</th>
      <th>Org/Users</th>
      <th>SCM roles</th>
      <th>Shippable Roles</th>
    </tr>
    <!-- GitHub -->
    <tr>
      <th rowspan="4">GitHub</th>
      <td rowspan="2">Org</td>
      <td>Member</td>
      <td>Collaborator</td>
    </tr>
    <tr>
      <td>Admin</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td rowspan="2">Users</td>
      <td>Member</td>
      <td>Collaborator</td>
    </tr>
    <tr>
      <td>Admin</td>
      <td>Admin</td>
    </tr>

    <!-- GitLab -->
    <tr>
      <th rowspan="7">GitLab</th>
      <td rowspan="5">Org</td>
      <td>10 - Guest</td>
      <td>Member</td>
    </tr>
    <tr>
      <td>20 - Reporter</td>
      <td>Member</td>
    </tr>
    <tr>
      <td>30 - Developer</td>
      <td>Collaborator</td>
    </tr>
    <tr>
      <td>40 - Master</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>50 - Admin</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td rowspan="2">Users</td>
      <td>Member</td>
      <td>Member</td>
    </tr>
      <td>Admin</td>
      <td>Admin</td>
    </tr>

    <!-- Bitbucket -->
    <tr>
      <th rowspan="5">Bitbucket</th>
      <td rowspan="3">Org</td>
      <td>Member</td>
      <td>Member</td>
    </tr>
    <tr>
      <td>Contributor</td>
      <td>Collaborator</td>
    </tr>
    <tr>
      <td>Owner</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td rowspan="2">Users</td>
      <td>All non-admin roles</td>
      <td>Member</td>
    </tr>
    <tr>
      <td>Admin</td>
      <td>Admin</td>
    </tr>

    <!-- Bitbucket Server -->
    <tr>
      <th rowspan="5">Bitbucket Server</th>
      <td rowspan="3">Org</td>
      <td>project_view</td>
      <td>Member</td>
    </tr>
    <tr>
      <td>project_write</td>
      <td>Collaborator</td>
    </tr>
    <tr>
      <td>project_admin</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td rowspan="2">Users</td>
      <td>All other roles</td>
      <td>Member</td>
    </tr>
    <tr>
      <td>project_admin</td>
      <td>Admin</td>
    </tr>  
  </tbody>
</table>

## User Repository Permissions mapping to Shippable Roles

<h2 align="left"> </h2>
<table>
  <tbody>
    <tr>
      <th>Scm</th>
      <th>SCM roles</th>
      <th>Shippable Roles</th>
    </tr>
    <!-- GitHub -->
    <tr>
      <th rowspan="3">GitHub</th>
      <td>Pull</td>
      <td>Member</td>
    </tr>
    <tr>
      <td>Push</td>
      <td>Collaborator</td>
    </tr>
    <tr>
      <td>Admin</td>
      <td>Admin</td>
    </tr>

    <!-- GitLab -->
    <tr>
      <th rowspan="5">GitLab</th>
      <td>10 - Guest</td>
      <td>Member</td>
    </tr>
    <tr>
      <td>20 - Reporter</td>
      <td>Member</td>
    </tr>
    <tr>
      <td>30 - Developer</td>
      <td>Collaborator</td>
    </tr>
    <tr>
      <td>40 - Master</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>50 - Admin</td>
      <td>Admin</td>
    </tr>

    <!-- Bitbucket -->
    <tr>
      <th rowspan="3">Bitbucket</th>
      <td>Contributer</td>
      <td>Collaborator</td>
    </tr>
    <tr>
      <td>Owner</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>Admin</td>
      <td>Admin</td>
    </tr>

    <!-- Bitbucket Server -->
    <tr>
      <th rowspan="2">Bitbucket Server</th>
      <td>repo_write</td>
      <td>Collaborator</td>
    </tr>
    <tr>
      <td>repo_admin</td>
      <td>Admin</td>
    </tr>
  </tbody>
</table>
<br>
Read more about permissions related to [GitHub](https://help.github.com/articles/what-are-the-different-access-permissions/), [Bitbucket](https://confluence.atlassian.com/bitbucket/repository-privacy-permissions-and-more-221449716.html), [GitLab](https://docs.gitlab.com/ee/user/permissions.html) and [Bitbucket Server](https://confluence.atlassian.com/bitbucketserverkb/4-levels-of-bitbucket-server-permissions-779171636.html).
