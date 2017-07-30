page_main_title: Deploy your first app
main_section: Getting started
sub_section: Pipeline sample

# Deploy your first app

This tutorial walks through the process of deploying an app to ECS using Shippable's Continuous Delivery (Pipeline) feature.
We will walk through the steps for deploying a simple Node.js sample application to Amazon EC2 Container Service (ECS). The
tutorial consists of two parts -
* CI build that creates a docker image of the Node.js app and pushes it to Amazon ECR.
* Pipeline that deploys the ECR image to ECS.

You can find a ton of other deploy examples [here](/deploy/why-deploy/).

###1. Fork our sample project

Fork the following GitHub repository in order to complete the tutorial:

<https://github.com/devops-recipes/deploy-ecs-basic>

If you do not have GitHub account, you can also use Bitbucket and follow these instructions to import code from our sample repository: [Import code into Bitbucket](https://confluence.atlassian.com/bitbucket/import-or-convert-code-from-an-existing-tool-795937450.html)

###2. Sign in to Shippable

Login to [Shippable](http://www.shippable.com) using your GitHub credentials.

###3. Create the ECR integration

- Create an ECR Integration following the directions [here](/ci/push-amazon-ecr/#setup) and name the integration dr-ecr. If you choose
a different name, replace dr-ecr with your integration name in the `shippable.resources.yml` file.

- Create the deploy-ecs-basic repository in your AWS account.

- In your `shippable.yml` file at the root of your github repository, specify your AWS repository URL in the ECR_REPO variable.

- In your `shippable.resources.yml` file, locate the the resource named `deploy-ecs-basic-image` and replace
`679404489841.dkr.ecr.us-east-1.amazonaws.com` with your repository URL.

###4. Enable the project

The first step is to enable continuous integration for your forked repository.

- On the [Shippable landing page](https://app.shippable.com) , select your subscription from the `Subscriptions` dropdown.
This should be the subscription where you forked the repository.
<img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="Add Account Integration">

- On the Subscription page, click on the **+** button. If you have not enabled any projects on Shippable,
 you will be directly be taken to this page which shows a list of your repositories.

-  Find the `deploy-ecs-basic` project and click on the toggle button.

- If `deploy-ecs-basic` repo is not shown  in the list, click on the **Sync** button next to the Search box. This syncs your Shippable subscription with your source control account. Find the `deploy-ecs-basic` project and enable it.

###5. Run a build

- After enabling the project, navigate to the subscription page and click on the enabled project.

- Click the **Build** button to trigger your build.

- You can also commit a simple change to any file in the repository, e.g. README.md. A build will be automatically triggered for your project.

###6. View build status

![Console for deploy-ecs-basic sample](https://github.com/devops-recipes/deploy-ecs-basic/raw/master/public/resources/images/console.jpg)

###7. Add ECS integration

- Add an ECS cluster integration using the directions specified [here](/platform/int-amazon-ecs/). This is the cluster to which the
Node.js docker image will be deployed to. Name the integration dr-aws.
If you choose a different name, replace dr-aws with your integration name in the `shippable.resources.yml` file.

- In the `shippable.resources.yml` file, locate the resource named `deploy-ecs-basic-ecs-cluster`. Replace `us-east-1` with your AWS
region.

###8. Add your pipeline

- Your pipeline configuration is defined in the `shippable.resources.yml` and `shippable.jobs.yml` files in the root of your forked repository.
This forked repository is called a [sync repo resource](/platform/workflow/resource/syncrepo) since it contains pipeline configuration.

- Add your syncRepo resource following the instructions [here](/platform/workflow/resource/syncrepo/#adding-a-syncrepo-from-the-ui). The project should
be your forked repository.

- You should not be able to see all your pipeline jobs and resources in the single pane of glass (SPOG) view.
![SPOG view](https://raw.githubusercontent.com/devops-recipes/deploy-ecs-basic/master/public/resources/images/pipeline-view.png)

- Right click on the deploy-ecs-basic-manifest box and click `Run job`. This will run the Manifest job.
You can also find the job in the grid view by clicking on the grid view button (next to the `+ button`) and click Run to run the job.

- Once the Manifest job runs successfully, it will become green and will trigger the `deploy-ecs-basic-deploy` deploy job. Click on the deploy
job to see the deployment logs.

You should get some output from AWS like this:
<img src="/images/deploy/amazon-ecs/basic-deployment-runcli-output.png" alt="runCLI Output">

And if you check ECS, you should see your service running your task definition!
<img src="/images/deploy/amazon-ecs/basic-deployment-service.png" alt="Running service">

**Congratulations!** You have successfully deployed your first app using Shippable.
