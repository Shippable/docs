page_main_title: Running tests in parallel
main_section: CI
sub_section: Tutorials
page_title: Running tests in parallel
page_description: How to run tests in parallel in Shippable

# Running tests in parallel

Your project may have tests that can run in parallel. If you have purchased multiple
Shippable minions, you can speed up your build times significantly by running these tests
in parallel on multiple minions.

After putting these test suites in different directories, you can configure to run them in parallel
by making the following changes to shippable.yml file. In the example below, the project has two test suites in the test_suite_1 and test_suite_2 directories.

- Create an environment variable to specify the test suite directories.
```yaml
env:
  - TEST_SUITES=test_suite_1
  - TEST_SUITES=test_suite_2
```

- Reference the environment variables in the build/ci section of the yml file.
```yaml
  - pushd $SHIPPABLE_REPO_DIR/$TEST_SUITES
  - $SHIPPABLE_REPO_DIR/node_modules/.bin/mocha --recursive "$SHIPPABLE_REPO_DIR/$TEST_SUITES/**/*.spec.js" -R mocha-junit-reporter --reporter-options mochaFile=$SHIPPABLE_REPO_DIR/shippable/testresults/$TEST_SUITES/testresults.xml
```

- When you build the project, you will see two parallel builds in the project dashboard.
![Build view](https://raw.githubusercontent.com/devops-recipes/ci-run-parallel-tests/master/public/resources/images/matrix-tests-view.png)

- Each build has its console log output.
![test_suite_1](https://github.com/devops-recipes/ci-run-parallel-tests/raw/master/public/resources/images/console-testsuite1-view.png)
![test_suite_2](https://github.com/devops-recipes/ci-run-parallel-tests/raw/master/public/resources/images/console-testsuite2-view.png)

The sample project can be found [here](https://github.com/devops-recipes/ci-run-parallel-tests/).
