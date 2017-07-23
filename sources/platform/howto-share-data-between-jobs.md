page_main_title: How to share data between Jobs?
main_section: Platform
sub_section: HowTo

# state
A `state` resource type is used to create a central state that can be used across the entire pipelines. This resource can be used as IN and OUT step for [any job](jobs-overview/).

You can create this resource by adding it to `shippable.resources.yml`

```
resources:
  - name: res-state
    type: state
```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'state'.

You can use the state resource as an input and output for multiple jobs to maintain a common state.

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
* Updating the resource version for `type: state` will not trigger subsequent jobs.

The tfDeploy1.sh script will be extracting the central state and also will be saving the new state file whenever created.
The script will look something like this

```
#Extract central state
echo -e "\n*** extracting central state for this job ***"
get_central_statefile() {
  local central_statefile_location="/build/IN/res-state/state"
  if [ -f "$central_statefile_location" ]; then
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

* When tfDeploy-1 job is completed, there is an state resource as an OUT, which will update the files in the resource and save the state files.
* Since the state resource is also an input to tfDeploy-2. When Job 2 will be triggered we will fetch the latest state files for the state resource based on the version being used and on completion of tfDeploy-2 job, we will again do an OUT on the same state resource to update the files.

