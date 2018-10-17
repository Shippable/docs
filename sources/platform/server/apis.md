page_main_title: Shippable Server | Configure dedicated APIs
main_section: Shippable Server
sub_section: Configuration
page_title: Shippable Server | Configure dedicated APIs
page_description: Configure multiple APIs through Admiral UI
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, APIs, internal, console, public

# APIs

The **Control plane->API** section of the Admiral UI offers a way to configure three types of APIs:

*  `public`: This is the default API which is brought up. This is used by the Shippable UI, webhooks posted to SCMs by Shippable.
*  `internal`(optional): If configured, all the `internal` Shippable services will use this API.
*  `console` (optional): If configured, all the builds will use this API to send logs.

For most installations, the default setting of `public` API is enough. Configuring dedicated APIs is a highly specialized configuration and needs to be used only to address very specific performance requirements.

<img src="/images/platform/server/configure-multiple-apis.png" alt="Configure multiple APIs">
