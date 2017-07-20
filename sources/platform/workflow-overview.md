page_main_title: Workflow Overview
main_section: Platform
sub_section: Overview
page_title: Workflow Overview

# Workflow Overview
Workflow makes it easy to automate the DevOps assembly line across all environments, projects, and tools.

Workflow consists of the following components -

* [Jobs](/platform/jobs-overview/)

  Jobs are the executable units of your pipelines. They take one or more resources as inputs, perform some operation on the inputs, and can output to other resources. Jobs can also act as inputs for other jobs, which serves to daisy-chain a series of jobs into a assembly line.

* [Resources](/platform/resources-overview/)

  Resources are inputs and sometimes outputs for Jobs. A key characteristic of resources is that they can be versioned and are immutable. Resources integrate with third party services via `Integrations`.

* State

  State has many key and critical usecases. It can be used by a job for its next run, pass state between jobs and to share common state across entire the assembly line. State is stored in a specific directory on the Node and the directory is exposed by environment variables.

  State is thus of the following types -

  * Job state

    This state is persisted by a Job during its current run and used for its subsequent runs.

  * Resource state

  * [State resource](/platform/resource-state/)

    Used to create a central state that can be used across the entire pipelines. This resource can be used as IN and OUT step for any job.
