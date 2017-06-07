page_main_title: Shippable installer
main_section: Reference
sub_section: Admiral
page_title: Shippable Server - AWS Marketplace
page_description: How to install Shippable from AWS Marketplace
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, aws marketplace

# Installing from AWS Marketplace

<<<<<<< HEAD
Shippable Server - Startup Edition (SE) is available on the AWS Marketplace to
run on a single instance, ideal for evaluations/POCs or for small teams.  Once
launched, you will configure the installation to connect your third party
services (like your source control system) using the Admin panel.

## Purchase and install process 
Purchase and install Shippable Server SE by visiting [its listing on the AWS
Marketplace](add link). When purchasing Shippable Server SE from the AWS
Marketplace, you'll make the purchase via your AWS account using the payment
method associated with your account. 

All Shippable Server SE purchases made through the AWS Marketplace come with a
**30-day free trial** with the option for hourly or annual billing. Annual 
billing is provided at a discount to the hourly rate. 

You will be notified by AWS prior to completion of your 30-day free trial with
the option to cancel your purchase prior to completing the trial period.

If annual billing is selected, you will be notified by AWS prior to your annual
term expiring with the option to extend for another annual term. If you choose
not to renew, upon completing the annual term, billing will automatically
convert to hourly billing.

Follow the prompts within the AWS Marketplace purchase process to launch your
Shippable Server SE instance and proceed to the Admin panel.
=======
Shippable Server - Startup Edition (SE) is available on AWS Marketplace and can be installed by going
through a one-click purchase and install process. This will bring up Shippable Server on an EC2
instance of desired configuration. Once launched, you will configure the installation
to connect your third party services (like your source control system) using the Admin panel.

## Purchase process
When purchasing Shippable Server SE from the AWS Marketplace, you'll make the
purchase via your AWS account using the payment method associated with your account. All
Shippable Server SE purchases made through the AWS Marketplace come with a 30-day free trial
and have the option for hourly or annual billing, with annual billing provided at a
discount.

You will be notified by AWS prior to completion of your 30-day free trial with the option to
cancel your purchase prior to completing the trial period.

If annual billing selected, you will be notified by AWS prior to your annual term
expiring with the option to extend for another annual term. If you choose not to renew, upon
completing the annual term, billing will automatically convert to hourly billing.
>>>>>>> a30bb54e3808f82e50ccd57d27a84c5ac049e96a

## Admin panel

Shippable Server Admin panel can be accessed from a local browser using
http-over-ssh. This ensures that the admin panel is only available to the users
who have ssh permissions for the server.

### Steps to access Admin panel
- Assuming the IP address of the EC/2 instance is `1.2.3.4`, run the following
  command on your local system to establish a secure tunnel between the local
  system and Shippable Server and access the admin panel:

    ```bash
    $ ssh -L 50003:1.2.3.4:50003 -C ubuntu@1.2.3.4
    ```  

- Navigate to `http://localhost:50003` from your browser
- Login to the Admin panel with your login token
    - The login token is the EC2 Instance ID of the server found in the AWS
      Management Console > EC/2 > Instances, e.g. "i-0968e71046e294b56"

## Configuration

#### Initialize Infrastructure
- After successfully logging in, you must create passwords for the `Messaging`
  and `State` components in section 1. These must be 8 characters or more.

- The `Installer Access Key` and `Installer Secret Key` fields are not required
  for the Startup Edition and can be left blank.

- Once passwords are set, click `Initialize`. This will prep the system with
  core dependencies like database, message queue, secrets store, docker etc.

#### Configure & Install
- After initialization is complete, navigate to the next section `Configure and
  Install` to set up your authentication provider(s). Shippable leverages one 
  of your SCM providers to manage auth/identity.

- In the `Authorization and Source Control Management (SCM) Providers` section,
  section, select the SCM provider of choice. We'll configure GitHub as a
  provider as an example.
  - Check the box for `GitHub`, `Auth` column
  - Go to `https://github.com/settings/developers` and register a new
    application
  - The callback URL should be `http://1.2.3.4:50001/auth/github`
  - Save and copy the keys for this application into GitHub auth section of
    Shippable Admin panel

- In the `Service Addresses` section, change the `API` IP address to the public
  IP of server. The port should remain the same. For our example, the value
  will be `http://1.2.3.4:50000`

- In the `Service Addresses` section, change the `WWW` IP address to the public
  IP of server. The port should remain the same. For our example, the value
  will be `http://1.2.3.4:50001`

- Click `Install`. This should set up Shippable services and bring up the UI.
  Once complete, you should be able to navigate to `http://1.2.3.4:50001` and
<<<<<<< HEAD
  log into Shippable using a GitHub account.
=======
  log into Shippable using a Github account.


### Setup superuser account

Shippable UI also provides an admin panel which helps users to

- monitor builds across the system
- manage build nodes for either the system or individual subscriptions
- manage user accounts across the system
- view and manage build, project and subscription
- Perform other housekeeping tasks

Only the accounts that have been added to superuser list will be able to access
this panel.

- After successfully logging in using GitHub(or the configured auth provider), navigate to the accounts page and copy the account ID

- Navigate back to Admiral UI and scroll down to `Manage System SuperUsers`
  sub-section in `Add-ons`
  - paste the account ID from the Accounts page into the text box and hit `Add`
  - the account associated with the ID will now have superuser permissions
  - refreshing the Shippable UI should now show a additional tab called `Admin`

- Only the first superuser needs to be added using this method. Other superusers may be added from the Accounts subsection in the Admin pane
>>>>>>> a30bb54e3808f82e50ccd57d27a84c5ac049e96a
