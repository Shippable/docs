page_main_title: Visibility Overview
main_section: Platform
sub_section: Visibility
page_title: Visibility Overview - Shippable DevOps Assembly Lines
page_description: Overview of Visibility capabilities of Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Visibility Overview

Visualizing your entire CI/CD and DevOps workflows in an end-to-end view is critical to understand where the inefficiencies and friction exist in your DevOps Assembly Lines. In addition, you want to know what progress has been made by all the teams involved in building the next great feature of your product. Shippable's platform comes with capability built-in and this makes it easier for you to go faster and faster

<img src="/images/platform/visibility/spog.png" alt="SPOG: Single pane of glass">

In addition, you can drill down into individual problem areas and even debug the error at a console level with Shippable.

## How is it organized?
We fundamentally believe that source control systems is where the right roles and permissions exist, especially if "everything-as-code" is already an accepted philosophy in your organization. As a result, Shippable uses your source control to organize all your DevOps activities. Shippable UI is organized with the same hierarchy in mind.

* **Account**: This is the highest level entity. It represents a persona of a user. for e.g. github user
	* [Dashboard](/platform/visibility/account/default-view): This is the view where you get to see all active CI Projects and Jobs in a single view

* **Subscription**: this is typically an organization on your source control system. This is the entity that contains repositories
	* [Dashboard](/platform/visibility/subscription/dashboard): This is the view where you get to see all the active CI Projects and Jobs that are under this Organization as defined in the source control system

* **Project**: this is a representation of your source code repository. It is also the CI view
	* [Dashboard](/platform/visibility/project/dashboard): This is the view where you get to see status of your CI project along with history

* **Resources**: this is a representation of all immutable version of a [Resource](/platform/workflow/resource/overview)
	* [Dashboard](/platform/visibility/resource/dashboard): This is the view where you get to see status of your CI project along with history

* **Jobs**: this is a representation of all runs of a [Job](/platform/workflow/job/overview)
	* [Dashboard](/platform/visibility/job/dashboard): This is the view where you get to see status of your CI project along with history
	* [Settings](/platform/visibility/job/settings): This is where you set configurations to use that are specific to the CI Project
	* [Console Output](/platform/visibility/job/console): This is the output of the scripts when it executes in an instance of [Runtime](/platform/runtime/overview)
