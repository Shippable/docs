page_main_title: Platform tutorials
main_section: Platform

# Platform tutorials

This is a comprehensive list of tutorials that will demonstrate how you can work with basic platform building blocks like jobs/resources configuration, state management, job runtime, and security.

### Configuration

- [Enabling a CI project](/ci/enable-project)
Enabling your project for CI sets up webhooks, so that your CI workflow can be automatically triggered when your source code changes.
- [Adding an Assembly Line](/platform/tutorial/workflow/add-assembly-line)
If you want Shippable to read your `jobs` and `resources` config, you need to add an Assembly Line  that points to a repository containing the config.
- [Testing your Assembly Line config](/platform/tutorial/workflow/test-assembly-line-config)
Validate Assembly Line YAML structure before committing it to source control or adding it to Shippable
- [Moving jobs and resources to a different config file](/platform/tutorial/workflow/migrate-jobs-resources): This tutorials shows you how to move jobs and resource to a different config file without affecting your workflow
- [Breaking up your workflow into jobs](/platform/tutorial/workflow/break-workflow-into-jobs): This tutorial walks you through how to determine the granularity of a job for your specific workflows
- [Triggering a job](/platform/workflow/job/overview/#when-does-a-job-execute): Learn when jobs get triggered and how to set up dependencies between various components of your workflow
- [Scheduling workflows to trigger at a specific time](/platform/tutorial/workflow/scheduled-triggers): Schedule a cron for your workflows
- [Pausing/Restarting a job](/platform/tutorial/workflow/crud-job/#pausing-jobs): Pausing allows you to stop your Assembly Line temporarily at a specific point and restart it when desired
- [Executing a job with specific input versions](/platform/tutorial/workflow/pin-versions): Running a job against previous versions of inputs enables quick recovery from a bad execution, a bad deployment for example.
- [Using shipctl utility to read from and write to IN and OUT resources](/platform/tutorial/workflow/using-shipctl): shipctl is a powerful utility that makes it very easy to interact with different compoments of your Assembly Line workflow. This is a reference to all available methods.
- [Inserting an approval gate](/platform/tutorial/workflow/insert-approval-gate): If you need manual intervention at a point in your workflow, you can insert an approval gate. This is very useful in manual deployments to production, as an example.
- [Sending status notifications](/platform/tutorial/workflow/send-job-status-notifications): You can send Slack/email/Hipchat/IRC notifications for specific events during job execution.
- [Filtering your SPOG view](/platform/tutorial/workflow/filter-spog-view): The Single Pane of Glass view can get busy for organizations that have a lot of configured workflows. Various mechanisms like flags and custom views help you focus on what is important to you.
- [Viewing version history for jobs and resources](/platform/tutorial/workflow/view-version-history): All components of your Assembly Line workflow are versioned, and information about each version is available through the UI (and API).
- [Sharing information across jobs](/platform/tutorial/workflow/share-info-across-jobs): Learn how to enable toolchain collaboration by exchanging information across jobs.
- [Inserting secrets into jobs](/platform/tutorial/workflow/insert-secrets-in-job): Securely inject secrets at runtime without fear of breaches or accidental disclosure.
- [Running a job on a specific node pool](/platform/tutorial/workflow/run-job-on-specific-node-pool): If you want job(s) to run on a specific pool due to resource needs or security reasons, you can do so by following steps in this tutorial.
- [Running a job directly on the node](/platform/tutorial/workflow/run-job-on-node): By default, jobs run inside a container, but you can override that and run directly on the virtual machine.
- [Using a custom Docker image](/platform/tutorial/workflow/use-custom-image): By default, the platform uses a standard image library to run jobs, but you can override that and use your own custom image.
- [Sending pull request status to source control](/platform/tutorial/workflow/sending-status-to-scm): While CI jobs send job status to source control by default, special configuration is needed for a similar workflow with runSh jobs.
- [Setting environment for a job](/platform/tutorial/workflow/set-env-vars-in-job): Learn the different ways you can inject environment variables into a job.
- [Setting job timeouts](/platform/tutorial/workflow/set-job-timeout): Default timeouts for jobs are 60 min for free subscriptions and 120 min for paid subscriptions. This tutorial shows how you can set a lower timeout for a job.
- [Creating Jira issues](/platform/tutorial/workflow/create-jira-issues): If you use Jira to track bugs, this tutorial will teach you how to open tickets from within the Shippable UI.
- [Running jobs on Windows Server 2016](/platform/tutorial/workflow/jobs-windows): Learn how you can execute runSh jobs on Windows Server 2016.
- [Running jobs on Mac OS](/platform/tutorial/workflow/jobs-macos): Learn how you can execute runSh jobs on MacOS.
- [Running jobs on CentOS/RHEL7](/platform/tutorial/workflow/jobs-centos): Learn how you can execute runSh jobs on CentOS/RHEL7.

### Runtime

- [Managing node pools](/platform/tutorial/runtime/manage-node-pools): Learn how to create and manage node pools.
- [Turning on node caching](/platform/tutorial/runtime/turn-on-node-caching): Caching can dramatically speed up your builds. Learn how to turn it on and start building faster!
- [Managing BYON Nodes](/platform/tutorial/runtime/manage-byon-nodes): Learn how to add your own build infrastructure to your Shippable subscription and manage it.

### Integrations

- [Managing integrations](/platform/tutorial/integration/subscription-integrations/): This tutorial shows how you can create and manage integrations, which are used to connect to third party providers or store secure information.

### Security

- [Encrypting Information](/platform/tutorial/security/encrypt-vars): Encrypt key-value pairs and use the secure key in jobs.
