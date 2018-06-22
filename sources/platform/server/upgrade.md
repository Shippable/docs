page_main_title: Upgrading Shippable Server
main_section: Shippable Server
sub_section: Installation instructions
page_title: Admiral reference
page_description: Reference page for upgrading the Shippable CI/CD and DevOps platform behind your firewall
page_keywords: ci, continuous integration, devops, docker, on-premises


# Upgrading Shippable Server

Shippable server can be easily upgraded using the Admiral CLI to any released version. We recommend you upgrade
Shippable server during downtime as the upgrade updates and restarts core services. During upgrade, all your builds
jobs will get queued and will be processed after the upgrade completes.

##1. Clone `admiral` repository.

SSH into the server machine and cd into the `admiral` directory from where you had previously cloned the admiral repository.
If you do not have the admiral repository cloned, you will need to clone the public `admiral` repository using the following commands:

```
$ git clone https://github.com/Shippable/admiral.git
$ cd admiral
```

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
