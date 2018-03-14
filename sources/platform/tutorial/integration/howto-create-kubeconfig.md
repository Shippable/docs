page_main_title: Creating a kubeconfig file
main_section: Platform
sub_section: Tutorials
sub_sub_section: Integrations
page_title: Creating a kubeconfig file
page_description: How to create a kubeconfig file and use it in the Kubernetes integration in Shippable

The best way to create an isolated set of credentials for use with Shippable Pipelines is to create a Kubernetes Service Account, and set up a kubeconfig file that utilizes it.

#### Create the Service Account

- Make sure you're on a machine that has a kubectl that can interact with your cluster
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

#### Create the kubeconfig file
* SSH into the Bastion host and from there, SSH into your Kubernetes master node and run the following commands. Copy the output of this file which gives you the [kubeconfig](https://kubernetes.io/docs/user-guide/kubeconfig-file/).
```
$ sudo su -
$ cat /etc/kubernetes/admin.conf
```
* Paste the contents into the **KubeConfig File** textbox. *NOTE: if you don't want to use your admin.conf, you can set up a serviceAccount as described [here](#creating-a-kubeconfig-file-for-a-service-account)*.



Copy the contents of your [kubeconfig](https://kubernetes.io/docs/user-guide/kubeconfig-file/) file, usually found at ~/.kube/config, that contains credentials for accessing your Kubernetes cluster. You may copy the entire kubeconfig file or only the details related to a particular cluster






- Start by copying the existing kubeconfig from kubectl to a file, and get ready to modify it
```
$ kubectl config view --flatten --minify > myConfig.config
```

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
- Modify the kubeconfig file to utilize the serviceAccount token.
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
- This assumes that the kubeconfig you started with already had the server and certificate authority information.
- Finally, take this kubeconfig file that you created, and use it for your Shippable Kubernetes Integration.
