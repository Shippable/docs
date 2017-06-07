page_main_title: Shippable installer
main_section: Reference
sub_section: Admiral
page_title: Shippable Server - AWS Marketplace
page_description: How to install Shippable from AWS Marketplace
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, aws marketplace

# Installing from AWS Marketplace

Shippable Server - Startup Edition (SE) is available on the AWS Marketplace to
run on a single instance, ideal for evaluations/POCs or for small teams.  Once
launched, you will configure the installation to connect your third party
services (like your source control system) using the Admin panel.

## Purchase and install process 
Purchase and install Shippable Server SE by visiting [its listing on the AWS
Marketplace](add link). When purchasing Shippable Server SE from the AWS
Marketplace, you'll make the purchase via your AWS account using the payment
method associated with your account. 

Follow the prompts within the AWS Marketplace purchase process to launch your
Shippable Server SE instance and proceed to the Admin panel.

All Shippable Server SE purchases made through the AWS Marketplace come with a
**30-day free trial**.

You will be notified by AWS with the option to cancel your purchase prior to
completing the trial period.

If annual billing is selected, you will be notified by AWS prior to your annual
term expiring with the option to extend for another annual term. If you choose
not to renew, upon completing the annual term, billing will automatically
convert to hourly billing.

## Admin panel

The Shippable Server Admin panel can be accessed from a local browser using
http-over-ssh. This ensures that the admin panel is only available to the users
who have ssh permissions for the server.

### Steps to access Admin panel
- Assuming the IP address of the EC/2 instance is `1.2.3.4`, run the following
  command on your local system to establish a secure tunnel between the local
  system and Shippable Server and access the admin panel:

    ```
    $ ssh -L 50003:1.2.3.4:50003 -C ubuntu@1.2.3.4
    ```  

- Navigate to `http://localhost:50003` from your browser
- Login to the Admin panel with your login token.
    - The login token is the EC2 Instance ID of the server found in the AWS
      Management Console > EC/2 > Instances, e.g. "i-0968e71046e294b56"

## Configuration

### Initialize Infrastructure
- After successfully logging in to the Admin panel, you must create passwords
  for the `Messaging` and `State` components in the `Initialize Infrastructure` 
  section. These must be 8 characters or more.

- The `Installer Access Key` and `Installer Secret Key` fields are not required
  for the Startup Edition and should be left blank.

- Once passwords are set, click `Initialize`. This will prep the system with
  core dependencies like database, message queue, secrets store, docker etc.

### Configure & Install
- After initialization is complete, navigate to the next section, `Configure &
  Install`, to set up your authentication provider(s). Shippable leverages one 
  of your SCM providers to manage auth/identity.

- In the `Authorization and Source Control Management (SCM) Providers` section,
  section, select the SCM provider of choice. We'll configure GitHub as a
  provider as an example.
  - Check the box for `GitHub` in the `Auth` column
  - Go to `https://github.com/settings/developers` and register a new
    application
  - The callback URL should be `http://1.2.3.4:50001/auth/github`
  - Save and copy the keys for this application into the GitHub auth section of
    Shippable Admin panel

- In the `Service Addresses` section, change the `API` IP address to the public
  IP of server. The port should remain the same. For our example, the value
  will be `http://1.2.3.4:50000`.

- In the `Service Addresses` section, change the `WWW` IP address to the public
  IP of server. The port should remain the same. For our example, the value
  will be `http://1.2.3.4:50001`.

- Click `Install`. This should set up Shippable services and bring up the UI.
  Once complete, navigate to `http://1.2.3.4:50001` and log into Shippable 
  using a GitHub account.

### Add-ons

In addition to the Shippable Server Admin panel, within the product UI, 
Shippable also provides an Admin panel within the product UI to:

- Monitor builds across the system
- Manage build nodes for either the system or individual subscriptions
- Manage user accounts across the system
- View and manage builds, projects and subscriptions
- Perform other housekeeping tasks

To access it, you'll specify users to be SuperUsers in the `Add-ons` section. 
Only the accounts that have been added to the SuperUser list will be able to
access this panel.

- After successfully logging into the Shippable UI using GitHub (or the 
  configured auth provider), navigate to the Accounts page via the gear icon in 
  the upper right and copy your account ID.

- Navigate back to Shippable Server Admin panel `Add-ons` section and scroll 
  down to `Manage System SuperUsers` sub-section
    - Paste the account ID from the Accounts page into the text box and hit 
    `Add`. The account associated with the ID will now have SuperUser 
    permissions.

- Refresh the Shippable UI and you should now see an additional tab called
  `Admin`.

Note: Only the first SuperUser must be added using this method. Other
SuperUsers may be added from the Accounts subsection in the Admin panel within 
the product UI.
