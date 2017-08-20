page_main_title: Shippable installer
main_section: Platform
sub_section: Tutorials
sub_sub_section: Shippable Server
page_title: Admiral - Swarm Worker Configuration
page_description: Admiral Swarm Worker Configuration
page_keywords: install, swarm, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Admiral Swarm Worker Configuration
You may want to run the Shippable services either on another machine or on multiple machines. On Shippable, this is managed through Docker Swarm. To configure where services will run, you will need to add one or more worker nodes.

## Adding Swarm Workers
Swarm workers are added in the [UI interface](/platform/tutorial/server/install/#the-admiral-ui) of the Admiral installer.  Workers should be Ubuntu 14.04 nodes and Docker 1.13 will be installed during initialization.

To add another machine as a worker, do the following before clicking "initialize":

- Select "New Node(s)" on the "Swarm" line in the "initialize infrastructure" panel.
- Enter a name for the worker and the IP address and click "add."  If you would like to add more than one worker, repeat this step to add the other workers.  Each machine added must be Ubuntu 14.04.
- Run the command displayed on each new worker to allow Admiral SSH access to the machines and check the box to confirm that this step was completed.  SSH access is required to run the setup scripts.

<img src="/images/platform/admiral/admiral-workers-ui-setup.png" alt="Swarm worker UI setup">

Configure all of the other infrastructure components how you would like them installed and click "initialize."  Progress installing and initializing components will be shown on the right side of the initialize panel.

## Checking the configuration and logs
Once the workers are initializing, you'll be able to view the initialization logs by clicking the "worker init logs" button.

<img src="/images/platform/admiral/admiral-workers-logs.png" alt="Swarm worker logs">
