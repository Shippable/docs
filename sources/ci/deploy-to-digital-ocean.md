page_main_title: Digital Ocean
main_section: CI
sub_section: Deployments
page_title: Deploying to Digital Ocean
page_description: How to deploy your application to Digital Ocean
page_keywords: digital ocean, continuous deployment, CI/CD

# DigitalOcean

DigitalOcean is a VPS provider that offers a number of pre-prepared
virtual machine images to start from.

## Using Capistrano to deploy

The guide below will show how to deploy a Ruby on Rails application,
built on Shippable, to DigitalOcean using Capistrano deployment tool.

> **Note**
>
> Some points from this guide were adapted from [DigitalOcean tutorial on Capistrano](https://www.digitalocean.com/community/tutorials/how-to-automate-ruby-on-rails-application-deployments-using-capistrano).
> Please refer to if for more detailed instructions about steps in the process.

### Creating and preparing a DigitalOcean droplet

First, we need to create a virtual machine, which is called 'droplet',
in the DigitalOcean web interface. After clicking
[Create](https://cloud.digitalocean.com/droplets/new) in the
administration panel and picking hostname and size for the machine, we
choose 'Applications/Ruby on Rails on 14.04 (Nginx + Unicorn)' as the
base image for our machine. After about a minute the machine should be
booted and ready for configuration.

Capistrano works by fetching the application code from a git repository
and requires `git` to be installed:

```
# apt-get install git
```

It is recommended for security reasons to create a separate user for
performing the deployment, as Capistrano will need to be able to
establish a SSH session to the server to execute commands in its
deployment workflow.

```
# adduser deployer
# passwd -l deployer # disable logging with password
```

Then, prepare the directory structure with correct permissions (see
[Capistrano documentation](http://capistranorb.com/documentation/getting-started/authentication-and-authorisation/#authorisation) for details):

```
# chown deployer:www-data /home/deployer
# chmod g+s /home/deployer/
# mkdir /home/deployer/{releases,shared}
# chown deployer /home/deployer/{releases,shared}
```

Next, remove the sample application that is included as a part of the
DigitalOcean image and replace it with a link to a directory that will
house the latest deployed version of the application:

```
# rm -rf /home/rails
# ln -sf /home/deployer/current /home/rails
```

Next, we need to authorize the Shippable minion to execute commands on
the droplet. Copy the deployment key that is visible next to
repositories list in the Shippable web interface and create a file
called `/home/deployer/.ssh/authorized_keys` with this key as the
content (you will need to create `.ssh` directory).

Now the host is ready for the Capistrano deployment triggered from
Shippable minion.

### Adding Capistrano to a Rails project

First, you need to install Capistrano on your development workstation,
as well as on the Shippable minion. Simply issue the following command
on your desktop:

```
gem install capistrano
```

And add the following `ci` block to the `shippable.yml`
file:

```
ci:
  - gem install capistrano
```

Next, add the following entries to the `Gemfile` of your project:

```
group :development do
  gem 'capistrano-rails', '~> 1.1'
  gem 'capistrano-rvm'
end
```

And execute `bundle install`.

> **Note**
>
> `capistrano-rvm` gem automatically detects RVM installation (that is a
> part of the DigitalOcean RoR image) and modifies the environment of
> the shell used by Capistrano to include the Ruby interpreter and
> installed gems. This is a preferred way of loading RVM into the
> environment, as the shell used by Capistrano is [non-login and non-interactive](http://capistranorb.com/documentation/faq/why-does-something-work-in-my-ssh-session-but-not-in-capistrano/).

Now it is time to configure the application itself for Capistrano
deployment. First add default Capistrano configuration files by issuing
the following command in the repository root at your workstation:

```
cap install
```

Among the others, it will generate file called `Capfile`. Add the
following lines to it to turn on the Capistrano Rails, Bundler and RVM
support:

```
require 'capistrano/rails'
require 'capistrano/bundler'
require 'capistrano/rvm'
```

### Configuring Capistrano deployment

Capistrano configuration is split between the `config/deploy.rb` file
that holds the entries common for all the environments and the
`config/deploy/` directory that contains configuration files specific
for environments known to Capistrano.

In this example, we use our DigitalOcean droplet to host both
application, web and database servers for the production environment. In
file `config/deploy/production.rb` change first three uncommented lines
to the following to reflect this (replacing the IP address with the one
of your virtual machine):

```
role :app, %w{deployer@104.131.177.214}
role :web, %w{deployer@104.131.177.214}
role :db,  %w{deployer@104.131.177.214}
```

Next, add the following entries to the `config/deploy.rb` file:

```
set :application, 'shippable_capistrano_test'
set :repo_url, 'https://github.com/shippableSamples/sample-rubyonrails-capistrano-digitalocean.git'
set :deploy_to, '/home/deployer'
set :linked_files, %w{.env}
```

The last line will result in symlinking the `/home/deployer/shared/.env`
file to the directory that contains the current application release
(`/home/deployer/current`). Using this mechanism, we can keep the
secrets and password out of the application git repository. We add extra
gem at the top of the `Gemfile`:

```
gem 'dotenv-rails'
```

And create `.env` file that contains all the 'secret' variables:

```
SECRET_KEY_BASE=0b2827a01bbcacde4a1b77386eff145cb8f65625375d64dd33e4e1490e0edbdca4ee7bb14d120f8fc04b6a327bffa5cdafb1666cf5f88ce470f521356663cc34
DATABASE_PASSWORD=l3iIfV6atH
```

This file should be kept secure and not checked in to the version
control (`.gitignore` entry should be created for it). It needs to be
manually copied to each server in the `/home/deployer/shared/` location.
Next, the variables can be used in the Rails configuration files (such
as `config/secrets.yml` and `config/database.yml`) as follows:

```
production:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>

```

Finally, we can add `on_success` step to the `shippable.yml`, ordering deployment to the production after successful build:

```
on_success:
  - cap production deploy
```

### Using private git repositories

In the sample `config/deploy.sh` file above, we are using public GitHub repository to host the application code. If the repository is private,
additional steps need to be taken in order to grant access for the DigitalOcean droplet. There are several methods of achieving it, but the
most convenient one is to use [Shippable deployment key](/platform/integration/key-ssh) by leveraging SSH agent key forwarding.

First add the [Shippable Public SSH key](/platform/integration/key-ssh) to the deploy keys in the settings of the GitHub repository. Next, we need to modify the repository url in
`config/deploy.sh` to use SSH instead of HTTPS:

```
set :repo_url, 'git@github.com:shippableSamples/sample-rubyonrails-capistrano-digitalocean.git'
```

Next, we need to launch SSH agent and add Shippable key, so it can be
forwarded and used by the git command on the droplet:

```
on_success:
  - eval `ssh-agent -s`
  - ssh-add
  - cap production deploy
```

We invite you to explore our Ruby on Rails + Capistrano sample on our
[Shippable GitHub account](https://github.com/shippableSamples/sample-rubyonrails-capistrano-digitalocean).

## Using Dokku to deploy

The guide below will show how to deploy a Node.js application,
built on Shippable, to a DigitalOcean droplet running a dokku image.

Dokku describes itself as a 'docker powered mini-heroku'. With Dokku installed on your droplet, you can interact with it very similarly as to how you would a heroku app. More information on Dokku can be found [here](http://progrium.viewdocs.io/dokku/).

### Creating a DigitalOcean droplet with Dokku

DigitalOcean has streamlined the process by providing a droplet image with dokku preinstalled. When creating a new droplet, scroll down to the 'Select Image' section, and choose 'Dokku v0.3.23 on 14.04'.

![Dokku v0.3.23 on 14.04](../../images/ci/dokku-on-digitalocean.gif)

> **Note**
>
> If you already have a droplet running and would like to run Dokku on it. Follow the instructions on the [website](http://progrium.viewdocs.io/dokku/) and come back when you're done; the rest of the tutorial is still relevant for you, even if you installed Dokku yourself!
>

### Setting up your Project on Dokku

After your droplet is created, visit its IP address, can be found under the Droplet name and should also be emailed to you. Here you will find a web console to finish setting up Dokku. We'll come back to this in a moment. Before going any further on this screen, you need to grab your deployment key from your Shippable account.

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.
<img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="List subscriptions">
- Click on the **gear icon** on the Subscription page and then on **Settings**.
- Go to the **Deployment Key** section. Copy what you see there.
![deployment-key](../../images/ci/deploy-key.png)

Then, paste this key in the Dokku setup console that we accessed earlier (using the IP address of the Droplet), and click 'Finish Setup'.

![Dokku Setup](../../images/ci/dokku-setup.gif)

### Configuring the deployment

The droplet can now be deployed using CI/CD on Shippable, there are a few changes to be made on the `shippable.yml` file to push the right branch to dokku on deployment. A simple YAML for a nodejs application would look like

```
language: node_js

node_js:
  - 0.10.33

on_success:
  - if [ "$BRANCH" == "master" ]; then git remote add dokku dokku@<droplet-hostname>:<droplet-name>; fi
  - if [ "$BRANCH" == "master" ]; then git push dokku master; fi

```

We wrapped the git commands in conditions to check if the current branch is master. This is so the app only gets deployments triggered for pushes to my master branch and not feature branches. Our [tutorial](http://blog.shippable.com/specifying-deployment-targets-for-different-git-branches) on git branches provides more help on picking a branch to deploy.

Ensure that you replace `dokku@<droplet-hostname>:<droplet-name>` with your droplet ip address and droplet name, for example:
```
dokku@45.55.161.207:demo
```
If you setup DNS for your app, this app name section will instead specify the subdomain at which you'll access your app. More information on app naming and subdomains can be found in the [Dokku docs](http://progrium.viewdocs.io/dokku/dns/).

After making sure that the app builds property, you can find the URL by looking in the logs for `on_success` section

### Finishing Steps

Dokku's buildpacks based on Heroku's standard. This isn't a hard requirement to fulfill. One way you can fulfill this is via a procfile that states what command to start your web server with. More on that can be found on [Heroku's site](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile). Another option is to specify the command in the scripts section of your package.json file. Here is the snippet containing this information from a sample package.json file:

```
"scripts": {
  "start": "node index.js"
},
```

We invite you to explore our Node + DigitalOcean sample on our
[Shippable GitHub account](https://github.com/shippableSamples/sample-nodejs-digitalocean).
