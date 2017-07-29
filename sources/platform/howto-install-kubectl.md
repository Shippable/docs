page_main_title: Share data between Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Jobs
page_title: Share data between Jobs

If your Kubernetes master node is not publicly accessible from the internet, Shippable's hosted service cannot communicate with it. To get around this problem, we need you to configure a Bastion host which is publicly accessible and can also communicate with the Kubernetes master node.

The requirement for Bastion host are:
* Bastion host should have an IP address and port 22 open for SSH access
* You can SSH into the Bastion host
* Bastion host can access the Kubernetes master node, i.e. it contains the private SSH key
* Bastion host has kubectl installed. Install it with the following script:

```
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

```