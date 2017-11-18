page_main_title: Security and permissions features of the Shippable platform
main_section: Platform
sub_section: Security
page_title: Managing Permissions

# Managing permissions with RBAC

One of the most important aspects of any deployment pipeline is controlling who has access to view and take actions on different tasks in your Assembly Line. Products like Jenkins, which are not tightly coupled with your source control, are unaware of SCM permissions, and hence make it necessary to manage permissions in multiple places.

The Shippable platform is tightly coupled with your source control identity, and manages your access to the platform based on your SCM role for an organization or project. This means that as long as you have given the right read/write/admin permissions to your source code, it will all work as expected in Shippable.

## Role Based Access Control

We support the following levels of permissions for your Assembly Lines and jobs:

* Ability to view a job or Assembly Line
* Ability to take an action , e.g. run a job or pin a version of a resource
* No ability to view or take an action

You can configure these permissions through your source control provider and the Shippable platform will respect them.

### CI permissions

To understand how CI permissions are handled, please read the [CI permissions document](/ci/permissions/).

### Assembly Line permissions

Since your Assembly Line is added to Shippable through your [Sync repository](/platform/workflow/resource/syncrepo), we determine permissions for each user based on their access to the Sync repository in source control.

Here is how we detemine who can do what in your Assembly line:

* Someone with **Admin** or **Write** access to the Sync repository will be able to view and take action on all jobs and resources in the Assembly Line defined in that repository
* Someone with **Read** access to the Sync repository will be able to view the Assembly Line in SPOG and Grid views, but will not be able to run any jobs or take any other action that changes or executes the Assembly Line.
* Someone with no access to the Sync repository will not have any access to view or interact with the Assembly Line on Shippable.

This design allows a lot of flexibility in how you design your Assembly Lines. **Remember that one continuous Assembly Line can be split across several Sync repositories.** This enables you to easily implement a model where the team responsible for a portion of the Assembly Line can have complete access to just that portion, and yet have complete visibility into the end-to-end workflow.

As an example, consider the Assembly Line below:
<img src="/images/platform/security/ci-cd-permissions.png" alt="Role based security for DevOps Assembly Lines">

The Assembly Line shows a simplified workflow where the **Dev** team is responsible for `CI->Package->Push to package repository`, **Test** is responsible for `deploy to Test->run integration tests->deploy to staging->run acceptance tests`, and the **Ops** team is the gatekeeper for `deploy to Production`.

Even though the Assembly Line is continuous, you can split the config across multiple repositories and provide the following permissions:

|      	|  app-repo	 |  test-repo  |  ops-repo  |
|------	| :--------: | :---------: | :--------:	|
| **Developer**  	|   **Write/Admin**  	 |    View   	 |   View   	|
| **QA Engineer** 	|   View   	 |   **Write/Admin**   	 |   View   	|
| **Ops Engineer** 	|   View   	 |    View   	 |   **Write/Admin**  	|

This ensures that each team has complete visibility into the end-to-end workflow, yet can only update or manually trigger tasks for which they have admin or at least write access.
