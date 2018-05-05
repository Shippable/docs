page_main_title: Console logs
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Console logs
page_description: Console logs for Shippable CI builds

# Console logs

Console logs are available real time for every build on the Build details page. Sections have a `+` to the left of them and can be collapsed or expanded as desired. You can also copy text from the console log.

<img src="../../images/ci/console-logs.png" alt="Console Logs for CI/CD" style="width:900px;"/>

##Downloading logs

The **Download** dropdown on the right of the build item console lets you download console logs to your machine.

<img src="../../images/ci/download-logs.png" alt="Download logs" style="width:900px;"/>

##Log size limits

There are some limits for log size beyond which we take specific actions:   

-  If the log for your build exceeds 30,000 lines, it will not be displayed in the UI. However, you will still be able to download it.
-  Maximum allowed log size per build is 16 MB at this time. If your log for a build  exceeds 16 MB, it will not be displayed in the UI and you will not be able to download it. Your build will continue and the result will be unaffected but debugging might be a challenge due to lack of logs.

##Logs storage duration

We store your console logs for **at least 3 months** after your build completes. Please note that for builds that ran prior to February 17, 2017, this period was 14 days.
