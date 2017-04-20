main_section: Release
sub_section: Managing release versions


# Incrementing the version number for a Release

The `bump` directive in the Release job specifies how the version number should be incremented when the release job runs. Here we will look at different usages of `bump`. 

## Setup

-  Create a version resource in the shippable.resources.yml file. Specify your version in the versionName field.

```
 #Version resource
 - name: release-version
    type: version
    seed:
      versionName: "1.0.0"
```


#### Incrementing major version

- After completing the setup, create a Release job of **type release** in the shippable.jobs.yml file. Specify the version resource and your manifest / deploy jobs as inputs. In this example
 we provide a single manifest job as an input. 

```
  #Manifest job  
  - name: java-img-manifest
    type: manifest
    steps:
      - IN: ecr-img
      - IN: ecr-img-opts
      - TASK: managed
  
  #Release job    
  - name: release-job
    type: release
    steps:
      - IN: java-img-manifest
      - IN: release-version
      - TASK: managed
        bump: major 
```

- Running the Release job will set the current version to 2.1.0 since `bump` was set to `major`.

#### Incrementing minor version

- After completing the setup, create a Release job of **type release** in the shippable.jobs.yml file. Specify the version resource and your manifest / deploy jobs as inputs. In this example
 we provide a single manifest job as an input.

```
  #Manifest job  
  - name: java-img-manifest
    type: manifest
    steps:
      - IN: ecr-img
      - IN: ecr-img-opts
      - TASK: managed
  
  #Release job    
  - name: release-job
    type: release
    steps:
      - IN: java-img-manifest
      - IN: release-version
      - TASK: managed
        bump: minor 
```

- Running the Release job will set the current version to 1.1.0 since `bump` was set to `minor`.

#### Incrementing patch version

- After completing the setup, create a Release job of **type release** in the shippable.jobs.yml file. Specify the version resource and your manifest / deploy jobs as inputs. In this example
 we provide a single manifest job as an input.

```
  #Manifest job  
  - name: java-img-manifest
    type: manifest
    steps:
      - IN: ecr-img
      - IN: ecr-img-opts
      - TASK: managed
  
  #Release job    
  - name: release-job
    type: release
    steps:
      - IN: java-img-manifest
      - IN: release-version
      - TASK: managed
        bump: patch 
```

- Running the Release job will set the current version to 1.0.1 since `bump` was set to `patch`.

#### Incrementing alpha version

- After completing the setup, create a Release job of **type release** in the shippable.jobs.yml file. Specify the version resource and your manifest / deploy jobs as inputs. In this example
 we provide a single manifest job as an input.

```
  #Manifest job  
  - name: java-img-manifest
    type: manifest
    steps:
      - IN: ecr-img
      - IN: ecr-img-opts
      - TASK: managed
  
  #Release job    
  - name: release-job
    type: release
    steps:
      - IN: java-img-manifest
      - IN: release-version
      - TASK: managed
        bump: alpha 
```

- Running the Release job will set the current version to 1.0.0-alpha since `bump` was set to `alpha`. The next run will set the version to 1.0.0-alpha.1.

#### Incrementing beta version

- After completing the setup, create a Release job of **type release** in the shippable.jobs.yml file. Specify the version resource and your manifest / deploy jobs as inputs. In this example
 we provide a single manifest job as an input.

```
  #Manifest job  
  - name: java-img-manifest
    type: manifest
    steps:
      - IN: ecr-img
      - IN: ecr-img-opts
      - TASK: managed
  
  #Release job    
  - name: release-job
    type: release
    steps:
      - IN: java-img-manifest
      - IN: release-version
      - TASK: managed
        bump: beta 
```

- Running the Release job will set the current version to 1.0.0-beta since `bump` was set to `beta`. The next run will set the version to 1.0.0-beta.1.

#### Incrementing rc version

- After completing the setup, create a Release job of **type release** in the shippable.jobs.yml file. Specify the version resource and your manifest / deploy jobs as inputs. In this example
 we provide a single manifest job as an input.

```
  #Manifest job  
  - name: java-img-manifest
    type: manifest
    steps:
      - IN: ecr-img
      - IN: ecr-img-opts
      - TASK: managed
  
  #Release job    
  - name: release-job
    type: release
    steps:
      - IN: java-img-manifest
      - IN: release-version
      - TASK: managed
        bump: rc 
```

- Running the Release job will set the current version to 1.0.0-rc since `bump` was set to `rc`. The next run will set the version to 1.0.0-rc.1.
