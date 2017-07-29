page_main_title: Operating system overview
main_section: Platform
sub_section: Job Runtime
sub_sub_section: Operating System
page_title: Operating system overview

# Ubuntu 14.04

Platform offers three operating system docker images for Ubuntu 14.04. These images are hosted on Docker hub in the `drydock` account.

## Base image
The base image consists of the core operating system, CLI's and three languages with their latest version preinstalled. This image is updated monthly with a specific tag.

The image name is `drydock/u14`.

### Tag v573
#### Languages installed
| Language | Version |
|---|---|
| Java | 1.8.0 |
| NodeJs | 4.8.3 |
| Ruby | 2.3.1|

#### CLIs installed
| CLI | Version |
|----------|---------|
| awscli | 1.11.44 |
| awsebcli | 3.9 |
| gcloud | 160.0.0 |
| jfrog-cli | 1.7.0 |
| kubectl | 1.5.1 |
| packer | 0.12.2 |
| terraform | 0.8.7 |

#### Packages installed
| Package | Version |
|----------|---------|
| build-essential | 11.6ubuntu6|
| curl| 7.35.0-1ubuntu2.10 |
| gcc|  4:4.8.2-1ubuntu6 |
| gettext| 0.18.3.1-1ubuntu3 |
| git| 1:2.13.0-0ppa1~ubuntu14.04.1 |
| htop| 1.0.2-3 |
| jq| 1.3-1.1ubuntu1|
| libxml2-dev| 2.9.1+dfsg1-3ubuntu4.9 |
| libxslt-dev| 1.1.28-2ubuntu0.1 |
| make| 3.81-8.2ubuntu3 |
| nano| 2.2.6-1ubuntu1 |
| openssh-client| 1:6.6p1-2ubuntu2.8 |
| openssl| 1.0.1f-1ubuntu2.22 |
| python-dev| 2.7.5-5ubuntu3|
| python-software-properties|0.92.37.8|
| sudo| 1.8.9p5-1ubuntu1 |
| texinfo| 5.2.0.dfsg.1-2 |
| unzip| 6.0-9ubuntu1.5 |
| virtualenv| 15.1.0 |
| wget| 1.15-1ubuntu1.14.04.2 |
|dopy| 0.3.7a|
|doctl|jq=1.5+dfsg-1|

### Tag v561
#### Languages installed
| Language | Version |
|----------|---------|
| Java | 1.8.0 |
| NodeJs | 4.8.3|
| Ruby | 2.3.1|

#### CLIs installed
| CLI | Version |
|----------|---------|
| awscli | 1.11.44 |
| awsebcli | 3.9 |
| gcloud | 157.0.0 |
| jfrog-cli | 1.7.0 |
| kubectl | 1.5.1 |
| packer | 0.12.2 |
| terraform | 0.8.7 |

#### Packages installed
```curl
gcc
gettext
git
htop
jq
libxml2-dev
libxslt-dev
make
nano
openssh-client
openssl
python-dev
python-pip
python-software-properties
software-properties-common
sudo
texinfo
unzip
virtualenv
wget
```

### Tag v551
#### Languages installed
| Language | Version |
|----------|---------|
| Java | 1.8.0  |
| NodeJs | 4.8.2|
| Ruby | 2.3.1|

#### CLIs installed
| CLI | Version |
|----------|---------|
| awscli | 1.11.44 |
| awsebcli | 3.9 |
| gcloud | 145.0.0 |
| jfrog-cli | 1.7.0 |
| kubectl | 1.5.1 |
| packer | 0.12.2 |
| terraform | 0.8.7 |

#### Packages installed
```curl
gcc
gettext
git
htop
jq
libxml2-dev
libxslt-dev
make
nano
openssh-client
openssl
python-dev
python-pip
python-software-properties
software-properties-common
sudo
texinfo
unzip
virtualenv
wget
```

### Tag v541
#### Languages installed
| Language | Version |
|----------|---------|
| Java | 1.8.0 |
| NodeJs | 4.8.1 |
| Ruby | 2.3.1|

#### CLIs installed
| CLI | Version |
|----------|---------|
| awscli | 1.11.44 |
| awsebcli | 3.9 |
| gcloud | 145.0.0 |
| jfrog-cli | 1.7.0 |
| kubectl | 1.5.1 |
| packer | 0.12.2 |
| terraform | 0.8.7 |

#### Packages installed
```curl
gcc
gettext
git
htop
jq
libxml2-dev
libxslt-dev
make
nano
openssh-client
openssl
python-dev
python-pip
python-software-properties
software-properties-common
sudo
texinfo
unzip
virtualenv
wget
```

### Tag v532
#### Languages installed
| Language | Version |
|----------|---------|
| Java | 1.8.0 |
| NodeJs | 4.8.0 |
| Ruby | 2.3.1|

#### CLIs installed
| CLI | Version |
|----------|---------|
| awscli | 1.11.44 |
| awsebcli | 3.9 |
| gcloud | 145.0.0 |
| jfrog-cli | 1.7.0 |
| kubectl | 1.5.1 |
| packer | 0.12.2 |
| terraform | 0.8.7 |

## Base image with services

Base image with services inherits from `drydock/u14` and adds a bunch of services like mysql. This image is updated monthly with a specific tag.

The image name is `drydock/u14all`.

### Tag v573
#### Services installed

| Services | Version |
|----------|---------|
| cassandra | 3.11 |
| couchdb | 1.6 |
| elasticsearch | 5.5.0 |
| neo4j | 3.2.2 |
| memcached | 1.4.39 |
| mongodb | 3.4.6 |
| mysql | 5.6 |
| postgres | 9.6.3  |
| rabbitmq | 3.6.10 |
| redis | 3.2.9 |
| rethinkdb | 2.3.5 |
| riak | 2.2.3 |
| selenium | 3.4.0 |
| sqllite | 3.19.3|

### Tag v561
#### Services installed

| Services | Version |
|----------|---------|
| couchdb | 1.6 |
| elasticsearch | 5.1.2 |
| neo4j | 3.1.1 |
| memcached | 1.4.34 |
| mongodb | 3.4 |
| mysql | 5.7 |
| postgres | 9.6 |
| rabbitmq | 3.6  |
| redis | 3.2 |
| rethinkdb | 2.3 |
| riak | 2.2.0 |
| selenium | 3.4.0 |
| sqllite | 3 |

### Tag v551
#### Services installed

| Services | Version |
|----------|---------|
| couchdb | 1.6  |
| elasticsearch | 5.1.2 |
| neo4j | 3.1.1 |
| memcached | 1.4.34  |
| mongodb | 3.4 |
| mysql | 5.7  |
| postgres | 9.6  |
| rabbitmq | 3.6 |
| redis | 3.2 |
| rethinkdb | 2.3 |
| riak | 2.2.0 |
| selenium | 3.0.1 |
| sqllite | 3 |

### Tag v541
#### Services installed

| Services | Version |
|----------|---------|
| couchdb | 1.6 |
| elasticsearch | 5.1.2 |
| neo4j | 3.1.1 |
| memcached | 1.4.34 |
| mongodb | 3.4 |
| mysql | 5.7 |
| postgres | 9.6 |
| rabbitmq | 3.6  |
| redis | 3.2 |
| rethinkdb | 2.3 |
| riak | 2.2.0|
| selenium | 3.0.1 |
| sqllite | 3 |

### Tag v532
#### Services installed

| Services | Version |
|----------|---------|
| couchdb | 1.6 |
| elasticsearch | 5.1.2 |
| neo4j | 3.1.1 |
| memcached | 1.4.34 |
| mongodb | 3.4 |
| mysql | 5.7 |
| postgres | 9.6 |
| rabbitmq | 3.6 |
| redis | 3.2 |
| rethinkdb | 2.3 |
| riak | 2.2.0 |
| selenium | 3.0.1 |
| sqllite | 3 |
