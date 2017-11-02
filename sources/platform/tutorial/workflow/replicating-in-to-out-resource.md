page_main_title: Share data between Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: Share data between Jobs

#Replicating an IN resource to an OUT

You might want to update a resource with a copy of another resource in your job.  For example, if you have two image resources and want to update the second with the same tag as the first at the end of your job.  To do this, you can use the `replicate` option.

Let us assume you want to copy the tag from myImage to myNewImage. This can be accomplished with the following `shippable.yml`:

```
jobs:
  - name: myCustomJob
    type: runSh
    steps:
      - IN: myImage
      - IN: myRepo
      - TASK:
        - script: ./IN/myRepo/gitRepo/doSomething.sh
      - OUT: myNewImage
        replicate: myImage
```

The `replicate` option will copy all of the version information from the input resource to the output resource and will work with all output resources in unmanaged jobs.  Additional information, such as a different tag or updated params, may also be added to this version in the same way as versions created without `replicate`.
