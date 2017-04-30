main_section: Getting started
sub_section: Overview

# Building blocks for your pipelines

Your pipelines are defined through four yml-based configuration files:

**CI config**

- `shippable.yml` is used to configure your continuous integration (CI) workflow. This is the only file you need if you want to only use Shippable for CI. It must reside at the root of your repository.

**Pipeline config**

- `shippable.jobs.yml` contains definitions of the Jobs in your pipeline. If you only want to use Shippable for CI, you do not need this file.

- `shippable.resources.yml` contains definitions of the Resources in your pipeline. If you only want to use Shippable for CI, you do not need this file.

- `shippable.triggers.yml` contains definitions of manual triggers for Jobs in your pipeline. You can manually trigger any job in your pipeline and by pushing a change to this file. This file is optional since you can also run jobs manually through the UI.

Pipeline configuration files should be committed to a repository in your source control. This repository is called a [sync repository](#sync). If you have separate deployment pipelines for different environments or applications, you can put config files for each environment or application in separate repositories.
