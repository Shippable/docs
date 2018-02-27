page_main_title: Upgrading Shippable Server
main_section: Platform
sub_section: Shippable Server
sub_sub_section: Upgrade instructions
page_title: Admiral reference
page_description: Reference page for upgrading the Shippable CI/CD and DevOps platform behind your firewall
page_keywords: ci, continuous integration, devops, docker, on-premises


# Upgrading Shippable Server

Shippable server can be easily upgraded using the Admiral CLI to any released version. We recommend you upgrade
Shippable server during downtime as the upgrade updates and restarts core services. During upgrade, all your builds
jobs will get queued and will be processed after the upgrade completes.

##1. Checkout `admiral` repository.

You will need to checkout the public `admiral` repository on the machine where you installed Server and provided the license
information. SSH into the server machine and run the following commands:

```
$ git clone https://github.com/Shippable/admiral.git
$ cd admiral
```

If you already have the `admiral` repository checked out, cd to the admiral directory.

##2. Checkout the release you want to upgrade to.

* List the available released versions using the `git tag` command.
* Run `git checkout <tag>` to checkout the release you want to upgrade to.
* Please note that we **DO NOT** support downgrade, so your checked out release version should be higher that your installed
release version.

##3. Run the upgrade command.

```
./admiral.sh upgrade
```

Once the command completes, all Shippable services will be running on the release specified. Please email support@shippable.com
if you run into any issues.
