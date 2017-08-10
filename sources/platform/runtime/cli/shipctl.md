page_main_title: Shippable Controller Overview
main_section: Platform
sub_section: Runtime
sub_sub_section: CLIs
page_title: Shippable Controller

## shipctl setup_jdk 

Usage: `shipctl setup_jdk <jdk_version>`

This will switch the current jdk version to `openjdk8`. Supported JDK versions are 
- openjdk7
- openjdk8
- openjdk9
- oraclejdk8
- oraclejdk9

eg. `shipctl setup_jdk openjdk8` . 


## shipctl retry

Usage: `shipctl retry <some_command>`

This command will retry specified command until it succeeds. i.e return 0 status code. 
The command will fail after 3 attempts. 

## shipctl decrypt

Usage: `shipctl decrypt <source_file> <key_file>`

This command decrypts `source_file` using key `key_file`


## shipctl service 

Usage: `shipctl service start <service_name>`

This command is used to start a service on the image. Please refer list of supported services for
you image. [Reference](http://rcdocs.shippable.com/platform/runtime/overview/). If you are running CI job, you can start a service by specifying it in yml `services` section and this command will not be needed.  

Eg. To start and stop postgres
- `shipctl service postgres start` 
- `shipctl service postgres stop`


## Further Reading
* [Everything about Shippable AMIs](/platform/tutorial/runtime/ami-overview)
* [Quick Start to CI](/getting-started/ci-sample)
* [CI YML](/ci/yml-structure)
* [RunSh Job](/platform/workflow/job/runsh)