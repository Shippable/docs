main_section: Release
sub_section: Before you start

# Managing releases

Automating release management helps you avoid manual handoffs and keeps everyone on the same page with respect to what other teams are doing. With Shippable, you can set up your Continuous Delivery pipeline with Zero Touch Automation and complete transparency across teams.

Shippable helps with release management with the following features:

- [Single Pane of Glass (SPOG)](/getting-started/single-pane-of-glass-spog/) view that gives you visibility into the entire end to end workflow.
- Semantic versioning at any stage for consistently identifying a version of the software package.
- Configurable manual and automated gates for complete flexibility in managing the release.

##Release management workflow

Consider the following scenario:

- Your application is deployed to the Test environment and passes all checks.
- A new release candidate (RC) is created automatically and the semantic version number is incremented.
- Your Ops team is notified about the new release creation through a Slack channel. Additionally, your Dev or Product Manager can also be notified.
- Everyone on the team can see the features included in this release candidate.
- Your Ops team or product manager can decide when to trigger a manual deployment to production.

The image shows the workflow at a high level. Please note that the release job can be connected at any point in the pipeline.

<img src="/images/release/release-workflow.png" alt="Release management">
