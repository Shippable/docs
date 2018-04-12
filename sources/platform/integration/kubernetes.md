page_main_title: Kubernetes
main_section: Platform
sub_section: Integrations
page_title: Kubernetes integration

# Kubernetes Integration

The [Kubernetes](https://kubernetes.io) Integration is used to connect Shippable DevOps Assembly Lines platform to self-hosted Kubernetes so that you can deploy Docker based applications.

## Adding account integration

You can add this account integration by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Integration type** -- **Kubernetes**
* **Name** -- choose a friendly name for the integration
* **KubeConfig File** -- Configuration file to access Kubernetes cluster  

## Creating a kubeconfig file

The best way to create an isolated set of credentials for use with Shippable Assembly Lines is to create a Kubernetes Service Account, and set up a custom kubeconfig file that utilizes it.

### Authenticate to your kubernetes cluster

- Ensure you have a `kubeconfig` file that has credentials and the current context set for your kubernetes cluster.

### Create the Service Account

- Create a `shippable-service-account.yaml` file to represent the service account.

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: shippable-deploy #any name you'd like
```

- Use kubectl to create the service account on the master.

```
$ kubectl create -f shippable-service-account.yaml
serviceaccount "shippable-deploy" created
```

### Create the kubeconfig file

- Use kubectl to describe the service account so you can see its details.

```
$ kubectl describe serviceAccounts shippable-deploy
Name:		shippable-deploy
Namespace:	default
Labels:		<none>
Annotations:	<none>

Image pull secrets:	<none>

Mountable secrets: 	shippable-deploy-token-h6pdj

Tokens:            	shippable-deploy-token-h6pdj
```

- Next, run the following kubectl command to extract the secret associated with the service account. Note down the value of `token`.

```
ambarishs-MacBook-Pro:kubeconfig ambarish$ kubectl describe secrets shippable-deploy-token-7spsj
Name:		shippable-deploy-token-7spsj
Namespace:	default
Labels:		<none>
Annotations:	kubernetes.io/service-account.name=shippable-deploy
		kubernetes.io/service-account.uid=c2117d8e-3c2d-11e8-9ccd-42010a8a012f

Type:	kubernetes.io/service-account-token

Data
====
ca.crt:		1115 bytes
namespace:	7 bytes
token:		eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InNoaXBwYWJsZS1kZXBsb3ktdG9rZW4tN3Nwc2oiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoic2hpcHBhYmxlLWRlcGxveSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImMyMTE3ZDhlLTNjMmQtMTFlOC05Y2NkLTQyMDEwYThhMDEyZiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OnNoaXBwYWJsZS1kZXBsb3kifQ.ZWKrKdpK7aukTRKnB5SJwwov6PjaADT-FqSO9ZgJEg6uUVXuPa03jmqyRB20HmsTvuDabVoK7Ky7Uug7V8J9yK4oOOK5d0aRRdgHXzxZd2yO8C4ggqsr1KQsfdlU4xRWglaZGI4S31ohCApJ0MUHaVnP5WkbC4FiTZAQ5fO_LcCokapzCLQyIuD5Ksdnj5Ad2ymiLQQ71TUNccN7BMX5aM4RHmztpEHOVbElCWXwyhWr3NR1Z1ar9s5ec6iHBqfkp_s8TvxPBLyUdy9OjCWy3iLQ4Lt4qpxsjwE4NE7KioDPX2Snb6NWFK7lvldjYX4tdkpWdQHBNmqaD8CuVCRdEQ
```

- Next, run the following kubectl command to get the certificate authority data for the cluster. Note down the value for `certificate-authority-data`.

```
$ kubectl config view --flatten --minify > myConfig.config
$ cat myConfig.config

apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURDekNDQWZPZ0F3SUJBZ0lRZmo4VVMxNXpuaGRVbG15a3AvSVFqekFOQmdrcWhraUc5dzBCQVFzRkFEQXYKTVMwd0t3WURWUVFERXlSaVl6RTBOelV5WXkwMk9UTTFMVFExWldFdE9HTmlPUzFrWmpSak5tUXlZemd4TVRndwpIaGNOTVRnd05EQTVNVGd6TVRReVdoY05Nak13TkRBNE1Ua3pNVFF5V2pBdk1TMHdLd1lEVlFRREV5UmlZekUwCk56VXlZeTAyT1RNMUxUUTFaV0V0T0dOaU9TMWtaalJqTm1ReVl6Z3hNVGd3Z2dFaU1BMEdDU3FHU0liM0RRRUIKQVFVQUE0SUJEd0F3Z2dFS0FvSUJBUURIVHFPV0ZXL09odDFTbDBjeUZXOGl5WUZPZHFON1lrRVFHa3E3enkzMApPUEQydUZyNjRpRXRPOTdVR0Z0SVFyMkpxcGQ2UWdtQVNPMHlNUklkb3c4eUowTE5YcmljT2tvOUtMVy96UTdUClI0ZWp1VDl1cUNwUGR4b0Z1TnRtWGVuQ3g5dFdHNXdBV0JvU05reForTC9RN2ZpSUtWU01SSnhsQVJsWll4TFQKZ1hMamlHMnp3WGVFem5lL0tsdEl4NU5neGs3U1NUQkRvRzhYR1NVRzhpUWZDNGYzTk4zUEt3Wk92SEtRc0MyZAo0ajVyc3IwazNuT1lwWDFwWnBYUmp0cTBRZTF0RzNMVE9nVVlmZjJHQ1BNZ1htVndtejJzd2xPb24wcldlRERKCmpQNGVqdjNrbDRRMXA2WXJBYnQ1RXYzeFVMK1BTT2ROSlhadTFGWWREZHZyQWdNQkFBR2pJekFoTUE0R0ExVWQKRHdFQi93UUVBd0lDQkRBUEJnTlZIUk1CQWY4RUJUQURBUUgvTUEwR0NTcUdTSWIzRFFFQkN3VUFBNElCQVFCQwpHWWd0R043SHJpV2JLOUZtZFFGWFIxdjNLb0ZMd2o0NmxlTmtMVEphQ0ZUT3dzaVdJcXlIejUrZ2xIa0gwZ1B2ClBDMlF2RmtDMXhieThBUWtlQy9PM2xXOC9IRmpMQVZQS3BtNnFoQytwK0J5R0pFSlBVTzVPbDB0UkRDNjR2K0cKUXdMcTNNYnVPMDdmYVVLbzNMUWxFcXlWUFBiMWYzRUM3QytUamFlM0FZd2VDUDNOdHJMdVBZV2NtU2VSK3F4TQpoaVRTalNpVXdleEY4cVV2SmM3dS9UWTFVVDNUd0hRR1dIQ0J2YktDWHZvaU9VTjBKa0dHZXJ3VmJGd2tKOHdxCkdsZW40Q2RjOXJVU1J1dmlhVGVCaklIYUZZdmIxejMyVWJDVjRTWUowa3dpbHE5RGJxNmNDUEI3NjlwY0o1KzkKb2cxbHVYYXZzQnYySWdNa1EwL24KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
    server: https://35.203.181.169
  name: gke_jfrog-200320_us-west1-a_cluster
contexts:
- context:
    cluster: gke_jfrog-200320_us-west1-a_cluster
    user: gke_jfrog-200320_us-west1-a_cluster
  name: gke_jfrog-200320_us-west1-a_cluster
current-context: gke_jfrog-200320_us-west1-a_cluster
kind: Config
preferences: {}
users:
- name: gke_jfrog-200320_us-west1-a_cluster
  user:
    auth-provider:
      config:
        access-token: ya29.Gl2YBba5duRR8Zb6DekAdjPtPGepx9Em3gX1LAhJuYzq1G4XpYwXTS_wF4cieZ8qztMhB35lFJC-DJR6xcB02oXXkiZvWk5hH4YAw1FPrfsZWG57x43xCrl6cvHAp40
        cmd-args: config config-helper --format=json
        cmd-path: /Users/ambarish/google-cloud-sdk/bin/gcloud
        expiry: 2018-04-09T20:35:02Z
        expiry-key: '{.credential.token_expiry}'
        token-key: '{.credential.access_token}'
      name: gcp

```

- Create a kubeconfig file called `config` and paste the following contents in it.

```
apiVersion: v1
kind: Config
users:
- name: shippable-deploy
  user:
    token: <add service account secret token here>
clusters:
- cluster:
    certificate-authority-data: <add certificate data here>
    server: https://<add server public IP or DNS here>
  name: my-kubernetes-cluster
contexts:
- context:
    cluster: my-kubernetes-cluster
    user: shippable-deploy
  name: shippable-context
current-context: shippable-context
```

- Copy the value of `token` in the `token` field.
- Copy the value of `certificate-authority-data` in the `certificate-authority-data` field.
- Finally, take this `config` file that you created and copy it to `$HOME/.kube directory`.
- For a Kubernetes cluser on Google Kubernetes Engine only, follow these additional steps:
    - Click on the cluster after logging into google cloud console.
    - Click on the pencil icon to edit the cluster settings.
    - Ensure `Legacy Authorization` is set to `Enabled`.

## Usage in Assembly Lines

The Kubernetes integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)
* [loadbalancer](/platform/workflow/resource/loadbalancer)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						            | Description      |
| ------			 							            |----------------- |
| `<NAME>`\_INTEGRATION\_NAME          	            | Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_KUBECONFIGCONTENT    | Kube config file content |

### Shippable Utility Functions
The platform also provides a command line utility called [`shipctl`](/platform/tutorial/workflow/using-shipctl/) that can be used to retrieve the values of these environment variables.

The specific function that can be used in the jobs yml is: `shipctl get_integration_resource_field <resource name> <field name>`.

Here is a table that provides the mapping from the environment variable to the field name.

| Environment variable						| Field Name        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_KUBECONFIGCONTENT    | key |

More information on other utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
