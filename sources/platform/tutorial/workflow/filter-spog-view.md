page_main_title: Filtering your SPOG view
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow

# Filtering your SPOG view

Depending on your application architecture and number of applications, your SPOG view can get very busy and difficult to parse visually. You can filter your SPOG view to show a subset of your workflows and jobs in two ways:

* [Searching for a resource/job](#search)
* [Using flags](#flags)
* [Using custom views](#custom-views)

<a name="search"></a>
##Search

The search bar can opened by either clicking on the search icon on the top-right corner of the SPOG view or by using the keyboard shortcut `ctrl` + `space`.

<img src="/images/getting-started/search-bar.png" alt="search-bar">

The search bar will show the list of objects matching the search text and display them as a drop-down, an item can be selected either by clicking on it or using the keyboard shortcuts to navigate to an item (up and down arrows) and using `enter` to select the item after which the item will be brought to the center and highlighted with a yellow border. In case there are multiple instances of that object in the SPOG view then you can cycle through them by using the arrow icons on the search bar or use the keyboard shortcuts `enter` (to iterate forward) and `shift` + `enter` (to iterate backward) and each instance will be centered and highlighted.

<img src="/images/getting-started/search-bar-item-centered.png" alt="search-bar-item-centered">

The search bar can be closed by clicking on the `x` icon on the search bar or by using the keyboard shortcut `esc` when the search input is focus.

Optionally only objects connected to the selection can be shown by clicking on the flag icon to the right edge in the list-item, this selection can be cancelled by closing the search bar.

<a name="flags"></a>
## Using flags

You can use the `flags` keyword to filter SPOG for easier readability.

The `flags` keyword can be set in any job or resource:

```
jobs:
  - name: <string>
    type: <job type>
    #other job related inputs
    flags:
      - <filter name>
```

Once you commit this, the flags will be shown in the **Filter** dropdown in your SPOG view. You can choose one or more filters as shown below:

<img src="/images/getting-started/filter-spog.png" alt="Filtering SPOG">

Please note the following:

* You do not need to add flags to every job or resource in your pipeline. If we detect flags for a job or resource and you filter SPOG with that flag, the UI will display all upstream and downstream jobs and resources in the pipeline.
* The UI remembers your flags setting, so you do not have to select the subset of flags each time. The dashboard will automatically show the last configured flags.

<a name="custom-views"></a>
## Using custom views

Custom views help you create a custom SPOG view that includes only the workflows you want to focus on. This saves you from having to select flags to filter your view and also gives you a way to view workflows across GitHub organizations/Bitbucket Teams.

### Add custom view

* You can create a custom view by clicking on **+** on the right hand corner of the default **Home** view and then adding the objects that you would like to be a part of this view:

<img src="/images/platform/visibility/add-custom-view-button.png" alt="add custom view button" style="width:700px;"/>

<img src="/images/platform/visibility/account-custom-edit-view.jpg" alt="Create or Editing a custom view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* You can select a combination of CI projects, Flags, and Workflow jobs to create your custom view. You can also check the **Set as default account dashboard** option to make this the dashboard that is shown to you every time you log in.

* Click on **Save** to update your view.

### Edit custom view

To edit your view:

* Select the custom view you want to edit from the left navbar.

* Click on the **Edit** icon on the top right of the custom view dashboard.

* Add/remove the components you want and click on **Save** to update your view.


###Delete custom view
To delete a custom view, go to that view and click on the `Edit` icon. Goto the `DELETE VIEW` panel at the bottom of the page. Click on `Delete` button to delete the view.
<img src="/images/platform/visibility/delete-custom-view.png" alt="delete custom view page" style="width:700px;"/>
