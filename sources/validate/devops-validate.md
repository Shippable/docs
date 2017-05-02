main_section: Validate
sub_section: Before you start

# Validating your application

Once your application is deployed into an environment, there are several types of test suites you need to run in order to move the application further down your delivery pipeline. This is the Validation phase.

Automated validation is a very important part of DevOps and eliminates the need for error-prone manual handoffs. The advantages of automating these steps are:

- Increased efficiency: Automated deployment into test environments, as well as triggering tests automatically, reduces human errors.
- Better productivity: The entire validation phase will ideally need manual intervention only if tests fail at some point. This means it's not people-dependent in happy cases. The team can focus on high value activities rather than babysitting test environments.
- Everyone across the team can go to one Dashboard and figure out what version of the application is running in each environment.

##Validation workflow
Let us consider a typical scenario:

- Your application is deployed into a Test environment. The test team is notified.
- As soon as the deployment happens, your integration/functional test suite is automatically triggered. The results are communicated to the Test team.
- The application manifest is then deployed into Beta. This triggers your performance test suite. Once again, results are communicated to the Test team.
- Depending on the results of the tests and your configuration, the manifest is then deployed to the next environment, or awaits a manual action.
- Your team can clearly see what is deployed in each environment by [going to a central UI](/getting-started/single-pane-of-glass-spog/).


<img src="/images/validate/validate-workflow.png" alt="Validating your application">

##Scenarios

We have created samples for the following scenarios to illustrate how you could integrate your testing platform with Shippable:

- [Triggering performance tests](/validate/nouvola/)
- [Triggering integration tests](/validate/sauce-labs/)

If you're interested in a specific platform or validation scenario, please reach out to us through our [Support repo](https://github.com/Shippable/support/issues) or [send us an email](mailto:support@shippable.com).
