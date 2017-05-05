page_main_title: loadBalancer
main_section: Reference
sub_section: Resources

# loadbalancer
There are two ways that a `loadBalancer` resource can be used.  It may be used as an input to a [deploy job](job-deploy/) to deploy a service manifest with a load balancer; this is only supported for Amazon's EC2 Container Service (ECS) at this time. Or, it can be used as an input to a [provision job](job-provision/) to create a new load balancer in a Google Container Engine (GKE) cluster.

## Configuration reference
You can create a `loadBalancer` resource by adding it to `shippable.resources.yml`:

```
resources:
  - name: <string>                              #required
    type: loadBalancer                          #required
    integration: <string>
    pointer:
      sourceName: "<string>"                    #required
      method: application | classic | ClusterIP | ExternalName | LoadBalancer | NodePort
      role: <string>                            #optional
      clusterName: <string>
      region: <string>
      namespace: <string>
    version:
      ports:
        - name: <string>
          protocol: TCP | UDP
          port: <integer>
          targetPort: <string>
          nodePort: <integer>
      selector:
        <string>: <string>
      clusterIP: None | "" | <string>
      externalIPs:
        - <string>
      sessionAffinity: ClientIP | None
      loadBalancerIP: <string>
      loadBalancerSourceRanges:
        - <string>
      externalName: <string>

```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes. However, as a best practice, we recommend not including spaces in your names.

* `type` is always set to 'loadBalancer'.

* `integration` is required to use the `loadBalancer` as an input to a [provision job](job-provision/).  It should be the name of a [Google Container Engine (GKE)](int-gke/) subscription integration. This is not needed for Amazon EC2 Container Service (ECS) load balancers.

* `pointer` section provides information about the location and type of the load balancer:
    * `sourceName` should be set depending on the type of load balancer. It is good practice to surround this field with quotes to avoid any parsing issues due to special characters.
        * For <a href="https://aws.amazon.com/elasticloadbalancing/classicloadbalancer/" target="_blank">Classic Load Balancers</a>, set this to the load balancer name
        * For <a href="https://aws.amazon.com/elasticloadbalancing/applicationloadbalancer/" target="_blank">Application Load Balancers</a>, set it to the target group arn
        * For [Google Container Engine (GKE) services](https://kubernetes.io/docs/user-guide/services/) (load balancers), this will be used as the service name and may only contain lowercase letters, numbers, `-`, and `.`.
    * `method` corresponds to the type of load balancer:
        * For Amazon's EC2 Container Service (ECS), the choices are `application` for Application Load Balancers and `classic` for Classic Load Balancers,
        * For Google Container Engine (GKE), the choices are `ClusterIP`, `ExternalName`, `LoadBalancer`, and `NodePort`.  If no `method` is specified, the default is `ClusterIP`.
    * `role` is optional for Amazon's EC2 Container Service (ECS) and not used for other providers.  Set `role` to the name of the AWS IAM role used to update the load balancer. This role should have a trust relationship allowing "ecs.amazonaws.com". If no role is specified, a role with the correct trust relationship will be used if one exists.
    * `clusterName` is required for `loadBalancer` resources used as input to a [provision job](job-provision/).  Set `clusterName` to the name of the cluster to which the load balancer will belong.
    * `region` is required for `loadBalancer` resources used as input to a [provision job](job-provision/).  Set `region` to the name of region containing the cluster.
    * `namespace` is optional for Google Container Engine (GKE).  If a `namespace` is specified the load balancer will be created in that namespace.  Otherwise the `default` namespace will be used.

* `version` section is required for `loadBalancer` resources used as an input to [provision job](job-provision/). It is not used for `loadBalancer` resources that are inputs to [deploy jobs](job-deploy/).
    * `ports` is an list of ports to be managed by the load balancer, each with the following fields:
        * `name` is required for Google Container Engine (GKE) when there is more than one port.  It may only contain lowercase letters, numbers, `-`, and `.`.
        * `protocol` may be TCP or UDP.  The default is TCP.
        * `port` is the service port exposed on the cluster IP.  This is required when `ports` is specified.
        * `targetPort` is an optional port to access the pod.
        * `nodePort` is the port exposed on the node.  A port will be assigned if not specified.
    * `selector` consists of key-value pairs matching the labels of the targeted pods.
    * `clusterIP` is the optional IP address of the service to be created.  Valid values are: None, "", and valid IP addresses.  By default, an address will be assigned.  This is not used when `method` is ExternalName.
    * `externalIPs` is an optional list of IP addresses for which nodes will accept traffic.  This is mapped to the `externalIPs` field in the Kubernetes service.
    * `sessionAffinity` is optional and may be either None or ClientIP.  The default is None.
    * `loadBalancerIP` is optional and only used when the method is LoadBalancer.  It is mapped to the loadBalancerIP field in the Kubernetes service.
    * `loadBalancerSourceRanges` is optional and
    * `externalName` is required when the method is ExternalName and is the valid DNS name to be returned as CNAME for the service.
