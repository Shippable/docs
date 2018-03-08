#!/bin/bash -e

export DOCS_BUCKET=$1
export DOCS_REGION=$2
export RUN_MODE=$3
export AWS_S3_LOCAL_PATH="site"
export REDIRECT_MAPPINGS_FILE="mapping.txt"
export REDIRECT_MAPPINGS_SCRIPT="createredirect.sh"

sync_docs() {
  if [ "$RUN_MODE" = "production" ]; then
    echo "Copying prod-robots.txt > sources/robots.txt"
    cp prod-robots.txt sources/robots.txt
  else
    echo "Copying dev-robots.txt > sources/robots.txt"
    cp dev-robots.txt sources/robots.txt
  fi

  echo "Installing requirements with pip"
  pip install -r requirements.txt

  echo "Building docs"
  mkdocs build

  if [ "$RUN_MODE" = "production" ]; then
    echo "copying sitemap.xml"
    cp sitemap.xml ./site/.
  fi  

  if [ -f $REDIRECT_MAPPINGS_FILE ]; then
    echo "Setting up redirects"
    ./$REDIRECT_MAPPINGS_SCRIPT $REDIRECT_MAPPINGS_FILE $AWS_S3_LOCAL_PATH
    # TODO: Added for debug. Remove this once done.
    ls -R $AWS_S3_LOCAL_PATH
  fi

  echo "Syncing with S3"
  aws s3 sync $AWS_S3_LOCAL_PATH $DOCS_BUCKET --delete --acl public-read --region $DOCS_REGION
}

sync_docs
