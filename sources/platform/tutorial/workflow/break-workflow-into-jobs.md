page_main_title: Breaking up your workflow into jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow

# Breaking up your workflow into jobs

One of the most important decisions you will need to make while writing your configuration is how to map your processes to Assembly Line concepts: jobs and resources.

A **Job** is a component of the Assembly Line workflow that executes a set of commands to achieve an activity, like building and pushing a Docker image to a registry, deploying a service, provisioning a VPC or cluster, etc.  Each job is represented by a rectangle in the Shippable dashboard, with the color indicating job status such as success, failure, timeout, etc.

Some guidelines for determining the granularity of a job are:

* A job should perform one task, so that you can get granular status for that task,
* A job can be triggered independently to trigger the downstream workflow, so job boundaries should be designed with that in mind,
* Jobs can be run in parallel to speed up workflow execution, so if you have a huge test suite, you can potentially divide that up into several jobs and run in parallel,
* Jobs can be run on different sized nodes, so if you want some series of steps to run on a bigger or smaller node size, separate it out into a job.
* A job should have a continuous workflow, with no stops in between. For example, if you need manual input for a step, it's best to separate that step into another job with an approval gate in between. This prevents your jobs from blocking a build node waiting for input.
* For branch based workflows, it's best to separate jobs per branch (or branch type), so that you can easily identify status of each branch.

## Example workflow: Pull requests

Let's take a simple example of a typical workflow: For every merge to `master` branch, you want to run CI, build a Docker image and deploy to Kubernetes dev env if tests pass, run some additional tests against the deployed app, and send the test results back to your source control provider status API.

1. You have feature branches that open PRs to the master branch. In the PR workflow, you want to run tests, build a Docker image and deploy to Kubernetes dev env if tests pass, run some additional tests against the deployed app, and send the test results back to your source control provider status API.
2. On merges to `master` branch, you want to build a Docker images tagged with an incremental version, push this image to Docker Hub, deploy this image to Kubernetes test environment, and run some tests. If tests pass, you want to trigger the downstream workflow that deploys to Staging, etc.

### Single job approach

Let's consider the PR workflow to start with. Technically, you can bundle all these steps into one `runCI` or `runSh` job. Your Single Pane of Glass will look like this:

<img src="/images/platform/tutorial/workflow/break-workflow-into-jobs-fig1.png" alt="Putting all workflow commands into one job">

The approach above has the following characteristics:

* There is no granular status. If this job fails, you cannot at a glance tell if CI, deployment, or functional tests failed.
* The entire workflow runs as one blob, so there is no way to separate out parts for special treatment. For example, you cannot run the functional test suite on a bigger node to speed things up.

If you want to include the commit workflow in the same job, you can use `IF` statements to put everything in one job and your workflow will look just like the first option above. If the job is green or red, you have no way of knowing what passed or failed unless you dig into the logs.

### Multiple jobs approach

Let's look at an alternative approach to the same PR workflow:

<img src="/images/platform/tutorial/workflow/break-workflow-into-jobs-fig2.png" alt="Splitting up workflow into granular jobs">

As you can see, the visual dashboard shows a much more granular status and each job can send its status notifications if needed. You can also run the runTests job on a bigger node, or even split it up into parallel jobs is needed.

Now, if you configure your commit workflow in a separate pipeline, here is how your overall dashboard will look:

<img src="/images/platform/tutorial/workflow/break-workflow-into-jobs-fig4.png" alt="Splitting up workflow into granular jobs">

This is the recommended approach to give you enough granularity to be able to identify status, send notifications, and take a more workflow based approach. The platform is flexible enough to support both approaches, so this is one of the first decisions you'll need to make while designing your automation.
