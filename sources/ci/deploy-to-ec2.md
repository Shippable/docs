page_main_title: Amazon EC2
main_section: CI
sub_section: Deployments
page_title: Deploying to EC2 using CodeDeploy
page_description: How to deploy your application to AWS CodeDeploy
page_keywords: AWS codedeploy, continuous deployment, CI/CD, continuous integration

# AWS CodeDeploy

AWS CodeDeploy is a service that handles automated deployment of
applications of any kind to Amazon EC2 instances. It supports many
advanced deployment strategies, allowing roll-out of the code to many
instances at once with ease. Please refer to [the AWS documentation](http://aws.amazon.com/documentation/codedeploy/) for details. CodeDeploy is totally language and technology agnostic, which means that any sort of build artifacts can be deployed with it.

CodeDeploy deployment process is similar to the one used by AWS OpsWorks
and differs from the process found in Heroku or Amazon Elastic
Beanstalk. While the latter are 'push-based', meaning that the
deployment is done by sending the build artifacts to the platform, with
CodeDeploy you configure the service to pull the code and artifacts from
a predefined location.

It is possible to fetch the build artifacts from two kind of resources:
AWS S3 bucket or GitHub repository. The overall process is the same, so
the guide below applies to both methods, except where explicitly noted.

To integrate Shippable with CodeDeploy, first you need to define
CodeDeploy application, launch and configure EC2 instances and assign
them to CodeDeploy deployment group. Each EC2 instance needs to run
CodeDeploy deployment agent and be tagged with the same identifier, so
it will be possible to refer to them as a group in AWS CodeDeploy
configuration. You can find details on how to configure the nodes in
[AWS CodeDeploy documentation](http://docs.aws.amazon.com/codedeploy/latest/userguide/how-to-prepare-instances.html).

Alternatively, you can let CodeDeploy create the environment with 3
instances for you, using its [deployment walkthrough](http://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-walkthrough.html).
Another option (and the one this guide follows) is to use AWS
CloudFormation template to launch the environment. The use of the
template is straightforward and facilitates creation of arbitrary number
of Amazon Linux instances that are ready for the deployment. You can
find the details on how to use the template
[here](http://docs.aws.amazon.com/codedeploy/latest/userguide/how-to-use-cloud-formation-template.html).

We will use [AWS CLI tool](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) to invoke deployments for your application. In order for this to work,
we need to provide the tools with several environment variables to
properly authenticate it against the API endpoint:

- Please refer to [this documentation](http://docs.aws.amazon.com/general/latest/gr/getting-aws-sec-creds.html)
  for details on obtaining the keys.
- Then, encrypt the secret key as discussed in secure_env_variables.
  Use `AWS_SECRET_ACCESS_KEY` as name for the secure variable (i.e.
  add `AWS_SECRET_ACCESS_KEY=<your secret key here>` in Shippable
  settings panel).
- You also need to specify which API endpoint the tool needs to
  connect to by setting `AWS_DEFAULT_REGION` environment variable.
- Next, add the secret along with your key id (`AWS_ACCESS_KEY_ID`)
  and region as environment variables in `shippable.yml` (please note
  that name of the variable matters).
- We also add environment variable for CodeDeploy application name
  (`CD_APP_NAME`) and deployment group (`CD_DEPLOYMENT_GROUP`), to be
  used later in `after_success` step. Note that these variables are
  here purely for our convenience and can be named differently, while
  the above ones are read by the AWS CLI tools and need to be called
  exactly as in the example.

```
env:
  global:
    - AWS_ACCESS_KEY_ID=AKIAJSZ63DTL3Z7KLVEQ
    - AWS_DEFAULT_REGION=us-west-2
    - secure: KRaEGMHtRkYxCmWfvHIEkyfoA/+9EWHcoi1CIoIqXrvsF/ILmVVr0jC7X8u7FdfAiXTqn3jYGtLc5mgo5KXe/8zSLtygCr9U1SKJfwCgsw1INENlJiUraHCQqnnty0b3rsTfoetBnnY0yFIl2g+FUm3A57VnGXH/sTcpDZSqHfjCXivptWrSzE9s4W7+pu4vP+9xLh0sTC9IQNcqQ15L7evM2RPeNNv8dQ+DMdf48915M91rnPkxGjxfebAIbIx1SIhR1ur4rEk2pV4LOHo4ny3sasWyqvA49p1xItnGnpQMWGUAzkr24ggOiy3J5FnL8A9oIkf49RtfK1Z2F0EryA==
    - CD_APP_NAME=ShippableCodeDeploy CD_DEPLOYMENT_GROUP=DemoFleet
```

Finally, we can install AWS CLI tools in `ci` step:

```
ci:
  - pip install awscli
```

## Creation of the AppSpec file

The CodeDeploy deployment procedure follows deployment definition that
specifies, among the others, the location of build artifact, the
deployment group to use and failure handling. Then, build artifact is
fetched by deployment agent on the individual nodes and logic contained
in `appspec.yml` file is executed. This file is mandatory and needs to
be placed in the root of the archive that is to be deployed.

The following sample presents `appspec.yml` file prepared for the
example Flask application that can be found on [our GitHub repository](https://github.com/shippableSamples/sample-python-codedeploy):

```
version: 0.0
os: linux
files:
  - source: /app.wsgi
    destination: /var/www/sample-app
  - source: /
    destination: /home/ec2-user/sample-app
  - source: /conf/sample_app.conf
    destination: /etc/httpd/conf.d
hooks:
  AfterInstall:
    - location: scripts/install_dependencies
      timeout: 300
      runas: root
  ApplicationStart:
    - location: scripts/start_server
      timeout: 300
      runas: root
  ApplicationStop:
    - location: scripts/stop_server
      timeout: 300
      runas: root
```

As you can see, it specifies where to put files from the repository and
what scripts (also contained in the build artifact) to run at different
steps of the process.

For example, here is the `scripts/install_dependencies` script that is
invoked after the files were copied, but before the Apache server is
restarted:

```
#!/bin/bash
yum install -y httpd mod_wsgi.x86_64
easy_install pip
pip install -r /home/ec2-user/sample-app/requirements.txt
```

You can find more details on AppSpec files in [the documentation](http://docs.aws.amazon.com/codedeploy/latest/userguide/app-spec-ref.html).

## Using S3 to store build artifacts

As noted above, CodeDeploy needs to 'pull' the build artifact from some
location to the node. Most of the time, a S3 bucket is used as a place
to 'host' the archives for CodeDeploy to use. To use this method, you
need to create a bucket and grant permissions to it to the user you
configured for Shippable. Next, you need to specify a key under which
the artifact will be kept. This can be a constant value (especially, if
you enable versioning for the bucket), but you can also generate the key
based on the variables associated with the build, such as commit hash or
branch name.

Next, the files that are to be deployed need to be packaged (as a
tarball or ZIP archive) along with the `appspec.yml` file and put into
the S3 bucket. In our case, we use `aws deploy push` command to automate
this step. Its options are documented in [AWS CLI reference](http://docs.aws.amazon.com/cli/latest/platform/deploy/push.html), but are pretty self-explanatory. By default, the tool will package all the files from the current directory and upload it to the location specified in `s3://<bucket name>/<key>` format.

In the example below, we've extracted bucket and key to environment
variables called `CD_BUCKET` and `CD_KEY`. The
`aws deploy create-deployment` command performs the actual deployment,
i.e. creates a deployment task on CodeDeploy service. Please note that
we specify the location of the artifact using `--s3-location` option,
pointing to the relevant bucket and key. The bundle type is `zip`, as
this is the format used by `aws deploy push` command.

```
on_success:
  - aws deploy push --application-name $CD_APP_NAME --s3-location s3://$CD_BUCKET/$CD_KEY --ignore-hidden-files
  - aws deploy create-deployment --application-name $CD_APP_NAME --s3-location bucket=$CD_BUCKET,key=$CD_KEY,bundleType=zip --deployment-group-name $CD_DEPLOYMENT_GROUP
```

> **Note**
>
> The `aws deploy push` command outputs suggested syntax for
> `aws deployment create-deployment` command on success, so you can run
> this command on your workstation to see recommended options.

## Pulling the code from GitHub

The other option is to configure CodeDeploy to pull the application code
directly from GitHub. In order for this to work, you need to first
authorize your CodeDeploy account with GitHub via CodeDeploy web
console. Details on how to approach this can be found in [the CodeDeploy documentation](http://docs.aws.amazon.com/codedeploy/latest/userguide/github-integ.html#github-integ-behaviors-auth).
After this, you can just launch `aws deploy create-deployment` command,
pointing to the repository and commit hash. Conveniently, both these
details are available as automatic environment variables in the
Shippable build:

```
on_success:
  - aws deploy create-deployment --application-name $CD_APP_NAME --github-location repository=$REPO_NAME,commitId=$COMMIT --deployment-group-name $CD_DEPLOYMENT_GROUP
```

## Making build wait for the deployment completion

You may note that `aws deploy create-deployment` command is totally
asynchronous, i.e. it only creates a deployment task, but does not wait
for its completion. For this very reason, the Shippable build will be
marked as successfully completed instantly after invoking the
deployment. As this is may not be the behavior you expect, we created a
small script that will block the build execution until the deployment is
complete, periodically pooling its status. It will also mark the build
as failed if the deployment fails.

The script is a part of our CodeDeploy sample and can be found on our
[GitHub repository](https://github.com/shippableSamples/sample-python-codedeploy/blob/master/scripts/wait_for_completion.py).
Its usage is very straightforward. Just pipe the result of the
`aws deploy create-deployment` command into it:

```
on_success:
  - aws deploy push --application-name $CD_APP_NAME --s3-location s3://$CD_BUCKET/$CD_KEY --ignore-hidden-files
  - aws deploy create-deployment --application-name $CD_APP_NAME --s3-location bucket=$CD_BUCKET,key=$CD_KEY,bundleType=zip --deployment-group-name $CD_DEPLOYMENT_GROUP | python scripts/wait_for_completion.py
```

We invite you to explore the full sample at [Shippable GitHub account](https://github.com/shippableSamples/sample-python-codedeploy).
