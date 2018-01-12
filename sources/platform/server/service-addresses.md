page_main_title: Shippable Server service addresses
main_section: Platform
sub_section: Shippable Server
sub_sub_section: Configuration
page_title: Configure service addresses | Shippable Server
page_description: Connect your source control provider to Shippable server for authentication
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, vault

# Service addresses

The **Service addresses** section of the Admiral UI shows you what address various services are available at. You do not need to change anything in this section unless you have a complicated network topology with reverse proxies, nginx, etc.

<img src="/images/platform/server/admiral-service-addresses.png" alt="Service addresses">

## Using self-signed SSL certificates

To allow Shippable services to work with self-signed SSL certificates, tick `Ignore TLS Errors` checkbox during installation.
For existing installations, you will have to `Save` and `Restart Services` after checking ignore TLS option.

This setting will ignore TLS errors on all Shipppable services. This is an insecure configuration and should only be used in trusted networks. 
Scenarios for using this setting include enterprise SCM installation in a private network with self-signed SSL certificate.

<img src="/images/platform/server/admiral-self-signed-ssl-certs.png" alt="Using self-signed SSL Certificates">
