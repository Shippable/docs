page_main_title: Workflow Configuration
main_section: Platform
sub_section: Workflow
page_title: DevOps Platform Configuration

# Configuration

Your Assembly Lines are defined through yml-based configuration files:

**CI config**

`shippable.yml` is used to configure your continuous integration (CI) workflow. This is the only file you need to use Shippable for CI. It must reside at the root of your repository. [Read more...](/platform/tutorial/workflow/shippable-yml/)

Please note that the CI portions of `shippable.yml` are only applicable to the repository it is committed to.

**Assembly Line config**

Your pipelines are defined through the `jobs` and `resources` sections of your `shippable.yml`.  These sections contain definitions of the jobs and resources in your pipeline. [Read more...](/platform/tutorial/workflow/shippable-yml/).

The repository containing your Assembly Lines configuration should be committed to a repository in your source control, called the **Sync repository**. Please note that Assembly Line configuration is global across your Subscription and not specific to the Sync repository. This means that the job and resources names need to be unique across all repositories in your Subscription.

If you have separate deployment pipelines for different environments or applications, you can put config files for each environment or application in the same repository or in separate repositories, depending on your usecase.

**Note:** You can also separate out your Assembly Line config by putting the `resources` config in  `shippable.resources.yml` and `jobs` config in `shippable.jobs.yml`. However, this is no longer our recommended approach since most customers do not want to scatter their config across multiple files.   

## Adding configuration to Shippable

If you're using Shippable for CI only, follow [these instructions](/ci/enable-project/) to enable your repository.

If you're using Shippable's Assembly Lines, you can add your syncRepo by following instructions in the [Adding an Assembly Line](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo) tutorial.


## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [Quick Start to CD](/getting-started/cd-sample)
