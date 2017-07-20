page_main_title: Shippable installer
main_section: Platform
sub_section: Admiral
page_title: Admiral - State Storage Configuration
page_description: Admiral State Storage Configuration
page_keywords: install, GitLab, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Admiral State Storage Configuration
You may want to run the GitLab server used for state storage on another machine either for space or performance reasons.  GitLab can easily be installed on a separate Ubuntu 14.04 machine with the Admiral installer.

## New GitLab installation
When installing Shippable, you can select where to install GitLab in the [UI interface](admiral/#the-admiral-ui).  This will install GitLab CE version 8.9.6.

To install GitLab on another machine, do the following before clicking "initialize":

- Select "New Node" on the "State" line in the "initialize infrastructure" panel.
- Enter a password for the root GitLab user.
- Enter the IP address where you would like to install GitLab.  This should be an Ubuntu 14.04 machine with ports 80, 443, and 22 accessible to the other Shippable components and services.
- Run the command displayed to allow Admiral SSH access to the machine on the machine chosen and check the box to confirm that this step was completed.  SSH access is required to run the installation scripts.

<img src="../../images/platform/admiral/admiral-gitlab-ui-setup.png" alt="GitLab UI setup">

Configure all of the other infrastructure components how you would like them installed and click "initialize."  Progress installing and initializing components will be shown on the right side of the initialize panel.

## Checking the configuration and logs
Once GitLab is initializing, you'll be able to view the configuration and logs.  The "config" button for state will show some information about the GitLab location and configuration:

<img src="../../images/platform/admiral/admiral-gitlab-config.png" alt="GitLab config">

And the "logs" button will show the logs from installation and initialization.

<img src="../../images/platform/admiral/admiral-gitlab-logs.png" alt="GitLab logs">
