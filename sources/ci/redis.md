page_main_title: Redis
main_section: CI
sub_section: Configuration
sub_sub_section: Working with services
page_title: Continuous Integration with Redis
page_description: How to do Continuous Integration with Redis in Shippable

#Continuous Integration with Redis

Redis is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs Redis.

##Starting Redis

To start redis, include the following in your  **shippable.yml**:

```
services:
  - redis
```

When started, Redis runs on port 6379 by default.

##Advanced config
###Custom startup command

To customize the startup command, you should define the SHIPPABLE_REDIS_CMD environment variable in your yml.

For example, the following yml snippet overrides the default startup command for redis:

```
env:
  global:
    - SHIPPABLE_REDIS_CMD="<command>"
```
