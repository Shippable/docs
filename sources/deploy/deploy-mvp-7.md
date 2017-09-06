page_main_title: Removing a single container application deployed to a container orchestration service.
main_section: Deploy
sub_section: How To

# Removing a single container application deployed to a container orchestration service.

This page will describe how you can use the [Shippable assembly lines platform](/platform/overview/) to remove a single container application that was previously deployed to a container orchestration service like Amazon ECS, GKE or Docker Cloud
using Shippable.

##1. Building blocks

### You will need to get familiar with the following platform building blocks:

**Jobs**
Jobs are defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file, that should be present at the root of your repository.

- [deploy](/platform/workflow/job/deploy/) job deploys a [manifest](/platform/workflow/job/manifest/) to a cluster.

##2. Comment out the deploy job and commit shippable.jobs.yml.
After committing, the [rSync](platform/workflow/job/rsync/#rsync) job will run and remove the application deployed to your container orchestration service.

##3. Hard delete the job from the UI.

- Go to your subscription dashboard, click on the eye icon, click on `Show Deleted Objects`.
- Find your job in the `DELETED OBJECTS` grid at the bottom of the screen.
- Click on the `Delete` button.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
