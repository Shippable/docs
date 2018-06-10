page_main_title: Share data between Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: Share data between Jobs
page_description: How to write to an OUT resource in Shippable

# Writing to an OUT resource

Resource updates for `OUT` resources are automatically handled by managed jobs, but scripted jobs like `runSh` and `runCI` need to update these resources as part of their  scripts. Updating these `OUT` resources is essential to trigger subsequent portions of your deployment pipeline.


## Updating versionName

Updating the `versionName` for `OUT` resources will trigger a new version of the resource and any jobs that depend on the resource will be triggered.

Let us assume you have two `runSh` jobs **job_1** and **job_2**. Resource **myImage** is an `image` resource which is an `OUT` for **job_1** and an `IN` for **job_2**

You can use the method `shipctl post_resource_state <resource name> versionName <value>` as shown below:

```
jobs:
  - name: job_1
    type: runSh
    steps:
      #IN section will go here
      - OUT: myImage
      - TASK:
        - script: |
          shipctl post_resource_state myImage versionName $BRANCH.$BUILD_NUMBER

```

##Updating key-value information

You can also update the key-values for an `OUT` resource, i.e. update the resource state. This works for `params` resources which only contain key-value pairs, as well as other resources which can store key-values in state.

To reset key-value pairs in state and add a new one, include the following in the `TASK` section of your `runSh` job or in your `runCI` scripts:

```
shipctl post_resource_state <resource name> <key> <value>
```

To append key-value pairs to state, include the following in the `TASK` section of your `runSh` job or in your `runCI` scripts:

```
shipctl put_resource_state <resource name> <key> <value>
```

## Replicating an IN resource to an OUT

For some scenarios, you might want to update an `OUT` resource with a copy of an `IN` resource in your job.

For example, if you have a [multi-stage CI workflow](http://blog.shippable.com/multi-stage-ci) with two jobs **run_lint** which lints the code and **run_all_tests** which runs tests. You want **run_lint** to be triggered automatically on commit or pull request. If everything looks good, it needs to update the OUT resource **my_gitrepo_2** so that **run_all_tests** can be triggered for the same commitSHA.

<img src="/images/platform/tutorial/workflow/multi-stage-ci.png" alt="Multi-stage CI">

You can use the `replicate` option to copy an `IN` resource to an `OUT` resource of the same type in a job:

```
jobs:
  - name: run_lint
    type: runSh
    steps:
      - IN: my_gitrepo_1
      - TASK:
        - script: doSomething.sh
      - OUT: my_gitrepo_2
        replicate: my_gitrepo_1
```

The `replicate` option will copy all of the version information from the input resource to the output resource and will work with all output resources in unmanaged jobs.  Additional information, such as a different tag or updated params, may also be added to this version in the same way as versions created without `replicate`.

##Updating a `state` resource

Please read our docs on [Using central state](/platform/tutorial/workflow/share-info-across-jobs/#central-state) to learn how to write to the `state` resource.
