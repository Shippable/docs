page_main_title: Running tests in parallel
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Running tests in parallel in CI
page_description: How to run tests in parallel efficiently
page_keywords: tests, shippable docs, config, yml, parallel, split, distribute


# Running Tests in Parallel

If your project has a large number of tests, it will take more time to run all those tests on single node. To run these tests faster, you can run them in parallel by adding more nodes to your organization and splitting the tests between those nodes. Splitting your tests across all the nodes can be a bit tricky. You may end of up running all slow tests on one machine and all fast tests on another.

Shippable provides `split_tests` Shippable CLI command to intelligently split tests accros all nodes in such a way that all your tests will complete in as little time as possible.

## Using the Shippable CLI to Split Tests

Shippable CLI `split_tests` command gives you a list of test files to test in your current job.

```
shipctl split_tests $TEST_PATH $TEST_FILES_NAME_REGEX $TEST_REPORTS_PATH
```

* `TEST_PATH:` path of the directory where test files are in your project
* `TEST_FILES_NAME_REGEX:` regular expression to search tests files in TEST_PATH
* `TEST_REPORTS_PATH:` path of the directory where test reports are created in your project

You will need to cache your tests reports so that test results can be sorted and distributed based on previous test timings.
Below shippable.yml shows how you can split tests for ruby:

```
language: ruby

rvm:
  - 2.6

env:
  global:
    - TEST_PATH=test/
    - TEST_REPORTS_PATH=test/reports/
  matrix:
    - MATRIX_JOB=1
    - MATRIX_JOB=2
    - MATRIX_JOB=3
    - MATRIX_JOB=4

build:
  ci:
    - pip install yq
    - bundle install
    # create /tmp/cache/$TEST_REPORTS_PATH to cache test results
    - |
        if [ ! -d \"/tmp/cache/$TEST_REPORTS_PATH\" ];
        then
          mkdir -p /tmp/cache/$TEST_REPORTS_PATH
        fi
    # use shipctl split_tests to get test files to run in current job
    - test_files=$(shipctl split_tests $TEST_PATH \*_test.rb /tmp/cache/$TEST_REPORTS_PATH)
    # run tests
    - bundle exec ruby -I.:test -e "ARGV.each{|f| require f}" ${test_files[@]}
    # copy new test reports to cache directory
    - cp -ru $TEST_REPORTS_PATH/. /tmp/cache/$TEST_REPORTS_PATH/

  cache: true
  cache_dir_list:
    - /tmp/cache
```

**NOTE:** `shipctl split_tests` works only with junit format test reports. For example:

```
<!-- filename: TEST-AssertionTest.xml -->

<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="AssertionTest" filepath="/root/src/github.com/test-user/railstest/test/assertion_test.rb" skipped="0" failures="0" errors="0" tests="2" assertions="1" time="2.15009998782989e-05">
    <testcase name="simple_test" lineno="8" classname="AssertionTest" assertions="1" time="1.2969999943379662e-05">
    </testcase>
  </testsuite>
</testsuites>
```
