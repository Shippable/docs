page_main_title: Running tests in parallel
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Running tests in parallel in CI
page_description: How to run tests in parallel efficiently
page_keywords: tests, shippable docs, config, yml, parallel, split, distribute


# Running Tests in Parallel

If your project has a large number of tests, it will take more time to run all those tests on single node. To run these tests faster, you can run them in parallel by adding more nodes to your organization and splitting the tests between those nodes by using a matrix build. Splitting your tests across all the nodes in an efficient way can be a bit tricky, because you may end up running all of your slow tests on one machine and all fast tests on another.

`shipctl` provides a `split_tests` command to intelligently split tests across your matrix jobs in such a way that all your tests will complete in as little time as possible. It does this by sorting your previous test results by time taken and distributing them across your matrix jobs in a round-robin fashion.

## Using the Shippable CLI to Split Tests

`shipctl split_tests` returns the list of test files that should be executed by the current matrix job.

```
shipctl split_tests $TEST_PATH $TEST_FILES_NAME_REGEX $TEST_REPORTS_PATH
```

* `TEST_PATH:` path of the directory where test files are in your project
* `TEST_FILES_NAME_REGEX:` regular expression to search tests files in TEST_PATH
* `TEST_REPORTS_PATH:` path of the directory where test reports are created in your project

The output of `split_tests` is an array of test file paths which you can pass to your test runner.
```
> shipctl split_tests $TEST_PATH $TEST_FILES_NAME_REGEX $TEST_REPORTS_PATH
test/test_1.rb
test/test_2.rb
test/test_3.rb
```

You will need to cache your test report results so that test results can be sorted and distributed based on these cached test timings.
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
    # copy new test reports to /tmp/cache directory
    - cp -ru $TEST_REPORTS_PATH/. /tmp/cache/$TEST_REPORTS_PATH/

  # enable caching
  cache: true
  # cache /tmp/cache directory to cache test reports
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
