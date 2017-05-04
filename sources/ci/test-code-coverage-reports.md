main_section: CI
sub_section: Configuring test and code coverage

# Configuring Test and Code Coverage Reports

Shippable can display your test and code coverage results in a consumable format where you can drill down further and find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations.

## Test Results

To set up test result visualization for a repository, do the following:

- Run tests as part of your CI workflow using `shippable.yml`
- Make sure test results are in junit format.
- Output test results to shippable/testresults folder.

For example, here is a sample configuration for a Python project -

```

build:
  ci:
    - nosetests python/sample.py --with-xunit --xunit-file=shippable/testresults/nosetests.xml

```

Once you have set this up, you can view your test results in the **Test** tab on your build page.

<img src="../../images/ci/view-test-report.png" alt="Test reports">


## Code Coverage

To set up code coverage visualization for a repository, do the following:

- Run your code coverage command(s) as part of your CI workflow using `shippable.yml`
- Make sure code coverage output is in cobertura xml format.
- Output code coverage output to shippable/codecoverage folder.

For example, here is a sample configuration for a Python project -

```

build:
  ci:  
    - coverage run --branch python/sample.py
    - coverage xml -o shippable/codecoverage/coverage.xml python/sample.py

```

Once you have set this up, you can view your code coverage results in the `Code coverage` tab on your build page.

Check out our blogs on [creating visualizations of your CI test results](http://blog.shippable.com/setting-up-continuous-integration-test-result-visualization) and [setting up code coverage for tests](http://blog.shippable.com/setting-up-code-coverage-visualization-for-tests-in-ci) for additional details.

### Alerts for low coverage

You can set up alerts if the code coverage numbers fall below a specific percentage. To do this:

- Go to your Project in the UI and click on **Settings**

- Click on **Runs config** in the left sidebar menu. You will see a section **Low coverage alert**.

<img src="/images/ci/low-coverage-alert.png" alt="Configure webhook events to trigger builds">

- Click on **Edit** and set the alert threshold to whatever you need. You can also choose to mark builds as **Unstable** if coverage falls below the configured percentage.

- Click on **Save**.
