page_main_title: Overview
main_section: CI
sub_section: Deployments

##Deploying to an IaaS/PaaS

At the end of your CI workflow, you might want to push your application package to an IaaS or PaaS to run it.

You can deploy to various endpoints directly from your CI by configuring your `shippable.yml`. The examples below show how you can push to popular cloud providers.

- [Amazon EC2](deploy-to-ec2/)
- [Elastic Beanstalk](deploy-to-aws-beanstalk/)
- [AWS Opsworks](deploy-to-aws-opsworks/)
- [Digital Ocean](deploy-to-digital-ocean/)
- [Heroku](deploy-to-heroku/)

Please note that our preferred and recommended approach for deploying to any endpoint is through pipelines. Please read the [Deploy guide](../deploy/why-deploy/).
