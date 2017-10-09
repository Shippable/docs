page_main_title: Share data between Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: Share data between Jobs

# Sharing data between jobs

A `state` resource type is used to create a central state that can be used across the entire Assembly Line. This central state can be anything from a file location, to


This resource can be used as IN and OUT step for [any job](/platform/workflow/job/overview/).

## Instructions

### Step 1: Add a state resource

You can create a `state` resource by adding it to `shippable.resources.yml`:

```
resources:
  - name: res-state
    type: state
```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'state'.

### Step 2: Use state as IN/OUT for jobs

You can use the state resource as an input and output for multiple `runSH` or `runCI` jobs to maintain a common state. Any job that requires the state in order to execute should take the state resource as an `IN`, and any job that writes to the state should have the state resource as an `OUT`.

For example, both `tfDeploy-1` and `tfDeploy-2` have the same state resource as IN and OUT in the snippet below:

```
jobs:
  - name: tfDeploy-1
    type: runSh
    steps:
      - IN: integration-aws
      - IN: repo-tfScripts
      - IN: res-state
      - TASK:
        - script: ./tfDeploy1.sh
      - OUT: res-state

  - name: tfDeploy-2
    type: runSh
    steps:
      - IN: integration-aws
      - IN: repo-tfScripts
      - IN: res-state
      - TASK:
        - script: ./tfDeploy2.sh
      - OUT: res-state

```

### Step 3: Set the resource value in your jobs

Please note that you will need to handle the actual update of the resource in your scripts in the `TASK` section.

For example, the tfDeploy1.sh script below extracts values from `res-state` and saves the new state file, whenever created:


```
#Extract central state
echo -e "\n*** extracting central state for this job ***"
get_central_statefile() {
  local central_statefile_location="$(shipctl get_resource_state res-state)"  #extract the current value from res-state resource
  if [ -f "$central_statefile_location" ]; then                 # if state is found, set
    cp $central_statefile_location /build/IN/repo-tfScripts/gitRepo
    echo 'restored central statefile'
  else
    echo "no previous central exists"
  fi
}
get_central_statefile

# Provision infrastructure via scripts
echo -e "\n*** provisioning infrastructure on AWS ***"
provision_infra() {
  cd /build/IN/repo-tfScripts/gitRepo
  repoPath="$(shipctl get_resource_state repo-tfScripts)"
  export AWS_ACCESS_KEY_ID=$aws_access_key_id
  export AWS_SECRET_ACCESS_KEY=$aws_secret_access_key
  export AWS_DEFAULT_REGION=$REGION
  terraform apply
}
provision_infra

# Save central state
echo -e "\n*** saving central state ***"
createOutStateRes() {
  STATERES_LOCATION=/build/OUT/res-state/state/
  cp terraform.tfstate $STATERES_LOCATION
}
createOutStateRes
```

* The `tfDeploy-1` job writes to the state resource `res-state`, which is set as an `OUT` for the job.
* The `tfDeploy-2` job has the `res-state` resource as an `IN`, so it consumes the information from the resource and then also writes to it since it's also an `OUT` resource.
* This information is then consumed by  `tfDeploy1` and so on...
* **Updating the resource version for `type: state` will not trigger subsequent jobs.**
