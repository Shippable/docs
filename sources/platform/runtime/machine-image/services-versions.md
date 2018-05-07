page_main_title: Services versions on each image
main_section: Platform
sub_section: Runtime
sub_sub_section: Machine image
page_title: Popular services and the machine images where they are installed
page_description: Popular services and the machine images where they are installed in Shippable

# Services

When you run a `runCI` job on Shippable, the following popular services are already pre-installed for your convenience:

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
* [SqlLite](/ci/sqllite/)
* [Cassandra](/ci/cassandra)

This page describes the versions available for each Service and the Machine Image(s) where you can find them. These services can be started automatically in a [runCI job](/platform/workflow/job/runci).


## CouchDB

| Version  |                OS                | Machine Images       
|----------|----------------------------------|------
| 2.1.1    | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) and later
| 1.6.1    | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 1.6.0    | - Ubuntu 16.04(aarch64)          | [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later


## ElasticSearch

| Version|              OS            | Machine Images       
|-------|----------------------------|---------------------
|6.2.3  |  - Ubuntu 14.04<br>- Ubuntu 16.04<br>- CentOS 7| [v6.4.4](/platform/runtime/machine-image/ami-v644/) 
|6.1.1  |  - Ubuntu 16.04(aarch64)                       | [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later               
|6.1.1  |  - CentOS 7                                    | [v6.2.4](/platform/runtime/machine-image/ami-v624/) and [v6.3.4](/platform/runtime/machine-image/ami-v634/) 
|6.1.1  |  - Ubuntu 14.04<br>- Ubuntu 16.04              | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/) 
|5.5.1  |  - Ubuntu 14.04<br>- Ubuntu 16.04              | [v5.8.2](/platform/runtime/machine-image/ami-v582/) and [v5.10.4](/platform/runtime/machine-image/ami-v5104/) 
|5.5.0  |  - Ubuntu 14.04<br>- Ubuntu 16.04              | [v5.7.3](/platform/runtime/machine-image/ami-v573/)  
|5.1.2  |  - Ubuntu 14.04<br>- Ubuntu 16.04              | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier

## Memcached

| Version  |     OS   | Machine Images         
|----------|----------|-----------------
|1.5.7     |- Ubuntu 14.04<br>- Ubuntu 16.04<br>- CentOS 7 |[v6.4.4](/platform/runtime/machine-image/ami-v644/)
|1.5.4     |- CentOS 7 | [v6.2.4](/platform/runtime/machine-image/ami-v624/) and [v6.3.4](/platform/runtime/machine-image/ami-v634/)
|1.5.4     |- Ubuntu 14.04<br>- Ubuntu 16.04 |[v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)    
|1.5.2     |- Ubuntu 14.04<br>- Ubuntu 16.04 | [V5.10.4](/platform/runtime/machine-image/ami-v5104/)
|1.5.0     |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
|1.4.39    |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/)
|1.4.34    |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|1.4.25    |- Ubuntu 16.04(aarch 64)         | [v6.2.4](/platform/runtime/machine-image/ami-v624/)

## MongoDB

| Version  | Machine Images      
|----------|---------
| 3.6.2   | [v6.1.4](/platform/runtime/machine-image/ami-v614/)
| 3.4.7    | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 3.4.6    | [v5.7.3](/platform/runtime/machine-image/ami-v573/)
| 3.4.4    | [v5.6.1](/platform/runtime/machine-image/ami-v561/) (Ubuntu 16.04)
| 3.4.3    | [v5.4.1](/platform/runtime/machine-image/ami-v541/) and [v5.5.1](/platform/runtime/machine-image/ami-v551/) (Ubuntu 16.04)
| 3.4.2    | [v5.3.2](/platform/runtime/machine-image/ami-v532/) (Ubuntu 16.04)
| 3.0.15   | [v5.6.1](/platform/runtime/machine-image/ami-v561/) (Ubuntu 14.04)
| 3.0.14   | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier (Ubuntu 14.04)

## MySQL

| Version  |  Machine Images | OS          
|----------|---------| ------
| 5.7.20   | [v6.1.4](/platform/runtime/machine-image/ami-v614/)
| 5.7.19  | [v5.8.2](/platform/runtime/machine-image/ami-v582/)  | Ubuntu 16.04 |
| 5.7.18  | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and [v5.7.3](/platform/runtime/machine-image/ami-v573/) | Ubuntu 16.04 |
| 5.7.17  | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier | Ubuntu 16.04 |
| 5.6.33  | [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later  | Ubuntu 14.04 |

## Neo4j

| Version  |  Machine Images          
|----------|---------
| 3.3.1   | [v6.1.4](/platform/runtime/machine-image/ami-v614/)
|3.2.3  | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
|3.2.2  | [v5.7.3](/platform/runtime/machine-image/ami-v573/)
|3.1.1  | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier  

## Postgres

| Version  |   Machine Images          
|----------|---------
| 10.1   | [v6.1.4](/platform/runtime/machine-image/ami-v614/)
| 9.6.3    | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and later
| 9.6.2    | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier  

## RabbitMQ

| Version  | Machine Images              
|----------|---------
| 3.6.14   | [v6.1.4](/platform/runtime/machine-image/ami-v614/)
| 3.6.10   | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and later
| 3.6.6    | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier  

## Redis

| Version  |  Machine Images             
|----------|---------
| 4.0.7   | [v6.1.4](/platform/runtime/machine-image/ami-v614/)
| 4.0.1  | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
| 3.2.9  | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and [v5.7.3](/platform/runtime/machine-image/ami-v573/)
| 3.2.8  | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier

## RethinkDB

| Version  |   Machine Images              
|----------|---------
|2.3.6 | [v5.8.2](/platform/runtime/machine-image/ami-v582/)
|2.3.5 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and earlier  

## Riak

| Version  |   Machine Images    
|----------|---------
|2.2.3 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and later
|2.2.0  | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier  

## Selenium

| Version  |  Tags   
|----------|---------
| 3.8.1   | [v6.1.4](/platform/runtime/machine-image/ami-v614/)
| 3.4.0    | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and later
| 3.0.1    | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier  

##SQLite

| Version  |  Tags   
|----------|---------
| 3.22.0   | [v6.1.4](/platform/runtime/machine-image/ami-v614/)
| 3.19.3   | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and later
| 3.11.0   | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier (Ubuntu 16.04)
| 3.8.2    | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier (Ubuntu 14.04)

for ubuntu14 OS, AMI v6.1.4 onwards, sqlite-tools like sqlite-analyser are not installed. To run this you need to install
32 bit C libraries using:
```
dpkg --add-architecture i386
apt-get update
apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386
```

##Cassandra

| Version  |  Tags   
|----------|---------
| 3.11   | [v6.1.4](/platform/runtime/machine-image/ami-v614/)

Cassandra versions 3.6 -3.11 are [broken](https://issues.apache.org/jira/browse/CASSANDRA-14173) for oracle java due to a recent release.
To use Cassandra, you should run it with `openjdk8` for it to work correctly. This will be patched as soon as newer version
of Cassandra is available.
