page_main_title: Workflow Configuration
main_section: Platform
sub_section: Workflow
page_title: DevOps Platform Configuration

# Configuration

Your Assembly Lines are defined through yml-based configuration files:

**CI config**

`shippable.yml` is used to configure your continuous integration (CI) workflow. This is the only file you need to use Shippable for CI. It must reside at the root of your repository. [Read more...](/platform/tutorial/workflow/shippable-yml/)

**Assembly Line config**

Your pipelines are defined through yml-based configuration files. The `shippable.yml` file contains definitions of the jobs, resources, and triggers in your pipeline. [Read more...](/platform/tutorial/workflow/shippable-yml/)

Assembly Line configuration files should be committed to a repository in your source control. This repository is called a sync repository. If you have separate deployment pipelines for different environments or applications, you can put config files for each environment or application in separate repositories.

## Adding configuration to Shippable

If you're using Shippable for CI only, follow [these instructions](/ci/enable-project/) to enable your repository.

If you're using Shippable's Assembly Lines, you can add your syncRepo by following instructions in the [How to work with syncRepo](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo) tutorial.


## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [Quick Start to CD](/getting-started/cd-sample)
