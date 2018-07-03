page_main_title: dockerOptions
main_section: Platform
sub_section: Configuration
sub_sub_section: Resources
page_title: dockerOptions resource reference
page_description: dockerOptions resource reference

# dockerOptions
This resource type is used to add a list of docker options that can be appended to a docker image. This resource on its own does not mean anything unless used in conjunction with an [image resource](/platform/workflow/resource/image/) or a [manifest job](/platform/workflow/job/manifest/). A `dockerOptions` resource can be an `IN` resource for a [manifest job](/platform/workflow/job/manifest/), or for a [deploy job](/platform/workflow/job/deploy/).

If you do not provide a dockerOptions resource to a manifest job, it will set memory to 400mb by default. No other default settings will be used.

## Configuration reference

- [Latest Syntax (Shippable v6.1.1 and above)](#latestSyntax)
- [Old Syntax (forward compatible)](#oldSyntax)

You can define `dockerOptions` by adding it to **shippable.yml** as shown below. This will create a resource of type `dockerOptions`. You can include any settings shown below that you want as part of your `dockerOptions`. All settings are optional. [Read below](#descriptions) for a description and the format of each setting.

For a table showing the mapping of each setting to a setting in your Container Service, read [mapping dockerOptions to your Container Service](#mappingDockerOptions).

<a name="latestSyntax"></a>
### Latest Syntax (Shippable v6.1.1 and above)

```yml
resources:
  - name: <string>                              #required
    type: dockerOptions                         #required
    versionTemplate:
      memory: <integer>                         #optional, in MiB
      cpuShares: <number>                       #optional
      portMappings:                             #optional
        - "80:80/tcp"                           #hostPort:containerPort/protocol (udp|tcp)
      links:                                    #optional, containerName:alias
        - <container name>:<alias>
        - <container name>:<alias>
      volumes:                                  #optional
        - "<source>:<container path>:<options>"
        - "<source>:<container path>:<options>"
      logConfig:                                #optional
        type: <string>                          #optional
        options:                                #optional
          <key1>: <value1>
          <key2>: <value2>
      entryPoint:                               #optional
        - <string>
        - <string>
      cmd:
        - <string>
        - <string>
      workingDir: <path to working dir>
      privileged: <boolean>                     # May be true or false
      labels:
        <key1>: <value1>
        <key2>: <value2>
      volumesFrom:
        - "<container name>:<options>"
        - "<container name>:<options>"
      ulimits:
        - name: <name of limit>                 # e.g. cpu
          soft: <number>                        # soft Limit
          hard: <number>                        # hard Limit
        - name: <name of limit>                 # e.g. nofile
          soft: <number>                        # soft Limit, e.g. 50
          hard: <number>                        # hard Limit, e.g. 100
      dnsServers:
        - "<ip address>"
      dnsSearch:
        - "<ip address>"
      user: <string>                            # For GKE, this should be the UID (a number)
      hostName: <string>
      domainName: <string>
      memorySwap: <number>
      attachStdin: <boolean>                    # May be true or false
      attachStdout: <boolean>                   # May be true or false
      attachStderr: <boolean>                   # May be true or false
      tty: <boolean>                            # May be true or false
      stdin: <boolean>                          # May be true or false
      stdinOnce: <boolean>                      # May be true or false
      networkDisabled: <boolean>                # May be true or false
      publishAllPorts: <boolean>                # May be true or false
      readOnlyRootFilesystem: <boolean>         # May be true or false
      extraHosts:                               # Optional
        - "host:ip address"
        - "host:ip address"
      capAdd:                                   # Optional
        - <string>
      capDrop:                                  # Optional
        - <string>
      restartPolicy:                            # For GKE and DCL, this should be a string (eg- "Always")
        - name: <string>
        - maximumRetryCount: <number>
      securityOptions:                          # Optional
        - <string>
        - <string>
      cGroupParent: <string>                    # Optional
      memoryReservation: <number>               # This should be given in MB
      pid: <string>                             # Optional
      network: <string>                         # Optional
      devices:                                  # For DCL
        - <string>
      devices:                                  # For DDC
        - pathOnHost: <string>
          pathInContainer: <string>
          cGroupPermissions: <string>
```

### Provider specific options
Many options listed above are shared across all providers. For example, every provider will give you a way to control the amount of memory allocated to a container.  On the other hand, some providers have implemented additional features that are unique to their offering.  This section will go over those extra options that are not shared among providers.  Please see the provider docs on the proper way to use these options.

#### Amazon ECS

Container level docker options: These fields map to each object inside `containerDefinitions` of `taskDefinition`.
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      essential: boolean
```

Top level docker options: There are two top levels for Amazon ECS, i.e., `service` and `taskDefinition`. Please refer the following yml to find the possible options, that can be given under them.

```
  resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      service:
        loadBalancers: [
          {
              "targetGroupArn": "",
              "loadBalancerName": "",
              "containerName": "",
              "containerPort": 0
          }
        ]
        desiredCount: <number>
        clientToken: <string>
        role: <string>
        deploymentConfiguration:
          maximumPercent: <number>
          minimumHealthyPercent: <number>
        placementStrategy:
         - field: <string>
           type: <string>
         - field: <string>
           type: <string>
      taskDefinition:
        family: <string>
        taskRoleArn: <string>
        networkMode: <string>
        volumes:
          - "<source>:<container path>:<options>"
          - "<source>:<container path>:<options>"
```

All ECS Service definition parameters documented [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_definition_parameters.html) can be specified under `service` since these are passthrough. The same applies for `taskDefinition` documented [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html).

#### Kubernetes
Container Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      envFrom: <array>
      imagePullPolicy: <string>
      lifecycle:
        <object>
      livenessProbe:
        <object>
      readinessProbe:
        <object>
      resources:
        <object>
      securityContext:
        <object>
      terminationMessagePath: <string>
      terminationMessagePolicy: <string>

```

`lifecycle`, `livenessProbe`, `readinessProbe`, `resources` and `securityContext` are passthrough objects. These
are defined in the Kubernetes Container v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#container-v1-core). Any other fields in prior or later versions of the Container spec can also be specified, since these are passthrough.

Pod Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      pod:
        terminationGracePeriodSeconds: <number>
        activeDeadlineSeconds: <number>
        restartPolicy: <string>
        dnsPolicy: <string>
        nodeSelector:
          <object>
        serviceAccountName: <string>
        serviceAccount: <string>
        nodeName: <string>
        hostNetwork: <boolean>
        hostPID: <boolean>
        imagePullSecrets:
          - <string>
```

`nodeSelector` is a  passthrough object which is defined in the Kubernetes Podspec v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#pod-v1-core). Any other fields in prior or later versions of the  Podspec can also be specified, since these are passthrough.

Deployment Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      deployment:
        minReadySeconds: <number>
        paused: <boolean>
        progressDeadlineSeconds: <number>
        replicas: <number>
        revisionHistoryLimit: <number>
        labels:
          <key1>: <value1>
          <key2>: <value2>
        template:
          <object>
        selector:
          <object>
        strategy:
          <object>
```

`template`, `selector`,  and `strategy` are passthrough objects. These are defined in the Kubernetes DeploymentSpec v1beta2 apps API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#deployment-v1beta2-apps). Any other fields in prior or later versions of the DeploymentSpec can also be specified, since these are passthrough.

#### Google Container Engine
Deployments made with [Google Cloud integrations](/platform/integration/gcloudKey/) utilize `deployment` objects and [Google Container Engine integrations](/platform/integration/deprecated/gke/) use `replicationControllers`, so deployments to GKE have different options depending on the integration used.


##### Deploying with a Google Container Engine integration
Top level docker options: Only one top level, `pod`, is currently supported for Google Container Engine with a [Google Container Engine integration](/platform/integration/deprecated/gke/).
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      pod:
        terminationGracePeriodSeconds: <number>
        activeDeadlineSeconds: <number>
        dnsPolicy: <string>
        nodeSelector:
          <object>
        serviceAccountName: <string>
        serviceAccount: <string>
        nodeName: <string>
        hostNetwork: <boolean>
        hostPID: <boolean>
        imagePullSecrets:
          - <string>
```

##### Deploying with a Google Cloud integration
Container Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      envFrom: <array>
      imagePullPolicy: <string>
      lifecycle:
        <object>
      livenessProbe:
        <object>
      readinessProbe:
        <object>
      resources:
        <object>
      securityContext:
        <object>
      terminationMessagePath: <string>
      terminationMessagePolicy: <string>

```

`lifecycle`, `livenessProbe`, `readinessProbe`, `resources` and `securityContext` are passthrough objects. These
are defined in the Kubernetes Container v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#container-v1-core). Any other fields in prior or later versions of the Container spec can also be specified, since these are passthrough.

Pod Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      pod:
        terminationGracePeriodSeconds: <number>
        activeDeadlineSeconds: <number>
        restartPolicy: <string>
        dnsPolicy: <string>
        nodeSelector:
          <object>
        serviceAccountName: <string>
        serviceAccount: <string>
        nodeName: <string>
        hostNetwork: <boolean>
        hostPID: <boolean>
        imagePullSecrets:
          - <string>
```

`nodeSelector` is a  passthrough object which is defined in the Kubernetes Podspec v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#pod-v1-core). Any other fields in prior or later versions of the Podspec can also be specified, since these are passthrough.

Deployment Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      deployment:
        minReadySeconds: <number>
        paused: <boolean>
        progressDeadlineSeconds: <number>
        replicas: <number>
        revisionHistoryLimit: <number>
        labels:
          <key1>: <value1>
          <key2>: <value2>
        template:
          <object>
        selector:
          <object>
        strategy:
          <object>
```

`template`, `selector`,  and `strategy` are passthrough objects. These are defined in the Kubernetes DeploymentSpec v1beta2 apps API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#deployment-v1beta2-apps). Any other fields in prior or later versions of the DeploymentSpec can also be specified, since these are passthrough.

#### Docker Datacenter

Container level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      ExposedPorts: <object>
      StopSignal: <string>
      HostConfig:
        kernelMemory: <number>
        cpuShares: <number>
        cpuPeriod: <number>
        cpuPercent: <number>
        cpuQuota: <number>
        cpusetCpus: <string>
        cpusetMems: <string>
        IOMaximumBandwidth: <number>
        IOMaximumIOps: <number>
        BlkioWeightDevice:
          - Path: <string>
          - Weight: weight
        BlkioDeviceReadBps:
          - Path: <string>
          - Rate: <number>
        BlkioDeviceWriteBps:
          - Path: <string>
          - Rate: <number>
        BlkioDeviceReadIOps:
          - Path: <string>
          - Rate: <number>
        BlkioDeviceWriteIOps:
          - Path: <string>
          - Rate: <number>
        BlkioWeight: <number>
        MemorySwappiness: <number>
        OomKillDisable: <boolean>
        OomScoreAdj: <number>
        PidsLimit: <number>
        DnsOptions:
          - <string>
          - <string>
        GroupAdd:
          - <string>
          - <string>
        UsernsMode: <string>
        Sysctls:
          - <string>: <string>
        StorageOpt:
          - <string>: <string>
        VolumeDriver: <string>
        ShmSize: <number>
```

#### Docker Cloud

Container level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
       autoredeploy: <boolean>
       autodestroy: <string>
       nickname: <string>
       tags:
         - <string>
       deployment_strategy: <string>
       roles:
         - <string>
       sequential_deployment: <boolean>
       target_num_containers: <number>
```

####Joyent Triton

None at this time

#### AZURE DC/OS
App level docker options:

Parameters accept all the arbitrary docker options according to the [mesosphere documentation](https://mesosphere.github.io/marathon/docs/native-docker.html#privileged-mode-and-arbitrary-docker-options)

```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      environment:
        - <string>: <string>
      acceptedResourceRoles:
        - <string>
      parameters:
        - <string>: <string>
```

#### Azure Container Service (AKS)
Container Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      envFrom: <array>
      imagePullPolicy: <string>
      lifecycle:
        <object>
      livenessProbe:
        <object>
      readinessProbe:
        <object>
      resources:
        <object>
      securityContext:
        <object>
      terminationMessagePath: <string>
      terminationMessagePolicy: <string>

```

`lifecycle`, `livenessProbe`, `readinessProbe`, `resources` and `securityContext` are passthrough objects. These
are defined in the Kubernetes Container v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#container-v1-core). Any other fields in prior or later versions of the Container spec can also be specified, since these are passthrough.

Pod Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      pod:
        terminationGracePeriodSeconds: <number>
        activeDeadlineSeconds: <number>
        restartPolicy: <string>
        dnsPolicy: <string>
        nodeSelector:
          <object>
        serviceAccountName: <string>
        serviceAccount: <string>
        nodeName: <string>
        hostNetwork: <boolean>
        hostPID: <boolean>
        imagePullSecrets:
          - <string>
```

`nodeSelector` is a  passthrough object which is defined in the Kubernetes Podspec v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#pod-v1-core). Any other fields in prior or later versions of the Podspec can also be specified, since these are passthrough.

Deployment Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    versionTemplate:
      deployment:
        minReadySeconds: <number>
        paused: <boolean>
        progressDeadlineSeconds: <number>
        replicas: <number>
        revisionHistoryLimit: <number>
        labels:
          <key1>: <value1>
          <key2>: <value2>
        template:
          <object>
        selector:
          <object>
        strategy:
          <object>
```

`template`, `selector`,  and `strategy` are passthrough objects. These are defined in the Kubernetes DeploymentSpec v1beta2 apps API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#deployment-v1beta2-apps). Any other fields in prior or later versions of the DeploymentSpec can also be specified, since these are passthrough.

<a name="oldSyntax"></a>
### Old Syntax (forward compatible)

```yml
resources:
  - name: <string>                              #required
    type: dockerOptions                         #required
    version:
      memory: <integer>                         #optional, in MiB
      cpuShares: <number>                       #optional
      portMappings:                             #optional
        - "80:80/tcp"                           #hostPort:containerPort/protocol (udp|tcp)
      links:                                    #optional, containerName:alias
        - <container name>:<alias>
        - <container name>:<alias>
      volumes:                                  #optional
        - "<source>:<container path>:<options>"
        - "<source>:<container path>:<options>"
      logConfig:                                #optional
        type: <string>                          #optional
        options:                                #optional
          <key1>: <value1>
          <key2>: <value2>
      entryPoint:                               #optional
        - <string>
        - <string>
      cmd:
        - <string>
        - <string>
      workingDir: <path to working dir>
      privileged: <boolean>                     # May be true or false
      labels:
        <key1>: <value1>
        <key2>: <value2>
      volumesFrom:
        - "<container name>:<options>"
        - "<container name>:<options>"
      ulimits:
        - name: <name of limit>                 # e.g. cpu
          soft: <number>                        # soft Limit
          hard: <number>                        # hard Limit
        - name: <name of limit>                 # e.g. nofile
          soft: <number>                        # soft Limit, e.g. 50
          hard: <number>                        # hard Limit, e.g. 100
      dnsServers:
        - "<ip address>"
      dnsSearch:
        - "<ip address>"
      user: <string>                            # For GKE, this should be the UID (a number)
      hostName: <string>
      domainName: <string>
      memorySwap: <number>
      attachStdin: <boolean>                    # May be true or false
      attachStdout: <boolean>                   # May be true or false
      attachStderr: <boolean>                   # May be true or false
      tty: <boolean>                            # May be true or false
      stdin: <boolean>                          # May be true or false
      stdinOnce: <boolean>                      # May be true or false
      networkDisabled: <boolean>                # May be true or false
      publishAllPorts: <boolean>                # May be true or false
      readOnlyRootFilesystem: <boolean>         # May be true or false
      extraHosts:                               # Optional
        - "host:ip address"
        - "host:ip address"
      capAdd:                                   # Optional
        - <string>
      capDrop:                                  # Optional
        - <string>
      restartPolicy:                            # For GKE and DCL, this should be a string (eg- "Always")
        - name: <string>
        - maximumRetryCount: <number>
      securityOptions:                          # Optional
        - <string>
        - <string>
      cGroupParent: <string>                    # Optional
      memoryReservation: <number>               # This should be given in MB
      pid: <string>                             # Optional
      network: <string>                         # Optional
      devices:                                  # For DCL
        - <string>
      devices:                                  # For DDC
        - pathOnHost: <string>
          pathInContainer: <string>
          cGroupPermissions: <string>
```

### Provider specific options
Many options listed above are shared across all providers. For example, every provider will give you a way to control the amount of memory allocated to a container.  On the other hand, some providers have implemented additional features that are unique to their offering.  This section will go over those extra options that are not shared among providers.  Please see the provider docs on the proper way to use these options.

#### Amazon ECS

Container level docker options: These fields map to each object inside `containerDefinitions` of `taskDefinition`.
```
resources:
  - name: <string>
    type: dockerOptions
    version:
      essential: boolean
```

Top level docker options: There are two top levels for Amazon ECS, i.e., `service` and `taskDefinition`. Please refer the following yml to find the possible options, that can be given under them.
```
  resources:
  - name: <string>
    type: dockerOptions
    version:
      service:
        loadBalancers: [
          {
              "targetGroupArn": "",
              "loadBalancerName": "",
              "containerName": "",
              "containerPort": <number that matches a port in your task definition>
          }
        ]    
        desiredCount: <number>
        clientToken: <string>
        role: <string>
        deploymentConfiguration:
          maximumPercent: <number>
          minimumHealthyPercent: <number>
        placementStrategy:
         - field: <string>
           type: <string>
         - field: <string>
           type: <string>
      taskDefinition:
        family: <string>
        taskRoleArn: <string>
        networkMode: <string>
        volumes:
          - "<source>:<container path>:<options>"
          - "<source>:<container path>:<options>"
```

#### Kubernetes
Container Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    version:
      envFrom: <array>
      imagePullPolicy: <string>
      lifecycle:
        <object>
      livenessProbe:
        <object>
      readinessProbe:
        <object>
      resources:
        <object>
      securityContext:
        <object>
      terminationMessagePath: <string>
      terminationMessagePolicy: <string>

```

`lifecycle`, `livenessProbe`, `readinessProbe`, `resources` and `securityContext` are passthrough objects. These
are defined in the Kubernetes Container v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#container-v1-core). Any other fields in prior or later versions of the Container spec can also be specified, since these are passthrough.


Pod Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    version:
      pod:
        terminationGracePeriodSeconds: <number>
        activeDeadlineSeconds: <number>
        restartPolicy: <string>
        dnsPolicy: <string>
        nodeSelector:
          <object>
        serviceAccountName: <string>
        serviceAccount: <string>
        nodeName: <string>
        hostNetwork: <boolean>
        hostPID: <boolean>
        imagePullSecrets:
          - <string>
```

`nodeSelector` is a  passthrough object which is defined in the Kubernetes Podspec v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#pod-v1-core). Any other fields in prior or later versions of the Podspec can also be specified, since these are passthrough.

Deployment Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    version:
      deployment:
        minReadySeconds: <number>
        paused: <boolean>
        progressDeadlineSeconds: <number>
        replicas: <number>
        revisionHistoryLimit: <number>
        labels:
          <key1>: <value1>
          <key2>: <value2>
        template:
          <object>
        selector:
          <object>
        strategy:
          <object>
```

`template`, `selector`,  and `strategy` are passthrough objects. These are defined in the Kubernetes DeploymentSpec v1beta2 apps API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#deployment-v1beta2-apps). Any other fields in prior or later versions of the DeploymentSpec can also be specified, since these are passthrough.

#### Google Container Engine
Deployments made with [Google Cloud integrations](/platform/integration/gcloudKey/) utilize `deployment` objects and [Google Container Engine integrations](/platform/integration/deprecated/gke/) use `replicationControllers`, so deployments to GKE have different options depending on the integration used.


##### Deploying with a Google Container Engine integration
Top level docker options: Only one top level, `pod`, is currently supported for Google Container Engine with a [Google Container Engine integration](/platform/integration/deprecated/gke/).
```
resources:
  - name: <string>
    type: dockerOptions
    version:
      pod:
        terminationGracePeriodSeconds: <number>
        activeDeadlineSeconds: <number>
        dnsPolicy: <string>
        nodeSelector:
          <object>
        serviceAccountName: <string>
        serviceAccount: <string>
        nodeName: <string>
        hostNetwork: <boolean>
        hostPID: <boolean>
        imagePullSecrets:
          - <string>
```

`nodeSelector` is a  passthrough object which is defined in the Kubernetes Podspec v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#pod-v1-core).

##### Deploying with a Google Cloud integration
Container Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    version:
      envFrom: <array>
      imagePullPolicy: <string>
      lifecycle:
        <object>
      livenessProbe:
        <object>
      readinessProbe:
        <object>
      resources:
        <object>
      securityContext:
        <object>
      terminationMessagePath: <string>
      terminationMessagePolicy: <string>
```

`lifecycle`, `livenessProbe`, `readinessProbe`, `resources` and `securityContext` are passthrough objects. These
are defined in the Kubernetes Container v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#container-v1-core). Any other fields in prior or later versions of the Container spec can also be specified, since these are passthrough.

Pod Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    version:
      pod:
        terminationGracePeriodSeconds: <number>
        activeDeadlineSeconds: <number>
        restartPolicy: <string>
        dnsPolicy: <string>
        nodeSelector:
          <object>
        serviceAccountName: <string>
        serviceAccount: <string>
        nodeName: <string>
        hostNetwork: <boolean>
        hostPID: <boolean>
        imagePullSecrets:
          - <string>
```

`nodeSelector` is a  passthrough object which is defined in the Kubernetes Podspec v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#pod-v1-core). Any other fields in prior or later versions of the Podspec can also be specified, since these are passthrough.

Deployment Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    version:
      deployment:
        minReadySeconds: <number>
        paused: <boolean>
        progressDeadlineSeconds: <number>
        replicas: <number>
        revisionHistoryLimit: <number>
        labels:
          <key1>: <value1>
          <key2>: <value2>
        template:
          <object>
        selector:
          <object>
        strategy:
          <object>
```

`template`, `selector`,  and `strategy` are passthrough objects. These are defined in the Kubernetes DeploymentSpec v1beta2 apps API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#deployment-v1beta2-apps). Any other fields in prior or later versions of the DeploymentSpec can also be specified, since these are passthrough.

#### Docker Datacenter

Container level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    version:
      ExposedPorts: <object>
      StopSignal: <string>
      HostConfig:
        kernelMemory: <number>
        cpuShares: <number>
        cpuPeriod: <number>
        cpuPercent: <number>
        cpuQuota: <number>
        cpusetCpus: <string>
        cpusetMems: <string>
        IOMaximumBandwidth: <number>
        IOMaximumIOps: <number>
        BlkioWeightDevice:
          - Path: <string>
          - Weight: weight
        BlkioDeviceReadBps:
          - Path: <string>
          - Rate: <number>
        BlkioDeviceWriteBps:
          - Path: <string>
          - Rate: <number>
        BlkioDeviceReadIOps:
          - Path: <string>
          - Rate: <number>
        BlkioDeviceWriteIOps:
          - Path: <string>
          - Rate: <number>
        BlkioWeight: <number>
        MemorySwappiness: <number>
        OomKillDisable: <boolean>
        OomScoreAdj: <number>
        PidsLimit: <number>
        DnsOptions:
          - <string>
          - <string>
        GroupAdd:
          - <string>
          - <string>
        UsernsMode: <string>
        Sysctls:
          - <string>: <string>
        StorageOpt:
          - <string>: <string>
        VolumeDriver: <string>
        ShmSize: <number>
```

#### Docker Cloud

Container level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    version:
       autoredeploy: <boolean>
       autodestroy: <string>
       nickname: <string>
       tags:
         - <string>
       deployment_strategy: <string>
       roles:
         - <string>
       sequential_deployment: <boolean>
       target_num_containers: <number>
```

####Joyent Triton

None at this time

#### AZURE DC/OS
App level docker options:

Parameters accept all the arbitrary docker options according to the [mesosphere documentation](https://mesosphere.github.io/marathon/docs/native-docker.html#privileged-mode-and-arbitrary-docker-options)

```
resources:
  - name: <string>
    type: dockerOptions
    version:
      environment:
        - <string>: <string>
      acceptedResourceRoles:
        - <string>
      parameters:
        - <string>: <string>
```

#### Azure Container Service (AKS)
Container Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    version:
      envFrom: <array>
      imagePullPolicy: <string>
      lifecycle:
        <object>
      livenessProbe:
        <object>
      readinessProbe:
        <object>
      resources:
        <object>
      securityContext:
        <object>
      terminationMessagePath: <string>
      terminationMessagePolicy: <string>

```

`lifecycle`, `livenessProbe`, `readinessProbe`, `resources` and `securityContext` are passthrough objects. These
are defined in the Kubernetes Container v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#container-v1-core). Any other fields in prior or later versions of the Container spec can also be specified, since these are passthrough.

Pod Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    version:
      pod:
        terminationGracePeriodSeconds: <number>
        activeDeadlineSeconds: <number>
        restartPolicy: <string>
        dnsPolicy: <string>
        nodeSelector:
          <object>
        serviceAccountName: <string>
        serviceAccount: <string>
        nodeName: <string>
        hostNetwork: <boolean>
        hostPID: <boolean>
        imagePullSecrets:
          - <string>
```

`nodeSelector` is a  passthrough object which is defined in the Kubernetes Podspec v1 core API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#pod-v1-core). Any other fields in prior or later versions of the Podspec can also be specified, since these are passthrough.

Deployment Spec level docker options:
```
resources:
  - name: <string>
    type: dockerOptions
    version:
      deployment:
        minReadySeconds: <number>
        paused: <boolean>
        progressDeadlineSeconds: <number>
        replicas: <number>
        revisionHistoryLimit: <number>
        labels:
          <key1>: <value1>
          <key2>: <value2>
        template:
          <object>
        selector:
          <object>
        strategy:
          <object>
```

`template`, `selector`,  and `strategy` are passthrough objects. These are defined in the Kubernetes DeploymentSpec v1beta2 apps API reference [here](https://kubernetes.io/docs/api-reference/v1.9/#deployment-v1beta2-apps). Any other fields in prior or later versions of the DeploymentSpec can also be specified, since these are passthrough.

<a name="descriptions"></a>
## Common field descriptions

```
- name: <string>
```

`name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in jobs. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

```
  type: dockerOptions
```
`type` is always set to 'dockerOptions'.

```
  version:
```
`version` is where all options are configured. There must be at least one option under this section.

```
   memory: <number>
```
`memory` is the amount of memory in mebibytes allocated to the container. It is an integer and defaults to 400MiB if not specified.


```
    cpuShares: <number>
```
`cpuShares` are the number of CPU units reserved for the container. The significance of this number may depend on your provider.

```
    portMappings:
      - "80:80/tcp"
```
`portMappings` is an array of port mappings. The format is always `"host port : container port / protocol"`, e.g. "80:80/tcp". Port numbers are always integers. Protocols currently supported are `tcp` and `udp`.  The protocol defaults to `tcp` if none is specified.  Most providers will support an empty host port, like `:80`, to imply that the hostPort should be auto-assigned.  If not provided, no container port is exposed, even if your Dockerfile has an `EXPOSE` statement.

```
    links:
      - <container name>:<alias>
      - <container name>:<alias>
```
`links` allows containers to communicate with each other without the need for port mappings. The format for this is `"<container name>:<alias>"`, e.g. "shippabledb:db".

This setting maps to Links in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a>  of the Docker Remote API and the --link option to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>.

```
    volumes:
      - "<source>:<container path>:<options>"
      - "<source>:<container path>:<options>"
```
`volumes` configures mount points for data volumes in your container. This is a list of objects, format for each object being `"<source volume>:<container path>:<options>"`. The source volume is a string specifying the name of the volume to mount; the container path is a string specifying the path on the container where volume should be mounted. Options can be set to `rw` if you want the container to be able to write to the volume, and `ro` if you want the container to have read-only access. Default setting is `rw`.

This setting maps to Volumes in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a> of the Docker Remote API and the --volume option to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>.

```
    logConfig:
      type: <string>
      options:
        <key1>: <value1>
        <key2>: <value2>
```
`logConfig` specifies the log configuration of the container. By default, containers use the same logging driver that the Docker daemon uses. To override this and specify a different logging driver, include this setting in your dockerOptions. The available logging drivers depend on your Container Service. For example, `type` can be set to `"syslog"` and you can specify options using key value pairs.

This setting maps to LogConfig in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a> of the Docker Remote API and the --log-driver option to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>.

```
    entryPoint:
      - <string>
      - <string>
```
`entryPoint` specifies the entry point(s) passed to the container. It is an array of strings.

This setting maps to Entrypoint in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a> of the Docker Remote API and the --entrypoint option to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>. Read more information about the Docker ENTRYPOINT parameter at <a href="https://docs.docker.com/engine/reference/builder/#entrypoint" target="_blank">https://docs.docker.com/engine/reference/builder/#entrypoint</a>.

```
    cmd:
      - <string>
      - <string>
```
`cmd` specifies the command(s) is passed to the container.

This setting maps to Cmd in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a> of the Docker Remote API and the COMMAND parameter to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>. For more information about the Docker CMD parameter, go to <a href="https://docs.docker.com/engine/reference/builder/#cmd" target="_blank">https://docs.docker.com/engine/reference/builder/#cmd</a>.

NOTE: Multiple commands provided on a single line are not parsed successfully. Splitting each command on separate lines will correctly create and pass the CMD array.

For example, instead of using
```
    cmd:
      - /bin/sh -c while true; do echo hello world; sleep 1; done
```
split each command on a separate line as shown below:
```
   cmd:
     - /bin/sh
     - -c
     - while true; do echo hello world; sleep 1; done
```

```
    workingDir: <path to working dir>
```
`workingDir` specifies the working directory where commands are run inside the container.

This setting maps to WorkingDir in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a> of the Docker Remote API and the --workdir option to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>.

```
    privileged: <boolean>
```
`privileged` specifies the level of access the container has to the host container instance. When set to `true`, the container has elevated privileges on the host container instance, similar to the *root* user.

This setting maps to Privileged in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a> of the Docker Remote API and the --privileged option to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>.

```
    labels:
      <key1>: <value1>
      <key2>: <value2>
```
`labels` specifies a list of key/value pairs of labels to add to the container.

This setting maps to Labels in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a> of the Docker Remote API and the --label option to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>.

```
    volumesFrom:
      - "<container name>:<options>"
      - "<container name>:<options>"
      - "<container name>"
```
`volumesFrom` specifies the list of data volumes to mount from another container.

This setting maps to VolumesFrom in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a> of the Docker Remote API and the --volumes-from option to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>. `options` can be `rw` if you want the container to be able to write to the volume, and `ro` if you want the container to have read-only access. Default setting is `rw`.

```
    ulimits:
      - name: <name of limit>
        soft: <number>
        hard: <number>
      - name: <name of limit>
        soft: <number>
        hard: <number>
```
`ulimits` specifies a list of ulimits to be set in the container.

This setting maps to Ulimits in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a> of the Docker Remote API and the --ulimit option to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>.

```
    dnsServers:
      - "<ip address>"
      - "<ip address>"
```
`dnsServers` specifies a list of DNS servers that are presented to the container.

This setting maps to Dns in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a> of the Docker Remote API and the --dns option to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>.


```
    dnsSearch:
      - "<ip address>"
```
`dnsSearch` specifies a list of DNS search domains that are presented to the container.

This setting maps to DnsSearch in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a> of the Docker Remote API and the --dns-search option to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>.

```
    user: <string>
```
`user` specifies the user name to be uses inside the container.

This setting maps to User in the <a href="https://docs.docker.com/engine/api/v1.27/#operation/ContainerCreate" target="_blank">create a container section</a> of the Docker Remote API and the --user option to <a href="https://docs.docker.com/engine/reference/run/" target="_blank">docker run</a>.


<a name="mappingDockerOptions"></a>
##Mapping dockerOptions to your Container Service
Even though `dockerOptions` supports a wide variety of configurations, you can only use options that are relevant for your Container Service. The table below maps our tags to settings in Amazon EC2 Container Service (ECS), Kubernetes, Google Container Engine (GKE), Joyent Triton Public Cloud, Docker Cloud (DCL), Docker Datacenter (DDC), and Azure DC/OS.

There are two levels of mapping in dockerOptions.

- __Container Level__: The docker options that will be mapped to container level fields in the configuration of the container service. Example: Fields present inside [containerDefinitions](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions) of [taskDefinition](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html) in ECS.

- __Top Level__: The docker options that will be mapped to fields that are common to one or more containers in the configuration of the container service. Example: Fields present at root level of [taskDefinition](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html) will be top level options and are common to all containers in [containerDefinitions](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions).

The prefix `TOP LEVEL ->` denotes that the field will be mapped to one of the top level docker options mentioned in  [Provider specific options](/platform/workflow/resource/dockeroptions/#provider-specific-options).

| Shippable Tag                     | Amazon ECS                       | Kubernetes                 | GKE                        | TRITON [Remote API v1.21] | DCL             | DDC [ Remote API v1.24] | Azure DC/OS     | Azure Container Service (AKS) |
|-----------------------------------|----------------------------------|----------------------------|----------------------------|---------------------------|-----------------|-------------------------|-----------------|-------------------------------|
| **memory**                        | memory                           | memory                     | memory                     | Memory                    | mem_limit       | Memory                  | mem             | memory                        |
| **cpuShares**                     | cpu                              | cpu                        | cpu                        | CpuShares                 | cpu_shares      | CpuShares               | cpus            | cpu                           |
| **portMappings**                  | portMappings                     | port                       | port                       | None                      | container_ports | PortBindings            | portMappings    | port                          |
| **links**                         | links                            | None                       | None                       | Links                     | links           | Links                   | None            | None                          |
| **hostName**                      | hostname                         |  Coming soon...            | TOP LEVEL -> hostname      | Hostname                  | hostname        | Hostname                | None            | None                          |
| **domainName**                    | None                             |  Coming soon...            | TOP LEVEL -> subDomain     | Domainname                | domainname      | Domainname              | None            | None                          |
| **user**                          | user                             | runAsUser                  | runAsUser                  | User                      | user            | User                    | user            | runAsUser                     |
| **memorySwap**                    | None                             | None                       | None                       | None                      | memswap_limit   | MemorySwap              | None            | None                          |
| **attachStdin**                   | None                             | None                       | None                       | AttachStdin               | None            | AttachStdin             | None            | None                          |
| **attachStdout**                  | None                             | None                       | None                       | AttachStdOut              | None            | AttachStdOut            | None            | None                          |
| **attachStderr**                  | None                             | None                       | None                       | AttachStderr              | None            | AttachStderr            | None            | None                          |
| **tty**                           | None                             | tty                        | tty                        | Tty                       | tty             | Tty                     | None            | tty                           |
| **stdin**                         | None                             | stdin                      | stdin                      | OpenStdin                 | stdin_open      | OpenStdin               | None            | stdin                         |
| **stdinOnce**                     | None                             | stdinOnce                  | stdinOnce                  | StdinOnce                 | None            | StdinOnce               | None            | stdinOnce                     |
| **labels**                        | dockerLabels                     | labels                     | labels                     | Labels                    | labels          | labels                  | labels          | labels                        |
| **cmd**                           | command                          | args                       | args                       | cmd                       | command         | cmd                     | cmd             | args                          |
| **entryPoint**                    | entryPoint                       | command                    | command                    | EntryPoint                | entrypoint      | EntryPoint              | None            | command                       |
| **volumes**                       | TOP LEVEL -> volumes/mountPoints | volumes/volumeMounts       | volumes/volumeMounts       | Volume                    | volumes         | Volume/binds            | volumes         | volumes/volumeMounts          |
| **networkDisabled**               | disableNetworking                | None                       | None                       | None                      | None            | NetworkDisabled         | None            | None                          |
| **publishAllPorts**               | None                             | None                       | None                       | PublishAllPorts           | None            | PublishAllPorts         | None            | None                          |
| **privileged**                    | privileged                       | privileged                 | privileged                 | Privileged                | privileged      | Privileged              | privileged      | privileged                    |
| **readOnlyRootFilesystem**        | readonlyRootFilesystem           | readOnlyRootFilesystem     | readOnlyRootFilesystem     | ReadonlyRootfs            | read_only       | ReadonlyRootfs          | None            | readOnlyRootFilesystem        |
| **dnsServers**                    | dnsServers                       | None                       | None                       | Dns                       | dns             | Dns                     | None            | None                          |
| **dnsSearch**                     | dnsSearchDomains                 | None                       | None                       | DnsSearch                 | dns_search      | DnsSearch               | None            | None                          |
| **extraHosts**                    | extraHosts                       | None                       | None                       | None                      | extra_hosts     | ExtraHosts              | None            | None                          |
| **volumesFrom**                   | volumesFrom                      | None                       | None                       | VolumesFrom               | volumes_from    | VolumesFrom             | None            | None                          |
| **capAdd**                        | None                             | add                        | add                        | None                      | cap_add         | CapAdd                  | None            | add                           |
| **capDrop**                       | None                             | drop                       | drop                       | None                      | cap_drop        | resourceslimits         | None            | drop                          |
| **restartPolicy**                 | None                             | TOP LEVEL -> restartPolicy | TOP LEVEL -> restartPolicy | RestartPolicy             | restart         | RestartPolicy           | None            | TOP LEVEL -> restartPolicy    |
| **network**                       | TOP LEVEL -> networkMode         | None                       | None                       | None                      | net             | NetworkMode             | network         | None                          |
| **devices**                       | None                             | None                       | None                       | None                      | devices         | Devices                 | None            | None                          |
| **ulimits**                       | ulimits                          | None                       | None                       | Ulimits                   | None            | Ulimits                 | None            | None                          |
| **securityOptions**               | dockerSecurityOptions            | None                       | None                       | None                      | security_opt    | SecurityOpt             | None            | None                          |
| **logConfig**                     | logConfiguration                 | None                       | None                       | LogConfig                 | None            | LogConfig               | None            | None                          |
| **cGroupParent**                  | None                             | None                       | None                       | None                      | cgroup_parent   | CgroupParent            | None            | None                          |
| **memoryReservation**  [ in MB ]  | memoryReservation                | None                       | None                       | None                      | None            | MemoryReservation       | None            | None                          |
| **workingDir**                    | workingDirectory                 | workingDir                 | workingDir                 | None                      | working_dir     | working_dir             | None            | workingDir                    |
| **pid**                           | None                             | None                       | None                       | None                      | pid             | PidMode                 | None            | None                          |



<br>
Here are links to docs for each Container Service:

* [Amazon ECS](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html)
* [Kubernetes](https://kubernetes.io/docs/reference/)
* [Google Container Engine (GKE)](https://cloud.google.com/kubernetes-engine/docs/reference/)
* [Joyent Triton](https://docs.docker.com/engine/api/v1.27/)
* [Docker Cloud](https://docs.docker.com/apidocs/docker-cloud/#service)
* [Docker Datacenter](https://docs.docker.com/engine/api/v1.27/)
* [Azure DC/OS](https://mesosphere.github.io/marathon/docs/native-docker.html)
* [Azure Container Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/)


## Overriding dockerOptions
`dockerOptions` can also be used to override options that are already set in an upstream stage of the pipeline.

For example, if you want to use different settings for your service in Test and Production environments, you can do so by overriding one or more settings in the resource.

<img src="/images/platform/resources/overrideDockerOptions.png" alt="Docker Options">

In the picture above, `deploy-test` takes `dockerOptions-1` as an input. After testing, a release is created with the `release` job. This triggers production deployment with the `deploy-prod` job, which takes `dockerOptions-2` as an input. For this production deployment, we will use a superset of settings from `dockerOptions-1` and `dockerOptions-2`, with values for any common settings being chosen from `dockerOptions-2`.

## Triggering dependent jobs

When anything in `dockerOptions` changes, a new version of the resource is created. However, this does not automatically trigger subsequent portions of the pipeline since we have no way of knowing if your code commit changing dockerOptions also changed something else in the pipeline. Triggering dependent jobs automatically might lead to unexpected behavior in this case.

To trigger the rest of the workflow, you will need to manually trigger any jobs that have this resource as an input. You can do this through the UI by right clicking on the dependent job and clicking on `Run`, or by updating an input [trigger resource](/platform/workflow/resource/trigger) .
