page_main_title: gitRepo
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# gitRepo
`gitRepo` is used to connect DevOps Assembly Lines to source control repository. Adding it creates a webhook to the repo so that future commits will automatically create a new version with with webhook payload. This will trigger any jobs that have this resource as an `IN`.

You can create an cliConfig resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			cliConfig
    integration: 	<string>
    pointer:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `gitRepo`

* **`integration`** -- name of the integration. Currently supported integrations are
	* [GitHub](integration/github/)
	* [Bitbucket](integration/bitbucket/)
	* [Bitbucket Server](integration/bitbucket-server/)
	* [Gitlab/GitlabServer](integration/gitlab/)

* **`pointer`** -- is an object which contains integration specific properties

```
  pointer:
    sourceName: 			<string>
    branch: 				<string>
    branches:
      except:
        - <branch name>		<string>
        - <branch name>		<string>
      only:
        - <branch name>		<string>
        - <branch name>		<string>
    tags:
      except:
        - <tag name>		<string>
        - <tag name>		<string>
      only:
        - <tag name>		<string>
        - <tag name>		<string>
	buildOnCommit: 			<Boolean>
	buildOnPullRequest: 	<Boolean>
	buildOnRelease: 		<Boolean>
	buildOnTagPush: 		<Boolean>
```

* Detailed explation of the pointer properties
	* `sourceName` -- (required) is the fully qualified name of the repository in the format 88org/repo**
    * `branch` -- (optional) specifies specific branch name which this resource represents. If not set, all branches trigger a new version. Cannot be set if `branches` property is used
    * `branches` -- (optional) works like the `branch` but allows to use it for a collection of branches. Cannot be used if `branch` is used. Wildcards can used in names. e.g. feat-*
    	* `except` -- (optional) Can be used to exclude a collection of branches
    	* `only` -- (optional) Can be used to include only a collection of specific branches
    * `tags` -- (optional) used to specify a collection of tags and releases upon which a new version is created
    	* `except` -- (optional) Can be used to exclude a collection of tags or releases
    	* `only` -- (optional) Can be used to include only a collection of specific tags or releases
    * `buildOnCommit` -- (default is true) used to control whether the resource wil be updated for commit webhooks
    * `buildOnPullRequest` -- (default is false) used to control whether the resource wil be updated for pull-request webhooks
    * `buildOnRelease` -- (default is false) used to control whether the resource wil be updated for release webhooks    
    * `buildOnTagPush` -- (default is false) used to control whether the resource wil be updated for tag webhooks

## Used in JOBs
This resource is used as an IN for the following jobs

* runCLI
* runSH
* runCI

## Default Environment Variables
Whenever `gitRepo` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `gitRepo`|
| `<NAME>`\_BASE\_BRANCH       			| If the version was created for a pull request, this is the name of the base branch into which the pull request changes will be merged. |
| `<NAME>`\_BRANCH            			| When the version was created for a commit, this is the name of branch on which the commit occurred. If it was created for a pull request, this is the base branch. |
| `<NAME>`\_COMMIT            			| SHA of the commit of the version being used. |
| `<NAME>`\_COMMIT\_MESSAGE    			| Commit message of the version being used. |
| `<NAME>`\_COMMITTER         			| Name of the committer for the SHA being used. |
| `<NAME>`\_GIT\_TAG\_NAME      			| If a Tag Name was present in the current version, Supported only if the Integration is GitHub.|
| `<NAME>`\_HEAD\_BRANCH       			| If the version in context is a pull requests, then this is the name of the branch the pull request was opened from. |
| `<NAME>`\_HTTPS\_URL       				| The HTTPS URL for the Git repository. |
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the [Integration]() depending on which was used. More info on integration page |
| `<NAME>`\_IS\_GIT\_TAG        			| Set to `TRUE` if the version in context is a git tag based build. Supported only if the Integration is GitHub. |
| `<NAME>`\_IS\_RELEASE        			| Set to `TRUE` if the version in context is a git release based build. Supported only if the Integration is GitHub. |
| `<NAME>`\_KEYPATH           			| Path to the ssh keyfile associated with the gitRepo. This is the key that is used to clone the repo |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_POINTER_BRANCH    			| Branch if defined in the pointer |
| `<NAME>`\_POINTER\_BRANCHES\_EXCEPT\_0 | Branches except collection if defined in the pointer. 0 throug N elements |
| `<NAME>`\_POINTER\_BRANCHES\_ONLY\_0 | Branches only collection if defined in the pointer. 0 throug N elements |
| `<NAME>`\_POINTER\_TAGS\_EXCEPT\_0 	| Tags except collection if defined in the pointer. 0 throug N elements |
| `<NAME>`\_POINTER\_TAGS\_ONLY\_0 		| Tags only collection if definedin the pointer. 0 throug N elements |
| `<NAME>`\_POINTER_BUILDONCOMMIT			| TRUE or FALSE, default is TRUE, if not defined in the pointer |
| `<NAME>`\_POINTER_BUILDONPULLREQUEST	| TRUE or FALSE, default is FALSE, if not defined in the pointer |
| `<NAME>`\_POINTER_BUILDONRELEASE		| TRUE or FALSE, default is FALSE, if not defined in the pointer |
| `<NAME>`\_POINTER_BUILDONTAGPUSH		| TRUE or FALSE, default is FALSE, if not defined in the pointer |
| `<NAME>`\_PULL\_REQUEST      			| Pull request number if the version was created for a pull request. If not, this will be set to false. |
| `<NAME>`\_RELEASE|_NAME      			| Name of the release if the version in context is a git release based build. Supported only if the Integration is GitHub. |
| `<NAME>`\_RELEASED\_AT       			| Timestamp of the release if the version in context is a git release based build. Supported only if the Integration is GitHub. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer |
| `<NAME>`\_SSH|_URL      					| The SSH URL for the Git repository. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME   					| The commitSHA of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values. 

These utility functions are [documented here]()

## Further Reading
* GKE integration
* AWS integration
* runSH job
* runCLI job
* runCI job
* How to setup CI for my git repo

## TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |

## This to consider

1. To create a `gitRepo` that creates new versions only for tag or release event

```
  pointer:
    sourceName: org/foo
    tags:
      except:
        - <tag name>		<string>
        - <tag name>		<string>
      only:
        - <tag name>		<string>
        - <tag name>		<string>
	buildOnCommit:  false
	buildOnRelease: true
	buildOnTagPush: true
```

  2. Either `branch` or `branches` needs to be set if a new version of `gitRepo` is posted on webhook for `buildOnCommit` or `buildOnPullRequest`.