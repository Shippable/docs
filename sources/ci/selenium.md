page_main_title: Selenium
main_section: CI
sub_section: Configuration
sub_sub_section: Working with services
page_title: Continuous Integration with Selenium
page_description: How to do Continuous Integration with Selenium in Shippable

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

### Headless Chrome Support
To run Chrome in headless mode, we recommend using tools like [nightwatch](http://nightwatchjs.org/), [puppeteer](https://github.com/GoogleChrome/puppeteer) or [webdriverIO](http://webdriver.io/) to manage
Chrome and Selenium.
The [documentation](https://developers.google.com/web/updates/2017/04/headless-chrome#drivers) on developers.google.com is a great place to start.

Troubleshooting

- Check if `chrome` and `chromedriver` versions are [compatible](https://sites.google.com/a/chromium.org/chromedriver/downloads). If you are using a custom image, you will have to install chrome and chromedriver manually. [sample script](https://gist.github.com/ziadoz/3e8ab7e944d02fe872c3454d17af31a5)
- Shippable runs builds as root so you will have add flags - `--no-sandbox --disable-setuid-sandbox` to start Chrome.
- Chrome headless does not need xvfb when started in headless mode.
- Selenium needs to be started with Chromedriver to support Chrome. We recommend using a tool which like webdriver.IO which manages Selenium session and will do all the necessary configuration.

Examples

- [Shippable + Karma.js + Mocha + Chai + Puppeteer](https://github.com/devops-recipes/ci-headless-chrome)
- [Shippable + Headless Chrome + webdriverIO + Chromedriver](https://github.com/devops-recipes/ci-headless-chrome-selenium)
