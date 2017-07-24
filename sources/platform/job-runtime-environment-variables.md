page_main_title: Environment Variables
main_section: Platform
sub_section: Job Runtime
page_title: Environment Variables

# Environment Variables
Environment variables are automatically injected into runCI, runCLI and runSH jobs.
Manifest, Deploy and Release jobs do not have any environment variables injected since these jobs are not scripted.

Environment variables are of the following types -

* [Common](/platform/job-runtime-environment-variables/#common-environment-variables) - These variables are available to all jobs.

* [Job specific](/platform/job-runtime-environment-variables/#job-specific-environment-variables) - These variables are only available in specific jobs.

* [Resource specific](/platform/job-runtime-environment-variables/#resource-specific-environment-variables) - These variables are only available if the resource is specified as an IN to a job.

* [Integration specific](/platform/job-runtime-environment-variables/#integration-specific-environment-variables) - These variables are only available if the resource has an integration that is specified
as an IN to a job.

## Common environment variables
| Env variable        | Description           |
| ------------- |-------------|
| RESOURCE_ID    | The ID of the custom job. |
| JOB_NAME    | The name of the custom job. |
| JOB_TYPE    | The type of the custom job; can be `runSh`, `runCLI` or `runCI` |
| BUILD_ID    | The ID of the currently running build. |
| BUILD_NUMBER    | An alternate ID for the build. |
| BUILD_JOB_ID    | The ID of the currently running job. |
| BUILD_JOB_NUMBER    | The number of the currently running job, within the build. This is always `1`. |
| SUBSCRIPTION_ID    | ID of the Subscription. |
| JOB_PATH    | The path of the directory containing files for the runSh job. This directory contains two subdirectories: `state` (contains the files that will be saved when the job is complete), and `previousState` (contains the files saved in the previous build). |
| JOB_STATE      | The location of the `state` directory for this job, which contains the files that will be saved when the job is complete. |
| JOB_PREVIOUS_STATE | The location of the directory containing the `state` information from when the job last ran. |
| JOB_MESSAGE    | The path of the file containing the message for this job. |
| *JOBNAME*_NAME    | The name of the job, as given in `shippable.jobs.yml`. For a runSh job named `myRunShJob`, the variable name would be `MYRUNSHJOB_NAME` and the value would be `myRunShJob`.|
| *JOBNAME*_TYPE    | The same as `JOB_TYPE`. For a runSh job named `myRunShJob`, the variable name would be `MYRUNSHJOB_TYPE` and the value would be `runSh`. |
| *JOBNAME*_PATH    | The same directory as `JOB_PATH`. For a runSh job named `myRunShJob`, the variable name would be `MYRUNSHJOB_PATH`. This directory contains two subdirectories: `state` (contains the files that will be saved when the job is complete), and `previousState` (contains the files saved in the previous build). |
| *JOBNAME*_STATE    | The same as `JOB_STATE` with a different variable name. *JOBNAME* is the name of the job, converted to uppercase, with any characters that are not letters, numbers, or underscores removed. |
| *JOBNAME*_PREVIOUS_STATE |The same as `JOB_PREVIOUS_STATE` with a different variable name. *JOBNAME* is the name of the job, converted to uppercase, with any characters that are not letters, numbers, or underscores removed. |
| *JOBNAME*_MESSAGE  | The same as `JOB_MESSAGE` with a different variable name. *JOBNAME* is the name of the job, converted to uppercase, with any characters that are not letters, numbers, or underscores removed.  |

## Job specific environment variables

## Resource specific environment variables

## Integration specific environment variables
