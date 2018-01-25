page_main_title: Running jobs on CentOS
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: Running jobs on CentOS

# Running jobs on CentOS

##1. Provision a CentOS 7 node.

* To run CentOS builds, you will first need to provision a CentOS 7 machine in a private or public cloud. At this time,
Shippable does not allow you to dynamically provision CentOS 7 nodes and we will be soon launching this functionality.
The minimum requirements for the node are documented [here](/platform/tutorial/runtime/byon-centos/).
* Both runCI and runSh jobs are supported for CentOS.

##2. Purchase the CentOS SKU
* Go to your subscription billing plan by following the instructions documented [here](/platform/management/subscription/billing/#viewing-your-current-plan).
* You can purchase the CentOS SKU only if your subscription has been upgraded to the [latest release](http://blog.shippable.com/windows-mac-centos-builds-announcements). If you subscription has been upgraded, the billing plan page will look like this.

<img src="/images/platform/tutorial/workflow/billing.png" alt="Billing plan">

* If you do not see the above billing page, please email `support@shippable.com` to get your subscription upgraded expeditely.
Subscriptions are being upgraded in a phased manner over the next 3 weeks. Our estimate for completing all upgrades is **February 15, 2018**.
* Click **Edit plan**,  **Add new SKU**.
* Click the dropdown under **Type** and select **BYON**.
* Click the dropdown under **Architecture** and select **x86_64**.
* Click the dropdown under **Operating System** and select **CentOS_7**.
* Adjust the number in the Quantity column to the capacity you need.
* Enter the billing contact and credit card information and click on **Upgrade**

##3. Configure Node pools

* After you create the CentOS SKU, a default [Node Pool](/platform/management/subscription/node-pools/) is created and all the purchased nodes are assigned to the default Node Pool.
* You can however create more Node pools if you want and change the allocation of nodes amongst your node pools. Thereafter
you can assign your runSh jobs to a specific Node pool.

##4. Initialize your BYON node

* Navigate to the Nodes setting page for your subscription by following the steps documented [here](/platform/tutorial/runtime/byon-centos/#viewing-your-nodes).
* Initialize your BYON node by following the steps documented [here](/platform/tutorial/runtime/byon-centos/#adding-new-nodes).   

##5. Define CI jobs and resources.

* Your CI jobs and resources are defined in a [shippable.yml](/platform/tutorial/workflow/shippable-yml/) in a repository in a supported SCM. The list of supported SCM integrations are documented [here](/platform/integration/overview/#supported-scm-integrations).
* Create the shippable.yml in any of your configured SCM integration repository.
* We now define a [gitRepo resource](/platform/workflow/resource/gitrepo/#gitrepo) in shippable.yml  that points to the repository that you want to build. This resource
creates the necessary webhooks on your repository so that the job is automatically triggered on commits/prs/release tags.
You can configure which webhooks you want to create, documented [here](/platform/workflow/resource/gitrepo/#gitrepo).

```
resources:

  - name: myGitRepo
    type: gitRepo
    # replace github with your SCM integration name
    integration: github
    pointer:
      # replace devops-recipes/myapp with your source code organization and repository name.
      sourceName: devops-recipes/myapp
      # configure branch
      branch: master
      # configure webhooks
      buildOnCommit:            true
      buildOnPullRequest:       true
      buildOnPullRequestClose:  false
      buildOnRelease:           false
      buildOnTagPush:           false
```
* We now define a [runSh job](/platform/workflow/job/runsh/#runsh) in shippable.yml.  This job lets you run any
build script in your gitRepo or a windows shell command. You can also specify a custom docker image to the runsh
job which has your build tool chain already preinstalled. Using shell commands in the runSh job, you can also install any tools or utilities you need during run time.


```
  ## Job description:
  - name: ci_job
    type: runSh
    steps:
      - IN: myGitRepo
      - TASK:
          name: buildApp
          script:
            # cd to the gitRepo directory
            - cd $(shipctl get_resource_state "myGitRepo")
            # run the build script
            - ./runbuild.sh
    on_success:
      script:
        - echo "Task successfully completed"
    on_failure:
      script:
        - echo "This should be executed if any step in TASK fails"
    always:
      script:
        - echo "This should always be executed, regardless of job status"
```

* Commit the file and create a syncRepo.

The repository containing your jobs and resources is called a [Sync repository](/platform/tutorial/workflow/crud-syncrepo/) and represents your workflow configuration. Follow [these instructions](/platform/tutorial/workflow/crud-syncrepo/) to import your configuration files into your Shippable account.

* Trigger your pipeline
After you create the syncRepo, you can view the runSh job in the [SPOG view](/platform/visibility/single-pane-of-glass-spog/).
Right click on the job in the SPOG and click **Run job**. You can also trigger the job by committing changes to the repository.
