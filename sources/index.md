page_main_title: Shippable DevOps Automation Platform
page_title: Shippable DevOps Automation Platform
page_description: Learn about DevOps and why you need a standard automation platform
page_keywords: DevOps, Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation
main_section: Getting started
sub_section: Overview


# What is Shippable?

Shippable is a DevOps Assembly Line Platform that helps developers and DevOps teams achieve CI/CD and make software releases frequent, predictable, and error-free.

##Why do you need Shippable?

There are a plethora of DevOps tools for provisioning, configuration management, continuous integration, deployments and so on. Today, a majority of DevOps activities are getting automated in functional silos making the software delivery process disjointed. Valuable resources and time is being spent on trying to connect these "Islands of Automation" with adhoc homegrown scripts. These solutions are brittle and cumbersome to create, maintain and reuse. More importantly they add friction to your Continuous Delivery initiatives. 

Our DevOps Assembly Line Platform helps you to easily and rapidly build end-to-end software delivery event driven stateful workflows. As a result, your folks can focus on delivering business value to your customers rather than building homegrown scripts to achieve DevOps automation.

<img src="/images/getting-started/codeToProdPipelines.png" alt="Shippable Continuous Integration and Delivery" style="width:1200px;"/>

In addition, we offer a very practical, systematic, and measurable approach to DevOps. We believe that DevOps efforts must start with automation and that you need a standard platform on which you can build reusable automation rapidly. Your first pipeline can take a couple of days, but the next pipeline should take a day, the third half a day, and so on. You can read more about this philosophy in our <a href="https://www.shippable.com/devops-playbook.html">DevOps Playbook</a> and <a href="https://www.shippable.com/devops-platform.html">Platform</a> pages.


## Use Cases
DevOps activities span the entire Software Delivery Lifecycle. These are performed by many teams and many many tools. However most of these activities can be broadly classified into 5 buckets

- [Continuous Integration (CI)](/ci/why-continuous-integration/): For every commit, build, unit test, and package your application.You can also push your package to a PaaS/IaaS or artifact repository.

- [Validate](/validate/devops-validate/): Run functional/integration/performance tests when your application is deployed to a Test environment

- [Release](/release/devops-release-management/): At any point in your workflow, apply a semantic version to your package to identify it. Configure approval gates for specific parts of the pipeline, such as production deployments.

- [Deploy](/deploy/why-deploy/): Deploy your application to any endpoint, including Docker orchestration platforms like Kubernetes or Amazon ECS, PaaS endpoints like AWS Elastic Beanstalk, or just a Virtual Machine cluster running on any cloud.

- [Provision](/provision/why-infrastructure-provisioning/): Automate your provisioning workflows with Ansible, Terraform, or Chef.


Our DevOps platform that makes it easy to automate activities in these buckets to achieve Continuous Delivery. It is highly flexible and provides a lot of native functionality, while also integrating with your favorite tools.

However, it is important to remember that Shippable lets you automate almost anything. Want to deploy using voice commands on Alexa? Check. Want to set your smart coffee machine to start a pot at 8am every morning? Check.

We have optimized the platform for DevOps with a bunch of [pre-canned Jobs]() that make it very easy to automate DevOps activities. However, for anyone with programming skills and an imagination, the sky is the limit with a plain old [shell Job](). 

## How this documentation is structured?

We believe achieving Continuous Delivery through DevOps is a journey that needs a systematic approach. The idea is to automate the different buckets of DevOps activities mentioned above in a structured manner. 

As a result, we have structured our documentation to mimic DevOps use case buckets. You can choose to embark on this journey across any or all of these buckets, depending on your organization needs. On the other hand, if you want to understand everything that the Platform offers you, there is a dedicated section that gives you an overview of everything the [Platform]() does and supports. 
