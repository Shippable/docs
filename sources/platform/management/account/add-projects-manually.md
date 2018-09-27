page_main_title: Manually Added Repositories
main_section: Platform
sub_section: Management
sub_sub_section: Account
page_title: Manually Added Repositories
page_description: How to manually add and delete repositories in Shippable

# Manually Added Repositories

Shippabe automatically synchronizes repository lists and permissions from the configured SCM providers. This automatic synchronization may not be desirable if your SCM has a very large number of repositories. This can be turned `off` using **Automatically synchronize SCM** [system setting](/platform/server/system-settings/) in admiral.

If automatic synchronization of repositories is turned `off` then each Shippable user can manually add the repositories they would like to see on Shippable through their Account Profile page.

## Adding a repository

To add a repository:

- Click on **Profile** in the left sidebar menu and scroll to the **MANUALLY ADDED REPOSITORIES** section.
- Click on **+** on the right side of your screen.
- Select an account integration from the list and enter the organization name(not required for adding Gerrit projects) and project name and click on **Add** to add the repository.

<img src="/images/getting-started/list-manually-added-repos.png" alt="List Manually added repositories">

## Removing a repository

- Click on your **Profile** in the left sidebar menu and scroll to the **MANUALLY ADDED REPOSITORIES** section. This will show you a list of your manually added repositories.
- Click on the reposistory you want to delete.
- Click on the **Delete** button and choose **Yes**.

<img src="/images/getting-started/delete-manually-added-repos.png" alt="Delete Manually added repositories">
