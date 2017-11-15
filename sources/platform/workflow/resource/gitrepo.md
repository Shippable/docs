page_main_title: gitRepo
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# gitRepo
`gitRepo` is used to connect DevOps Assembly Lines to source control repository. Adding it creates a webhook to the repo so that future commits will automatically create a new version with with webhook payload. This will trigger any jobs that have this resource as an `IN`.

You can create a `gitRepo` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.yml`.

```
resources:
  - name:           <string>
    type:           gitRepo
    integration:    <string>
    pointer:        <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `gitRepo`

* **`integration`** -- name of the subscription integration, i.e. the name of your integration at `https://app.shippable.com/subs/[github or bitbucket]/[Subscription name]/integrations`. Currently supported integration types are:
	* [Bitbucket](/platform/integration/bitbucket)
	* Bitbucket Server (Shippable Server only)
	* [GitHub](/platform/integration/github)
	* [GitLab](/platform/integration/gitlab)

* **`pointer`** -- is an object that contains integration specific properties

          pointer:
            sourceName:             <string>
            branch:                 <string>
            branches:
              except:
                - <branch name>
                - <branch name>
              only:
                - <branch name>
                - <branch name>
            tags:
              except:
                - <tag name>
                - <tag name>
              only:
                - <tag name>
                - <tag name>
            buildOnCommit:            <Boolean>
            buildOnPullRequest:       <Boolean>
            buildOnPullRequestClose:  <Boolean>
            buildOnRelease:           <Boolean>
            buildOnTagPush:           <Boolean>

* Detailed explation of the pointer properties:
	* `sourceName` -- (required) is the fully qualified name of the repository in the format **org/repo**
    * `branch` -- (optional) specifies specific branch name that this resource represents. If not set, all branches trigger a new version. Cannot be set if `branches` property is used
    * `branches` -- (optional) works like the `branch` but allows to use it for a collection of branches. Cannot be used if `branch` is used. Wildcards can used in names, e.g., feat-*
    	* `except` -- (optional) Can be used to exclude a collection of branches
    	* `only` -- (optional) Can be used to include only a collection of specific branches
    * `tags` -- (optional) used to specify a collection of tags and releases upon which a new version is created
    	* `except` -- (optional) Can be used to exclude a collection of tags or releases
    	* `only` -- (optional) Can be used to include only a collection of specific tags or releases
    * `buildOnCommit` -- (default is true) used to control whether the resource will be updated for commit webhooks
    * `buildOnPullRequest` -- (default is false) used to control whether the resource will be updated for pull request webhooks
    * `buildOnPullRequestClose` -- (default is false) used to control whether the resource will be updated for closing a pull request webhook
    * `buildOnRelease` -- (default is false) used to control whether the resource will be updated for release webhooks    
    * `buildOnTagPush` -- (default is false) used to control whether the resource will be updated for tag webhooks

## Used in Jobs
This resource is used as an `IN` for the following jobs:

* [runSh](/platform/workflow/job/runsh)
* [runCI](/platform/workflow/job/runci)

## Default Environment Variables
Whenever `gitRepo` is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.


| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `gitRepo`. |
| `<NAME>`\_PATH 							| The path of the root directory of the gitRepo. |
| `<NAME>`\_BASE\_BRANCH       			| If the version was created for a pull request, this is the name of the base branch into which the pull request changes will be merged. |
| `<NAME>`\_BRANCH            			| When the version was created for a commit, this is the name of branch on which the commit occurred. If it was created for a pull request, this is the base branch. |
| `<NAME>`\_COMMIT            			| SHA of the commit of the version being used. |
| `<NAME>`\_COMMIT\_MESSAGE    			| Commit message of the version being used. |
| `<NAME>`\_COMMITTER         			| Name of the committer for the SHA being used. |
| `<NAME>`\_GIT\_TAG\_NAME      			| If a tag name was present in the current version, this will be the tag name. Supported only if the integration is GitHub.|
| `<NAME>`\_HEAD\_BRANCH       			| If the version in context is a pull requests, then this is the name of the branch the pull request was opened from. |
| `<NAME>`\_HTTPS\_URL       				| The HTTPS URL for the Git repository. |
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific integration page. |
| `<NAME>`\_IS\_GIT\_TAG        			| Set to `TRUE` if the version in context is a git tag based build. Supported only if the integration is GitHub. |
| `<NAME>`\_IS\_RELEASE        			| Set to `TRUE` if the version in context is a git release based build. Supported only if the integration is GitHub. |
| `<NAME>`\_KEYPATH           			| Path to the ssh keyfile associated with the gitRepo. This is the key that is used to clone the repo. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_POINTER_BRANCH    			| Branch if defined in the pointer. |
| `<NAME>`\_POINTER\_BRANCHES\_EXCEPT\_0 | Branches except collection if defined in the pointer. 0 through N elements |
| `<NAME>`\_POINTER\_BRANCHES\_ONLY\_0 | Branches only collection if defined in the pointer. 0 through N elements. |
| `<NAME>`\_POINTER\_TAGS\_EXCEPT\_0 	| Tags except collection if defined in the pointer. 0 through N elements. |
| `<NAME>`\_POINTER\_TAGS\_ONLY\_0 		| Tags only collection if defined in the pointer. 0 through N elements. |
| `<NAME>`\_POINTER_BUILDONCOMMIT			| TRUE or FALSE, default is TRUE, if not defined in the pointer. |
| `<NAME>`\_POINTER_BUILDONPULLREQUEST	| TRUE or FALSE, default is FALSE, if not defined in the pointer. |
| `<NAME>`\_POINTER_BUILDONRELEASE		| TRUE or FALSE, default is FALSE, if not defined in the pointer. |
| `<NAME>`\_POINTER_BUILDONTAGPUSH		| TRUE or FALSE, default is FALSE, if not defined in the pointer. |
| `<NAME>`\_PULL\_REQUEST      			| Pull request number if the version was created for a pull request. If not, this will be set to false. |
| `<NAME>`\_RELEASE_NAME      			| Name of the release if the version in context is a git release based build. Supported only if the integration is GitHub. |
| `<NAME>`\_RELEASED\_AT       			| Timestamp of the release if the version in context is a git release based build. Supported only if the integration is GitHub. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer. |
| `<NAME>`\_SSH_URL      					| The SSH URL for the Git repository. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME   					| The commitSHA of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |
| `<NAME>`\_IS_PULL\_REQUEST                | Set to `TRUE` if the version in context is a git open pull request based build. |
| `<NAME>`\_IS_PULL\_REQUEST\_CLOSE         | Set to `TRUE` if the version in context is a git closed pull request based build. Supported only for runSH jobs and only if the integration is GitHub or Bitbucket or Gitlab.|
## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
