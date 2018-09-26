page_main_title: Services versions on each image
main_section: Platform
sub_section: Runtime
sub_sub_section: Machine image
page_title: Popular services and the machine images where they are installed
page_description: Popular services and the machine images where they are installed in Shippable

# Services

When you run a `runCI` job on Shippable, the following popular services are already pre-installed for your convenience:

* [Cassandra](/ci/cassandra)
* [CouchDB](/ci/couchdb/)
* [ElasticSearch](/ci/elasticsearch/)
* [Memcached](/ci/memcached/)
* [MongoDB](/ci/mongodb/)
* [MySQL](/ci/mysql/)
* [Neo4j](/ci/neo4j/)
* [Postgres](/ci/postgresql/)
* [RabbitMQ](/ci/rabbitmq/)
* [Redis](/ci/redis/)
* [RethinkDB](/ci/rethinkdb/)
* [Riak](/ci/riak/)
* [Selenium](/ci/selenium/)
* [SqlLite](/ci/sqlite/)


This page lists the versions of Services available for each supported [OS](/platform/runtime/machine-image/os-versions) and the Machine Image(s) where you can find them. These services can be started automatically in a [runCI job](/platform/workflow/job/runci).

##Cassandra

| Version  |    OS    | Machine Images
|----------|---------|-------
|3.11.2|- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04  |[v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.7.4](/platform/runtime/machine-image/ami-v674/)|
| 3.11 |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.1.4](/platform/runtime/machine-image/ami-v614/)<br>[v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)|

Note: Cassandra versions 3.6 - 3.11 are incompatible with Oracle Java. Cassandra is not supported on v6.8.4 and v6.9.4 images because it is incompatible with Java 10. You can use openjdk8 on an earlier machine image if you need these versions of Cassandra.


## CouchDB


| Version  |                OS                | Machine Images       
|----------|----------------------------------|------
| 2.1.2    | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04  |[v6.8.4](/platform/runtime/machine-image/ami-v684/) and [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 2.1.2    | - CentOS 7  |[v6.7.4](/platform/runtime/machine-image/ami-v674/)
| 2.1.1    | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.2.4](/platform/runtime/machine-image/ami-v624/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/) <br>[v5.10.4](/platform/runtime/machine-image/ami-v5104/) and later<br> [v5.10.4](/platform/runtime/machine-image/ami-v5104/) and later
| 1.6.1    | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 1.6.0    | - Ubuntu 16.04(aarch64)          | [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later



## ElasticSearch

| Version|              OS            | Machine Images       
|-------|----------------------------|---------------------
|6.4.0  | -  CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.9.4](/platform/runtime/machine-image/ami-v694/)
|6.3.2  | -  CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.8.4](/platform/runtime/machine-image/ami-v684/)
|6.3.1  | -  CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.7.4](/platform/runtime/machine-image/ami-v674/)
|6.2.4  | -  CentOS 7 <br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64) | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)<br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)<br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)<br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/)
|6.2.3  | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04| [v6.4.4](/platform/runtime/machine-image/ami-v644/)
|6.1.1  | - CentOS 7<br> - Ubuntu 14.04<br>- Ubuntu 16.04<br> - Ubuntu 16.04(aarch64) |[v6.2.4](/platform/runtime/machine-image/ami-v624/) and [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/) <br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later                
|5.6.2  | - Ubuntu 14.04<br>- Ubuntu 16.04               |[v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|5.5.1  |  - Ubuntu 14.04<br>- Ubuntu 16.04              | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
|5.5.0  |  - Ubuntu 14.04<br>- Ubuntu 16.04              | [v5.7.3](/platform/runtime/machine-image/ami-v573/)  
|5.1.2  |  - Ubuntu 14.04<br>- Ubuntu 16.04              | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier

## Memcached

| Version  |     OS   | Machine Images         
|----------|----------|-----------------
|1.5.10     |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch 64) |[v6.9.4](/platform/runtime/machine-image/ami-v694/)
|1.5.9     |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 |[v6.7.4](/platform/runtime/machine-image/ami-v674/) and [v6.8.4](/platform/runtime/machine-image/ami-v684/)
|1.5.7     |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 |[v6.4.4](/platform/runtime/machine-image/ami-v644/) to [v6.6.4](/platform/runtime/machine-image/ami-v664/)
|1.5.4     |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04  | [v6.2.4](/platform/runtime/machine-image/ami-v624/) and [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/) <br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)   
|1.5.2     |- Ubuntu 14.04<br>- Ubuntu 16.04 | [V5.10.4](/platform/runtime/machine-image/ami-v5104/)
|1.5.0     |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
|1.4.39    |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/)
|1.4.34    |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|1.4.25    |- Ubuntu 16.04(aarch 64)         | [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.8.4](/platform/runtime/machine-image/ami-v684/)

## MongoDB

| Version  |  OS     | Machine Images
|----------|---------|-------------------
|4.0.2 |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64) |[v6.9.4](/platform/runtime/machine-image/ami-v694/)
|4.0.1 |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64) |[v6.8.4](/platform/runtime/machine-image/ami-v684/)
|4.0.0 |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64) |[v6.7.4](/platform/runtime/machine-image/ami-v674/)
|3.6.4 |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64) |[v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
|3.6.3 |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04|[v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 3.6.2  |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch 64) |[v6.2.4](/platform/runtime/machine-image/ami-v624/) and [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br> [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 3.4.9  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
| 3.4.6  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 3.4    |- Ubuntu 14.04<br>- Ubuntu 16.04 |[v5.3.2](/platform/runtime/machine-image/ami-v532/)  to [v5.6.1](/platform/runtime/machine-image/ami-v561/)

## MySQL

| Version  |  OS  | Machine Images
|----------|---------| ------
|5.7.23| - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.8.4](/platform/runtime/machine-image/ami-v684/) and [v6.9.4](/platform/runtime/machine-image/ami-v694/)
|5.7.22| - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) to [v6.7.4](/platform/runtime/machine-image/ami-v674/)<br>[v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.7.4](/platform/runtime/machine-image/ami-v674/) <br>[v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.7.4](/platform/runtime/machine-image/ami-v674/)
|5.7.21|- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.2.4](/platform/runtime/machine-image/ami-v624/) and [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>[v6.4.4](/platform/runtime/machine-image/ami-v644/)
|5.7.20 |- Ubuntu 14.04<br>- Ubuntu 16.04 |[v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)
|5.7.19 |- Ubuntu 14.04<br>- Ubuntu 16.04 |[v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|5.7.18|- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 5.7 |- Ubuntu 16.04   |[v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v5.6.1](/platform/runtime/machine-image/ami-v561/)
| 5.6 |- Ubuntu 14.04   |[v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v5.8.2](/platform/runtime/machine-image/ami-v582/)


## Neo4j

| Version  |  OS    |Machine Images
|----------|---------|----------
|3.3.6  |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64)  | [v6.7.4](/platform/runtime/machine-image/ami-v674/)
|3.3.5  |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64)  | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
|3.3.4  |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 3.3.1 |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch 64) | [v6.2.4](/platform/runtime/machine-image/ami-v624/) and [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br> [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) to  [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)
|3.2.6 | - Ubuntu 14.04<br>- Ubuntu 16.04|[v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|3.2.3  | - Ubuntu 14.04<br>- Ubuntu 16.04|[v5.8.2](/platform/runtime/machine-image/ami-v582/)
|3.2.2  | - Ubuntu 14.04<br>- Ubuntu 16.04|[v5.7.3](/platform/runtime/machine-image/ami-v573/)
|3.1.1  | - Ubuntu 14.04<br>- Ubuntu 16.04|[v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier

Note: Neo4j is not supported on v6.8.4 and v6.9.4 images because it is incompatible with Java 10. You can use openjdk8 on an earlier machine image if you need these versions of Neo4j.

## Postgres

| Version  |    OS    |   Machine Images
|----------|---------|------------
|10.5 |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04  |[v6.8.4](/platform/runtime/machine-image/ami-v684/) and [v6.9.4](/platform/runtime/machine-image/ami-v694/)
|10.4 |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04  |[v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.7.4](/platform/runtime/machine-image/ami-v674/)
|10.3 |- CentOS 7<br>- Ubuntu 14.04 |[v6.4.4](/platform/runtime/machine-image/ami-v644/)
|10.2  | - CentOS 7  |[v6.2.4](/platform/runtime/machine-image/ami-v624/) and [v6.3.4](/platform/runtime/machine-image/ami-v634/)
| 10.1  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 9.6.5 |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/)<br>[v5.10.4](/platform/runtime/machine-image/ami-v5104/) and [v6.1.4](/platform/runtime/machine-image/ami-v614/)
| 9.6.3 |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) to [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 9.6.2 |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier
|9.5 |- Ubuntu 16.04(aarch 64) | [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later

## RabbitMQ

| Version  |    OS    | Machine Images
|----------|---------|----------
|3.6.15 | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64)|[v6.2.4](/platform/runtime/machine-image/ami-v624/) and later <br>[v6.4.4](/platform/runtime/machine-image/ami-v644/) and later <br>[v6.4.4](/platform/runtime/machine-image/ami-v644/) and later <br>  [v6.5.4](/platform/runtime/machine-image/ami-v654/) and later
| 3.6.14   |- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch 64) | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)
|3.6.12    |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/)   
| 3.6.10   |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and  [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 3.6.6    |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier

## Redis

| Version  |  OS  | Machine Images
|----------|---------|--------
| 4.0.11 | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>-  Ubuntu 16.04(aarch64) | [v6.8.4](/platform/runtime/machine-image/ami-v684/) and [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 4.0.10 | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>-  Ubuntu 16.04(aarch64) |  [v6.7.4](/platform/runtime/machine-image/ami-v674/)<br>[v6.6.4](/platform/runtime/machine-image/ami-v664/) and [v6.7.4](/platform/runtime/machine-image/ami-v674/)<br>[v6.6.4](/platform/runtime/machine-image/ami-v664/) and [v6.7.4](/platform/runtime/machine-image/ami-v674/)<br>[v6.6.4](/platform/runtime/machine-image/ami-v664/) and [v6.7.4](/platform/runtime/machine-image/ami-v674/)
|4.0.9 |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04  <br>-  Ubuntu 16.04(aarch64) | [v6.4.4](/platform/runtime/machine-image/ami-v644/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/) <br> [v6.4.4](/platform/runtime/machine-image/ami-v644/) and [v6.5.4](/platform/runtime/machine-image/ami-v654/) <br> [v6.4.4](/platform/runtime/machine-image/ami-v644/) and [v6.5.4](/platform/runtime/machine-image/ami-v654/) <br> [v6.5.4](/platform/runtime/machine-image/ami-v654/)
|4.0.8 |- CentOS 7<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch 64)  |[v6.2.4](/platform/runtime/machine-image/ami-v624/) and [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.2.4](/platform/runtime/machine-image/ami-v624/) and [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br>[v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)
| 4.0.7  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br> [v6.1.4](/platform/runtime/machine-image/ami-v614/)
| 4.0.1  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 3.2.9  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and [v5.7.3](/platform/runtime/machine-image/ami-v573/)
| 3.2.8  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier

## RethinkDB

| Version  |    OS    | Machine Images
|----------|---------|---------
|2.3.6 |- Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.8.2](/platform/runtime/machine-image/ami-v582/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)
|2.3.5 | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and earlier

## Riak

| Version  |  OS    | Machine Images
|----------|---------|-------
|2.2.3 | - CentOS 7 <br>- Ubuntu 14.04<br>- Ubuntu 16.04|[v6.2.4](/platform/runtime/machine-image/ami-v624/) and later <br>[v5.7.3](/platform/runtime/machine-image/ami-v573/) and later<br>[v5.7.3](/platform/runtime/machine-image/ami-v573/) and later
|2.2.0 | - Ubuntu 14.04<br>- Ubuntu 16.04 |[v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier

## Selenium

| Version  |  OS    | Machine Images
|----------|---------|-------
|3.14.0 |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64)|[v6.8.4](/platform/runtime/machine-image/ami-v684/) and [v6.9.4](/platform/runtime/machine-image/ami-v694/)
|3.13.0 |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64)|[v6.7.4](/platform/runtime/machine-image/ami-v674/)
|3.11.0 |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64)|[v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
| 3.8.1   | - CentOS 7 <br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch 64) | [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>[v6.2.4](/platform/runtime/machine-image/ami-v624/) and [v6.4.4](/platform/runtime/machine-image/ami-v644/)
|3.5.3  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
| 3.4.0    |  - Ubuntu 14.04<br>- Ubuntu 16.04 |[v5.6.1](/platform/runtime/machine-image/ami-v561/) to [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 3.0.1    |  - Ubuntu 14.04<br>- Ubuntu 16.04 |[v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier

##SQLite

| Version  |  OS    | Machine Images
|----------|---------|-------
| 3.22.0   |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04| [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later<br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) and later<br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) and later
|3.20.1  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.10.4](/platform/runtime/machine-image/ami-v5104/)                   
| 3.19.3   | - Ubuntu 14.04<br>- Ubuntu 16.04 |[v5.7.3](/platform/runtime/machine-image/ami-v573/) and [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 3.11.0   |- Ubuntu 16.04<br>- Ubuntu 16.04(aarch 64) | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier<br>[v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/)
| 3.8.2    |- Ubuntu 14.04 | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier

for ubuntu14 OS, AMI v6.1.4 onwards, sqlite-tools like sqlite-analyser are not installed. To run this you need to install
32 bit C libraries using:
```
dpkg --add-architecture i386
apt-get update
apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386
```
