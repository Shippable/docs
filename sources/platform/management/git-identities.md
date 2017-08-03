page_main_title: Git identities
main_section: Platform
sub_section: Management

# Git identities

Shippable lets you connect several source control providers to your Shippable account. The **Git identities** section of your account settings shows you which source control identities are currently connected.

<img src="/images/getting-started/gitIdentities.png" alt="GitHub and Bitbucket
identities">

##GitHub

If you've signed in using your GitHub account, your GitHub identity will either be: `(public)` or `(public and private)`

`(public)` means that we have permissions to your public repos but not your private repos, so you will not see your private repos in the Shippable UI. This is the default setting when you sign in to Shippable.

`(public and private)` means that Shippable has access to your public and private
repos. **You need to enable this if you want to build private repositories.** The **Enable** button is a one way toggle - once you enable private repository permissions, you cannot revert back to just public repository permissions using the Shippable UI.

Even if you use Bitbucket credentials to sign in, you can click the **Enable** button for your GitHub identity to connect your GitHub account. This will give you a consolidated Shippable account where you can build projects from both source control providers and also set up deployment pipelines.

##Bitbucket

If you signed in using your Bitbucket Account, your Bitbucket identity will be shown in this section.

Bitbucket does not support granular permissions to public and private repo access, so access for both is turned on by default when you sign in and authorize Shippable to access Bitbucket.

Even if you use GitHub credentials to sign in, you can click the **Enable** button for your Bitbucket identity to connect your Bitbucket account. This will give you a consolidated Shippable account where you can build projects from both source control providers and also set up deployment pipelines.
