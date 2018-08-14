page_main_title: Provisioning Digital Ocean infrastructure with Ansible
main_section: IT Ops
sub_section: Digital Ocean infrastructure
page_title: Provisioning Digital Ocean infrastructure with Ansible
page_description: How to provision Digital Ocean infrastructure with Ansible in Shippable

# Provisioning Digital Ocean infrastructure with Ansible

With Shippable, you can use [Ansible](https://www.ansible.com/) from Red Hat within Pipelines to provision
infrastructure on [Digital Ocean](https://www.digitalocean.com/). You would do so with a
`runSh` job. Both of those jobs have ansible command line tools and [digital ocean module](http://docs.ansible.com/ansible/list_of_cloud_modules.html#digital-ocean) requirements (python >= 2.6 and dopy) installed already.

##Setup

Before you start, you will need to store your Digital Ocean credentials as an [Integration](/platform/integration/overview/) so that your Shippable pipeline job can connect to Digital Ocean without exposing your credentials. Once you add an integration, you can use it for all your projects without needing to add it again.

Detailed steps on how to add a Digital Ocean Integration are [here](/platform/integration/do/).

##Basic config

After completing the setup step, you'll configure the following pipeline
resources and jobs:

-  resources:
    *  **cliConfig** - to configure the default digital ocean cli settings
    *  **gitRepo** - contains your Ansible scripts
-  jobs
    *  **runSh** - for executing your Ansible scripts

In **shippable.yml**, define the following resources to be used as
inputs to your pipeline:

```yaml
resources:
  # config for doctl cli
  - name: myDOCliConfig
    type: cliConfig
    integration: myDOIntegration # replace with your digital ocean integration name

  # source code repo holding Ansible scripts to be used in pipeline
  - name: myGithubRepo
    type: gitRepo
    integration: myScmIntegration # replace with your scm integration name
    pointer:
      sourcename: source-code-org/repo
      branch: master
```

And, in **shippable.yml**, define the following job in order to execute
an Ansible playbook to provision on Digital Ocean from your pipeline:

```yaml
jobs:
  # job to execute Ansible script to provision droplets
  - name: myProvisionJob
    type: runSh
    steps:
      - IN: myGithubRepo
      - IN: myDOCliConfig
      - TASK:
        # Execute Ansible playbook
        - script: |
            cd $MYGITHUBREPO_STATE  
            ansible-playbook -v digital-ocean-provision.yml
```

`myGithubRepo` git repository should contain `digital-ocean-provision.yml` which should be a valid Ansible playbook with a provisioning task for Digital Ocean. Example of `digital-ocean-provision.yml` might be

```yaml
- name: Digital Ocean Cloud Provision
  hosts: localhost
  tasks:
    - name: provision api instance
      digital_ocean:
        api_token: "{{ ansible_env.MYDOCLICONFIG_INTEGRATION_APITOKEN }}"
        state: present
        command: droplet
        name: api-droplet
        size_id: 512mb
        region_id: ams2
        image_id: "ubuntu-16-04-x64"
```

In our `runSh` job, `IN: myDOCliConfig` gives an environment variable named `MYDOCLICONFIG_INTEGRATION_APITOKEN` that will have the API token specified in the Digital Ocean integration. Note that, the environment variable name is generated based on the format `x_INTEGRATION_APITOKEN`, where x is the cliConfig resource name in upper case with any characters other than letters, numbers, or underscores and leading numbers removed.

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
  # job to execute Ansible script to provision droplet
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
