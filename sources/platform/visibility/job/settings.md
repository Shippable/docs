page_main_title: Job Settings
main_section: Platform
sub_section: Visibility
sub_sub_section: Job
page_title: Job Settings - Shippable DevOps Assembly Lines
page_description: Overview of all the Job settings that can be configured on Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Job Settings

This is the place where you can configure setting that affect your job.

<img src="/images/platform/visibility/job-settings.jpg" alt="Job settings view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

To get here:

* Click on the Subscription in the left navbar.

<img src="/images/getting-started/account-settings.png" alt="Add Integration">

* On your Subscription dashboard, look for the Job name in the **Name column** and click on it.

* Click on the **Spanner** icon

* You can [pin your Job](/platform/tutorial/workflow/crud-job/) to use specific versions of the `IN`s that the job takes in as inputs. This is typically used to control which version gets deployed etc. or even rollback if you need to

## View Settings

* **Show ENVs in grid view**: Enter list of environment variable matching keys in this field separated by comma which you want to see in subscription, custom and job's dashboard's grid view

<img src="/images/platform/visibility/job-settings-envs-in-grid.png" alt="Job Settings for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>
