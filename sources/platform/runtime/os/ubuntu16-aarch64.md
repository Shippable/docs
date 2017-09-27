page_main_title: Ubuntu 16.04 aarch64 Image for CI
main_section: Platform
sub_section: Runtime
sub_sub_section: Operating System
page_title: Ubuntu 16.04 aarch64 Image for CI

# Ubuntu 16.04 - aarch64 (for ARM server)

Ubuntu 16.04 - aarch64 based images for Shippable Continuous Integration are available as part of the platform. All our Ubuntu 16.04 - aarch64 [language images](/platform/runtime/language/overview) are derived from this base image. This image comes pre-installed with the latest versions of Java, Ruby, and Node along with the OS default version of Python.

We update this image, `drydockaarch64/u16`, monthly and push a unique tag to our [drydockaarch64 repository](https://hub.docker.com/r/drydockaarch64/u16/) on Docker Hub. The tag is of the format `<Version>.<Month>.<Release Number>`.

## Currently Supported Images

|Image| Release Date |Available in SMI |
|----------|------------|-----|
[drydockaarch64/u16:v5.9.4](/platform/runtime/os/ubuntu16-aarch64#v594)  | Sept 2017 - Latest Version | [v5.9.4](/platform/tutorial/runtime/aarch64-v594)

We support a minimum of 12 tags, i.e. 12 months, for backward compatibility.

You can set which SMI to use for your organization following these [instructions](/ci/build-image).

You can configure different images or even [build](/ci/custom-docker-image) your own from scratch for your [runCI](/platform/workflow/job/runci) jobs.

<a name="v594"></a>
## Image `drydockaarch64/u16:v5.9.4`

These are the **Languages** installed:

* Java - openjdk-8-jdk (8u131-b11-2ubuntu1.16.04.3)
* NodeJS - 7.10.1
* Ruby - 2.3.3
* Python - 2.7.12

These are the **Packages** installed:

*  build-essential - 12.1ubuntu2
*  dopy - 0.3.7a
*  curl - 7.47.0-1ubuntu2.2
*  gcc - 4:5.3.1-1ubuntu1
*  gettext - 0.19.7-2ubuntu3
*  git - 1:2.14.1-1.1~ppa0~ubuntu16.04.1
*  htop - 2.0.1-1ubuntu1
*  jq - 1.5+dfsg-1
*  libxml2-dev - 2.9.3+dfsg1-1ubuntu0.3
*  libxslt1-dev - 1.1.28-2.1ubuntu0.1
*  make - 4.1-6
*  nano - 2.5.3-2ubuntu2
*  openssh-client - 1:7.2p2-4ubuntu2.1
*  openssl - 1.0.2g-1ubuntu4.6
*  python-dev - 2.7.11-1
*  python-software-properties - 0.96.20.7
*  software-properties-common - 0.96.20.7
*  sudo - 1.8.16-0ubuntu1.4
*  texinfo - 6.1.0.dfsg.1-5
*  unzip - 6.0-20ubuntu1
*  virtualenv - 15.1.0
*  wget - 1.17.1-1ubuntu1.1
*  rsync - 3.1.1-3ubuntu1
*  psmisc - 22.21-2.1build1
*  vim - 2:7.4.1689-3ubuntu1.2
*  boto - pip version 2.46.1
*  azure - 2.0.0rc5

These are the **CLIs** installed:

* ansible - 2.3.0.0
* awscli - 1.11.91
* awsebcli - 3.9.0
* gcloud - 160.0.0
* kubectl - 1.5.1
* yarn - 0.24.5-1

