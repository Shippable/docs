page_main_title: Elasticsearch
main_section: CI
sub_section: Configuration
sub_sub_section: Working with services
page_title: Continuous Integration with ElasticSearch
page_description: How to do Continuous Integration with ElasticSearch in Shippable

#Continuous Integration with ElasticSearch

ElasticSearch is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs ElasticSearch.

##Starting ElasticSearch

To start ElasticSearch, include the following in your `shippable.yml`:

```
services:
  - elasticsearch
```

When started, ElasticSearch runs on default port 9200 and binds to localhost.

##Advanced config
###Custom startup command

To customize the startup command, you should define the SHIPPABLE_ELASTICSEARCH_CMD environment variable in your yml.

For example, the following yml snippet overrides the default startup command for ElasticSearch:

```
env:
  global:
    - SHIPPABLE_ELASTICSEARCH_CMD="<command>"
```
