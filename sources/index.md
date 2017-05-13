page_main_title: Shippable DevOps Automation Platform
page_title: Shippable DevOps Automation Platform
page_description: Learn about DevOps and why you need a standard automation platform
page_keywords: DevOps, Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation
main_section: Getting started
sub_section: Overview


# What is Shippable?

Shippable is a DevOps and CI/CD Automation platform that helps developers and DevOps teams easily and rapidly build end-to-end software delivery pipelines and make software releases frequent, predictable, and error-free. As a result, teams can focus on  delivering business value to their own customers rather than building homegrown automation.


##Why do you need Shippable?

Today, most organizations are under tremendous pressure to ship faster and with better quality. Software development has already gone through a transformation with Agile adoption, but software delivery is still the bottleneck for most software teams. As a result, DevOps adoption is growing exponentially as teams try to find a winning balance of speed, quality, and cost.

However. many organizations find that in spite of investing a lot of money and time into DevOps efforts, they are still not seeing enough ROI in terms of faster, predictable releases.

Shippable offers a very practical, systematic, and measurable approach to DevOps. We believe that DevOps efforts must start with automation and that you need a standard platform on which you can build reusable automation rapidly. Your first pipeline can take a couple of days, but the next pipeline should take a day, the third half a day, and so on. You can read more about this philosophy in our <a href="https://www.shippable.com/devops-playbook.html">DevOps Playbook</a> and <a href="https://www.shippable.com/devops-platform.html">Platform</a> pages.

If you're on the road to adopting DevOps, Shippable offer you an easy, scalable way to quickly get to greater DevOps maturity. Why crawl when you can run?

##How this documentation is structured

There are 5 main steps to setting up your end to end software delivery pipelines. You can choose to automate any or all of these blocks, depending on your requirements:

<img src="/images/devops-pillars.png" alt="Triggering releases" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>


We have scenario based documentation for each of the steps above:

- [Continuous Integration (CI)](/ci/why-continuous-integration/): For every commit, build, unit test, and package your application.You can also push your package to a PaaS/IaaS or artifact repository.

- [Validate](/validate/devops-validate/): Run functional/integration/performance tests when your application is deployed to a Test environment

- [Release](/release/devops-release-management/): At any point in your workflow, apply a semantic version to your package to identify it. Configure approval gates for specific parts of the pipeline, such as production deployments.

- [Deploy](/deploy/why-deploy/): Deploy your application to any endpoint, including Docker orchestration platforms like Kubernetes or Amazon ECS, PaaS endpoints like AWS Elastic Beanstalk, or just a Virtual Machine cluster running on any cloud.

- [Provision](/provision/why-infrastructure-provisioning/): Automate your provisioning workflows with Ansible, Terraform, or Chef.

###Reference

Once you get the hang of how to set up CI or build a pipeline using Shippable, you will just need a reference of everything that is supported. Please read our [Reference Section](/reference/shippable-yml/) for a complete listing of everything supported, along with configuration details.
