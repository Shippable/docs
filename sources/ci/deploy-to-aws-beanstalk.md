page_main_title: AWS EBS
main_section: CI
sub_section: Deployments
page_title: AWS Elastic Beanstalk integration
page_description: Setting up AWS Elastic Beanstalk integrations on Shippable
page_keywords: eb, amazon, aws, shippable, google, openshift

# AWS Elastic Beanstalk (EB)

Our platform enables you to deploy your code to AWS Elastic Beanstalk (EB) in two ways:

- Source Code Deployment to AWS EB
- Docker Deployment to AWS EB

Let's look at both and the way Shippable helps you in having a successful deployment to EB. Before that, we'll first configure the AWS account integration.

##Adding the Account Integration

To deploy applications to AWS EB, you need to configure an AWS account integration with credentials to access the EB instance.

The steps to do so are:

1. Click on the gear icon for **Account Settings** in your top navigation bar and then click on the **Integrations** section.
2. Click on the **Add Integration** button.
3. For **Integration type**, choose AWS Keys from the list of dropdown choices.
4. For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: `AWS-Integration`.
5. Enter your aws_access_key_id and aws_secret_access_key. You can follow instructions in [Amazon's guide for Creating and Managing access keys](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html).
12. Click on **Save**.

The integration will now be available to all your continuous integration and deployment workflows.

<img src="../../images/ci/aws-keys-integration.png" alt="Amazon AWS integration" style="width:700px;"/>

##Source Code Deployment to AWS EB

Shippable performs the following steps for you, to deploy your source code on EB:

- Installs EB Command Line Interface (CLI)
- Authenticates into EB console using the right credentials
- Issues the Deploy command on EB from the right directory

To enable Shippable to perform these steps, you will need to configure the following two steps for a successful deployment to EB.

1. Add AWS EB Integration to your subscription.
2. Configure your `shippable.yml` to associate the AWS EB integration for your project.

###1. Add AWS EB Integration to your Subscription

1. Ensure you have logged in to [Shippable](https://app.shippable.com).
2. From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.
3. Click on the **gear icon** on the Subscription page and then on **Integrations**.
4. Click the `+` button.
5. Provide an easy-to-remember name for the AWS EB integration for your Subscription, such as `aws-eb-integration`, in the 'Name' field.
**IMPORTANT:** The 'Name' you have entered in this step should be used in your `shippable.yml` file. Both names should be exactly the same. If not the build will fail with an error.
6. From the 'Account Integrations' dropdown select the AWS account integration created.
7. Click the `Save` button.
8. The AWS EB integration will show up in the list of integrations for your subscription.

###2. Configure your `shippable.yml` to associate the AWS EB integration for your project

To enable AWS EB integration for your project, add the following to the `shippable.yml` file for that project.

```
integrations:
  deploy:
    - integrationName: "aws-keys-integration"
      type: aws
      target: eb_paas
      platform: "Node.js"
      application_name: sample-node-eb-paas-app
      env_name: sample-node-eb-paas-env
      region: us-east-1
```
While the above is a sample code for your `shippable.yml`, use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `integrationName:` value is the name of the AWS EB integration you added to the 'Subscription' settings (keep the double quotes). It is important the name matches exactly. If not, the build will fail with an error as  [described here](/ci/troubleshooting/#integration-name-specified-in-yml-does-not-match).
- `type:` is `aws`.
- `target:` is `eb_paas`.
- `platform:` Replace `Node.js` with your platform (available options can be found [here](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/tutorials.html))
- `application_name:` Replace with your EB application name
- `env_name:` Replace with your EB environment name
- `region:` Replace with your EB region name

With this configured, upon a successful CI run you will see Shippable execute the following steps within your CI run console and you should be able to verify within EB that a deployment was triggered:

- Installs EB CLI
- Authenticates into EB console using the right credentials
- Issues the Deploy command on EB from the right directory

For reference, here is a [sample Node.js application](https://github.com/shippableSamples/sample_node_eb_paas) that successfully performs source code deployment to Elastic Beanstalk.

In addition, the blog ["How to deploy your application to AWS Elastic Beanstak"](http://blog.shippable.com/how-to-deploy-your-application-to-aws-elastic-beanstalk-using-shippable-part-1) walks you through an end to end workflow - from setting up your repo to deploying your source code on AWS Elastic Beanstalk.

---

##Docker Deployment to AWS EB

Shippable performs the following steps for you to deploy Docker on EB, after all the steps in `shippable.yml` that run inside the build container are complete:

- Logs into EB
- Updates your Dockerrun.aws.json file with the IMAGE_NAME & TAG
- Uploads the artifacts to Amazon S3
- Updates the application version
- Issues the command to update the EB environment

Upon completion of the above, EB updates your environment based on the uploaded application version, independent of Shippable.

To enable Shippable perform the above steps, you will need to configure the following three steps for a successful deployment to EB.

1. Add AWS EB Integration to your subscription.
2. Configure the `dockerrun.aws.json` file.
3. Configure your `shippable.yml` to associate the AWS EB integration for your project.

###1. Add AWS EB Integration to your subscription

1. Ensure you have logged in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the dropdown burger bar menu on the top left.
3. Click the 'Settings' tab and go to the 'Integrations' section.
4. Click the `Add Integration` button.
5. Provide an easy-to-remember name for the AWS EB integration for your Subscription, such as `aws-eb-docker`, in the 'Name' field.
**IMPORTANT:** The 'Name' you have entered in this step should be used in your `shippable.yml` file. Both names should be exactly the same. If not the build will fail with an error.
6. From the 'Account Integrations' dropdown select the AWS account integration created.
7. Click the `Save` button.
8. The AWS EB integration will show up in the list of integrations for your subscription.

###2. Configure the `dockerrun.aws.json` file

Ensure the `dockerrun.aws.json` file is in the root of your source code directory. The relevant section to Shippable is given below and should be included in the file using the format below:

```
  "Image": {
    "Name": "<IMAGE_NAME>:<TAG>",
    "Update": "true"
  }  
```

###3. Configure your `shippable.yml` to associate the AWS EB integration for your project

To enable AWS EB integration for your project, add the following to the `shippable.yml` file for that project.

```
integrations:
  deploy:
    - integrationName: "aws-keys-docker"
      type: aws
      target: eb_docker
      application_name: "sample-node-eb-docker-app"
      env_name: "docker-env"
      bucket_name: "elasticbeanstalk-us-east-1-480971114143"
      region: "us-east-1"
      image_name: "harryi3t/sample_node_eb_docker"
      image_tag: "$BRANCH.$BUILD_NUMBER"
```
While the above is a sample code for your `shippable.yml`, use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `integrationName:` value is the name of the AWS EB integration you added to the 'Subscription' settings (keep the double quotes). It is important the name matches exactly. If not, the build will fail with an error as  [described here](/ci/troubleshooting/#integration-name-specified-in-yml-does-not-match).
- `type:` is `aws`.
- `target:` is `eb_docker`.
- `application_name:` Replace with your EB application name
- `env_name:` Replace with your EB environment name
- `bucket_name:` Replace with your EB bucket name
- `region:` Replace with your EB region name
- `image_name:` Replace with your Docker image name
- `image_tag:` Replace with your Docker image tag

With this configured, upon a successful CI run you will see Shippable execute the following steps within your CI run console and you should be able to verify within EB that a deployment was triggered:

- Logs into EB
- Updates your Dockerrun.aws.json file with the IMAGE_NAME & TAG
- Uploads the artifacts to Amazon S3
- Updates the application version
- Issues the command to update the EB environment

For reference, here is a [sample Node.js application](https://github.com/shippableSamples/sample_node_eb_docker) that successfully performs Docker deployment to Elastic Beanstalk.

```
**NOTE**:
While the above scenario includes pulling a public Docker image, you may have other scenarios such as wanting to pull an image from a private registry in your workflow.

This is totally possible.

Authenticating and pulling private third party images occurs outside of Shippable actions.

You will have to be configure these settings within Elastic Beanstalk as Shippable is not responsible for these actions.
```

Click for instructions [to pull an image from a private repository hosted by an online registry](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker.html) and/or for [multicontainer docker environments](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecs.html).

##Deleting the Integration

To remove the AWS EB integration, you'll need to remove this integration from all dependencies configured to use it. To find all the dependencies:

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Select the AWS integration from the list of integrations. If you have many entries, use the `Filters` dropdown and select `AWS`. Alternatively, you can use the `Integration Name` field to provide the name of your AWS integration.
3. Your AWS integration shows up in the list.
4. Click on the `Delete` button.
5. A window pops up confirming that you want to delete the integration. This window lists all dependencies of this this integration. The list will include any project, environment or subscription image dependent on this integration.
6. If there are dependencies, individually access the `Settings` tab for each project/environment/subscription image and delete the AWS integration.
7. Once all dependencies of the AWS integration have been removed, Step 5 will show the message: `No dependency`.
8. Click the `Yes` button to delete the AWS Integration.
