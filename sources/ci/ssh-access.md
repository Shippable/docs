page_main_title: SSH Access to Build Machine
main_section: CI
sub_section: Debugging

# SSH Access to Build Machine
SSH access to build machine allows you to debug problems that arise due to differences in your local and Shippable environment. It also gives you a chance to play around with different commands to get to the best `shippable.yml` possible. Here is a list of FAQs to get you started:

## Which Machine image supports SSH access for debugging?
SSH debugging is supported on all AMI's for dynamic nodes. This option is not shown for Custom / System nodes since it is
inherently possible to SSH into these nodes.

## Which subscriptions can debug?
Only paid subscriptions using Shippable nodes can run debug builds.

## How do I start a debug build?
Simply go to any project which is on a paid subscription and click on build or rebuild. A popup appears asking you whether a debug build should be started or not.

<img src="../../images/ci/ssh-modal.png" alt="SSH modal">

## From where are my SSH keys added?
Your SSH keys are automatically synced from the SCM. You can look at what keys get added by going to your profile page. All these keys are added to the build machine.

<img src="../../images/ci/profile-ssh-keys.png" alt="Profile SSH Keys">

## Where do I find the SSH command?
Once the debug build has started. A new pane which shows the status of the request will appear in the job's page. This will show a spinner until the build machine is ready for debug.

<img src="../../images/ci/ssh-node-waiting.png" alt="Node Waiting">

Once the build machine in ready, a tick mark appears and the command to SSH into the build machine appears.

<img src="../../images/ci/ssh-debug-ready.png" alt="Node Ready">

## How is a debug build different from a normal build?

There are three differences between a normal build and a debug build apart from the fact that your SSH keys are added. They are -

1. Only the first job in a matrix builds will be generated.
2. A new section called `on_debug` with a sleep of 30 minutes gets added at the end of the build.
3. The node is killed after the debug is complete.

## Okay, now I'm on the debug machine. Where should I go?

Shippable starts two Docker containers to run your build:

- The first one called `shippable-exec` is the agent which orchestrates the build. If you're having trouble in the `pre_ci` or `pre_ci_boot` sections, `docker exec` into this container and run the problematic command(s).
- The second one called `c.exec` is where the build runs. If you're having trouble in `ci`, `post_ci`, `on_success`, `on_failure` sections,  `docker exec` into this container and run the problematic command(s).

<img src="../../images/ci/debug-docker-ps.png" alt="Docker status">

## I'm done debugging. How do I end the build?

Once you're done debugging, you can cancel the build. The node that ran the build will then shutdown.
