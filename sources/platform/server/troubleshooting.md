page_main_title: Troubleshooting a Shippable Server installation
main_section: Platform
sub_section: Shippable Server
sub_sub_section: Installation instructions
page_title: Troubleshooting a Shippable Server installation
page_description: Troubleshooting problems encountered during a Shippable Server installation
page_keywords: ci, continuous integration, devops, docker, on-premises

# Troubleshooting

### RabbitMQ initialization fails

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

### Login fails every time after first Login with nginx setup as a reverse proxy

This occurs if nginx is not setup to forward websocket traffic. Your nginx configuration should be  
authored as described below for authentication to work.

```
server {
  listen 443 ssl;

  server_name www.foo.com;
  ssl_certificate /path/to/your/fullchain.pem;;
  ssl_certificate_key /path/to/your/privkey.pem;
  ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;

  location / {
    proxy_pass http://your-internal-shippable-server:50001;
    proxy_set_header Host            $host;
  }

  location /socket.io/ {
    proxy_pass http://your-internal-shippable-server:50001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host            $host;
  }
}
```

### DNS resolution errors

Shippable by default configures docker with Google DNS. If you have setup private DNS servers in your intranet and need to use them to communicate with your SCM or use them in Admiral configuration, please follow these steps. In a future release, you will
be able to specify DNS options in Admiral UI itself.

* ssh into the Admiral machine.
* Edit /etc/default/docker, remove the two `--dns` options, specify your dns settings, then restart docker, restart Admiral, and then restart services within Admiral.
* ssh into the system or BYON node machines and repeat the same steps.
