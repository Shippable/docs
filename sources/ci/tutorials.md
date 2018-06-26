page_description: Continuous Integration index
main_section: CI

# Continuous Integration reference and tutorials index

The list below is a comprehensive list of documents that show you how to configure CI jobs. You can access all these documents from the left navigation menu, but this index will help you find everything from this one page.

## Enabling your project

- [Enabling a project](/ci/enable-project)
- [Triggering your CI job](/ci/trigger-job)

## CI Configuration

- [Yaml structure](/ci/yml-structure)

### Preparing your environment

- [Setting language and runtime](/ci/set-language)
- [Choosing a build image](/ci/build-image)
- [Specifying branches to build](/ci/specify-branches)
- [Working with env variables](/ci/env-vars)

### Working with services

- [Overview](/ci/services-overview)
- [Cassandra](/ci/cassandra)
- [CouchDB](/ci/couchdb)
- [Elasticsearch](/ci/elasticsearch)
- [Memcached](/ci/memcached)
- [MongoDB](/ci/mongodb)
- [MySQL](/ci/mysql)
- [Neo4j](/ci/neo4j)
- [PostgreSQL](/ci/postgresql)
- [RabbitMQ](/ci/rabbitmq)
- [Redis](/ci/redis)
- [Riak](/ci/riak)
- [RethinkDB](/ci/rethinkdb)
- [Selenium](/ci/selenium)
- [SQLite](/ci/sqlite)

### Building and testing your project

- [Configuring CI commands](/ci/build-and-test)
- [Building Docker images](/ci/build-docker-images)
- [Running tests in parallel](/ci/parallelize-tests)
- [Status code](/ci/build_status)

### Configuring test/code coverage

- [Basic config](/ci/test-code-coverage-reports)
- [JaCoCo reports](/ci/jacoco-reports)

### Sending notifications

- [Overview](/ci/send-notifications)
- [Sending messages to Slack](/ci/slack-notifications)
- [Sending messages to Email](/ci/email-notifications)
- [Sending messages to Hipchat](/ci/hipchat-notifications)
- [Sending messages to IRC](/ci/irc-notifications)

### Pushing artifacts
- [Overview](/ci/push-artifacts)
- [Push artifacts to S3](/ci/push-to-s3)
- [Push to JFrog Artifactory](/ci/push-to-artifactory)
- [Push Docker image to Docker Hub](/ci/push-docker-hub)
- [Push Docker image to Amazon ECR](/ci/push-amazon-ecr)
- [Push Docker image to GCR](/ci/push-gcr)
- [Push Docker image to Quay](/ci/push-quay)
- [Push Docker image to Docker registry](/ci/push-docker-registry)

### Deployments

The tutorials in this section deal with deployments that can be implemented at the end of a CI workflow instead of pushing artifacts to a registry. For a more comprehensive look at deployments, including Docker-based deployments, please check out our [CD section](/deploy/continuous-delivery).

- [Overview](/ci/deployment-overview)
- [Heroku](/ci/deploy-to-heroku)
- [Amazon EC2](/ci/deploy-to-ec2)
- [AWS Opsworks](/ci/deploy-to-aws-opsworks)
- [AWS EBS](/ci/deploy-to-aws-beanstalk)
- [Digital Ocean](/ci/deploy-to-digital-ocean)

### Advanced config
- [Caching](/ci/caching)
- [Using a custom Docker image](/ci/custom-docker-image)
- [Running Docker Compose](/ci/docker-compose)
- [Building pull requests](/ci/pull-request-builds)
- [Skipping a build](/ci/skip-builds)
- [Using git submodules](/ci/git-submodules)
- [Retrying a command](/ci/retry-command)
- [Using SSH keys](/ci/ssh-keys)
- [Canceling builds](/ci/cancel-builds)
- [Customizing timeouts](/ci/custom-timeouts)
- [Console logs](/ci/console-logs)
- [Build badges](/ci/build-badges)
- [Scheduled builds](/ci/scheduled-builds)
- [Running builds as non-root user](/ci/non-root)
- [Triggering webhooks](/ci/webhook)
- [Triggering parallel jobs](/ci/matrix-builds)
- [Triggering other jobs after CI](/ci/trigger-pipeline-jobs)
- [Managing Roles and Permissions](/ci/permissions)

### Language guide

- [Overview](/ci/supported-languages)
- [Node.js](/ci/nodejs-continuous-integration)
- [Python](/ci/python-continuous-integration)
- [Java](/ci/java-continuous-integration)
- [Ruby](/ci/ruby-continuous-integration)
- [Go](/ci/go-continuous-integration)
- [Scala](/ci/scala-continuous-integration)
- [PHP](/ci/php-continuous-integration)
- [Clojure](/ci/clojure-continuous-integration)
- [C/C++](/ci/cpp-continuous-integration)
- [Unsupported languages](/ci/unsupported-languages)

## Debugging

- [SSH Access to Build Machine](/ci/ssh-access)
- [Troubleshooting](/ci/troubleshooting)

## E2E Tutorials

- [Build and push Docker image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
- [Building a custom Docker image to use for CI](/ci/tutorial/build-custom-ci-image)
- [Build and Push Docker Image to JFrog Artifactory](/ci/tutorial/build-push-image-to-jfrog)
- [Build and Push Java WAR file to Nexus Repository with Maven](/ci/tutorial/build-push-java-war-nexus-maven)
