page_main_title: Gated CD
main_section: Deploy
sub_section: CD to Orchestration Platforms

# Gated CD

You might have a need to manually trigger the deployment of your application to certain sensitive environments such as pre-prod and prod. In addition, there are times when you might want to pause / resume continuous deployment of your application. This document goes over the specific steps to setup this manual, UI based triggering of your deployment.

## Assumptions

We will use the [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms) as a starting point.

## Topics Covered

* Using Shippable configuration to setup manual triggering of your deployment.
* Pausing CD of your application using UI.
* Resuming CD of your application using UI.

### Using Shippable configuration to setup manual triggering of your deployment

**Steps**

1. Modify `app_deploy_job` defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.
2. Specify `switch: off` for the `app_service_def` input. This essentially prevents a new version of `app_service_def`, that is built every time a new version of the image resource is created, from triggering an automated deployment.
3. Commit the file.
4. Once manual triggering of the application is setup, you will have to manually run the job using the [SPOG](/platform/visibility/single-pane-of-glass-spog/) UI from your subscription dashboard by clicking on the eye icon, clicking on `Show SPOG View`, right clicking on the `app_deploy_job` job and clicking `Build Job`.
5. The `app_deploy_job` yml block in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file
should look like:

```
    - name: app_deploy_job
      type: deploy
      steps:
        - IN: app_service_def
          switch: off
        - IN: op_cluster
        - IN: app_replicas
```

### Pausing CD of your application using UI

**Steps**

1. Navigate to the [SPOG](/platform/visibility/single-pane-of-glass-spog/) UI from your subscription dashboard by clicking on the eye icon followed by `Show SPOG View`.
2. Right click on `app_deploy_job`.
3. Click on `Pause Job`.

### Resuming CD of your application using UI

**Steps**

1. Navigate to the [SPOG](/platform/visibility/single-pane-of-glass-spog/) UI from your subscription dashboard by clicking on the eye icon followed by `Show SPOG View`.
2. Right click on `app_deploy_job`.
3. Click on `Build Job`.

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
