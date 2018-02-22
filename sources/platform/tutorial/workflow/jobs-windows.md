page_main_title: Running jobs on Windows Server 2016
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: Running jobs on Windows Server 2016

# Running jobs on Windows Server 2016

##1. Provision a Windows 2016 node.

* To run Windows builds, you will first need to provision a Windows 2016 machine in a private or public cloud. At this time,
Shippable does not allow you to dynamically provision Windows node and we will be soon launching this functionality.
The minimum requirements for the node are documented [here](/platform/tutorial/runtime/byon-windows/#minimum-requirements).
* You can only build **public repositories**. Private repositories will be supported in a few weeks.
* **Only [runSh](/platform/workflow/job/runsh)** jobs are supported. This means that you should not enable your repository for CI and your shippable.yml cannot have any of the CI sections defined [here](/ci/yml-structure). 

##2. Purchase the Windows Server 2016 SKU
* Go to your subscription billing plan by following the instructions documented [here](/platform/management/subscription/billing/#viewing-your-current-plan).
* You can purchase the Windows Server 2016 SKU only if your subscription has been upgraded to the [latest release](http://blog.shippable.com/windows-mac-centos-builds-announcements). If you subscription has been upgraded, the billing plan page will look like this.

<img src="/images/platform/tutorial/workflow/billing.png" alt="Billing plan">

* If you do not see the above billing page, please email `support@shippable.com` to get your subscription upgraded expeditely.
Subscriptions are being upgraded in a phased manner over the next 3 weeks. Our estimate for completing all upgrades is **February 15, 2018**.
* Click **Edit plan**,  **Add new SKU**.
* Click the dropdown under **Type** and select **BYON**.
* Click the dropdown under **Architecture** and select **x86_64**.
* Click the dropdown under **Operating System** and select **WindowsServer_2016**.
* Adjust the number in the Quantity column to the capacity you need.
* Enter the billing contact and credit card information and click on **Upgrade**

##3. Configure Node pools

* After you create the Windows SKU, a default [Node Pool](/platform/management/subscription/node-pools/) is created and all the purchased nodes are assigned to the default Node Pool.
* You can however create more Node pools if you want and change the allocation of nodes amongst your node pools. Thereafter
you can assign your runSh jobs to a specific Node pool.

##4. Initialize your BYON node

* Navigate to the Nodes setting page for your subscription by following the steps documented [here](/platform/tutorial/runtime/byon-windows/#viewing-your-nodes).
* Initialize your BYON node by following the steps documented [here](/platform/tutorial/runtime/byon-windows/#adding-new-nodes).   

##5. Define CI jobs and resources.

* Your CI jobs and resources are defined in a [shippable.yml](/platform/tutorial/workflow/shippable-yml/) in a repository in a supported SCM. The list of supported SCM integrations are documented [here](/platform/integration/overview/#supported-scm-integrations).
* Create the shippable.yml in any of your configured SCM integration repository, **except the source code repository that you are building itself**. This approach offers several benefits such as controlling execute permissions on the jobs
defined in the yml since only users who have write permissions on the repository can execute the jobs defined in it as well as commits to the yml file not triggering the build job itself. You can for experimentation purposes create the shippable.yml file in the source code repository itself, but this will create the undesired side-effect of running the build job whenever the shippable.yml file is committed, since the build job needs the repository as an input in order for it to checkout the repository. We are in the meantime actively working on a feature that will solve this job triggering issue.
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
build script in your gitRepo or a powershell command. You can run your scripts or powershell commands directly on
the host or in a windows container of your choice.

To run powershell commands or scripts in your repository in a container, you will need to specify the docker image, which ideally has your build tool chain already preinstalled, in `runtime:options` section in `TASK`. If you have created multiple Node pools and the Windows node pool
is not the default Node pool, specify the Node pool in `runtime:nodePool` section.


```
  ## Job description:
  - name: ci_job
    type: runSh
    runtime:
      nodePool: custom__x86_64__WindowsServer_2016
    steps:
      - IN: myGitRepo
      - TASK:
          name: buildApp
          runtime:
            options:
              imageName: "microsoft/windowsservercore"
              imageTag: "10.0.14393.1884"
          script:
            # cd to the gitRepo directory
            - pushd $env:MYGITREPO_STATE
            # run a build script in the git repo
            - ./runbuild.ps1
```

To run powershell commands or scripts in your repository on the host, specify `container:false` under `TASK:runtime` section. If you want to run docker commands in a `TASK`, the simplest approach is to run them on the host directly.

```
  ## Job description:
  - name: ci_job
    type: runSh
    runtime:
      nodePool: custom__x86_64__WindowsServer_2016
    steps:
      - IN: myGitRepo
      - TASK:
          name: buildApp
          runtime:
            container: false
          script:
            # cd to the gitRepo directory
            - pushd $env:MYGITREPO_STATE
            # run a docker build
            - docker build -t mynodeapp:latest .
```

To run docker commands in a container, you will need to do the following:

* Package the docker binary in the container image itself (preferred) OR install the docker client in the container using powershell commands in the `TASK` section. The docker binary path should also be set in the `PATH` machine environment variable.

Here is an example of a powershell script that you can use either in your Dockerfile or the `TASK` section.

```
# Docker client binary
RUN Invoke-WebRequest https://download.docker.com/win/static/stable/x86_64/docker-17.06.2-ce.zip -OutFile docker-17.06.2-ce.zip; \
    mkdir c:\docker; \
    Expand-Archive  .\docker-17.06.2-ce.zip -DestinationPath $env:TEMP/docker/ -Force; \
    Move-Item $env:TEMP\docker\docker\docker.exe c:\docker\docker.exe; \
    $env:PATH = '{0};c:\docker' -f $env:PATH ; \
    [Environment]::SetEnvironmentVariable('PATH', $env:PATH, [EnvironmentVariableTarget]::Machine); \
    Remove-Item .\docker-17.06.2-ce.zip; \
    Remove-Item -recur -force $env:TEMP\docker;
```     
* Set the DOCKER_HOST environment variable to connect to the docker daemon running on the host.

```
$env:DOCKER_HOST=tcp://localhost:2375
```

After Windows Server 1709 is officially supported, you can also use named pipes as described [here](https://docs.docker.com/docker-for-windows/faqs/#how-do-i-connect-to-the-remote-docker-engine-api).

* Commit the file and create a syncRepo.

The repository containing your jobs and resources is called a [Sync repository](/platform/tutorial/workflow/crud-syncrepo/) and represents your workflow configuration. Follow [these instructions](/platform/tutorial/workflow/crud-syncrepo/) to import your configuration files into your Shippable account.

* Trigger your pipeline
After you create the syncRepo, you can view the runSh job in the [SPOG view](/platform/visibility/single-pane-of-glass-spog/).
Right click on the job in the SPOG and click **Run job**. You can also trigger the job by committing changes to the repository.
