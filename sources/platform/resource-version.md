page_main_title: version
main_section: Platform
sub_section: Resources

# version
A `version` resource is used to create version numbers for releases. It uses <a href="http://www.semver.org/">the semantic version</a> methodology to increment versions.

`version` resources are used as inputs to [release jobs](job-release/).

You can create this resource by adding it to `shippable.resources.yml`
```
resources:
  - name: <string>                         	#required
    type: version                            	#required
    seed:
      versionName: "0.0.1"                    	#required
```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'version'.

* `versionName` is a string that represents a semantic version that is used as a starting point. This will get incremented in the IN operations of [jobs](#jobs). You can also use `0.0.0-alpha`, `0.0.0-beta` & `0.0.0-rc` formats.
