page_main_title: Setting version number
main_section: Release
sub_section: Managing release versions

# Setting the version number for a Release

-  Create a version resource in the shippable.resources.yml file. Specify your initial version in the versionName field.

```
 # Version resource
 - name: release-version
    type: version
    seed:
      versionName: "1.0.0"
```

- Create a release job in the shippable.jobs.yml file. Specify the version resource and your manifest or deploy jobs as inputs. In this example
 we provide a single manifest job as an input.

```
  #Manifest job  
  - name: java-img-manifest
    type: manifest
    steps:
      - IN: ecr-img
      - IN: ecr-img-opts

  #Release job    
  - name: release-job
    type: release
    steps:
      - IN: java-img-manifest
      - IN: release-version
```

- Running the release job will set the current version to 1.1.0, incrementing the minor version. To increment other components of the version, such as major or patch, please see the section on incrementing version numbers.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
