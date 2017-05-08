page_main_title: Riak
main_section: CI
sub_section: Working with services


#Continuous Integration with Riak

Riak is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs Riak.

To start Riak, include the following in your `shippable.yml`:

```
services:
  - riak
```
