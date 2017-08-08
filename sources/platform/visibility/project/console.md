page_main_title: Job Console Output
main_section: Platform
sub_section: Visibility
sub_sub_section: Project 
page_title: Job Console Output - Shippable DevOps Assembly Lines
page_description: Output from the execution of the Job of Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Job Console Output
This view displays the console output of the execution steps from the runs of [runCI](/platform/workflow/job/runci) 

**Console**
<img src="/images/platform/visibility/project-job-console.jpg" alt="Console output, tests, and coverage for a Continuous Integration job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

This shows the exact output from the `stdout` & `stderr` of the runtime where the job executed

**Tests**
<img src="/images/platform/visibility/project-job-test.jpg" alt="Console output, tests, and coverage for a Continuous Integration job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

This shows the unit tests output of any unit tests are executed 

**Code Coverage**
<img src="/images/platform/visibility/project-job-coverage.jpg" alt="Console output, tests, and coverage for a Continuous Integration job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

This shows file level coverage reports if any coverage analysis was done during the run

**Scripts**
<img src="/images/platform/visibility/project-job-scripts.jpg" alt="Console output, tests, and coverage for a Continuous Integration job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

This is the exact scripts that were executed as part of this run

**YML**
<img src="/images/platform/visibility/project-job-yml.jpg" alt="Console output, tests, and coverage for a Continuous Integration job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

This is the object form of [`shippable.yml`](/platform/tutorial/workflow/shippable-yml) that was used to create this CI run

# Further Reading
* Working with Resources
* Working with Integrations
* Jobs