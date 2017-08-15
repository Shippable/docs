page_main_title: Configuration
main_section: Platform
sub_section: Configuration
page_title: DevOps Platform Configuration

# Configuration

Your Assembly Lines are defined through four yml-based configuration files:

**CI config**

`shippable.yml` is used to configure your continuous integration (CI) workflow. This is the only file you need if you want to only use Shippable for CI. It must reside at the root of your repository. [Read more...](/platform/tutorial/workflow/shippable-yml/)

**Assembly Line config**

`shippable.jobs.yml` contains definitions of the Jobs in your Assembly Line. If you only want to use Shippable for CI, you do not need this file. [Read more...](/platform/tutorial/workflow/shippable-jobs-yml/)

`shippable.resources.yml` contains definitions of the Resources in your Assembly Line. If you only want to use Shippable for CI, you do not need this file. [Read more...](/platform/tutorial/workflow/shippable-resources-yml/)

`shippable.triggers.yml` contains definitions of manual triggers for Jobs in your Assembly Line. You can manually trigger any job in your Assembly Line by pushing a change to this file. This file is optional since you can also run jobs manually through the UI. [Read more...](/platform/tutorial/workflow/shippable-triggers-yml/)

Assembly Line configuration files should be committed to a repository in your source control. This repository is called a sync repository. If you have separate deployment pipelines for different environments or applications, you can put config files for each environment or application in separate repositories.

## Adding configuration to Shippable

If you're using Shippable for CI only, follow instructions to enable your repository.

If you're using Shippable's Assembly Lines, you can add your syncRepo by following instructions in the [How to work with syncRepo](/platform/tutorial/workflow/howto-crud-syncrepo/#adding-a-syncrepo) tutorial.


## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [Quick Start to CD](/getting-started/cd-sample)
