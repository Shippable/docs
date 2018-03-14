page_main_title: syncRepo
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources
page_title: syncRepo resource reference
page_description: syncRepo resource reference

# syncRepo

`syncRepo` is a special resource in the sense that it is the only resource that needs to be added from the UI. This the heart of Shippable DevOps Assembly Lines since this resource is a pointer to the source control repository (called Sync repository) containing the files that define your DevOps Assembly Lines, namely, [shippable.yml](/platform/tutorial/workflow/shippable-yml) files.

At the core, it is a [gitRepo](/platform/workflow/resource/gitrepo), i.e., a source code repo which contains the workflow definitions. You can add a `syncRepo` by following these [instructions](/platform/tutorial/workflow/crud-syncrepo).

**Note:** Shippable only looks for files ending with `shippable.yml`. Names like `shippable.yml.example` are ignored, but `example.shippable.yml` will be processed.

## Used in Jobs
This resource can be used as an `IN` to any job if you choose to trigger something whenever the definition of your Assembly Lines change.

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
