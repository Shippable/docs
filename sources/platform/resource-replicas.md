page_main_title: replicas
main_section: Platform
sub_section: Resources

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |

# replicas
`replicas` is a resource holds the number of instances of the container to deploy. It is used specifically to deploy Docker containers 

You can create a replicas resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			replicas
    version:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `replicas`

* **`version`** -- is an object which contains specific properties that applies to this resource. Anytime this is changed in the YML a new version of the resource get created and it might trigger your workflow depending on how it is setup
	
	```
	    version:
	      count: 1			#integer value > 0
	```

# Used in JOBs
This resource is used as an IN for the following jobs

* [deploy jobs](job-deploy/)
* [manifest jobs](jobs-manifest/)

# Further Reading
* JFrog integration
* AWS integration
* runCLI job
* cli pre-installed in job runtime
* how to deploy a file to a VM cluster
* Output a file from runSH