page_main_title: syncRepo
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# syncRepo
`syncRepo` is a special resource in the sense that it is the only resource thats added from the UI. This the heart of Shippable DevOps Assembly Lines as it is the location where the definitions of your assembly lines are configured as code.

At the core, it is a [gitRepo](/platform/workflow/resource/gitrepo), i.e., a source code repo which contains the workflow definitions. You can add a `syncRepo` by following these [instructions](/platform/tutorial/workflow/howto-crud-syncrepo).


This resource is a pointer to the source control repository containing the files that define your CI/CD workflow, namely, [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml), [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml) and [shippable.triggers.yml](/platform/tutorial/workflow/shippable-triggers-yml).

**Note:** Shippable only looks for an exact match. Names like `shippable.resources.yml.example` are ignored.

## Used in Jobs
This resource can be used as an `IN` to any job if you choose to trigger something whenever the definition of your Assembly Lines change.

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
