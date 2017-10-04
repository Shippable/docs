page_main_title: Digital Ocean Infrastructure
main_section: Provision
sub_section: Provisioning with Ansible

# Digital Ocean with Ansible
With Shippable, you can use [Ansible](https://www.ansible.com/) from Red Hat within Pipelines to provision
infrastructure on [Digital Ocean](https://www.digitalocean.com/). You would do so with a
`runSh` job. Both of those jobs have ansible command line tools and [digital ocean module](http://docs.ansible.com/ansible/list_of_cloud_modules.html#digital-ocean) requirements (python >= 2.6 and dopy) installed already.

##Setup

Before you start, you will need to store your Digital Ocean credentials as an [Account
Integration](/platform/management/integrations#add-integration) so that your Shippable pipeline job can connect to Digital Ocean without exposing your credentials in your config file. Once you add an account integration, you can use it for all your projects without needing to add it again.

-  Go to your **Account Settings** by clicking on the gear icon in the top
navigation bar.
-  Click on **Integrations** in the left sidebar menu and then click on **Add
Integration**
-  Locate **Digital Ocean** in the list and click on **Create Integration**
-  Name your integration and enter your Digital Ocean API Token with appropriate access. ( Read/Write )
-  Choose the Subscription(s) that are allowed to use these credentials.
-  Click **Save**

<img src="../../images/provision/digital-ocean-integration.png" alt="add
digital ocean credentials">

##Basic config

After completing the setup step, you'll configure the following pipeline
resources and jobs:

-  resources:
    *  **cliConfig** - to configure the default digital ocean cli settings
    *  **gitRepo** - contains your Ansible scripts
-  jobs
    *  **runSh** - for executing your Ansible scripts

In `shippable.resources.yml`, define the following resources to be used as
inputs to your pipeline:

```yaml
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

in `shippable.jobs.yml`, define the following job in order to execute
an Ansible playbook to provision on digital ocean from your pipeline:

```yaml
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

In our `runSh` job, `IN: myDOCliConfig` gives an environment variable named `MYDOCLICONFIG_INTEGRATION_APITOKEN` that will have the API token specified in the Digital Ocean integration. Note that, the environment variable name is generated based on the format `x_INTEGRATION_APITOKEN`, where x is the cliConfig resource name in upper case with any characters other than letters, numbers, or underscores removed.

### Create timed Ansible pipeline job
To schedule a pipeline job to automatically execute an Ansible playbook on a
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
