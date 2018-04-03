page_main_title: Shippable Server | Scale Services
main_section: Platform
sub_section: Shippable Server
sub_sub_section: Configuration
page_title: Scale Services | Shippable Server
page_description: Scale your services through Admiral UI
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, vault

# Services

The **Control plane->SERVICES** section of the Admiral UI offers a way to scale specific microservices if the load on specific parts of the system increases.

<img src="/images/platform/server/admiral-services.png" alt="Scale services if needed">

For example, if account sync is taking a long time, you can try scaling up the `Sync` service to see if things improve. Ideally, you would never need to scale any of these services beyond the default value of one instance.

Please [contact the Shippable team](mailto:support@shippable.com) if you're running into performance issues and need guidance on what to scale.
