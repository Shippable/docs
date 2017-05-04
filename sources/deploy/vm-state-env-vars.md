main_section: Deploy
sub_section: Node Cluster on any cloud

# Node Cluster State and Environment Variables

## The Goal
To demonstrate how params are used in the context of deploying to a nodeCluster resource.

- Create two manifest jobs, each with its own file resource input
- Create two params resources, each applying to a different manifest
- Create a third params object to apply to only one of the manifests in the final deploy job

Your final pipeline will look like this:
<img src="../../images/deploy/nodecluster/state-env-final.png" alt="Final Pipeline">

## Setup
Start with our basic [nodeCluster sample](./vm-basic)

## Configuration
In our basic example, we're already using environment variables via [params resource](../reference/resource-params).  This page will describe what's happening behind the scenes when deploying with params to a node cluster.

To best demonstrate, we should start by adding two more `params` resources (for a total of 3) so we can see in detail how they are treated during a deployment.

```
- name: nodecluster-params
  type: params
  version:
    params:
      PORT: 8888
      ENVIRONMENT: nodeCluster

- name: nodecluster-params-2
    type: params
    version:
      params:
        PORT: 9999
        ENVIRONMENT: prodCluster

  - name: nodecluster-params-final
    type: params
    version:
      params:
        PORT: 8080
        ENVIRONMENT: prodCluster      
```

Now add one extra manifest job to utilize params-2. For the sake of example, both manifests will take the same file as input, but in reality these should be two different software packages that you might want to deploy together.
```
- name: deploy-nodecluster-basic-manifest-2
  type: manifest
  steps:
    - IN: nodecluster-params-2
    - IN: deploy-nodecluster-basic-appfile
```

Then update the deploy job so that params-final only applies to the original manifest.
```
- name: deploy-nodecluster-basic-deploy
    type: deploy
    steps:
      - IN: deploy-nodecluster-basic-manifest
      - IN: deploy-nodecluster-basic-manifest-2
      - IN: nodecluster-params-final
        applyTo:
          - deploy-nodecluster-basic-manifest
      - IN: deploy-nodecluster-basic-cluster
      - TASK:
        - script: forever stopall
        - script: mkdir -p ~/deploy-nodecluster-basic-manifest && mkdir -p deploy-nodecluster-basic-manifest-2
        - script: cd ~/deploy-nodecluster-basic-manifest
        - script: source /tmp/shippable/deploy-nodecluster-basic-manifest/deploy-nodecluster-basic-appfile/package.env
        - script: tar zxf /tmp/shippable/deploy-nodecluster-basic-manifest/deploy-nodecluster-basic-appfile/deploy-nodecluster-basic-appfile.tar.gz
        - script: forever start ./bin/www
        - script: cd ~/deploy-nodecluster-basic-manifest-2
        - script: source /tmp/shippable/deploy-nodecluster-basic-manifest-2/deploy-nodecluster-basic-appfile/package.env
        - script: tar zxf /tmp/shippable/deploy-nodecluster-basic-manifest-2/deploy-nodecluster-basic-appfile/deploy-nodecluster-basic-appfile.tar.gz
        - script: forever start ./bin/www
```

Now execute your pipeline. Make sure that your file resource is pointing to a real existing file that can be downloaded via `wget`.  Once the deployment is complete, take a look at the `/tmp` folder.  This is the directory where Shippable will copy its deployment information. In our case we see:
```
ubuntu@ip-172-31-23-107:/tmp$ tree -a
.
└── shippable
    ├── deploy.env
    ├── deploy-nodecluster-basic-manifest
    │   └── deploy-nodecluster-basic-appfile
    │       ├── deploy-nodecluster-basic-appfile.tar.gz
    │       └── package.env
    ├── deploy-nodecluster-basic-manifest-2
    │   └── deploy-nodecluster-basic-appfile
    │       ├── deploy-nodecluster-basic-appfile.tar.gz
    │       └── package.env
    └── taskScript.sh

```

You can see here that the directory structure mimics the structure of the deploy job itself.  Each manifest has its own folder, containing additional folders for each `file` resource the manifest contained. In our case each manifest contained a single file.  Inside each file's directory, there is another `.env` alongside the actual package.  These `.env` files will contain any params that you've explicitly associated with the manifest/file.

There is also a `taskScript.sh` file.  This is where the script in your `TASK` section is written before being executed.  Let's take a look there first.

*file: taskScript.sh*
```
#!/bin/bash -e
source /tmp/shippable/deploy.env


forever stopall

mkdir -p ~/deploy-nodecluster-basic-manifest && mkdir -p deploy-nodecluster-basic-manifest-2

cd ~/deploy-nodecluster-basic-manifest

source /tmp/shippable/deploy-nodecluster-basic-manifest/deploy-nodecluster-basic-appfile/package.env

tar zxf /tmp/shippable/deploy-nodecluster-basic-manifest/deploy-nodecluster-basic-appfile/deploy-nodecluster-basic-appfile.tar.gz

forever start ./bin/www

cd ~/deploy-nodecluster-basic-manifest-2

source /tmp/shippable/deploy-nodecluster-basic-manifest-2/deploy-nodecluster-basic-appfile/package.env

tar zxf /tmp/shippable/deploy-nodecluster-basic-manifest-2/deploy-nodecluster-basic-appfile/deploy-nodecluster-basic-appfile.tar.gz

forever start ./bin/www

```

This is simply our script from the TASK section, with the addition of the `source` statement at the top.  Shippable will `source` the highest level `.env` file, because we presume at this high level that all nested deployments might want to make use of the contents.

Subsequent `.env` files are up to the user to source at the appropriate time in their custom script.  Let's look at our low level `package.env` files.

*from original manifest*
```
# environment variables for deploy-nodecluster-basic-appfile

export ENVIRONMENT=prodCluster

export PORT=8080
```
*from manifest-2*
```
# environment variables for deploy-nodecluster-basic-appfile

export ENVIRONMENT=prodCluster

export PORT=9999
```

Notice that in the `.env` for manifest-2, the PORT is set to 9999 and ENVIRONMENT is set to prodCluster, which is what our `params-final` contained.  Shippable has performed the env overrides for you, and replaced `PORT=8888` and `ENVIRONMENT=nodeCluster` from the original params.  Now all you need to do is `source` the result during your script.

Now in this example, I can visit my app at port 8080 or port 9999 on my node to see it running.

Shippable will always store packages in the tree structure described above, so you can write your scripts with that in mind.
