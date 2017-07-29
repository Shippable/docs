page_main_title: Unmanaged jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc


### IN resources containing integrations

When an `IN` resource uses a subscription integration, the fields associated with that integration are added as environment variables. In the following table, *RESOURCENAME* is the name of the `IN` resource, in uppercase, with any characters other than letters, numbers, and underscores removed. The available environment variables for each integration are as follows:

| Account Integration type                | Environment variables                          |
|-----------------------------------------|------------------------------------------------|
| Amazon ECR                              | *RESOURCENAME*_INTEGRATION_AWS_ACCESS_KEY_ID <br/> *RESOURCENAME*_INTEGRATION_AWS_SECRET_ACCESS_KEY |
| AWS                                     | *RESOURCENAME*_INTEGRATION_AWS_ACCESS_KEY_ID <br/> *RESOURCENAME*_INTEGRATION_AWS_SECRET_ACCESS_KEY <br/> *RESOURCENAME*_INTEGRATION_URL |
| Amazon Web Services (IAM)               | *RESOURCENAME*_INTEGRATION_ASSUMEROLEARN <br/> *RESOURCENAME*_INTEGRATION_OUTPUT <br/> *RESOURCENAME*_INTEGRATION_URL |
| Azure Container Service                 | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL |
| Docker Hub                              | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_PASSWORD <br/> *RESOURCENAME*_INTEGRATION_EMAIL |
| Docker Cloud                            | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_TOKEN |
| Docker Datacenter                       | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_PASSWORD |
| Docker Trusted Registry                 | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_PASSWORD <br/> *RESOURCENAME*_INTEGRATION_EMAIL|

| GCR                                     | *RESOURCENAME*_INTEGRATION_JSON_KEY|
| Jenkins                                 | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_PASSWORD <br/> *RESOURCENAME*_INTEGRATION_URL |
| JFrog Artifactory                       | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_PASSWORD <br/> *RESOURCENAME*_INTEGRATION_URL |
| Joyent Triton Public Cloud              | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_VALIDITYPERIOD <br/> *RESOURCENAME*_INTEGRATION_PUBLICKEY <br/> *RESOURCENAME*_INTEGRATION_PRIVATEKEY| <br/> *RESOURCENAME*_INTEGRATION_CERTIFICATES |
| Kubernetes                              | *RESOURCENAME*_INTEGRATION_CLUSTERACCESSTYPE <br/> *RESOURCENAME*_INTEGRATION_MASTERKUBECONFIGCONTENT <br/> *RESOURCENAME*_INTEGRATION_BASTIONKUBECONFIGTYPE <br/> *RESOURCENAME*_INTEGRATION_BASTIONKUBECONFIGCONTENT <br/> *RESOURCENAME*_INTEGRATION_BASTIONHOSTIP <br/> *RESOURCENAME*_INTEGRATION_BASTIONPRIVATEKEY <br/> *RESOURCENAME*_INTEGRATION_BASTIONPUBLICKEY |
| Node Cluster                            | *RESOURCENAME*_INTEGRATION_NODES <br/> *RESOURCENAME*_INTEGRATION_PUBLICKEY <br/> *RESOURCENAME*_INTEGRATION_PRIVATEKEY|
| PEM key                                 | *RESOURCENAME*_INTEGRATION_KEY |
| Private Docker registry                 | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_PASSWORD <br/> *RESOURCENAME*_INTEGRATION_EMAIL |               |
| Quay.io                                 | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_PASSWORD <br/> *RESOURCENAME*_INTEGRATION_EMAIL <br/> *RESOURCENAME*_INTEGRATION_ACCESSTOKEN |
| SSH key                                 | *RESOURCENAME*_INTEGRATION_PUBLICKEY <br/> *RESOURCENAME*_INTEGRATION_PRIVATEKEY |
