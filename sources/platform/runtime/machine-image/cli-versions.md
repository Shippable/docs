page_main_title: CLI versions on each image
main_section: Platform
sub_section: Runtime
sub_sub_section: Machine image
page_title: Popular CLIs and the machine images where they are installed
page_description: Popular CLIs and the machine images where they are installed in Shippable

# CLIs

When you run a `runSh` or `runCI` job on Shippable, the following popular CLIs are already pre-installed for your convenience:

* Ansible
* AWS
* AWS Elastic Beanstalk
* Azure
* Docker
* Google Cloud Platform (gcloud)
* JFrog
* Kubernetes (kubectl)
* Packer
* Terraform

This page lists the versions of CLI's available for each supported [OS](/platform/runtime/machine-image/os-versions) and the Machine Image(s) where you can find them.

## Ansible

| Version  |  OS  | Machine Images |
|----------|--------|--------|
| 2.6.5 | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)  | [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 2.6.4 | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)  | [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 2.6.2 | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)  | [v6.8.4](/platform/runtime/machine-image/ami-v684/)
| 2.6.1 | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)  | [v6.7.4](/platform/runtime/machine-image/ami-v674/)
| 2.5.2 | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br>- Ubuntu 16.04 (aarch64)  | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 2.4.4.0 | - CentOS 7 <br> | [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 2.4.3.0 | - Ubuntu 14.04 <br>- Ubuntu 16.04 <br> - Ubuntu 16.04 (aarch64) | [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>[v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>[v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/) |
| 2.3.0.0 | - Ubuntu 14.04 <br> - Ubuntu 16.04 <br> - CentOS 7 <br> - Ubuntu 16.04(aarch32)  | [v5.6.1](/platform/runtime/machine-image/ami-v561/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)  <br>  [v5.10.4](/platform/runtime/machine-image/ami-v561/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/) <br>  [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/) <br> [v6.3.4](/platform/runtime/machine-image/ami-v634/) and [v6.4.4](/platform/runtime/machine-image/ami-v644/)|

Please refer to the [Ansible CLI page](http://docs.ansible.com/ansible/latest/command_line_tools.html) for help with CLI commands.

## AWS

| Version  |  OS | Machine Images
|----------|---------|-------|
| 1.16.39   | - Windows 16 | [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 1.16.24 | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)  | [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 1.16.20   | - Windows 16 | [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 1.16.14 | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)  | [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 1.15.82   | - Windows 16 | [v6.8.4](/platform/runtime/machine-image/ami-v684/)
| 1.15.73 | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)  | [v6.8.4](/platform/runtime/machine-image/ami-v684/)
| 1.15.59   | - Windows 16 | [v6.7.4](/platform/runtime/machine-image/ami-v674/)
| 1.15.55   | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)| [v6.7.4](/platform/runtime/machine-image/ami-v674/)
| 1.15.41   | - Windows 16 | [v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 1.15.20   | - Windows 16 | [v6.5.4](/platform/runtime/machine-image/ami-v654/)
| 1.15.14   | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch64)| [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 1.15.3    | - Ubuntu 16.04 (aarch64) <br>- Ubuntu 16.04 (aarch32) <br>- CentOS 7 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) <br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/) <br> [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 1.15.2    | - Windows 16 | [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 1.14.91   | - Ubuntu 16.04 (aarch32) <br> | [v6.3.4](/platform/runtime/machine-image/ami-v644/) to  [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 1.14.64   | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v5104/)
| 1.14.41   | - CentOS 7 <br> | [v6.2.4](/platform/runtime/machine-image/ami-v644/) to  [v6.3.4](/platform/runtime/machine-image/ami-v634/)
| 1.11.164  | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)
| 1.11.91   | - Ubuntu 14.04 <br>- Ubuntu 16.04 <br> - Ubuntu 16.04 (aarch64)  | [v5.8.2](/platform/runtime/machine-image/ami-v582/) <br> [v5.8.2](/platform/runtime/machine-image/ami-v582/) <br> [v6.2.4](/platform/runtime/machine-image/ami-v644/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/) <br />  
| 1.11.44   | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and earlier

Please refer to the [AWS CLI page](https://aws.amazon.com/cli/) for help with CLI commands.

## AWS Elastic Beanstalk

| Version  |  OS |  Machine Images
|----------|-----------|-----|
| 3.14.6 | - Ubuntu 14.04  <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)   | [v6.9.4](/platform/runtime/machine-image/ami-v694/) and  [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 3.14.3 | - Ubuntu 14.04  <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)   | [v6.8.4](/platform/runtime/machine-image/ami-v684/)
| 3.14.2 | - Ubuntu 14.04  <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)   | [v6.7.4](/platform/runtime/machine-image/ami-v674/)
| 3.12.4 | - Ubuntu 14.04  <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch64) <br>- Ubuntu 16.04 (aarch32)  | [v6.4.4](/platform/runtime/machine-image/ami-v644/) to  [v6.6.4](/platform/runtime/machine-image/ami-v664/) <br> [v6.4.4](/platform/runtime/machine-image/ami-v644/) to  [v6.6.4](/platform/runtime/machine-image/ami-v664/) <br> [v6.4.4](/platform/runtime/machine-image/ami-v644/) to  [v6.6.4](/platform/runtime/machine-image/ami-v664/) <br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 3.11.0 | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 3.10.3 | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 3.9.0  | - Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch64) <br>- Ubuntu 16.04 (aarch32) <br> | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and earlier <br> [v5.7.3](/platform/runtime/machine-image/ami-v573/) and earlier <br /> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/) <br>  [v6.3.4](/platform/runtime/machine-image/ami-v634/) to  [v6.4.4](/platform/runtime/machine-image/ami-v644/)


Please refer to the [AWS Elastic Beanstalk page](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) for help with CLI commands.

## Azure

| Version  | OS   | Machine Images
|----------|---------|---------|
| 2.0.49    | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 2.0.47    | - windows 16  | [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 2.0.46    | - windows 16  | [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 2.0.45    | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br> | [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 2.0.44    | - windows 16  | [v6.8.4](/platform/runtime/machine-image/ami-v684/)
| 2.0.43    | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br> | [v6.8.4](/platform/runtime/machine-image/ami-v684/)
| 2.0.41    | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04<br>- Windows 16 |[v6.7.4](/platform/runtime/machine-image/ami-v674/)
| 2.0.38    | - windows 16  | [v6.7.4](/platform/runtime/machine-image/ami-v674/)
| 2.0.37    | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04<br>- Windows 16 |[v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 2.0.32    | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04<br>- Windows 16 |[v6.5.4](/platform/runtime/machine-image/ami-v654/)
| 2.0.30    | - windows 16  | [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 2.0.27    | - CentOS 7 |  [v6.2.4](/platform/runtime/machine-image/ami-v624/)  to  [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 2.0.25    | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 2.10.19   | - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
| 2.0.12    | - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 2.0.6     | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) to [v5.7.3](/platform/runtime/machine-image/ami-v573/)

Please refer to the [Azure CLI Reference page](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest) for help with CLI commands.

## Docker

| Version  | OS |  Machine Images
|----------|---------|-------------|
| 18.06.1-ce |- windows 16 | [v6.10.4](/platform/runtime/machine-image/ami-v6104/) |
|18.03.1-ce  | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)   | [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 17.10.0-ce | - Windows 16 | [v6.5.4](/platform/runtime/machine-image/ami-v654/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 17.06.0-ce | -  CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br>- Ubuntu 16.04 (aarch64) <br>- Ubuntu 16.04 (aarch32) <br>- Windows 16 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) and later<br>[v5.8.2](/platform/runtime/machine-image/ami-v582/) and later <br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later <br> [v6.3.4](/platform/runtime/machine-image/ami-v634/) and later <br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later <br> [v6.4.4](/platform/runtime/machine-image/ami-v644/)


Please refer to the [Docker CLI Reference page](https://docs.docker.com/engine/reference/commandline/docker/) for help with CLI commands.

## Google Cloud Platform

| Version  | OS | Machine Images
|----------|---------|------|
| 221.0.0  |  - Windows 16 |[v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 218.0.0  |  - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04<br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)  | [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 217.0.0  |  - Windows 16 |[v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 216.0.0  |  - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04<br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)  | [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 213.0.0  |  - Windows 16 |[v6.8.4](/platform/runtime/machine-image/ami-v684/)
| 211.0.0  |  - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04<br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)  | [v6.8.4](/platform/runtime/machine-image/ami-v684/)
| 208.0.2  |  - Windows 16 |[v6.7.4](/platform/runtime/machine-image/ami-v674/)
| 207.0.0  |  - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04<br>- Ubuntu 16.04 (aarch32) <br>- Ubuntu 16.04 (aarch64)  | [v6.7.4](/platform/runtime/machine-image/ami-v674/)
| 206.0.0  |  - Windows 16 |[v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 202.0.0  |  - Windows 16 | [v6.5.4](/platform/runtime/machine-image/ami-v654/)
| 200.0.0  |  - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04<br>-  Ubuntu 16.04 (aarch64)  | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 196.0.0  |  - Ubuntu 16.04 (aarch64) <br>-  Ubuntu 16.04 (aarch32) <br>- CentOS 7 <br>- Windows 16  | [v6.4.4](/platform/runtime/machine-image/ami-v644/) <br>  [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/) <br>  [v6.4.4](/platform/runtime/machine-image/ami-v644/) <br>  [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 194.0.0  |  - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 189.0.0  |  - CentOS 7 <br>| [v6.2.4](/platform/runtime/machine-image/ami-v644/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)
| 173.0.0  |  - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)
| 160.0.0  |  - Ubuntu 16.04 (aarch64) <br>- Ubuntu 16.04 (aarch32) | [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/) <br> [v6.3.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 165.0.0  |  - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 160.0.0  |  - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/)
| 157.0.0  |  - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/)
| 151.0.0  |  - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v5.5.1](/platform/runtime/machine-image/ami-v551/)
| 148.0.0  |  - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.5.1](/platform/runtime/machine-image/ami-v551/) to [v5.4.1](/platform/runtime/machine-image/ami-v541/)
| 145.0.0  |  - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.3.2](/platform/runtime/machine-image/ami-v532/)
| 144.0.0  |  - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.3.2](/platform/runtime/machine-image/ami-v532/)

## JFrog

| Version  | OS |  Machine Images
|----------|---------|---|
| 1.20.1  | - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 1.19.1  | - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 1.18.0  | - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04| [v6.8.4](/platform/runtime/machine-image/ami-v684/)
| 1.17.0  | - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br> -Windows 16 | [v6.7.4](/platform/runtime/machine-image/ami-v674/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 1.15.1  | - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 1.11.2  | - Windows 16 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) and later
| 1.10.1  | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 1.7.0   | - Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- CentOS 7 |[v5.7.3](/platform/runtime/machine-image/ami-v573/) and earlier  <br> [v5.7.3](/platform/runtime/machine-image/ami-v573/) and earlier  <br> [v6.2.4](/platform/runtime/machine-image/ami-v573/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)



Please refer to the [JFrog CLI User Guide](https://www.jfrog.com/confluence/display/CLI/JFrog+CLI) for help with CLI commands.

## Kubernetes

| Version  | OS |  Machine Images
|----------|---------|----|
| 1.12.1   | -  Windows 16  |[v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 1.12.0  | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch64) <br>- Windows 16  |[v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 1.11.0  | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch64) <br>- Windows 16  |[v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/)
| 1.11.3   | - Windows 16 | [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 1.11.2   | - Windows 16 | [v6.8.4](/platform/runtime/machine-image/ami-v684/)
| 1.11.0  | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch64) <br>- Windows 16  | [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/)
| 1.10.4  | - Windows 16 | [v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 1.10.2  | - Windows 16 | [v6.5.4](/platform/runtime/machine-image/ami-v654/)
| 1.10.0  | - Windows 16 <br>- CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch64) | [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>[v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/) <br>  [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)<br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)<br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 1.9.0   | - Ubuntu 16.04 (aarch64) <br>- Ubuntu 16.04 (aarch32) | [v6.4.4](/platform/runtime/machine-image/ami-v644/) <br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 1.8.8   | - CentOS 7 | [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 1.8.0   | - Ubuntu 14.04 <br>- Ubuntu 16.04 <br>-  Ubuntu 16.04 (aarch64)  | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/) <br> [v5.10.4](/platform/runtime/machine-image/ami-v5104/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/) <br>  [v6.2.4](/platform/runtime/machine-image/ami-v624/) to  [v6.3.4](/platform/runtime/machine-image/ami-v634/)
| 1.7.2  | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 1.5.1  | - Ubuntu 14.04 <br>- Ubuntu 16.04 <br> - Ubuntu 16.04 (aarch32) |[v5.7.3](/platform/runtime/machine-image/ami-v573/) and earlier <br> [v5.7.3](/platform/runtime/machine-image/ami-v573/) and earlier <br>  [v6.3.4](/platform/runtime/machine-image/ami-v634/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)

Please refer to the [kubectl CLI user guide](https://kubernetes.io/docs/user-guide/kubectl-overview/) for help with CLI commands.

## Packer

| Version  | OS | Machine Images
|----------|---------|-------|
| 1.3.1 |  - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch64) <br>- Ubuntu 16.04 (aarch32) <br>- Windows 16 | [v6.10.4](/platform/runtime/machine-image/ami-v6104/) <br> [v6.10.4](/platform/runtime/machine-image/ami-v6104/) <br> [v6.10.4](/platform/runtime/machine-image/ami-v6104/) <br> [v6.10.4](/platform/runtime/machine-image/ami-v6104/) <br> [v6.9.4](/platform/runtime/machine-image/ami-v694/) and  [v6.10.4](/platform/runtime/machine-image/ami-v6104/) <br> [v6.9.4](/platform/runtime/machine-image/ami-v694/) and  [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 1.3.0 | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 1.2.5 | - CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  <br>- Ubuntu 16.04 (aarch32) <br>- Windows 16   | [v6.8.4](/platform/runtime/machine-image/ami-v684/)
| 1.2.4  |- CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Windows 16 | [v6.7.4](/platform/runtime/machine-image/ami-v674/)<br> [v6.7.4](/platform/runtime/machine-image/ami-v674/)<br> [v6.7.4](/platform/runtime/machine-image/ami-v674/)<br> [v6.6.4](/platform/runtime/machine-image/ami-v664/) and [v6.7.4](/platform/runtime/machine-image/ami-v674/)
| 1.2.3    | - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch32) <br>- Windows 16 | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)<br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/) <br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)<br> [v6.7.4](/platform/runtime/machine-image/ami-v674/)<br> [v6.5.4](/platform/runtime/machine-image/ami-v654/)
| 1.2.2    | - Ubuntu 16.04 (aarch64) <br>- CentOS 7 <br>- Windows 16  <br>- Ubuntu 16.04 (aarch32) | [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.8.4](/platform/runtime/machine-image/ami-v684/) <br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/) <br> [v6.4.4](/platform/runtime/machine-image/ami-v644/) <br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 1.1.0   | - Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04 (aarch32) | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/) <br>   [v5.10.4](/platform/runtime/machine-image/ami-v5104/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v6.3.4](/platform/runtime/machine-image/ami-v634/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 0.12.2 | - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v5.8.2](/platform/runtime/machine-image/ami-v582/) and earlier

Please refer to the [Packer CLI page](https://www.packer.io/docs/commands/index.html) for help with CLI commands.

## Terraform

| Version  | OS | Machine Images
|----------|---------|-------------|
| 0.11.8 | - CentOS 7<br>- Ubuntu 14.04  <br>- Ubuntu 16.04 <br>- Windows 16  | [v6.9.4](/platform/runtime/machine-image/ami-v694/) and [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
| 0.11.7 | - CentOS 7<br>- Ubuntu 14.04  <br>- Ubuntu 16.04 <br>- Windows 16  |  [v6.5.4](/platform/runtime/machine-image/ami-v654/) to [v6.8.4](/platform/runtime/machine-image/ami-v684/)
| 0.11.5 | - Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- CentOS 7 |  [v6.4.4](/platform/runtime/machine-image/ami-v644/)  
| 0.11.3 | - CentOS 7 |[v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)
| 0.8.7  | - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v5.10.4](/platform/runtime/machine-image/ami-v582/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)
| 0.10.0 | - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 0.8.7  | - Ubuntu 14.04 <br>- Ubuntu 16.04  |  [v5.7.3](/platform/runtime/machine-image/ami-v573/) and earlier

Please refer to the [Terraform CLI page](https://www.terraform.io/docs/commands/index.html) for help with CLI commands.
