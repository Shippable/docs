main_section: CI
sub_section: Working with services

#Continuous Integration with Neo4j

Neo4j is pre-installed on all our official images. However, we do not start it by default since not every build needs Neo4j.

##Starting Neo4j

To start Neo4j, include the following in your `shippable.yml`:

```
services:
  - neo4j
```

When started, Neo4j runs on port 7474 by default.

##Advanced config

###Custom startup command

To customize the startup command, you should define the SHIPPABLE_NEO4J_CMD environment variable in your yml.

For example, the following yml snippet overrides the default startup command for Neo4j:

```
env:
  global:
    - SHIPPABLE_NEO4J_CMD="<command>"
```

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
