page_main_title: Provisioning Microsoft Azure with Ansible
main_section: IT Ops
sub_section: Microsoft Azure infrastructure
page_title: Provisioning Microsoft Azure infrastructure with Ansible
page_description: How to provision Microsoft Azure infrastructure with Ansible in Shippable

# Provisioning Microsoft Azure infrastructure with Ansible

With Shippable, you can use [Ansible](https://www.ansible.com/) from Red Hat within Pipelines to provision
infrastructure on [Microsoft Azure](https://azure.microsoft.com/). You would do so with a
`runSh` job. Both of those jobs have ansible command line tools and [azure module](http://docs.ansible.com/ansible/list_of_cloud_modules.html#azure) requirements (python >= 2.6 and azure) installed already.

##Setup

Before you start, you will need to store your Microsoft Azure credentials as an [Account
Integration](/platform/tutorial/integration/howto-crud-integration/) so that your Shippable pipeline job can connect to Microsoft Azure without exposing your credentials. Once you add an account integration, you can use it for all your projects without needing to add it again.

-  Go to your **Account Settings** by clicking on the gear icon in the top
navigation bar.
-  Click on **Integrations** in the left sidebar menu and then click on **Add
Integration**
-  Locate **Microsoft Azure** in the list and click on **Create Integration**
-  Name your integration and enter your Subscription Id, username, and password.
-  Choose the Subscription(s) that are allowed to use these credentials.
-  Click **Save**

<img src="../../images/provision/microsoft-azure-integration.png" alt="add
google cloud credentials">

##Basic config

After completing the setup step, you'll configure the following pipeline
resources and jobs:

-  resources:
    *  **cliConfig** - to configure the default Microsoft Azure CLI settings
    *  **gitRepo** - contains your Ansible scripts
-  jobs
    *  **runSh** - for executing your Ansible scripts

In **shippable.yml**, define the following resources to be used as
inputs to your pipeline:

```yaml
resources:
  # config for azure cli
  - name: myMazCliConfig
    type: cliConfig
    integration: myMazIntegration # replace with your Microsoft Azure integration name

  # source code repo holding Ansible scripts to be used in pipeline
  - name: myGithubRepo
    type: gitRepo
    integration: myScmIntegration # replace with your scm integration name
    pointer:
      sourcename: source-code-org/repo
      branch: master
```

In **shippable.yml**, define the following job in order to execute
an Ansible playbook to provision on Microsoft Azure from your pipeline:

```yaml
jobs:
  # job to execute Ansible script to provision Microsoft Azure instances
  - name: myProvisionJob
    type: runSh
    steps:
      - IN: myGithubRepo
      - IN: myMazCliConfig
      - TASK:
        # Execute Ansible playbook
        - script: |
            cd $MYGITHUBREPO_STATE  
            ansible-playbook -v microsoft-azure-provision.yml
```

`myGithubRepo` git repository should contain `microsoft-azure-provision.yml` which should be a valid ansible playbook with a provisioning task for Microsoft Azure. Example of `microsoft-azure-provision.yml` might be

```yaml

- name: Microsoft Azure Provision
  hosts: localhost
  tasks:
    - name: Create virtual network
      azure_rm_virtualnetwork:
        ad_user: "{{ ansible_env.MYMAZCLICONFIG_INTEGRATION_USERNAME }}"
        password: "{{ ansible_env.MYMAZCLICONFIG_INTEGRATION_PASSWORD }}"
        subscription_id: "{{ ansible_env.MYMAZCLICONFIG_INTEGRATION_SUBSCRIPTIONID }}"
        resource_group: Testing
        name: testvn
        address_prefixes: "10.10.0.0/16"

    - name: Add subnet
      azure_rm_subnet:
        ad_user: "{{ ansible_env.MYMAZCLICONFIG_INTEGRATION_USERNAME }}"
        password: "{{ ansible_env.MYMAZCLICONFIG_INTEGRATION_PASSWORD }}"
        subscription_id: "{{ ansible_env.MYMAZCLICONFIG_INTEGRATION_SUBSCRIPTIONID }}"
        resource_group: Testing
        name: subnet001
        address_prefix: "10.10.0.0/24"
        virtual_network: testvn

    - name: provision instance
      azure_rm_virtualmachine:
        ad_user: "{{ ansible_env.MYMAZCLICONFIG_INTEGRATION_USERNAME }}"
        password: "{{ ansible_env.MYMAZCLICONFIG_INTEGRATION_PASSWORD }}"
        subscription_id: "{{ ansible_env.MYMAZCLICONFIG_INTEGRATION_SUBSCRIPTIONID }}"
        admin_username: instanceuser
        admin_password: instancepassword
        resource_group: Testing
        name: apiinstance
        image:
          offer: CentOS
          publisher: OpenLogic
          sku: '7.1'
          version: latest
```

In our `runSh` job, `IN: myMazCliConfig` gives the following environment variables

  - `MYMAZCLICONFIG_INTEGRATION_USERNAME` - Username given in the Microsoft Azure account integration.
  - `MYMAZCLICONFIG_INTEGRATION_PASSWORD` - Password given in the Microsoft Azure account integration.
  - `MYMAZCLICONFIG_INTEGRATION_SUBSCRIPTIONID` - Subscription Id given in the Microsoft Azure account integration.

Note that, the environment variable name is generated based on the format `x_INTEGRATION_APITOKEN`, where x is the cliConfig resource name in upper case with any characters other than letters, numbers, or underscores and leading numbers removed.

### Create timed Ansible pipeline job
To schedule a pipeline job to automatically execute an Ansible playbook on a
recurring basis, add a `time` resource.

**shippable.yml**:
```yaml
resources:
  # This time resource triggers an attached job nightly at 11:00pm UTC
  - name: myNightlyTrigger
    type: time
    seed:
      interval: * 23 * * * *

jobs:
  # job to execute Ansible script to provision microsoft azure instances
  - name: myProvisionJob
    type: runSh
    steps:
      - IN: myNightlyTrigger
```

## Improve this page

We really appreciate your help in improving our documentation. If you find any
problems with this page, please do not hesitate to reach out at
[support@shippable.com](mailto:support@shippable.com) or [open a support issue]
(https://www.github.com/Shippable/support/issues). You can also send us a pull
request to the [docs repository](https://www.github.com/Shippable/docs).
