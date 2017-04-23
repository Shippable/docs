main_section: Reference
sub_section: Resources

# resource-params
Params resources provide a convenient way to pass key-value pairs into an environment. There are two ways params resources can be used.

When used as an input to [manifest](job-manifest/) or [deploy](job-deploy/) jobs, params resources add a list of environment parameters to an application or microservice.

When added as an input to unmanaged jobs, such as [runSh](job-runsh/) or [runCLI](job-runcli/) jobs, the key-value pairs in the params resource are added as environment variables in that job.

## Configuration reference
You can create this resource by adding it to `shippable.resources.yml`
```
resources:
  - name: <string>                         #required
    type: params                           #required
    version:
      params:
        key1: "value1"                     #requires at least one
        key2: "value2"                     #optional
        secure: <encrypted value>          #optional
```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'params'.

* The version -> params section includes the key-value pairs that will become environment variables.
	* You can use secure variables to encrypt any key-value pairs that contain sensitive information you don't want to include as plain text. To encrypt one or more key-value pairs, [follow the instructions in the Subscription Settings guide]()[TODO: when new links are updated]. Copy the encrypted value and include it in your resource file as shown in the snippet above.

A new version of this resource is created every time anything in the version section changes.


## Using params resources as inputs to manifest and deploy jobs
If a params resource is added as an input, the key-value pairs contained in the params resource will be set as environment variables when the application or service starts in the target environment.

### Overriding params
`params` can also be used to override settings that were set in an upstream stage of the pipeline.

For example, if you want to use different environment parameters (say database settings) in Test and Production environments, you can do so by overriding the resource.

<img src="../../images/reference/resources/overrideParams.png" alt="Overriding Params image">

In the picture above, `deploy-test` takes `params-1` as an input. After testing, a release is created with the `release` job. This triggers production deployment with the `deploy-prod` job, which takes `params-2` as an input. For this production deployment, we will use a superset of settings from `params-1` and `params-2`, with values for any common settings being chosen from `params-2`.

## Using params resources as inputs to runSh and runCLI jobs
If a params resource is added as an input, the key-value pairs contained in the params resource are set as environment variables in the runSh or runCLI job. The naming convention for those variables is available in the documentation on [runSh environment variables](../jobs/runSh/#resource-variables).
