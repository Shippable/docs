page_main_title: Tracing resources
main_section: Deploy
sub_section: Before you start
page_title: Unified Pipeline Trace
page_description: description of trace functionality
page_keywords: pipelines, Continuous Integration, Continuous Deployment, CI/CD, automation, history

#Tracing your deployments
The first question people tend to ask when their application breaks is: what changed? Typically, the more complicated a pipeline gets, the more difficult this question becomes to answer.  To make this easy on the user, Shippable has embedded trace functionality in every pipeline job. It allows you to pick any particular job in your pipeline, and view the entire tree of events that led up to that particular version of that particular job with just a few clicks.  This allows you to go all the way back to the initial code commit that triggered the workflow to begin with.

##Viewing trace

The trace view shows the inputs to a given job. To get to the trace view:

- Click on a job in the SPOG to open the console.
- Click the **Trace** tab above the console. This opens a list of the job's inputs. You can drill down to see the versions of the inputs and all data for that version.

For example, let's assume your [deploy job](/platform/jobs-deploy/) just ran and you want to see what was deployed. When you click **Trace**, the list shows the inputs to that deploy job:

<img src="/images/deploy/deploy-trace.png" alt="majestic trace tab">

In the image above, the deploy job has two inputs: a [manifest job](/platform/jobs-manifest/) and a [cluster resource](/platform/resource-cluster/). You can click on the image resource in the manifest to see which tag was deployed.
