page_main_title: Shippable Server | Configuring Swarm Workers
main_section: Platform
sub_section: Shippable Server
sub_sub_section: Configuration
page_title: Configuring Swarm Workers | Shippable Server
page_description: Configure multiple Swarm worker for high availability
page_keywords: docker, swarm, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Configuring Swarm Workers

Shippable uses Docker Swarm to manage all microservices, which are Docker containers. While the default setting installs Swarm on the same node as Admiral, you can choose to add Swarm workers in order to configure your installation for high availability in case a Server node goes down. The more Swarm workers you have and the more capacity each worker has, the easier your microservices will recover if any node(s) go down.

## Adding Swarm Workers

Swarm workers are added in the [UI interface](/platform/tutorial/server/install/#the-admiral-ui) of the Admiral installer.  Workers should be Ubuntu 14.04 nodes and Docker 1.13 will be installed during initialization.

To add another machine as a worker, do the following before clicking **Initialize**:

- Select **New Node(s)** on the **Swarm** line in the **Initialize infrastructure** panel.
- Enter a name for the worker and the IP address and click **Add**  If you would like to add more than one worker, repeat this step to add the other workers.  Each machine added must be running Ubuntu 14.04.
- Run the command displayed on each new worker to allow Admiral SSH access to the machines and check the box to confirm that this step was completed.  SSH access is required to run the setup scripts.

<img src="/images/platform/server/admiral-swarm.png" alt="Swarm worker UI setup">

Configure all of the other infrastructure components how you would like them installed and click **Initialize**.  Progress installing and initializing components will be shown on the right side of the initialize panel.

## Viewing logs

Once workers start initializing, you'll be able view the initialization logs by clicking the **Worker init logs** button.

<img src="/images/platform/admiral/admiral-workers-logs.png" alt="Swarm worker logs">
