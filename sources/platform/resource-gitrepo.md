page_main_title: gitRepo
main_section: Platform
sub_section: Resources

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |

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
	* [GitHub](int-github/)
	* [Bitbucket](int-bitbucket/)
	* [Bitbucket Server](int-bitbucket-server/)
	* [Gitlab/GitlabServer](int-gitlab/)

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

# This to consider

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

# Used in JOBs
This resource is used as an IN for the following jobs

* runCLI
* runSH
* runCI

# Further Reading
* GKE integration
* AWS integration
* runSH job
* runCLI job
* runCI job
* How to setup CI for my git repo
