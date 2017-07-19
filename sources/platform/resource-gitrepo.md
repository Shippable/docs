page_main_title: gitRepo
main_section: Platform
sub_section: Resources

# gitRepo


You can use a `gitRepo` resource to connect any source control repository to a job. It is typically used as an optional `IN` for [runSh jobs](job-runsh/).

Adding this resource type creates a webhook on the source repository pointing to Shippable. Due to this, future commits to the repository will automatically create a new version for this resource with the new commit SHA. This will trigger any jobs that have this resource as an `IN` unless triggers are explicitly turned off for that job.

You can create this resource by adding it to `shippable.resources.yml`
```
- name: <string>                                #required
  type: gitRepo                                 #required
  integration: <string>                         #required
  pointer:
    sourceName: org/repo                        #required
    branch: <string>                            #optional
    branches:
      except:
        - <string>                              #optional
      only:
        - <string>                              #optional
    tags:
      except:
        - <string>                              #optional
      only:
        - <string>                              #optional
    buildOnCommit: <Boolean>                    #optional
    buildOnPullRequest: <Boolean>               #optional
    buildOnRelease: <Boolean>                   #optional
    buildOnTagPush: <Boolean>                   #optional
```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`.  If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'gitRepo'.

* `integration` should be the name of the integration that connects to the Source Control provider where the repository is located. To learn how to create integrations for a specific Source Control Provider, please select from the list below and read the **Adding an integration** section on that page:

    - [GitHub](int-github/)
    - [Bitbucket](int-bitbucket/)
/platform/int-bitbucket-server/
    - [Gitlab/GitlabServer](int-gitlab/)

* `pointer` section provides information about the repository and branch to which you want to connect.
    * `sourceName` is the fully qualified name of the repository in the format **org/repo**
    * `branch` specifies a particular branch for this `gitRepo`.  The `gitRepo` resource will only be updated for updates to this branch. If not specified, all branches will update the `gitRepo`, unless restrictions are specified in the `branches` section.
    * `branches` is used to specify groups of branches that will or will not create new versions of the `gitRepo` resource.  These branches may contain `*` wildcards to match any number of characters or the exact branch names (or tag names, for tag and release webhooks).
        * `except` is an optional list of branches that should not trigger updates through the `gitRepo` resource.  No new versions are created for branches specified here.
        * `only` is an optional list of branches that will trigger updates through the `gitRepo` resource.  If `only` is in the `branches` section, new versions of the `gitRepo` resource will only be created for these branches.
    * `tags` is used to specify groups of tags that will or will not create new versions of the `gitRepo` resource.  These tags may contain `*` wildcards to match any number of characters or the exact tag names, for tag and release webhooks.
        * `except` is an optional list of tags that should not trigger updates through the `gitRepo` resource.  No new versions are created for tags specified here.
        * `only` is an optional list of tags that will trigger updates through the `gitRepo` resource.  If `only` is in the `tags` section, new versions of the `gitRepo` resource will only be created for these tags.
    * `buildOnCommit` determines if the `gitRepo` resource will be updated for commit webhooks.  The default is `true`, in which case commits result in new versions of the `gitRepo` and can trigger a pipeline.
    * `buildOnPullRequest` may be set to `true` to create new versions of the `gitRepo` when a pull request webhook is received.  By default, it is `false`.
    * `buildOnRelease` may be set to `true` to create new versions of the `gitRepo` when a release webhook is received.  By default, it is `false`.
    * `buildOnTagPush` may be set to `true` to create new versions of the `gitRepo` when a tag webhook is received. By default, it is `false`.

**Important points to consider while creating the above yml.**

  1. To create a new version of `gitRepo` resource on tag or release event, the user should set `buildOnTagPush` or `buildOnRelease` fields to `true`, but the `branch` / `branches` fields should not be specified in the yml. In addition to this the user can also specify groups of tags that will or will not create new versions of the `gitRepo` resource, using the `tags.only` and `tags.except` fields in yml.

  2. `branch` / `branches` fields are only to be set if the user wants to post a new version of gitRepo for specific branch/branches with `buildOnCommit` or `buildOnPullRequest`.
