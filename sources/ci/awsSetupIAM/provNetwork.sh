#!/bin/bash -e

export ACTION=$1
export CURR_JOB_CONTEXT="infra/awsSetupIAM"
export STATE_RES="net_tf_state"
export RES_CONF="net_conf"
export OUT_AMI_VPC="ami_vpc_conf"
export OUT_TEST_VPC="test_vpc_conf"
export OUT_PROD_VPC="prod_vpc_conf"

export RES_REPO="secops_repo"
export RES_AWS_CREDS="aws_creds"
export RES_AWS_PEM="aws_pem"
export TF_STATEFILE="terraform.tfstate"

# get the path where gitRepo code is available
export RES_REPO_STATE=$(ship_resource_get_state $RES_REPO)
export RES_REPO_CONTEXT="$RES_REPO_STATE/$CURR_JOB_CONTEXT"

# Now get AWS keys
export AWS_ACCESS_KEY_ID=$(ship_resource_get_integration $RES_AWS_CREDS aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(ship_resource_get_integration $RES_AWS_CREDS aws_secret_access_key)

# Now get all VPC settings
export REGION=$(ship_resource_get_param $RES_CONF REGION)
export AMI_VPC=$(ship_resource_get_param $RES_CONF AMI_VPC)
export AMI_NETWORK_CIDR=$(ship_resource_get_param $RES_CONF AMI_NETWORK_CIDR)
export AMI_PUBLIC_CIDR=$(ship_resource_get_param $RES_CONF AMI_PUBLIC_CIDR)
export TEST_VPC=$(ship_resource_get_param $RES_CONF TEST_VPC)
export TEST_NETWORK_CIDR=$(ship_resource_get_param $RES_CONF TEST_NETWORK_CIDR)
export TEST_PUBLIC_01_CIDR=$(ship_resource_get_param $RES_CONF TEST_PUBLIC_01_CIDR)
export TEST_PUBLIC_02_CIDR=$(ship_resource_get_param $RES_CONF TEST_PUBLIC_02_CIDR)
export PROD_VPC=$(ship_resource_get_param $RES_CONF PROD_VPC)
export PROD_NETWORK_CIDR=$(ship_resource_get_param $RES_CONF PROD_NETWORK_CIDR)
export PROD_PUBLIC_01_CIDR=$(ship_resource_get_param $RES_CONF PROD_PUBLIC_01_CIDR)
export PROD_PUBLIC_02_CIDR=$(ship_resource_get_param $RES_CONF PROD_PUBLIC_02_CIDR)

set_context(){
  pushd $RES_REPO_CONTEXT

  echo "CURR_JOB_CONTEXT=$CURR_JOB_CONTEXT"
  echo "RES_REPO=$RES_REPO"
  echo "RES_AWS_CREDS=$RES_AWS_CREDS"
  echo "RES_AWS_PEM=$RES_AWS_PEM"
  echo "RES_REPO_CONTEXT=$RES_REPO_CONTEXT"

  echo "AWS_ACCESS_KEY_ID=${#AWS_ACCESS_KEY_ID}" #print only length not value
  echo "AWS_SECRET_ACCESS_KEY=${#AWS_SECRET_ACCESS_KEY}" #print only length not value

  # This restores the terraform state file
  ship_resource_copy_file_from_state $STATE_RES $TF_STATEFILE .

  # This gets the PEM key for SSH into the machines
  ship_resource_get_integration $RES_AWS_PEM key > ../demo-key.pem
  chmod 600 ../demo-key.pem

  # now setup the variables based on context
  # naming the file terraform.tfvars makes terraform automatically load it

  echo "aws_access_key_id = \"$AWS_ACCESS_KEY_ID\"" > terraform.tfvars
  echo "aws_secret_access_key = \"$AWS_SECRET_ACCESS_KEY\"" >> terraform.tfvars
  echo "region = \"$REGION\"" >> terraform.tfvars
  echo "ami_vpc = \"$AMI_VPC\"" >> terraform.tfvars
  echo "ami_network_cidr = \"$AMI_NETWORK_CIDR\"" >> terraform.tfvars
  echo "ami_public_cidr = \"$AMI_PUBLIC_CIDR\"" >> terraform.tfvars
  echo "test_vpc = \"$TEST_VPC\"" >> terraform.tfvars
  echo "test_network_cidr = \"$TEST_NETWORK_CIDR\"" >> terraform.tfvars
  echo "test_public_01_cidr = \"$TEST_PUBLIC_01_CIDR\"" >> terraform.tfvars
  echo "test_public_02_cidr = \"$TEST_PUBLIC_02_CIDR\"" >> terraform.tfvars
  echo "prod_vpc = \"$PROD_VPC\"" >> terraform.tfvars
  echo "prod_network_cidr = \"$PROD_NETWORK_CIDR\"" >> terraform.tfvars
  echo "prod_public_01_cidr = \"$PROD_PUBLIC_01_CIDR\"" >> terraform.tfvars
  echo "prod_public_02_cidr = \"$PROD_PUBLIC_02_CIDR\"" >> terraform.tfvars

  popd
}

destroy_changes() {
  pushd $RES_REPO_CONTEXT

  echo "----------------  Destroy changes  -------------------"
  terraform destroy -force

  popd
}

apply_changes() {
  pushd $RES_REPO_CONTEXT

  echo "----------------  Planning changes  -------------------"
  terraform plan

  echo "-----------------  Apply changes  ------------------"
  terraform apply

  #output AMI VPC
  ship_resource_post_state $OUT_AMI_VPC versionName \
    "Version from build $BUILD_NUMBER"
  ship_resource_put_state $OUT_AMI_VPC REGION $REGION
  ship_resource_put_state $OUT_AMI_VPC BASE_ECS_AMI \
    $(terraform output base_ecs_ami)
  ship_resource_put_state $OUT_AMI_VPC AMI_VPC_ID \
    $(terraform output ami_vpc_id)
  ship_resource_put_state $OUT_AMI_VPC AMI_PUBLIC_SG_ID \
    $(terraform output ami_public_sg_id)
  ship_resource_put_state $OUT_AMI_VPC AMI_PUBLIC_SN_ID \
    $(terraform output ami_public_sn_id)

  #output TEST VPC
  ship_resource_post_state $OUT_TEST_VPC versionName \
    "Version from build $BUILD_NUMBER"
  ship_resource_put_state $OUT_TEST_VPC REGION $REGION
  ship_resource_put_state $OUT_TEST_VPC TEST_VPC_ID \
    $(terraform output test_vpc_id)
  ship_resource_put_state $OUT_TEST_VPC TEST_PUBLIC_SG_ID \
    $(terraform output test_public_sg_id)
  ship_resource_put_state $OUT_TEST_VPC TEST_PUBLIC_SN_01_ID \
    $(terraform output test_public_sn_01_id)
  ship_resource_put_state $OUT_TEST_VPC TEST_PUBLIC_SN_02_ID \
    $(terraform output test_public_sn_02_id)

  #output PROD VPC
  ship_resource_post_state $OUT_PROD_VPC versionName \
    "Version from build $BUILD_NUMBER"
  ship_resource_put_state $OUT_PROD_VPC REGION $REGION
  ship_resource_put_state $OUT_PROD_VPC PROD_VPC_ID \
    $(terraform output prod_vpc_id)
  ship_resource_put_state $OUT_PROD_VPC PROD_PUBLIC_SG_ID \
    $(terraform output prod_public_sg_id)
  ship_resource_put_state $OUT_PROD_VPC PROD_PUBLIC_SN_01_ID \
    $(terraform output prod_public_sn_01_id)
  ship_resource_put_state $OUT_PROD_VPC PROD_PUBLIC_SN_02_ID \
    $(terraform output prod_public_sn_02_id)

  popd
}

main() {
  echo "----------------  Testing SSH  -------------------"
  eval `ssh-agent -s`
  ps -eaf | grep ssh
  which ssh-agent

  set_context

  if [ $ACTION = "create" ]; then
    apply_changes
  fi

  if [ $ACTION = "destroy" ]; then
    destroy_changes
  fi
}

main
