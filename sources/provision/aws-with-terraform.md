page_main_title: With Terraform
main_section: Provision
sub_section: Provisioning with Terraform

# AWS with Terraform
With Shippable, you can use Terraform from Hashicorp within Shippable Assembly Lines to
provision infrastructure on AWS. You would do so with a `runSh` job.

##Setup

Before you start, you will need to store your AWS credentials as an [Account
Integration](../platform/integration/overview.md) so that your Shippable pipeline job can connect to AWS
without exposing your credentials in your config file. Once you add an account
integration, you can use it for all your projects without needing to add it again.

-  Go to your **Account Settings** by clicking on the gear icon in the top
navigation bar.
-  Click on **Integrations** in the left sidebar menu and then click on **Add
Integration**
-  Locate **AWS** in the list and click on **Create Integration**
-  Name your integration and enter your AWS Access Key ID and AWS Secret Access
Key for an IAM User with the appropriate policies set to perform the provisioning
actions you will execute (e.g. create/delete EC2 instances)
-  Choose the subscription(s) that are allowed to use these credentials.
-  Click **Save**

<img src="../../images/provision/amazon-web-services-integration.png" alt="add
aws credentials">

##Basic config

After completing the setup step, you'll configure the following pipeline
resources and jobs:

-  resources:
    *  **cliConfig** - to configure the default AWS CLI settings
    *  **gitRepo** - contains your Terraform scripts
-  jobs
    *  **runSh** - for executing your Terraform scripts

In `shippable.resources.yml`, define the following resources to be used as
inputs to your pipeline:

```yaml
# config for awscli
  - name: myAwsCliConfig
    type: cliConfig
    integration: myAwsIntegration # replace with your AWS integration name
    pointer:
      region: us-east-1 # replace with your AWS region

# source code repo holding Terraform scripts to be used in pipeline
  - name: myGithubRepo
    type: gitRepo
    integration: myScmIntegration # replace with your scm integration name
    pointer:
      sourcename: source-code-org/repo
      branch: master
```

In `shippable.jobs.yml`, define the following job in order to execute Terraform
scripts to provision on AWS from your pipeline:

```yaml
# job to execute Terraform script to provision AWS instances
  - name: myProvisionJob
    type: runSh
    steps:
      - IN: myGithubRepo
      - IN: myAwsCliConfig
      - TASK:
        # Restore previous Terraform statefile
        - script: |
            cd /build/previousState
            if [[ -f terraform.tfstate ]]; then
              cp terraform.tfstate $PROVISION_AWS_TERRAFORM_REPO_STATE
            fi

        # Set AWS credentials for use by Terraform CLI
        - script: >
            export
            AWS_ACCESS_KEY_ID=$MYAWSCLICONFIG_INTEGRATION_AWS_ACCESS_KEY_ID
            AWS_SECRET_ACCESS_KEY=$MYAWSCLICONFIG_INTEGRATION_AWS_SECRET_ACCESS_KEY
            AWS_DEFAULT_REGION=$MYAWSCLICONFIG_POINTER_REGION

        # Execute Terraform script
        - script: |
            cd $MYGITHUBREPO_STATE  
            terraform apply

   # Save terraform.tfstate file for use in subsequent jobs
    always:
      - script: |
          cd $MYGITHUBREPO_STATE
          cp terraform.tfstate /build/state
```

NOTE: The Terraform CLI is pre-installed on Shippable's standard runSh job
runtime images. You do not need to do so as part of your runSh job.


## Advanced config
### Separate provision and terminate jobs
Using Terraform with AWS, you'll likely want to separate your 'provision' actions
from your 'terminate' actions. In this manner you can easily trigger either
action on-demand or via automated triggers.

To set up this pipeline, simply separate your provision and terminate actions
into separate jobs and name the 'provision' job as an input to the
'terminate' job.

`shippable.jobs.yml`:
```yaml
# job to execute Terraform script to provision AWS instances
  - name: myProvisionJob
    type: runSh
    steps:
      - IN: myGithubRepo
      - IN: myAwsCliConfig
      - TASK:
        # Restore previous Terraform statefile
        - script: |
            cd /build/previousState
            if [[ -f terraform.tfstate ]]; then
              cp terraform.tfstate $PROVISION_AWS_TERRAFORM_REPO_STATE
            fi

        # Set AWS credentials for use by Terraform CLI
        - script: >
            export
            AWS_ACCESS_KEY_ID=$MYAWSCLICONFIG_INTEGRATION_AWS_ACCESS_KEY_ID
            AWS_SECRET_ACCESS_KEY=$MYAWSCLICONFIG_INTEGRATION_AWS_SECRET_ACCESS_KEY
            AWS_DEFAULT_REGION=$MYAWSCLICONFIG_POINTER_REGION

        # Execute Terraform script
        - script: |
            cd $MYGITHUBREPO_STATE  
            terraform apply

    # Save terraform.tfstate file for use in subsequent jobs
    always:
      - script: |
          cd $MYGITHUBREPO_STATE
          cp terraform.tfstate /build/state

# job to execute Terraform script to terminate AWS instances
  - name: myTerminateJob
    type: runSh
    steps:
      - IN: myProvisionJob     
      - IN: myGithubRepo
      - IN: myAwsCliConfig
      - TASK:
        # Restore incoming Terraform statefile
        - script: |
            cd $MYPROVISIONJOB_STATE
            if [[ -f terraform.tfstate ]]; then
              cp terraform.tfstate $MYGITHUBREPO_STATE
            fi

        # Set AWS credentials for use by Terraform CLI
        - script: >
            export
            AWS_ACCESS_KEY_ID=$MYAWSCLICONFIG_INTEGRATION_AWS_ACCESS_KEY_ID
            AWS_SECRET_ACCESS_KEY=$MYAWSCLICONFIG_INTEGRATION_AWS_SECRET_ACCESS_KEY
            AWS_DEFAULT_REGION=$MYAWSCLICONFIG_POINTER_REGION

        # Execute Terraform script
        - script: |
            cd $MYGITHUBREPO_STATE  
            terraform destroy -force

    # Save terraform.tfstate file for use in subsequent jobs
    always:
      - script: |
          cd $MYGITHUBREPO_STATE
          cp terraform.tfstate /build/state

```

### Create timed Terraform pipeline job
To schedule a pipeline job to automatically execute a Terraform script on a
recurring basis, add a `time` resource.

`shippable.resources.yml`:
```yaml
# This time resource triggers an attached job nightly at 11:00p
  - name: myNightlyTrigger
    type: time
    seed:
      interval: * 23 * * * *
```

`shippable.jobs.yml`:
```yaml
# job to execute Terraform script to provision AWS instances
  - name: myProvisionJob
    type: runSh
    steps:
      - IN: myNightlyTrigger
```


## Sample project

Here are some links to a working sample of this scenario:

**Source code:**  [devops-recipes/provision-aws-terraform](https://github.com/devops-recipes/provision-aws-terraform).


## Improve this page

We really appreciate your help in improving our documentation. If you find any
problems with this page, please do not hesitate to reach out at
[support@shippable.com](mailto:support@shippable.com) or [open a support issue]
(https://www.github.com/Shippable/support/issues). You can also send us a pull
request to the [docs repository](https://www.github.com/Shippable/docs).
