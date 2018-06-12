page_main_title: Running job against specific versions of IN resources
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow

# Running job against specific versions of IN resources

By default, Shippable uses information from the most recent or latest version of an `IN` input when running a job. However, you might want to run your job with older versions of inputs., for example, to roll back an action.

We support this scenario with version "pinning", where you can choose a specific version of inputs to run your job. Input versions may be pinned either though the yml configuration or in the UI.

## Pinning resource versions in shippable.yml

You can pin a specific input version with the yml below:

```
jobs:
  - name: job_name
    type: job_type
    steps:
      - IN: resource-1
        versionName: "user friendly version e.g tag or commitSha"
      - IN: resource-2
        versionNumber: "shippable's internal version number"
```

You can use versionName to pin gitRepo and image resources. The versionName contains:

* gitRepo: commit SHA
* image: tag

You can use versionNumber, Shippable's internal incremental numbering system, to pin the following resources:

* dockerOptions
* params
* replicas

## Pinning versions in the UI

To pin a version of an input resource in the UI, first right-click on the job and click **Configure Job**. This will open a configuration page where you can select a version to pin for any of the inputs. Versions may be unpinned on the same page by selecting Latest version.
