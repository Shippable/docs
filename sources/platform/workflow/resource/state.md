page_main_title: state
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# state

The `state` resource is a special resource used to store information that can be shared between jobs upstream and downstream across your Assembly Line. This information can be a file and/or key:value pairs.

For any other job or resource, we do not allow workflows that have circular dependencies to avoid infinite loops. However, there are some situations where you do need information passed back and forth between jobs. A classic example is if you're provisioning and de-provisioning environments using **Terraform**, which means that the Terraform statefile will need to be persisted across job runs and *shared* between different jobs.

<img src="/images/platform/resources/sharing-terraform-state-ci-cd.png" alt="DevOps tools exchanging information">

The `state` resource allows circular references since it **never** triggers the dependent job when it changes. It is only meant to store information and make it available when the job needs it.

You can create a `state` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.yml`.

```
resources:
  - name: <string>
    type: state
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `state`


## Usage in Assembly Lines

This resource is used as an `IN` or `OUT` of `runSH` and `runCI` jobs. Please read the [**Using central state**](/platform/tutorial/workflow/using-central-state/) tutorial to learn about how you can store and use files and key-value pairs in the `state` resource..

### Default Environment Variables

Whenever `state` is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `state`. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |


### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
