page_main_title: Operating system overview
main_section: Platform
sub_section: Job Runtime
sub_sub_section: Operating System
page_title: Operating system overview

# Ubuntu 16.04

Platform offers three operating system docker images for Ubuntu 16.04. These images are hosted on Docker hub in the `drydock` account.

## Base image
The base image consists of the core operating system, CLI's and three languages with their latest version preinstalled. This image is updated monthly with a specific tag.

The image name is `drydock/u16`.

### Tag v573
#### Languages installed
| Language | Version |
|----------|---------|
| Java | 1.8.0_131 |
| NodeJs | 7.10.1 |
| Ruby |  2.3.3|

#### CLIs installed
| CLI | Version |
|----------|---------|
| awscli | 1.11.44 |
| awsebcli | 3.9.0 |
| gcloud | 160.0.0 |
| jfrog-cli | 1.7.0 |
| kubectl |  1.5.1 |
| packer | 0.12.2 |
| terraform | 0.8.7 |
| azure | 0.2.8-1 |
| terraform | 0.8.7 |


#### Packages installed
| Package | Version |
|----------|---------|
|build-essential |12.1ubuntu2 |
|curl |7.47.0-1ubuntu2.2 |
|gcc |4:5.3.1-1ubuntu1 |
|gettext |0.19.7-2ubuntu3 |
|htop |2.0.1-1ubuntu1 |
|libxml2-dev |2.9.3+dfsg1-1ubuntu0.2 |
|libxslt1-dev |1.1.28-2.1ubuntu0.1 |
|make |4.1-6 |
|nano |2.5.3-2ubuntu2 |
|openssh-client |1:7.2p2-4ubuntu2.1 |
|openssl |1.0.2g-1ubuntu4.6 |
|software-properties-common |0.96.20.7 |
|sudo |1.8.16-0ubuntu1.4  |
|texinfo |6.1.0.dfsg.1-5 |
|unzip |6.0-20ubuntu1 |
|wget |1.17.1-1ubuntu1.1 |
|rsync |3.1.1-3ubuntu1 |
|psmisc |22.21-2.1build1
|python-pip |8.1.1-2ubuntu0.4 |
|python-software-properties |0.96.20.7 |
|python-dev |2.7.11-1 |
|git |1:2.13.0-0ppa1~ubuntu16.04.1 |
|jq |1.5+dfsg-1 |
|dopy| 0.3.7a|
|doctl|jq=1.5+dfsg-1|

### Tag v561
#### Languages installed
| Language | Version |
|----------|---------|
| Java | 1.8.0_131 |
| NodeJs | 7.10.0 |
| Ruby |  2.3.3|

#### CLIs installed
| CLI | Version |
|----------|---------|
| awscli | 1.11.44 |
| awsebcli | 3.9 |
| gcloud | 157.0.0 |
| jfrog-cli | 1.7.0 |
| kubectl | 1.5.1 |
| packer | 0.12.2 |
| terraform |  0.8.7 |

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
| Java | 1.8.0_131 |
| NodeJs | 7.10.0 |
| Ruby |  2.3.3|

#### CLIs installed
| CLI | Version |
|----------|---------|
| awscli | 1.11.44 |
| awsebcli |3.9 |
| gcloud | 145.0.0 |
| jfrog-cli | 1.7.0 |
| kubectl | 1.5.1 |
| packer | 0.12.2 |
| terraform |  0.8.7 |

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
| Java | 1.8.0_121 |
| NodeJs | 7.7.4 |
| Ruby | 2.3.3 |

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
| Java | 1.8.0_121  |
| NodeJs | 7.6.0 |
| Ruby | 2.3.3|

#### CLIs installed
| CLI | Version |
|----------|---------|
| awscli | 1.11.44 |
| awsebcli |  3.9 |
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

## Base image with services

Base image with services inherits from `drydock/u16` and adds a bunch of services like mysql. This image is updated monthly with a specific tag.

The image name is `drydock/u16all`.

### Tag v573
#### Services installed

| Services | Version |
|----------|---------|
| cassandra | 3.11 |
| couchdb | 1.6 |
| elasticsearch | 5.5.0 |
| neo4j | 3.2.2 |
| memcached | 1.4.39 |
| mongodb | 3.4.6|
| mysql |  5.7.18 |
| postgres | 9.6.3 |
| rabbitmq | 3.6.10 |
| redis | 3.2.9 |
| rethinkdb | 2.3.5 |
| riak | 2.2.3 |
| selenium | 3.4.0 |
| sqllite | 3.19.3 |

### Tag v561
#### Services installed

| Services | Version |
|----------|---------|
| couchdb |  1.6 |
| elasticsearch | 5.1.2 |
| neo4j | 3.1.1 |
| memcached | 1.4.34 |
| mongodb | 3.4 |
| mysql | 5.7 |
| postgres |  9.6 |
| rabbitmq | 3.6 |
| redis |  3.2 |
| rethinkdb | 2.3 |
| riak | 2.2.0 |
| selenium | 3.4.0 |
| sqllite | 3 |

### Tag v551
#### Services installed

| Services | Version |
|----------|---------|
| couchdb | 1.6 |
| elasticsearch | 5.1.2 |
| neo4j | 3.1.1 |
| memcached | 1.4.34 |
| mongodb |  3.4 |
| mysql | 5.7 |
| postgres | 9.6 |
| rabbitmq | 3.6 |
| redis | 3.2 |
| rethinkdb | 2.3 |
| riak |  2.2.0 |
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
| rabbitmq | 3.6 |
| redis | 3.2 |
| rethinkdb | 2.3 |
| riak | 2.2.0 |
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
| rethinkdb |  2.3 |
| riak |  2.2.0 |
| selenium | 3.0.1 |
| sqllite | 3 |
