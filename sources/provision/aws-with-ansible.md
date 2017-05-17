page_main_title: With Ansible
main_section: Provision
sub_section: Provisioning AWS infrastructure

# AWS with Ansible
With Shippable, you can use Ansible from Red Hat within Pipelines to provision 
infrastructure on AWS. You would do so with a `runCLI` or 
`runSh` job.

##Setup

Before you start, you will need to store your AWS credentials as an [Account 
Integration](../reference/integrations-overview.md) so that your Shippable pipeline job can connect to AWS 
without exposing your credentials in your config file. Once you add an account 
integration, you can use it for all your projects without needing to add it again.

-  Go to your **Account Settings** by clicking on the gear icon in the top 
navigation bar.
-  Click on **Integrations** in the left sidebar menu and then click on **Add 
Integration**
-  Locate **AWS** in the list and click on **Create Integration**
-  Name your integration and enter your AWS Access Key ID and AWS Secret Access
Key for an IAM User with the appropriate policies set to perform the provisioning 
actions you will execute (e.g. create/delete EC/2 instances)
-  Choose the Subscription(s) that are allowed to use these credentials.
push the image
-  Click **Save**

<img src="../../images/provision/amazon-web-services-integration.png" alt="add 
aws credentials">

##Basic config

After completing the setup step, you'll configure the following pipeline 
resources and jobs:

-  resources:
    *  **cliConfig** - to configure the default aws cli settings
    *  **gitRepo** - contains your Ansible scripts
    *  **integration** - to store you ssh key for use by ansible
-  jobs
    *  **runCLI** - for executing your Ansible scripts

in `shippable.resources.yml`, define the following resources to be used as 
inputs to your pipeline:

```yaml
# config for awscli 
  - name: myAwsCliConfig
    type: cliConfig
    integration: myAwsIntegration # replace with your aws integration name
    pointer:
      region: us-east-1 # replace with your aws region

# source code repo holding Ansible scripts to be used in pipeline
  - name: myGithubRepo
    type: gitRepo
    integration: myScmIntegration # replace with your scm integration name
    pointer:
      sourcename: source-code-org/repo
      branch: master

# pem key for connecting to ec/2 instances
  - name: myAwsKeyPair
    type: integration
    integration: mysshintegration # replace with your ssh/pem integration name
```

in `shippable.jobs.yml`, define the following job in order to execute Ansible 
an Ansible playbook to provision on aws from your pipeline:

```yaml
# job to execute Ansible script to provision aws instances
  - name: myProvisionJob
    type: runCLI
    steps:
      - IN: myGithubRepo
      - IN: myAwsCliConfig
      - IN: myAwsKeypair
      - TASK:
        # Set AWS credentials for use by Ansible CLI
        - script: >
            export 
            AWS_ACCESS_KEY_ID=$MYAWSCLICONFIG_INTEGRATION_AWS_ACCESS_KEY_ID 
            AWS_SECRET_ACCESS_KEY=$MYAWSCLICONFIG_INTEGRATION_AWS_SECRET_ACCESS_KEY

        # Replace variables in ansible.cfg template
        - script: shippable_replace $MYGITHUBREPO_STATE/ansible.cfg
        
        # Install Ansible CLI
        - script: |
            sudo apt-get install software-properties-common  
            sudo apt-add-repository ppa:ansible/ansible  
            sudo apt-get update  
            sudo apt-get install ansible
        
        # Execute Ansible playbook
        - script: |
            cd $MYGITHUBREPO_STATE  
            ansible-playbook -v my-ansible-playbook.yml
```
## Advanced config
### Separate provision and terminate jobs
Using Ansible with AWS, you'll likely want to separate your 'provision' actions 
from your 'terminate' actions. In this manner you can easily trigger either 
action on-demand or via automated triggers.

To set up this Pipeline, simply separate your provision and terminate actions 
into separate jobs and name the 'provision' job as an input to the 
'terminate' job.

`shippable.jobs.yml`:
```yaml
# job to execute Ansible script to provision aws instances
  - name: myProvisionJob
    type: runCLI
    steps:
      - IN: myGithubRepo
      - IN: myAwsCliConfig
      - IN: myAwsKeypair
      - TASK:
        # Set AWS credentials for use by Ansible CLI
        - script: >
            export 
            AWS_ACCESS_KEY_ID=$MYAWSCLICONFIG_INTEGRATION_AWS_ACCESS_KEY_ID 
            AWS_SECRET_ACCESS_KEY=$MYAWSCLICONFIG_INTEGRATION_AWS_SECRET_ACCESS_KEY

        # Replace variables in ansible.cfg template
        - script: shippable_replace $MYGITHUBREPO_STATE/ansible.cfg
        
        # Install Ansible CLI
        - script: |
            sudo apt-get install software-properties-common  
            sudo apt-add-repository ppa:ansible/ansible  
            sudo apt-get update  
            sudo apt-get install ansible
        
        # Execute Ansible playbook
        - script: |
            cd $MYGITHUBREPO_STATE  
            ansible-playbook -v my-ansible-provision-playbook.yml

# job to execute Ansible script to terminate aws instances
  - name: myTerminateJob
    type: runCLI
    steps:
      - IN: myProvisionJob     
      - IN: myGithubRepo
      - IN: myAwsCliConfig
      - IN: myAwsKeypair
      - TASK:
        # Set AWS credentials for use by Ansible CLI
        - script: >
            export 
            AWS_ACCESS_KEY_ID=$MYAWSCLICONFIG_INTEGRATION_AWS_ACCESS_KEY_ID 
            AWS_SECRET_ACCESS_KEY=$MYAWSCLICONFIG_INTEGRATION_AWS_SECRET_ACCESS_KEY

        # Replace variables in ansible.cfg template
        - script: shippable_replace $MYGITHUBREPO_STATE/ansible.cfg
        
        # Install Ansible CLI
        - script: |
            sudo apt-get install software-properties-common  
            sudo apt-add-repository ppa:ansible/ansible  
            sudo apt-get update  
            sudo apt-get install ansible
        
        # Execute Ansible playbook
        - script: |
            cd $MYGITHUBREPO_STATE  
            ansible-playbook -v my-ansible-terminate-playbook.yml
```

### Create timed Ansible pipeline job
To schedule a Pipeline job to automatically execute an Ansible playbook on a 
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
# job to execute Ansible script to provision aws instances
  - name: myProvisionJob
    type: runCLI
    steps:
      - IN: myGithubRepo
```


## Sample project

Here are some links to a working sample of this scenario: 

**Source code:**  [devops-recipes/provision-aws-ansible](https://github.com/devops-recipes/provision-aws-ansible).


## Improve this page

We really appreciate your help in improving our documentation. If you find any 
problems with this page, please do not hesitate to reach out at 
[support@shippable.com](mailto:support@shippable.com) or [open a support issue]
(https://www.github.com/Shippable/support/issues). You can also send us a pull 
request to the [docs repository](https://www.github.com/Shippable/docs).
