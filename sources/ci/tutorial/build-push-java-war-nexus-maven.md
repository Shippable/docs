page_main_title: Build and Push a Java WAR file to Nexus Repo with Maven
main_section: Tutorial
sub_section: Build and Push Images
sub_sub_section: Nexus
page_title: Build and Push a Java WAR file to Nexus Repo with Maven
page_description: Continuously build and push a Java app to Nexus Repo with Maven
page_keywords: Java builds, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, Maven, Nexus Repository

# Build and Push Java WAR file to Nexus Repository with Maven

This tutorial explains how to continuously build and push a Java based web application to a Nexus Repository using Maven.. We are using a Java demo application that has basic CI tests.

These are the following concepts you need to be familiar with to proceed further

* [Maven in 5 mins](http://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
* [Install Maven](https://maven.apache.org/install.html)
* [Settings.xml](https://maven.apache.org/settings.html)
* [pom.xml](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html)
* [Nexus Repository Quick Start](https://help.sonatype.com/learning/repository-manager-3/proxying-maven-and-npm-quick-start-guide)

## Manual Steps to Build
This section covers step by step instructions to manually do this on your machine.

* Create a GitHub repo that will hold the code to build the image. For this e.g. full source code is available [here](https://github.com/devops-recipes/java_web_app)
* Either install Nexus Repository or have credentials to an exisiting installation. You will need the following information
 * Nexus Repo URL
 * Username
 * Password
 * Repo Name 
* Install Java Oracle 8 SDK on your local machine and make sure $JAVA_HOME is set. You can follow this on [Digital Ocean blog](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04) or here is [our version](https://github.com/devops-recipes/build_custom_ci_image/blob/master/java/install.sh) 
* Install Maven on to your local machine [code to install - line 69 onwards](https://github.com/devops-recipes/build_custom_ci_image/blob/master/install.sh)
* Create settings.xml in this location `~/.m2/settings.xml`

**[settings.xml](https://raw.githubusercontent.com/devops-recipes/java_web_app/master/temp/settings.xml)** 

```
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.1.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.1.0 http://maven.apache.org/xsd/settings-1.1.0.xsd">

    <servers>
        <server>
            <id>nexus-snapshots</id>
            <username>${nexus_username}</username>
            <password>${nexus_password}</password>
        </server>
        <server>
            <id>nexus-releases</id>
            <username>${nexus_username}</username>
            <password>${nexus_password}</password>
        </server>
    </servers>

    <mirrors>
        <mirror>
            <id>central</id>
            <name>central</name>
            <url>${nexus_url}/repository/maven-public/</url>
            <mirrorOf>*</mirrorOf>
        </mirror>
    </mirrors>

</settings>
```
replace `${nexus_url}`, `${nexus_username}` & `${nexus_password}` with your values. This file sets the global setting for Maven. We are defining 2 nexus endpoints, one for snapshots and one for releases. We also have a central mirror to download all your dependencies.

* update your `pom.xml` for the app



**[pom.xml](https://raw.githubusercontent.com/devops-recipes/java_web_app/master/pom.xml)** 

```
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://maven.apache.org/POM/4.0.0"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>${group_id}</groupId>
	<artifactId>${artifact_id}</artifactId>
	<packaging>${artifact_extension}</packaging>
	<version>${artifact_version}</version>
	<name>HelloWorld Maven Webapp</name>
	<url>http://maven.apache.org</url>

	<properties>
		<spring.version>4.3.2.RELEASE</spring.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
		</dependency>

		<!-- Spring dependencies -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-web</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
		    <groupId>org.springframework</groupId>
		    <artifactId>spring-test</artifactId>
		    <version>4.0.5.RELEASE</version>
		</dependency>
		<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
				<version>1.4.0.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
				<version>1.4.0.RELEASE</version>
    </dependency>

		<dependency>
		    <groupId>org.springframework.boot</groupId>
		    <artifactId>spring-boot-starter-tomcat</artifactId>
				<version>1.4.0.RELEASE</version>
		    <scope>provided</scope>
		</dependency>
	</dependencies>

	<build>
		<finalName>HelloWorld</finalName>
		<plugins>
			<plugin>
				<artifactId>maven-clean-plugin</artifactId>
				<version>3.0.0</version>
			</plugin>
			<!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_jar_packaging -->
			<plugin>
				<artifactId>maven-resources-plugin</artifactId>
				<version>3.0.2</version>
			</plugin>
			<plugin>
				<artifactId>maven-install-plugin</artifactId>
				<version>2.5.2</version>
			</plugin>
			<plugin>
				<artifactId>maven-deploy-plugin</artifactId>
				<version>2.8.2</version>
			</plugin>
			<plugin>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>3.0</version>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
				</configuration>
			</plugin>
			<plugin>
		    	<artifactId>maven-surefire-plugin</artifactId>
				<version>2.19.1</version>
				<configuration>
			    	<redirectTestOutputToFile>true</redirectTestOutputToFile>
			    	<reportsDirectory>${ship_test_res_loc}</reportsDirectory>
			  	</configuration>
		    	<dependencies>
		      		<dependency>
		        		<groupId>org.apache.maven.surefire</groupId>
		        		<artifactId>surefire-junit47</artifactId>
		        		<version>2.19.1</version>
		      		</dependency>
		    	</dependencies>
		  	</plugin>
		</plugins>
	</build>
    <distributionManagement>
        <snapshotRepository>
            <id>nexus-snapshots</id>
            <url>${repository_url}</url>
        </snapshotRepository>
    </distributionManagement>
</project>
```
Replace `${repository_url}` with the full URL of your repository to where you want to push the WAR. `${group_id}` is the group id, `${artifact_id}` is the name of your artifact, `${artifact_extension}` is war in this case, `${artifact_version}` is the version number.

* Execute this command to test and then push the WAR file to your repo `mvn -q -B clean install deploy`.
* You should see a new version uploaded to your Nexus repo. 


## Challenges with manual build
There are a few challenges with manual builds

* You have prepare your local environment with all the software, tools and packages. This could interfere with other projects you might be working on.
* Your machine is under load during the build process.
* Builds don't trigger automatically if your souce code changes.
* You have to manually manage the credentials and be careful about which creds are you using and what is currently set. Very easy to make mistakes. 
* You cannot trigger further steps of your pipeline when you update a new version, automatically.

## Automating Maven Build and Push
Now lets try and automate this so that you do not need to do all the manual steps. 

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts

* [Integrations](/platform/integration/overview/)
 * [Key Value](/platform/integration/key-value/)
* [Jobs](/platform/workflow/job/overview/)
 * [runCI](/platform/workflow/job/runci)

### Step by step instructions
The following sections explain the process of setting up an AL to continuously test, build and push a Java WAR file to Nexus Repository. The build process uses Maven to build, test and push the WAR file.

**Source code is available at [devops-recipes/java_web_app](https://github.com/devops-recipes/java_web_app	)**

**Complete YML is at [devops-recipes/java_web_app/shippable.yml](https://github.com/devops-recipes/java_web_app/blob/master/shippable.yml)**

####1. Add necessary Account Integrations
Integrations are used to connect Shippable Platform with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). The following are the integrations that we will use in this sample

**1a. Add `Key Value` Integration**
We want to store Nexus secrets into a Key Value integration named `drship_nexus`. This allows us to inject these at run time without having to store them in scripts.

Add the following keys and their values to the integration

* `nexus_url`
* `nexus_username`
* `nexus_password`

Detailed steps on how to add a Docker Registry Integration are [here](/platform/integration/key-value/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####2. Author CI configuration
The platform is built with "Everything as Code" philosophy and it uses YAML based configuration file called `shippable.yml`.

Detailed CI configuration info is [here](/ci/yml-structure/).

**2a. Add empty shippable.yml to your repo**

Add an empty config file to the the root of your repo.

**2b. Add `ci` section of the config**

`shippable.yml` is a declarative way to configure your Continuous Integration steps on Shippable. Add this file to the repo that contains the `Dockerfile`. For this e.g. it is `https://github.com/devops-recipes/java_web_app`.

Configure CI steps by adding the following code snipped to the YML file

```
language: java

jdk:
  - oraclejdk8

integrations:
  generic:
    - integrationName: drship_nexus

env:
  global:
    - group_id="com.demo"
    - artifact_id="helloworld"
    - artifact_version="0.0.1-SNAPSHOT"
    - artifact_extension="war"
    - artifact_repo="repository/snapshots"
    - ship_test_res_loc="shippable/testresults"

build:
  ci:
    - export repository_url=$nexus_url"/"$artifact_repo
    - |
       mkdir -p $ship_test_res_loc
       mkdir -p ~/.m2
    - shipctl replace temp/settings.xml pom.xml
    - cp temp/settings.xml ~/.m2/.
    - mvn -q -B clean install deploy
    - ls -al $SHIPPABLE_BUILD_DIR/target

```

The above YML does the following things:

* Language is set to Java
* Version of Java is set to oraclejdk8
* The integration is referenced here to automatically inject Nexus Creds
* A few global environment variables hold the information about the WAR artifact. Please replace these values as per your application settings.
* The build section defines the scripts to build and push the WAR file. We have a template of `settings.xml` which is replaced with the the integration values. We also replace the `pom.xml` with the values provided at run time and then put the files in the required paths.
* We then do a mvn build and deploy, and that should deploy you new WAR file as a new version to your Nexus Repository

####3. Enable the repo for CI
For automated builds, we need to enable the project for CI. Once enabled, the platform will automatically create the webhooks required to continuously build the project.

Detailed steps on enabling a repo are [here](/ci/enable-project/).

####4. Run your CI Project
At this stage, you can either manually trigger your CI project or commit a change to the application git repository which should automatically build your project.

## Using a lightweight Custom CI Image and adding CD capabilities
There are situations where instead of using our default all in one images, you want to use a lighweight CI image. This section talks about how to achieve that for the same example

Build and pushing the lightweight image is outside the scope of this example. A full tutorial to do that is present [here](/ci/tutorial/build-custom-ci-image). This sample puts the tag of the image that it builds into an image resource called `build_custom_ci_img_dh` which is what we use here to make the tags dynamic and our job will use the latest tag when it runs.

### Concepts
Here are the additional concepts you need to know before you start:

* [Resources](/platform/workflow/resource/overview/)
 * [image](/platform/workflow/resource/image)
* [Jobs](/platform/workflow/job/overview/)
 * [runCI](/platform/workflow/job/runci)


####1. Extend the CI Config
Add the following YAML config after the CI config from the prior step. This enables the CI process to output the tags to image resource which will be defined next

```
# OPTIONAL: if you want to use custom Docker Build Image and also store information in a params
# resource to be used in downstream Assembly Lines
  pre_ci:
    - export IMG_TAG=$(shipctl get_resource_version_key build_custom_ci_img_dh "versionName")

  pre_ci_boot:
    image_name: devopsrecipes/build_custom_ci
    image_tag: $IMG_TAG
    pull: true

  on_success:
    - shipctl put_resource_state_multi war_loc "versionName=$artifact_version" "artifact_version=$artifact_version" "group_id=$group_id" "artifact_id=$artifact_id"
    - shipctl put_resource_state_multi war_loc "artifact_extension=$artifact_extension" "repository_url=$repository_url" "build_nbr=$BUILD_NUMBER"

```

* `pre_ci` section runs before the `ci` section. In this case we are extracting the `IMG_TAG` from the image resource `build_custom_ci_img_dh` that was created as part of [this](/ci/tutorial/build-custom-ci-image).
* `pre_ci_boot` we are instructing the build system to boot this docker image in which CI steps will execute

* If the ci section runs without any error, then using in-built utility function `put_resource_state` we copy a bunch of key values into a param resource `war_loc`. Utility functions are invoked using the command `shipctl`. A full list of these commands are [here](platform/tutorial/using-shipctl)

####2. Author Assembly Line configuration
In addition to CI, Shippable also provides CD capabilities through AL config

Detailed AL configuration info is [here](/deploy/configuration).

**2a. Add `resources` section of the config**

`resources` section defines the params resource which will hold information about the WAR and its location

```
resources:
  - name: war_loc
    type: params
    versionTemplate:
      params:
        seed: true
```
#####i. params resource named `war_loc`
A params resource which holds key values about the WAR and its location. We are defining a placeholder `seed` value here. The rest of the information is populated when `on_success` of CI job executes.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

**2b. Add `jobs` section of the config**

A job is the actual execution unit of the assembly line. In this job, we are defining the relationship with the image and the CI job above

#####i. job named `java_web_app_runCI`.

```
jobs:
  - name: java_web_app_runCI
    type: runCI
    dependencyMode: strict
    triggerMode: parallel
    steps:
      - IN: build_custom_ci_img_dh
      - OUT: war_loc
    flags:
      - war
```

When a CI project is enabled a job is automatically created with the name of the repo appended by `_runCI`. We are extending this automatically created CI job to also have a params resource as output. In additon we are also adding a flag. We also add `build_custom_ci_img_dh` as an input to this job.

**2c. Push changes to shippable.yml**

Commit and push all the above changes to shippable.yml.

####3. Attach the AL to your Repo's Subscription
In Shippable's world, an Org or a Group depending on the SCM system you are using equate to a Subscription. We will hook the YML so that the platform can render the AL.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/build-push-java-war-nexus-maven-fig1.png" alt="E2E Pipeline View">

Detailed info to hook your AL is [here](/deploy/configuration/#adding-a-syncrepo).


###4. Test your Assembly Line
Add a commit to your repo and you should see the CI process kick off, which builds a WAR file and then pushes it to Nexus Repository. The location info is then pushed into a params resource as a new version.

If your params resource is an IN to another job in your workflow that pull the WAR file, that job will be triggered every time the `war_loc` version is updated.

## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
* Using specific version of Google CLI
* Creating parametrized Jobs
* Using templates inside your Job
* Logging into your deployment cluster using CLI

