page_main_title: Troubleshooting a Shippable Server installation
main_section: Platform
sub_section: Shippable Server
sub_sub_section: Installation instructions
page_title: Troubleshooting a Shippable Server installation
page_description: Troubleshooting problems encountered during a Shippable Server installation
page_keywords: ci, continuous integration, devops, docker, on-premises

# Troubleshooting

###RabbitMQ initialization fails

* Check your kernel version by running the following command on **Server 1**:

```
$ uname -a
```

<img src="/images/platform/tutorial/server/kernel-version.png" alt="Admiral-github">

* If your kernel version is less than **3.19**, you need to run the following commands:

```
$ sudo apt-get update
$ sudo apt-get install linux-generic-lts-vivid
$ sudo reboot #restart is required after kernel upgrade
```

* After the reboot, you will need to restart Admiral:

```
$ sudo ./admiral.sh restart
```

* Re-open the admiral UI and click on **Initialize** in the **Initialize Infrastructure** section.

### Missing subscriptions

If you sign in to Shippable Server and are missing some subscriptions (organizations or teams) from your SCM, click on **Profile** in your left navbar and then click on **Sync**. Recheck if the missing organizations are now visible under **Subscriptions**.
