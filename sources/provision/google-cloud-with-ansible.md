page_main_title: Google Cloud Infrastructure
main_section: Provision
sub_section: Provisioning with Ansible

# Google Cloud with Ansible
With Shippable, you can use [Ansible](https://www.ansible.com/) from Red Hat within Pipelines to provision
infrastructure on [Google Cloud](https://cloud.google.com/). You would do so with a `runCLI` or
`runSh` job. Both of those jobs have ansible command line tools and [google module](http://docs.ansible.com/ansible/list_of_cloud_modules.html#google) requirements (python >= 2.6 and apache-libcloud) installed already.

##Setup

Before you start, you will need to store your Google Cloud credentials as an [Account
Integration](add link) so that your Shippable pipeline job can connect to Google Cloud without exposing your credentials in your config file. Once you add an account
integration, you can use it for all your projects without needing to add it again.

-  Go to your **Account Settings** by clicking on the gear icon in the top
navigation bar.
-  Click on **Integrations** in the left sidebar menu and then click on **Add
Integration**
-  Locate **Google Cloud** in the list and click on **Create Integration**
-  Name your integration and enter your project name, service account email, and credential file content.
-  Choose the Subscription(s) that are allowed to use these credentials.
-  Click **Save**

<img src="../../images/provision/google-cloud-integration.png" alt="add
google cloud credentials">

##Basic config

After completing the setup step, you'll configure the following pipeline
resources and jobs:

-  resources:
    *  **cliConfig** - to configure the default google cloud cli settings
    *  **gitRepo** - contains your Ansible scripts
-  jobs
    *  **runCLI** - for executing your Ansible scripts

in `shippable.resources.yml`, define the following resources to be used as
inputs to your pipeline:

```yaml
# config for google cloud cli
  - name: myGclCliConfig
    type: cliConfig
    integration: myGclIntegration # replace with your Google Cloud integration name

# source code repo holding Ansible scripts to be used in pipeline
  - name: myGithubRepo
    type: gitRepo
    integration: myScmIntegration # replace with your scm integration name
    pointer:
      sourcename: source-code-org/repo
      branch: master
```

in `shippable.jobs.yml`, define the following job in order to execute Ansible
an Ansible playbook to provision on google cloud from your pipeline:

```yaml
# job to execute Ansible script to provision aws instances
  - name: myProvisionJob
    type: runCLI
    steps:
      - IN: myGithubRepo
      - IN: myGclCliConfig
      - TASK:
        # Execute Ansible playbook
        - script: |
            cd $MYGITHUBREPO_STATE  
            ansible-playbook -v google-cloud-provision.yml
```

`myGithubRepo` git repository should contain `google-cloud-provision.yml` which should be a valid ansible playbook having a provisioning task for google cloud. Example of `google-cloud-provision.yml` might be

```yaml

- name: Google Cloud Provision
  hosts: localhost
  tasks:
    - name: provision api instance
      gce:
        instance_names: api-instance
        zone: us-central1-a
        machine_type: f1-micro
        image: debian-8
        state: present
        service_account_email: "{{ ansible_env.MYGCLCLICONFIG_INTEGRATION_SERVICEACCOUNTEMAIL }}"
        credentials_file: "{{ ansible_env.MYGCLCLICONFIG_INTEGRATION_CREDENTIALFILE_PATH }}"
        project_id: "{{ ansible_env.MYGCLCLICONFIG_INTEGRATION_PROJECTNAME }}"
```

In our `runCLI` job, `IN: myGclCliConfig` gives the following environment variables
- `MYGCLCLICONFIG_INTEGRATION_PROJECTNAME` - Project name given in the google cloud account integration.
- `MYGCLCLICONFIG_INTEGRATION_SERVICEACCOUNTEMAIL` - Service Account Email given in the google cloud account integration.
- `MYGCLCLICONFIG_INTEGRATION_CREDENTIALFILE_PATH` - Path of the credential file with the content given in the google cloud account integration.

Note that, the environment variable name is generated based on the format `x_INTEGRATION_APITOKEN`, where x is the cliConfig resource name in upper case.

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
# job to execute Ansible script to provision google cloud instances
  - name: myProvisionJob
    type: runCLI
    steps:
      - IN: myNightlyTrigger
```

## Improve this page

We really appreciate your help in improving our documentation. If you find any
problems with this page, please do not hesitate to reach out at
[support@shippable.com](mailto:support@shippable.com) or [open a support issue]
(https://www.github.com/Shippable/support/issues). You can also send us a pull
request to the [docs repository](https://www.github.com/Shippable/docs).
