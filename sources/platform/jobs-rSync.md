page_main_title: rSync
main_section: Platform
sub_section: Jobs
page_title: Unified Pipeline Jobs - rSync
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |

# rSync
`rSync` is a job that is created internally by shippable when you add a [syncRepo](/platform/resource-syncrepo/). The name of the rSync job is syncRepo's name + `_rSync`. This job is built when you add your syncRepo and whenever you make any changes to your pipeline config files(`shippable.jobs.yml`, `shippable.resources.yml` or `shippable.triggers.yml`) in the source repository. It gets the latest state of your repository(for the branch specified in syncRepo) and creates the jobs, resources and triggers from config files.

If your rSync job fails due to `invalid` integration name present in resource definitions, After adding/updating the integration you can build it manually and it'll create your missing resources or jobs.

<img src="/images/platform/jobs/rSync/rsync-job.png" alt="rSync job">

## Adding default flag using rSync
Flags help you visualize pipeline better by removing unwanted resources, jobs or triggeres from the view.
You can add a default flag to all your resources, jobs and triggers created by a syncRepo.

* Goto the your rSync jobs page.
* click on the `wrench` icon(`Configure Job`) on the top-right corner of your rSync job's page.
* On the config page, goto `DEFAULT FLAG` panel.

<img src="/images/platform/jobs/rSync/add-default-flag.png" alt="add default flag">

* check the checkbox and build this rSync job(To build a job, goto the jobs page, click on the `play` icon and click on `build` button on build page).
* Once your rSync job is built successfully, All the resources, jobs and triggers defined in that rSync job's syncRepo will have default flag(with same name as the rSync job's name).
<img src="/images/platform/jobs/rSync/rSync-flag.png" alt="rSync flag">

To remove the default flag from all the resources, jobs and triggers added by this rSync job, uncheck the checkbox and build your rSync job again.

# Further Reading
* Working with Resources
* Working with Integrations
* Jobs
