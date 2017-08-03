page_main_title: Share data between Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: Share data between Jobs

###Extract IN resource information

If you have a custom job in your deployment pipeline on Shippable which has an `IN` resource, your custom job is triggered each time that resource changes. You might need to extract some information from the resource in your custom job's scripts.

All fields of the input resource are available as environment variables in your script. So if you want to refer to the resource type for example, you can use `RESOURCENAME_TYPE` where RESOURCENAME is the name of your resource. Check out the [environment variables section](#environment-variables) for more details.
