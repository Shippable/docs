page_main_title: Gerrit specific environment variables
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: shipctl - DevOps Assembly Line Jobs
page_description: Gerrit specific environment variables
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Environment Variables For Gerrit builds

Whenever a CI build is triggered or gitRepo is used as an IN for a runSh or runCI job, a set of environment variables are automatically made available that you can use in your scripts that are specific to gerrit projects.

## CI specific environment variables

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| GERRIT_PROJECT 								| The name of the gerrit project |
| GERRIT_REST_URL 								| Gerrit REST api endpoint |
| GERRIT_HOST 								| Gerrit server hostname |
| GERRIT_PORT 								| Gerrit server SSH port |
| GERRIT_BRANCH 								| The current branch of the project |
| GERRIT_EVENT_TYPE 								| The name of the event which triggered the build |
| GERRIT_CHANGE_ID 								| The change-Id of the change |
| GERRIT_CHANGE_URL 								| The canonical URL of the change |
| GERRIT_CHANGE_NUMBER 								| The change number |
| GERRIT_CHANGE_SUBJECT 								| The description of change |
| GERRIT_CHANGE_COMMIT_MESSAGE 								| The commit message for the change’s current patch set |
| GERRIT_REFSPEC 								| The git reference at the revision of current patch set |
| GERRIT_PATCHSET_NUMBER 								| The patchset number |
| GERRIT_PATCHSET_REVISION 							| Git commit for current patchset |
| GERRIT_CHANGE_OWNER_NAME 								| The name of the change owner |
| GERRIT_CHANGE_OWNER_EMAIL 								| The name of the change owner |
| GERRIT_CHANGE_OWNER 								| The name and email of the change owner |
| GERRIT_PATCHSET_UPLOADER_NAME 								| The name of the patchset uploader |
| GERRIT_PATCHSET_UPLOADER_EMAIL 								| The email of the patchset uploader |
| GERRIT_PATCHSET_UPLOADER 								| The name and email of the patchset uploader |
| GERRIT_CHANGE_UPLOADER_NAME 								| The name of the change uploader |
| GERRIT_CHANGE_UPLOADER_EMAIL 								| The email of the change uploader |
| GERRIT_CHANGE_UPLOADER 								| The name and email of the change uploader |



## gitRepo specific envrionment variables

When gitRepo resources are used as IN to runSh or runCI jobs. The gerrit specific envs are available for each gitRepo resource.

`<NAME>` is the the friendly name of the gitRepo resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`_GERRIT_PROJECT 								| The name of the gerrit gitRepo project |
| `<NAME>`_GERRIT_REST_URL 								| Gerrit REST api endpoint |
| `<NAME>`_GERRIT_HOST 								| Gerrit server hostname |
| `<NAME>`_GERRIT_PORT 								| Gerrit server SSH port |
| `<NAME>`_GERRIT_BRANCH 								| The current branch of the project |
| `<NAME>`_GERRIT_EVENT_TYPE 								| The name of the event which triggered the build |
| `<NAME>`_GERRIT_CHANGE_ID 								| The change-Id of the change |
| `<NAME>`_GERRIT_CHANGE_URL 								| The canonical URL of the change |
| `<NAME>`_GERRIT_CHANGE_NUMBER 								| The change number |
| `<NAME>`_GERRIT_CHANGE_SUBJECT 								| The description of change |
| `<NAME>`_GERRIT_CHANGE_COMMIT_MESSAGE 								| The commit message for the change’s current patch set |
| `<NAME>`_GERRIT_REFSPEC 								| The git reference at the revision of current patch set |
| `<NAME>`_GERRIT_PATCHSET_NUMBER 								| The patchset number |
| `<NAME>`_GERRIT_PATCHSET_REVISION 							| Git commit for current patchset |
| `<NAME>`_GERRIT_CHANGE_OWNER_NAME 								| The name of the change owner |
| `<NAME>`_GERRIT_CHANGE_OWNER_EMAIL 								| The name of the change owner |
| `<NAME>`_GERRIT_CHANGE_OWNER 								| The name and email of the change owner |
| `<NAME>`_GERRIT_PATCHSET_UPLOADER_NAME 								| The name of the patchset uploader |
| `<NAME>`_GERRIT_PATCHSET_UPLOADER_EMAIL 								| The email of the patchset uploader |
| `<NAME>`_GERRIT_PATCHSET_UPLOADER 								| The name and email of the patchset uploader |
| `<NAME>`_GERRIT_CHANGE_UPLOADER_NAME 								| The name of the change uploader |
| `<NAME>`_GERRIT_CHANGE_UPLOADER_EMAIL 								| The email of the change uploader |
| `<NAME>`_GERRIT_CHANGE_UPLOADER 								| The name and email of the change uploader |

## Further Reading
* [CI envs](/ci/env-vars)
* [gitRepo](/platform/workflow/resource/gitrepo)
