page_main_title: Job Console Output
main_section: Platform
sub_section: Visibility
sub_sub_section: Project
page_title: Job Console Output - Shippable DevOps Assembly Lines
page_description: Output from the execution of the Job of Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Job Console Output
This view displays the console output of the execution steps from the runs of [runCI](/platform/workflow/job/runci).

To get here:

* Click on the Subscription in the left navbar.

<img src="/images/getting-started/account-settings.png" alt="Add Account Integration">

* Click on the project you want and then on the Project page, click on the run you want to view the console for.


## Console
This shows the exact output from the `stdout` & `stderr` of the runtime where the job executed

<img src="/images/platform/visibility/project-job-console.jpg" alt="Console output, tests, and coverage for a Continuous Integration job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

## Tests
This shows the unit tests output of any unit tests are executed

<img src="/images/platform/visibility/project-job-test.jpg" alt="Console output, tests, and coverage for a Continuous Integration job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

## Code Coverage
This shows file level coverage reports if any coverage analysis was done during the run

<img src="/images/platform/visibility/project-job-coverage.jpg" alt="Console output, tests, and coverage for a Continuous Integration job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

## Scripts
This is the exact scripts that were executed as part of this run

<img src="/images/platform/visibility/project-job-scripts.jpg" alt="Console output, tests, and coverage for a Continuous Integration job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

## YML
This is the object form of [**shippable.yml**](/platform/workflow/config) that was used to create this CI run

<img src="/images/platform/visibility/project-job-yml.jpg" alt="Console output, tests, and coverage for a Continuous Integration job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>
