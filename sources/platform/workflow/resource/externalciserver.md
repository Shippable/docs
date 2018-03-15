page_main_title: externalCIServer
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources
page_title: gitRepo resource reference
page_description: externalCIServer resource reference

# externalCIServer
`externalCIServer` is used to connect any external pipelines to Shippable Assembly Lines. This resource is the root resource which is used to update status of [externalCI](/platform/workflow/job/externalci) jobs.

You can create a `externalCIServer` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.yml`.


```
resources:
  - name:             <string>
    type:             externalCIServer
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `externalCIServer`

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
* [externalCI](/platform/workflow/job/externalci)
