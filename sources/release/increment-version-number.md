page_main_title: Incrementing version numbers
main_section: Release
sub_section: Managing release versions
page_title: Incrementing the version number for a Release
page_description: How to increment the version number for a Release in Shippable

# Incrementing the version number for a Release

The `bump` directive in the release job specifies how the version number should be incremented when the release job runs. Here we will look at different usages of `bump`.

## Setup

-  Create a [version](/platform/workflow/resource/version/) resource in the shippable.yml file. Specify your starting version in the versionName field.

```
 # Version resource
 - name: release-version
    type: version
    seed:
      versionName: "1.0.0"
```

-  Add a [manifest](/platform/workflow/job/manifest/) job to your shippable.yml file.

```
 # Manifest job  
 - name: java-img-manifest
   type: manifest
   steps:
     - IN: ecr-img
     - IN: ecr-img-opts
```

-  Trigger the manifest job to create a manifest.


## Incrementing major version

- After completing the setup section above, add a release job to the shippable.yml file. Specify the version resource and your manifest or deploy jobs as inputs. In this example,
 we provide a single manifest job as an input.

```
  # Release job    
  - name: release-job
    type: release
    bump: major
    steps:
      - IN: java-img-manifest
      - IN: release-version
```

- Running the release job will set the current version to 2.0.0 since `bump` was set to `major`.

## Incrementing minor version

 - After completing the setup section above, add a release job to the shippable.yml file. Specify the version resource and your manifest or deploy jobs as inputs. In this example,
  we provide a single manifest job as an input.

```
  # Release job    
  - name: release-job
    type: release
    bump: minor
    steps:
      - IN: java-img-manifest
      - IN: release-version
```

- Running the release job will set the current version to 1.1.0 since `bump` was set to `minor`.

## Incrementing patch version

- After completing the setup section above, add a release job to the shippable.yml file. Specify the version resource and your manifest or deploy jobs as inputs. In this example,
 we provide a single manifest job as an input.

```
  # Release job    
  - name: release-job
    type: release
    bump: patch
    steps:
      - IN: java-img-manifest
      - IN: release-version
```

- Running the release job will set the current version to 1.0.1 since `bump` was set to `patch`.

## Incrementing alpha version

- After completing the setup section above, add a release job to the shippable.yml file. Specify the version resource and your manifest or deploy jobs as inputs. In this example,
 we provide a single manifest job as an input.

```
  # Release job    
  - name: release-job
    type: release
    bump: alpha
    steps:
      - IN: java-img-manifest
      - IN: release-version
```

- Running the release job will set the current version to 1.0.0-alpha since `bump` was set to `alpha`. The next run will set the version to 1.0.0-alpha.1.

## Incrementing beta version

- After completing the setup section above, add a release job to the shippable.yml file. Specify the version resource and your manifest or deploy jobs as inputs. In this example,
 we provide a single manifest job as an input.

```
  # Release job    
  - name: release-job
    type: release
    bump: beta
    steps:
      - IN: java-img-manifest
      - IN: release-version
```

- Running the release job will set the current version to 1.0.0-beta since `bump` was set to `beta`. The next run will set the version to 1.0.0-beta.1.

## Incrementing rc version

 - After completing the setup section above, add a release job to the shippable.yml file. Specify the version resource and your manifest or deploy jobs as inputs. In this example,
  we provide a single manifest job as an input.


```
  # Release job    
  - name: release-job
    type: release
    bump: rc
    steps:
      - IN: java-img-manifest
      - IN: release-version
```

- Running the release job will set the current version to 1.0.0-rc since `bump` was set to `rc`. The next run will set the version to 1.0.0-rc.1.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
