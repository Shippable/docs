page_main_title: Overview
main_section: Platform
sub_section: Visibility
page_title: Visibility Overview
page_description: Overview of Visibility capabilities of Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |
| Add link to inconsistencies to rSync|  Open |


##Viewing job console output
Just like resources, Jobs are also versioned on Shippable. Every run of a job creates a new version of the job, including a unique build object which stores the console output of the Job run.

You can view console output for a job by clicking on it in the SPOG view. The job console looks like this:

<img src="../../images/platform/jobs/jobModal.png" alt="Console output and trace, properties, run, and pause buttons for a job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Please note that in most cases, the logs you are interested in will be under the **Executing Task -> /home/shippable/micro/nod/stepExec/managed/run.sh** section. This section is shown as expanded in the screenshot above.

In addition to viewing logs for the latest run, you can also view logs for historical runs by choosing a past run in the UI.



# Further Reading
* Working with Resources
* Working with Integrations
* Jobs