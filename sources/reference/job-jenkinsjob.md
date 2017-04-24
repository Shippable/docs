main_section: Reference
sub_section: Jobs
page_title: Unified Pipeline Jobs - jenkinsJob
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, jenkins

#jenkinsJob

Shippable has a special job type available that will allow you to connect your existing Jenkins job to your Shippable pipeline. It's simply called a `jenkinsJob` and it looks like this:

```yml
- name: foo-app-ci                  # a memorable, unique name. this is how your job will be referred to in shippable pipelines
  type: jenkinsJob                  # The type of the job (should not be changed by the user)
  integration: "my-jenkins-creds"   # The name of your Jenkins integration (created via accountSettings page)
  pointer:
    sourceName: "firstjob"          # The name of your Jenkins job
```

This will create a representation of your Jenkins job in your spog, but it won't be connected to anything yet.

<img src="../../images/reference/jobs/jenkins/jenkins1.png" alt="basic spog" style="width:700px;"/>

The idea behind the jenkins job is to use it to build/push your docker image, and once that is complete, trigger the rest of your pipeline on shippable. In order to accomplish that, we'll have to set up an `OUT` image resource for the jenkinsJob

```yml
- name: foo-app-ci                  # a memorable, unique name. this is how your job will be referred to in shippable pipelines
  type: jenkinsJob                  # The type of the job (should not be changed by the user)
  integration: "my-jenkins-creds"   # The name of your Jenkins integration (created via accountSettings page)
  pointer:
    sourceName: "firstjob"          # The name of your Jenkins job
  steps:
  - OUT: "sh-myapp3"                #the docker image that your jenkins job pushed to a repository
```

In this case, `sh-myapp3` is an image resource. By setting it as an `OUT` you're telling Shippable that your job is going to update the version of that image resource.

This update process occurs in your jenkins job.  To accomplish it, you should create a shippable API token on the account settings page, and add some steps to your jenkins job that look something like this:
```
# Use any previous docker image tag of the image samplerepo/sampleimage
# $BUILD_TAG is the environment variable of the jenkins job, which can be used as an image tag
sudo docker tag <image id> samplerepo/sampleimage:$BUILD_TAG

# Push the docker image with the new tag
sudo docker push samplerepo/sampleimage:$BUILD_TAG

# Get the project id using the resource Id  of the image resource (which is available on the SPOG page)
ID=$(curl -H "Authorization: apiToken XXXXXXXXXXXXXXXXXXXXXXX" "https://api.shippable.com/resources/resourceId" | jq ".projectId")

# Post the new version of the image resource to trigger the pipeline
curl -H "Authorization: apiToken XXXXXXXXXXXXXXXXXXXXXXX" -H "Content-Type: application/json" -X POST -d '{"resourceId": resourceId,"projectId": '$ID',"versionName": "'$BUILD_TAG'"}' https://api.shippable.com/versions
```

This new version will trigger any job that uses the image resource as an `IN`.

<img src="../../images/reference/jobs/jenkins/jenkins2.png" alt="multi jenkins" style="width:700px;"/>
