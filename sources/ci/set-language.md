page_main_title: Setting language and runtime
main_section: CI
sub_section: Preparing your environment
page_title: Setting language and runtime
page_description: How to set language and runtime to continuously build your project in Shippable

# Setting language and runtime

The first tag you set in your yml config is the `language` tag. This tells us the language used for your project so that we can choose the right build image.

This is a **mandatory** tag.

```
language: node_js
```

You can set this tag to the following values depending on the language you need for your build: `clojure`, `go`, `java`, `node_js`, `php`, `python`, `ruby`, `scala`, `c`.

Specifying ```language: none``` in your yml skips any default language specific processing. You can use this configuration to run builds on the language of your choice using a custom Docker image. Details are in the [building unsupported languages](unsupported-languages/) section of our docs. If you do not specify a build image in the `pre_ci_boot` section of your yml, the `drydock/u16pytall` image will be used by default.

## runtime

The runtime tag depends tells us the version of the language you want to run your build against. For example, you can set the following for node_js:

```
node_js:
  - 0.12
```
Similarly, you can use `rvm` for Ruby, `jdk` for Java and Scala, `go` for go, `python` for python, `php` for PHP versions.

For more on each language and how to set the runtime, you can check out our language specific pages:

-  [Node.js](nodejs-continuous-integration.md)
-  [Python](python-continuous-integration.md)
-  [Java](java-continuous-integration.md)
-  [Ruby](ruby-continuous-integration.md)
-  [Go](go-continuous-integration.md)
-  [Scala](scala-continuous-integration.md)
-  [PHP](php-continuous-integration.md)
-  [Clojure](clojure-continuous-integration.md)
-  [C/C++](cpp-continuous-integration.md)

<br>
**Things to remember**

-  Setting the runtime only works if you are using our default build images or an image pulled from our [drydock repository on Docker Hub](https://hub.docker.com/u/drydock/) for CI.

-  You can specify language versions as number or string, i.e. as `0.10` or as `"0.10"`. In most cases the format is entirely interchangeable. However, in cases where the version number ends with a 0, such as `5.10`, it is safer to use a string to avoid the yml parser from transating the version to `5.1`.
