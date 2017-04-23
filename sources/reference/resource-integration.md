main_section: Reference
sub_section: Resources

# resource-integration
Shippable is designed to separate out sensitive authentication information from resources.
This is done to ensure there are no encryption/decryption or permissions issues when you move things around i.e. moving resource definitions from one repository to another, or if the person who created the pipeline is no longer the member of the team etc. Integrations are specified as a property in the YML definition for resources that connect to third party services.

An `integration` resource contains your credentials to connect to any [supported third party platform or provider](integrations-overview/). This resource is used an input `IN` to [runSh jobs](job-runsh/).

You can create an integration resource by adding it to `shippable.resources.yml`

```
resources:
  - name: <string>
    type: integration
    integration: <string>
```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'integration'.

* `integration` should be the name of the integration that connects to the third party platform or service you want to connect to. For a complete list of supported third party integrations, visit our [Integrations overview page](integrations-overview/), click on a specific integration, and follow instructions to add the integration to your Account. Please make sure you also [enable the integration for your subscription]()[TODO: when new links are updated] and use the name from Subscription settings as the value for this tag.
