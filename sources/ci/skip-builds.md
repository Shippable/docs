page_main_title: Skipping a build
main_section: CI
sub_section: Advanced config
page_title: Skipping a build
page_description: How to skip a build in Shippable

# Skipping a build

Any changes to your source code will trigger a build automatically on
Shippable. So if you do not want to run build for a particular commit,
then add **[ci skip]** or **[skip ci]** to your commit message.

Our webhook processor will look for the string **[ci skip]** or **[skip
ci]** in the commit message and if it exists, then that particular
webhook build will not be executed.
