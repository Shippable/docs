page_main_title: Kubernetes
main_section: Platform
sub_section: Integrations
sub_sub_section: Deprecated
page_title: Kubernetes integration
page_description: How to create and use a Kubernetes Integration in Shippable

# Kubernetes Integration

The [Kubernetes](https://kubernetes.io) Integration is used to connect Shippable DevOps Assembly Lines platform to self-hosted Kubernetes so that you can deploy Docker based applications.

## Creating an Account Integration

Since this integration has been deprecated, you cannot create new account integrations for this, you can only edit/delete the exisiting Kubernetes integrations. You can use the new [Kubernetes](/platform/integration/kubernetes) instead.  

## Creating a kubeconfig file

The best way to create an isolated set of credentials for use with Shippable Assembly Lines is to create a Kubernetes Service Account, and set up a custom kubeconfig file that utilizes it.

### Create the Service Account

- Make sure you're on a machine that has a configured kubectl that can interact with your cluster
- Create a `shippable-service-account.yaml` file to represent the service account

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: shippable-deploy #any name you'd like
```
- Use kubectl to create the service account on the master
```
$ kubectl create -f shippable-service-account.yaml
serviceaccount "shippable-deploy" created
```

### Create the kubeconfig file

First, we'll get the credentials for the service account that we created, then we'll add those credentials to a "context" within our kubeconfig file.

- Use kubectl to describe the service account so you can see its details
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
- Now describe the secret token associated with the account
```
$ kubectl describe secrets shippable-deploy-token-h6pdj
Name:		shippable-deploy-token-h6pdj
Namespace:	default
Labels:		<none>
Annotations:	kubernetes.io/service-account.name=shippable-deploy
		kubernetes.io/service-account.uid=da401cc4-3430-11e7-8529-42010a800fc8

Type:	kubernetes.io/service-account-token

Data
====
ca.crt:		1119 bytes
namespace:	7 bytes
token:		eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3Nlcn...
```
- Next, copy the existing kubeconfig from kubectl to a file so that it can be modified
```
$ kubectl config view --flatten --minify > myConfig.config
```
- Update the kubeconfig file to utilize the serviceAccount token. It should look similar to this:
```
apiVersion: v1
kind: Config
users:
- name: shippable-deploy
  user:
    token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3Nlcn...
clusters:
- name: my-kube-cluster
  cluster:
     server: https://us-central1.sample.com
     certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUREREND...
contexts:
- context:
    cluster: my-kube-cluster
    user: shippable-deploy
  name: shippable-context
current-context: shippable-context
```
- Make sure the `user` is the name of the serviceAccount, and check that it is updated in the `users` section as well as the `context` section.
- Check that the `current-context` states the name of the context that references the correct cluster and the correct serviceAccount user.
- This assumes that the kubeconfig you started with already had the server and certificate authority information in the cluster section.
- Finally, take this kubeconfig file that you created, and use it to create your Shippable Kubernetes Integration.

## Usage in Assembly Lines

The Kubernetes integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						            | Description      |
| ------			 							            |----------------- |
| `<NAME>`\_INTEGRATION\_NAME          	            | Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_CLUSTERACCESSTYPE          | Access Type supplied in the integration |
| `<NAME>`\_INTEGRATION\_MASTERKUBECONFIGCONTENT    | Kube config when kube master was chosen as access type |
| `<NAME>`\_INTEGRATION\_BASTIONKUBECONFIGCONTENT   | Kube config when bastion was chosen as access type |
| `<NAME>`\_INTEGRATION\_BASTIONHOSTIP              | Bastion Host IP when bastion was chosen as access type |
| `<NAME>`\_INTEGRATION\_BASTIONPRIVATEKEY          | Private Key to access the bastion host |
| `<NAME>`\_INTEGRATION\_BASTIONPUBLICKEY           | Public Key to access the bastion host |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
