page_main_title: Build status
main_section: CI
sub_section: Building and testing your project

#Build status

The status code for CI builds and pipeline job runs can be seen in the dashboard and via [Shippable API](/platform/tutorial/api/api-overview). The [/runs](http://docs.shippable.com/platform/tutorial/api/api-overview/#!/Runs/get_runs),  [/runs/{runId}](http://docs.shippable.com/platform/tutorial/api/api-overview/#!/Runs/get_runs_runId),  [/jobs](http://docs.shippable.com/platform/tutorial/api/api-overview/#!/Jobs/get_jobs), [/jobs/{jobId}](http://docs.shippable.com/platform/tutorial/api/api-overview/#!/Jobs/get_jobs_jobId), [/projects/:projectId/branchRunStatus](http://docs.shippable.com/platform/tutorial/api/api-overview/#!/Projects/get_projects_projectId_branchRunStatus) and [/accounts/:id/runStatus](http://docs.shippable.com/platform/tutorial/api/api-overview/#!/Accounts/get_accounts_accountId_runStatus) routes in Shippable API return the status code in an attribute called `statusCode`.

## Build status definitions:
Complete States

- **success**: The build has successfully completed with no failed tests in a build or in any job in a matrix build. The statusCode in the API for this state is `30`.
- **unstable**: State when a job ends successfully (meaning it returned an exit code of 0), but there are one or more failed tests. If at least one job in a matrix is unstable and all the other jobs are successful, the build will be marked as unstable. The statusCode in API for this state is `50`.
- **timeout**: The build has timed out prior to executing all the jobs. This occurs  when there is no log output or a command hangs for over 10 minutes. It also occurs if your build is running for over 60 minutes (for free accounts) or over 120 minutes (for paid accounts). The statusCode in the API for this state is `60`.
- **canceled**: State when a build has been manually canceled, from the Shippable portal. The statusCode in the API for this state is `70`.
- **failed**: State when there is at least a single failure in a build or a single job in a matrix build that fails. The errors in the build causing it to fail are listed in the console logs for the exact step it failed. The statusCode in the API for this state is `80`.

Incomplete States:

- **waiting**: A build that is waiting for an available minion. The most probable reason you'll see this state is when you have exceeded the number of concurrent builds your subscription is eligible for. The statusCode in the API for this state is `0`.
- **processing**: A build that is still in progress and is executing the steps defined in shippable.yml file. The statusCode in the API for this state is `20`.
