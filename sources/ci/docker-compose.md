page_main_title: Using Docker Compose in CI
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Using Docker Compose in CI
page_description: How to use Docker Compose in Shippable to setup your integration testing environments.

#Using Docker Compose in CI

You can use Docker Compose on Shippable to setup your integration testing environments.
In this tutorial, we will go over the steps required to run Docker's [sample app](https://docs.docker.com/compose/gettingstarted/)
for Docker Compose on Shippable.

The sample app is a Python web application running on Docker Compose.

#Understanding Docker Compose execution

All CI scripts run in a container called [cexec](http://docs.shippable.com/support/#what-is-the-difference-between-a-build-container-(cexec)-and-shippable-agent-(genexec)-on-the-shippable-platform?). However, the Docker compose command in the CI script runs on the host, outside the CI container.
Thus the volume mounts, if any specified, need to exist on the Host. In order to share data/code between the build container that
has the sync'ed repository and the containers created by Docker compose, some changes need to be made to Shippable.yml and the docker compose yml.

##Changes to Shippable.yml
###1. pre_ci_boot
```yaml
pre_ci_boot:
  options: "-v /app:/app"
```
This mounts the directory /app on the host to the /app directory on the container. By copying data/code to the /app directory in the container in a CI task, we make those files available in the /app directory on the host. The /app directory can be replaced by any other directory.
###2. Install docker-compose package.

In our python based tutorial, we accomplish this by -
```yaml
- pip install -U docker-compose
```
###3. Copy files to /app directory
```yaml
cp -R . /app
```
###4. Run docker-compose in detached mode
```yaml
docker-compose up -d web redis
```
Link to the complete yml file is [here](https://github.com/devops-recipes/ci-docker-compose/blob/master/Shippable.yml).

##Changes to docker-compose.yml
```yaml
version: '2'
services:
  web:
    build: .
    ports:
     - "5000:5000"
    volumes:
     - /app:/app
  redis:
    image: "redis:alpine"
```
Note how /app:/app is specified for volumes. Currently we do not support `.:/app`. If you use `.:/app`, create another docker-compose file for use in shippable and specify `docker-compose up -f docker-compose-shippable.yml -d web redis`. You can also split your compose files into a common file and two other files, one for your development environment and other for use in shippable.

##Sample project

The complete Python sample can be found [here](https://github.com/devops-recipes/ci-docker-compose).
