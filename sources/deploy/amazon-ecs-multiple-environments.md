main_section: Deploy
sub_section: Deploying to Amazon ECS

# Deploying to multiple Amazon ECS Environments
Most of the time, you'll want to utilize multiple environments in your pipeline.  One common example would be having automatic deployments to a test environment, followed by a manual deployment to production.  You can easily achieve this using Shippable pipelines, and this page will tell you how.

## Setup
Let's keep our scenario simple.  One image, going into one manifest, going into one test-deploy job, going into one prod-deploy job.


## Managed deployments
Using Shippable managed

### Parallel Environments
- add a second deploy to a different cluster in parallel with the first deploy

### Serial Environments
- add a second deploy directly after the first deploy, use switch: off

### Advanced
- example with separate dockerOptions and params for each env

## Unmanaged deployments
