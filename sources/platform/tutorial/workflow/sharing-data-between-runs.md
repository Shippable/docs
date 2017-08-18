page_main_title: Share data between Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: Share data between Jobs

###Persisting state between runs

If you have a custom job in your deployment pipeline on Shippable you might have situations where you want to persist something from one run to the next.

You can do this by moving whatever you want to persist to the `$JOB_STATE` folder in your custom scripts. The contents of the folder will be available in the `$JOB_PREVIOUS_STATE` folder during the subsequent run.

Let us see how to implement this scenario.

The custom job is defined in `shippable.jobs.yml` as shown below. The job just runs a script `doSomething.sh`:


```
jobs:

  - name: myCustomJob
    type: runSh
    steps:
      - TASK:
        - script: ./IN/mexec-repo/gitRepo/doSomething.sh
```

Let us assume a statefile **foo.txt** is created during the execution of the script and this needed for the subsequent run. You should save the statefile to the `$JOB_STATE` folder. Here is how you can do it:

```
save_statefile() {
  cp <path>/foo.txt $JOB_STATE
}
```

Now, during the subsequent run of your job, you can retrieve **foo.txt** from the `$JOB_PREVIOUS_STATE` folder:

```
get_previous_statefile() {
  local previous_statefile_location="$JOB_PREVIOUS_STATE/foo.txt"
  if [ -f "$previous_statefile_location" ]; then
    cp -vr previousState/foo.txt <to path>
  else
    echo "no previous statefile exists"
  fi
}
```
