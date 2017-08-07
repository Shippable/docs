page_main_title: Visibility Overview
main_section: Platform
sub_section: Visibility
sub_sub_section: Project
page_title: Visibility Overview - Shippable DevOps Assembly Lines
page_description: Overview of Visibility capabilities of Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Visibility Overview
Visualizing your entire DevOps assembly line in an end-to-end view is critical to understand where the inefficiencies and friction exist in your DevOps Assembly Lines. In addtion, you want to know what progress has been made by all the teams involved in building the next great feature of your product. Shippable's platform comes with capability built-in and this makes it easier for you to go faster and faster

In addition, you can drill down into individual problem areas and even debug the error at a console level with Shippable.

## How is it organized?
We fundamentally believe that source control systems is where the right roles and permissions exist, especially if "Everything as Code" is already an accepted philosophy in your organization. As a result, Shippable uses your source control to organize all your DevOps activities too. Shippable UI is organized with the same hierarchy in mind

* **Account**: this is the highest level entity. It represents a persona of a user. for e.g. github user
* **Subscription**: this is typically an organization on your source control system. This is the entity that contains repositories
* **Project**: this is a representation of your source code repository. It is also the CI view
* **Jobs/Resources**: this is a representation of a [Job](/platform/workflow/job/overview) or a [Resource](/platform/workflow/resource/overview)


## Default Views
These are the types of views depending on what level of the hierarchy you are currently in

### Account Level View
Objects from multiple subscriptions and projects are presented in the pane

<img src="/images/platform/visibility/account-view-grid.jpg" alt="Account view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

### Subscription Level View
Objects of a single subscriptions and projects belonging to it are presented in the pane

<img src="/images/platform/visibility/subscription-view-grid.jpg" alt="Subscription view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

### Project Level View
This is a CI project view. It consists of all the CI runs that you have executed so far

<img src="/images/platform/visibility/project-view-grid.jpg" alt="Project view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

### Jobs/Resources Level View
This view gives you a histroy of all the runs that have been executed for a particular Job or all the immutable versions that were created on a particular Resource. Each run of a Job also results in an immutable version

**Job View**
<img src="/images/platform/visibility/job-view-grid.jpg" alt="Job view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

**Resource View**
<img src="/images/platform/visibility/resource-view-grid.jpg" alt="Resource view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>


## Custom Views
If you would like views that are subset of the Subscriptions,Jobs or Projects, the platform provides ability to create custom views. You can create as many views you need and objects can be duplicated across these views



##Viewing job console output
Just like resources, Jobs are also versioned on Shippable. Every run of a job creates a new version of the job, including a unique build object which stores the console output of the Job run.

<img src="../../images/platform/jobs/jobModal.png" alt="Console output and trace, properties, run, and pause buttons for a job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

You can view console output for a job by clicking on it in the SPOG view. The job console looks like this:

<img src="../../images/platform/jobs/jobModal.png" alt="Console output and trace, properties, run, and pause buttons for a job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Please note that in most cases, the logs you are interested in will be under the **Executing Task -> /home/shippable/micro/nod/stepExec/managed/run.sh** section. This section is shown as expanded in the screenshot above.

In addition to viewing logs for the latest run, you can also view logs for historical runs by choosing a past run in the UI.



# Further Reading
* Working with Resources
* Working with Integrations
* Jobs