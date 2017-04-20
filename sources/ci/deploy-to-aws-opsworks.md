main_section: CI
sub_section: Deployments
page_title: Deploying to AWS OpsWorks
page_description: How to deploy your application to AWS OpsWorks
page_keywords: aws opsworks, continuous deployment, CI/CD

# AWS OpsWorks

AWS OpsWorks is a new PaaS offering from Amazon that targets advanced IT
administrators and DevOps, providing them with more flexibility in
defining runtime environments of their applications. In OpsWorks,
instances are arranged in so called layers, which in turn form stacks.
Please refer to [the AWS documentation](http://docs.aws.amazon.com/opsworks/latest/userguide/gettingstarted.html) for details.

OpsWorks allows provisioning instances with custom Chef recipes, which
means unconstrained range of technologies that may be used on this
platform. Predefined Chef cookbooks are available for PHP, Ruby on
Rails, Node.js and Java.

OpsWorks deployment process has slightly different nature than the one
for Heroku or Amazon Elastic Beanstalk. While the former are
'push-based', meaning that the deployment is done by sending the build
artifacts to the platform, with OpsWorks you configure the service to
pull the code and artifacts from a predefined resource.

This is done during definition of your application on OpsWorks, by
entering URL for the repository. Please note that for public access
(without adding an SSH key), you need to use appropriate protocol for
the endpoint, for example
`https://gihub.com/Shippable/sample-php-mysql-opsworks.git` or
`git://gihub.com/Shippable/sample-php-mysql-opsworks.git`, instead of
SSH URL, such as `github.com:Shippable/sample-php-mysql-opsworks.git`.

> **Note**
>
> During our tests, some git commands (like `ls-remote`) timed out for
> 'public' URLs on GitHub. This problem does not occur for SSH access,
> so you may need to create a SSH key for public repositories as well.
> To do so, execute `ssh-keygen -f opsworks` on your workstation and
> save the resulting files (`opsworks` and `opsworks.pub`) in a safe
> place. Then, add the contents of `opsworks.pub` to Deployment Keys in
> your GitHub repository settings. Next, paste the contents of
> `opsworks` file in SSH key box in Application definition in OpsWorks
> admin panel.

To integrate Shippable with OpsWorks, first define the stack, layers,
instances and application as outlined in the AWS documentation. We will
use [AWS CLI tool](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
to invoke deployments for your application. In order for this to work,
we need to provide the tools with your AWS access keys to authenticate
with the AWS endpoint:

- Please refer to [this documentation](http://docs.aws.amazon.com/general/latest/gr/getting-aws-sec-creds.html)
  for details on obtaining the keys.
- Then, encrypt the secret key as discussed in secure_env_variables.
  Use `AWS_SECRET_ACCESS_KEY` as name for the secure variable (i.e.
  add `AWS_SECRET_ACCESS_KEY=<your secret key here>` in Shippable
  settings panel).
- Next, add the secret along with your key id as environment variables
  in `shippable.yml` (please note that name of the variable matters):

```
env:
  global:
    - AWS_ACCESS_KEY_ID=AKIAJSZ63DTL3Z7KLVEQ
    - secure: KRaEGMHtRkYxCmWfvHIEkyfoA/+9EWHcoi1CIoIqXrvsF/ILmVVr0jC7X8u7FdfAiXTqn3jYGtLc5mgo5KXe/8zSLtygCr9U1SKJfwCgsw1INENlJiUraHCQqnnty0b3rsTfoetBnnY0yFIl2g+FUm3A57VnGXH/sTcpDZSqHfjCXivptWrSzE9s4W7+pu4vP+9xLh0sTC9IQNcqQ15L7evM2RPeNNv8dQ+DMdf48915M91rnPkxGjxfebAIbIx1SIhR1ur4rEk2pV4LOHo4ny3sasWyqvA49p1xItnGnpQMWGUAzkr24ggOiy3J5FnL8A9oIkf49RtfK1Z2F0EryA==
```

Finally, we can install and invoke AWS CLI tools to invoke deployment
command in `on_success` step (application configuration settings were
extracted to environment variables for readability):

```
env:
  global:
    - AWS_DEFAULT_REGION=us-east-1 AWS_STACK=73f89cfc-3f99-4227-a339-73a0ba30acbb AWS_APP_ID=1604ff83-aeb4-4677-b436-a9daac1ceb98
    - AWS_ACCESS_KEY_ID=AKIAJSZ63DTL3Z7KLVEQ
    - secure: KRaEGMHtRkYxCmWfvHIEkyfoA/+9EWHcoi1CIoIqXrvsF/ILmVVr0jC7X8u7FdfAiXTqn3jYGtLc5mgo5KXe/8zSLtygCr9U1SKJfwCgsw1INENlJiUraHCQqnnty0b3rsTfoetBnnY0yFIl2g+FUm3A57VnGXH/sTcpDZSqHfjCXivptWrSzE9s4W7+pu4vP+9xLh0sTC9IQNcqQ15L7evM2RPeNNv8dQ+DMdf48915M91rnPkxGjxfebAIbIx1SIhR1ur4rEk2pV4LOHo4ny3sasWyqvA49p1xItnGnpQMWGUAzkr24ggOiy3J5FnL8A9oIkf49RtfK1Z2F0EryA==

on_success:
  - virtualenv ve && source ve/bin/activate && pip install awscli
  - aws opsworks create-deployment --stack-id $AWS_STACK --app-id $AWS_APP_ID --command '{"Name":"deploy"}'

```

> **Warning**
>
> Do not change AWS region from `us-east-1` even if your instances
> reside in a different region! This is a requirement of OpsWorks at the
> moment that all the requests are sent to this region, see [the documentation](http://docs.aws.amazon.com/opsworks/latest/userguide/cli-examples.html#cli-examples-create-deployment).

> **Note**
>
> `AWS_STACK` and `AWS_APP_ID` are not the names of your
> stack/application, but so called OpsWorks IDs. They can be accessed in
> stack/application settings page in the OpsWorks Management console.

## Connecting to MySQL

OpsWorks provides predefined MySQL layer to add to your stack.
Connection details for the database are stored in a generated file in
the application root. Type of the file being generated depends on the
programming language you defined for your app. For example, for PHP it
is `opsworks.php` scripts that exposes two classes: `OpsWorksDb` and
`OpsWorks`. You can instantiate these classes to access connection
details, as follows:

```
require_once("shared/config/opsworks.php");
$opsWorks = new OpsWorks();
$db = $opsWorks->db;
$con = mysqli_connect($db->host, $db->username, $db->password, $db->database);
```

During tests on Shippable, we need to provide similar file to simulate
production environment. For PHP, add the following file to your
repository (e.g. under `test-config/opsworks.php`):

```
<?php
class OpsWorksDb {
  public $adapter, $database, $encoding, $host, $username, $password, $reconnect;

  public function __construct() {
    $this->adapter = 'mysql';
    $this->database = 'test';
    $this->encoding = 'utf8';
    $this->host = '127.0.0.1';
    $this->username = 'shippable';
    $this->password = '';
    $this->reconnect = 'true';
  }
}

// ...rest of the file omitted for brevity, you can access it at
// https://github.com/shippableSamples/sample-php-mysql-opsworks/blob/master/test-config/opsworks.php
```

Then, in `ci` step of your build, copy this file to the
location required by your application code:

```
ci:
  - cp test-config/opsworks.php .
```

See the full sample of PHP web application featuring MySQL connection
[on GitHub](https://github.com/shippableSamples/sample-php-mysql-opsworks)
for details.

## General information on using Amazon DynamoDB

Amazon DynamoDB is a schema-less, fully managed NoSQL database service.
It is not a part of OpsWorks offering, but rather a separate service
that is accessed using SDK provided by Amazon.

As DynamoDB is not available for download and is hosted only by Amazon,
special care needs to be taken while setting up Shippable build.
Connecting to the real DynamoDB from the integration tests is not an
option most of the times, mostly due to cost considerations and time it
takes to create a new table in DynamoDB.

For this reason, mock databases were implemented, such as
[Dynalite](https://github.com/mhart/dynalite). Comprehensive list of the
available mock databases is available on the [AWS blog](http://aws.amazon.com/blogs/aws/amazon-dynamodb-libraries-mappers-and-mock-implementations-galore/).
During our tests it turned out that only the official mock
implementation provided by Amazon ([DynamoDB Local](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.DynamoDBLocal.html))
worked flawlessly with PHP SDK and this is the reason why it was
included in the samples below. Your mileage may vary, especially as
other mock databases catch up with the changes in the SDK.

We also need to inject AWS access key into the production environment,
so our application can connect to the DynamoDB API endpoint. There are
several ways of realizing this, all of which are documented extensively
in the [AWS SDK guide](http://docs.aws.amazon.com/aws-sdk-php/guide/latest/credentials.html#credential-profiles).
Here, we will take advantage of the fact that the access key is already
available in the Shippable build (in encrypted form, see above) and
generate the configuration file during deployment.

To make the application under test connect to the mock database, we will
override `endpoint` parameter passed to AWS SDK. Create a JSON file
(called `aws.json` here) with following contents:

```
{
  "includes": ["_aws"],
  "services": {
    "default_settings": {
      "params": {
        "key": "fake_key",
        "secret": "fake_secret",
        "region": "us-west-2",
        "base_url": "http://localhost:8000"
      }
    }
  }
}
```

Supplying `key`, `secret` and a valid region is mandatory, even though
they will not be used in the test environment. For this reason, we enter
some fake values to make sure that the application will not be able to
reach our production DynamoDB instance.

```
env:
  global:
    - AWS_DEFAULT_REGION=us-east-1 AWS_STACK=73f89cfc-3f99-4227-a339-73a0ba30acbb AWS_APP_ID=1604ff83-aeb4-4677-b436-a9daac1ceb98
    - AWS_ACCESS_KEY_ID=AKIAJSZ63DTL3Z7KLVEQ AWS_REAL_REGION=us-west-2
    - DYNAMODB_LOCAL_DIR=/tmp/dynamodb-local
    - secure: KRaEGMHtRkYxCmWfvHIEkyfoA/+9EWHcoi1CIoIqXrvsF/ILmVVr0jC7X8u7FdfAiXTqn3jYGtLc5mgo5KXe/8zSLtygCr9U1SKJfwCgsw1INENlJiUraHCQqnnty0b3rsTfoetBnnY0yFIl2g+FUm3A57VnGXH/sTcpDZSqHfjCXivptWrSzE9s4W7+pu4vP+9xLh0sTC9IQNcqQ15L7evM2RPeNNv8dQ+DMdf48915M91rnPkxGjxfebAIbIx1SIhR1ur4rEk2pV4LOHo4ny3sasWyqvA49p1xItnGnpQMWGUAzkr24ggOiy3J5FnL8A9oIkf49RtfK1Z2F0EryA==

ci:
  - test -e $DYNAMODB_LOCAL_DIR || (mkdir -p $DYNAMODB_LOCAL_DIR && wget http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest -qO- | tar xz -C $DYNAMODB_LOCAL_DIR)
```

Then, in the `ci` step, we download the latest version of
DynamoDB Local and extract it to a temporary location. In `script` step
we first kill any outstanding instances of the database, then launch the
mock database in the background, saving the process pid in a variable.
We use `-inMemory` option here so that the mock database will not save
any data to disk. Next, the actual tests are run and we complete the
step by shutting down the database instance.

```
ci:
  - ps -ef | grep [D]ynamoDBLocal | awk '{print $2}' | xargs --no-run-if-empty kill
  - java -Djava.library.path=$DYNAMODB_LOCAL_DIR/DynamoDBLocal_lib -jar $DYNAMODB_LOCAL_DIR/DynamoDBLocal.jar -inMemory &
  - DYNAMODB_PID=$!
  # tests run here (language-specific)
  - kill $DYNAMODB_PID

```

> **Note**
>
> `grep` invocation above creates a (somewhat extraneous) character
> class for the first letter of the search string. This is done to
> prevent `grep` from including itself in the results. It works because
> the `grep` process will have `[D]ynamoDBLocal` string in its command,
> which is not matched by `[D]ynamodblocal` (because of the square
> brackets).

Next, we need some way of injecting AWS secret key in the `aws.json`
file on the target OpsWorks instance. This can be done by registering a
Chef deployment hook that will overwrite this file with values retrieved
from Chef configuration. Hooks are registered by placing aptly named
files in `deploy` directory in your repository root. Please refer to
[AWS documentation](http://docs.aws.amazon.com/opsworks/latest/userguide/workingcookbook-extend-hooks.html) and [Opscode documentation on deploy resource](http://docs.opscode.com/resource_deploy.html#deploy-phases) if you interested in details.

For your convenience, here (and in samples repositories) we provide a
`before_restart` hook that will generate correct `aws.json`. Please note
that we don't define `endpoint` here, so AWS will pick the correct one
based on the region. Place this file as `deploy/before_restart.rb` in
your repository root:

```ruby
require 'json'

Chef::Log.info('Generating aws.json configuration file')

aws_config = {
  :includes => ['_aws'],
  :services => {
    :default_settings => {
      :params => {
        :key => node[:dynamodb][:aws_key],
        :secret => node[:dynamodb][:aws_secret],
        :region => node[:dynamodb][:region]
      }
    }
  }
}

aws_file_path = ::File.join(release_path, 'aws.json')
file aws_file_path do
  content aws_config.to_json
  owner new_resource.user
  group new_resource.group
  mode 00440
end
```

The script above reads the required configuration variables from the
Chef node attributes and saves them as JSON file in the format expected
by AWS SDKs.

While launching deployment, we can override node attributes by passing
[custom JSON](http://docs.aws.amazon.com/opsworks/latest/userguide/workingstacks-json.html).  We will take advantage of this option to set node attributes that the
hook above expects. The special syntax with `>` sign is used here to
prevent YAML parser from interpreting colons in the JSON definition.

```
on_success:
  - >
    DEPLOY_JSON=$(printf '{"dynamodb": {"aws_key": "%s", "aws_secret": "%s", "region": "%s"}}' $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY $AWS_REAL_REGION)
  - virtualenv ve && source ve/bin/activate && pip install awscli
  - aws opsworks create-deployment --stack-id $AWS_STACK --app-id $AWS_APP_ID --command '{"Name":"deploy"}' --custom-json "$DEPLOY_JSON"
```

Then proceed to configure your application as is outlined in
per-language guides below.

## Using DynamoDB with PHP

To access DynamoDB, you need some client library that is able to speak
AWS API. We will use the official [AWS PHP SDK](http://aws.amazon.com/sdkforphp/) in the sample below. We will install the library using [Composer](https://getcomposer.org/). Create `composer.json` in the root of your repository with the following contents:

```
{
  "require": {
    "aws/aws-sdk-php": "2.*"
  }
}
```

Composer will be already available on Shippable minion. Install the
dependencies during `before_script` step as follows:

```
on_success:
  - mkdir -p shippable/testresults
  - mkdir -p shippable/codecoverage
  - composer install
```

Then, we need to perform the same step on the target OpsWorks instance.
Add the following deploy hook as `deploy/before_symlink.rb`:

```
run "cd #{release_path} && ([ -f tmp/composer.phar ] || curl -sS https://getcomposer.org/installer | php -- --install-dir=tmp)"
run "cd #{release_path} && php tmp/composer.phar --no-dev install"
```

We can then proceed to consume `aws.json` file we created in the
previous section to instantiate AWS SDK client:

```
require('vendor/autoload.php');
use Aws\Common\Aws;

$aws = Aws::factory('aws.json');
$client = $aws->get('DynamoDb');
```

This client can be then used to interact with DynamoDB, for example as
follows:

```
$client->createTable(array(
  'TableName' => self::TABLE_NAME,
  'AttributeDefinitions' => array(
    array(
      'AttributeName' => 'id',
      'AttributeType' => 'N'
    )
  ),
  'KeySchema' => array(
    array(
      'AttributeName' => 'id',
      'KeyType' => 'HASH'
    )
  ),
  'ProvisionedThroughput' => array(
    'ReadCapacityUnits' => 1,
    'WriteCapacityUnits' => 1
  )
));
```

Refer to the [DynamoDB client documentation](http://docs.aws.amazon.com/aws-sdk-php/guide/latest/service-dynamodb.html) and [the full sample](https://github.com/shippableSamples/sample-php-dynamo-opsworks) on our GitHub account for details.

## Using DynamoDB with Node.js

To access DynamoDB, you need some client library that is able to speak
AWS API. We will use the official [AWS Node.js SDK](http://aws.amazon.com/sdkfornodejs/) in the sample below. We will install the library using `npm` (saving the dependency to
`package.json`):

```bash
npm install --save aws-sdk
```

The packages will be then installed automatically (by invoking
`npm install`) both by Shippable and OpsWorks deployment recipe.

Configuration file (that we called `aws.json`) has slightly different
structure for Node.js SDK. For Shippable build environment it will look
as follows:

```
{
  "accessKeyId": "fake_key",
  "secretAccessKey": "fake_secret",
  "region": "us-west-2",
  "endpoint": "http://localhost:8000"
}
```

We also need to slightly change the Chef deployment hook for the
modified JSON structure:

```ruby
require 'json'

return unless node[:dynamodb]
Chef::Log.info('Generating aws.json configuration file')

aws_config = {
  :accessKeyId => node[:dynamodb][:aws_key],
  :secretAccessKey => node[:dynamodb][:aws_secret],
  :region => node[:dynamodb][:region]
}

aws_file_path = ::File.join(release_path, 'aws.json')
file aws_file_path do
  content aws_config.to_json
  owner new_resource.user
  group new_resource.group
  mode 00440
end
```

DynamoDB client can be then constructed with the following snippet:

```
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./aws.json');
var db = new AWS.DynamoDB();
```

Next, the client can be used to interact with DynamoDB, for example as
follows:

```
var params = {
  TableName: TABLE_NAME,
  Item: {
    id: {
      N: '1'
    },
    score: {
      N: String(score)
    }
  }
};
db.putItem(params, callback);
```

Refer to the [DynamoDB client documentation](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html) and [the full sample](https://github.com/shippableSamples/sample-nodejs-dynamo-opsworks) on our GitHub account for details.
