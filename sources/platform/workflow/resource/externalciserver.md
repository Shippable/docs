page_main_title: externalCIServer
main_section: Platform
sub_section: Configuration
sub_sub_section: Resources
page_title: externalCIServer resource reference
page_description: How to integrate any job in your existing CI server with your Shippable assembly line using Shippable API?

# externalCIServer
`externalCIServer` is used to connect your continuous integration jobs in other CI servers such as Jenkins to Shippable Assembly Lines. This resource is the root resource which is used to update status of [externalCI](/platform/workflow/job/externalci) jobs.

You can create a externalCI job by adding it to your shippable.yml file and thereafter [creating a syncRepo](/platform/tutorial/workflow/crud-job#adding) in your Shippable UI.

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
