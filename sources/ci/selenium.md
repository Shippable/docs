page_main_title: Selenium
main_section: CI
sub_section: Working with services


#Continuous Integration with Selenium

Selenium is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs Selenium.

##Starting Selenium

To use Selenium, you need a browser to start it on. We support Firefox and it is also pre-installed on official images.

The following `shippable.yml` snippet shows how to use Selenium with a Node.js project.

```
language: node_js

node_js:
  - "0.10"

addons:
  firefox: "23.0"

services:
  - selenium

build:
  ci:
    - sudo npm install
    #use xvfb (X Virtual Framebuffer) to imitate a display
    - "export DISPLAY=:99.0"
    #run tests
    - xvfb-run --server-args="-ac" npm test
```

##Advanced config
###Using a different Firefox version

We support different firefox versions like "18.0", "19.0", "20.0", "21.0", "22.0", "23.0", "24.0", "25.0", "26.0", "27.0", "28.0", "29.0". To select a specific firefox version, add the following to your yml:

```
addons:
  firefox: "21.0"
```

###Using Google Chrome
Some of our official images also have Chrome pre-installed. To figure out which image you need to use in order to ensure Chrome is installed, look at the documentation on your specific language under Continuous Integration->Languages.

A sample project using Node.js is provided to help you see how to configure Selenium to work with Chrome. It uses nightwatch.json to select chrome as the browser.
[Sample project with Node, Selenium, and Chrome](https://github.com/shippableSamples/sample_node_selenium/tree/chrome)
