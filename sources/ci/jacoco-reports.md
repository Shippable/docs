page_main_title: JaCoCo reports
main_section: CI
sub_section: Configuring test and code coverage
page_title: Advanced Reporting with JaCoCo
page_description: View your JaCoCo reports with rich visualizations in your continuous integration build
page_keywords: java, jacoco, continuous integration, CI/CD, code coverage

# JaCoCo
JaCoCo is a free code coverage library for Java, which was created by the [EclEmma](http://www.eclemma.org/jacoco/) team based on the lessons learned from using and integrating existing libraries for many years.  It's a widely used tool, and as a result, finding examples and plugins that utilize it is a breeze.  It helps provide detailed coverage reports for your Java projects.

## Yml setup
On the surface, using Jacoco on Shippable is not much different from [any other form of java coverage](java-continuous-integration/).  However, there are some features available to Jacoco users that other formats won't be able to take advantage of yet.

Like with other forms of coverage, Shippable requires that the results be placed in the `shippable/codecoverage` directory.  Once your build is complete, we'll scan that directory for relevant files that we can produce coverage results from.  Those results will be stored alongside your build so that you can analyze them later.  In this case, we are specifically looking for a file named `jacoco.xml`.  Once found, Shippable will parse the file and calculate the results.

Here's an example shippable.yml file that shows the easiest way to have your Jacoco results recognized and parsed.

```
language: java

jdk:
  - oraclejdk7

build:
  ci:
    # mvn install will create a `target` folder which will contain a jacoco.xml
    # jacoco.xml will be present at path `target/site/jacoco/`
    - mvn install

    # copy this file to the `shippable/codecoverage` folder
    - cp target/site/jacoco/jacoco.xml shippable/codecoverage

```


This will produce the standard Shippable coverage results that look something like this:

<img src="../../images/ci/jacoco/noAdvancedReporting.png" alt="Basic results">

In order to get advanced reports, you must copy more than just the xml file to get the full results.

```
language: java

jdk:
  - oraclejdk7

build:
  ci:

    # mvn install will create a `target` folder which will contain a jacoco.xml
    # jacoco.xml will be present at path `target/site/jacoco/jacoco.xml`
    - mvn install

    # copy this target folder to the `shippable/codecoverage` folder
    # Shippable will look for the jacoco.xml file at
    # shippable/codecoverage/target/site/jacoco/jacoco.xml
    - cp -r target shippable/codecoverage

```

Now you're ready to see some advanced results.

## Navigating the results

Once you've managed to run a successful build, and store all of the necessary output in the correct location, you can visit the Shippable website and view the results.

Find your build, and click on the "coverage" tab.  The first indication that you did something right is the presence of the "Show Details" button at the bottom of the coverage results. It looks like this:

<img src="../../images/ci/jacoco/showDetailsButton.png" alt="Behold!" style="width:700px;"/>

If you don't see this button, it means Shippable couldn't find the files it needed to produce the detailed reports. Double check that your yml is copying them to the correct place.

Once the button is clicked, you'll see some additional information beyond what is displayed in the top section.

<img src="../../images/ci/jacoco/overallCoverageSummary.png" alt="initial expand" style="width:700px;"/>

In the Job Coverage Files section you can download the code coverage file in the .tar.gz format.

<img src="../../images/ci/jacoco/downloadButton.png" alt="download file section" style="width:700px;"/>

Below the Overall Coverage Summary section, you can see average line coverage trend graph and branch coverage trend graph for overall
coverage results of the last ten runs.
The Red color shows the missed line and branch coverage, whereas the green color depicts the covered line and branch coverage.

<img src="../../images/ci/jacoco/trendGraph.png" alt="trend graph section" style="width:700px;"/>

In the Coverage Breakdown Report section, you can see a dropdown, which will allow you to switch between a package level view, and a file level view.

<img src="../../images/ci/jacoco/packagesVsFiles.png" alt="packages vs files" style="width:700px;"/>

From the packages view, it is possible to narrow your results down to a specific package by clicking on the package name in the leftmost column

<img src="../../images/ci/jacoco/leftColumnHighlight.png" alt="drill down" style="width:700px;"/>

Now you're looking at that particular package. You can see all of the classes in that package, stats for each class as well as
the average package line and branch trend graph of last ten runs for that particular package.

<img src="../../images/ci/jacoco/packageDetail.png" alt="package details" style="width:700px;"/>

From there, you can take it one step further and focus on a single class within that package.  Once again, simply click on the name of the class in the leftmost column that you want details for.

<img src="../../images/ci/jacoco/classDetails.png" alt="class in session" style="width:700px;"/>

Now all the methods in a particular class will be shown, and to see the details of a specific method, simply click on that method name
and then that particular file will be shown with the lines and branches that are fully covered (shown in dark green), partially covered
(shown in grey) and uncovered (shown in dark red).

<img src="../../images/ci/jacoco/colorDetails.png" alt="source code view" style="width:700px;"/>

This allows you to really get to the bottom of any missed lines.
