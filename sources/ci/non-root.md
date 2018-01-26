page_main_title: Running CI as a non-root user
main_section: CI
sub_section: Advanced config
page_title: Running CI as a non-root user
page_description: How to run CI as a non-root user
page_keywords: non root user

# Running CI as a non-root user

To run CI as a non-root user, you would need to create a new user and then run every command as
the non-root user.

To create a user, add this command to your ci section:

```
- adduser --disabled-password --gecos "" newuser
```

To run a command as newuser, do this:

```
- su -c "gradle" newuser
```
