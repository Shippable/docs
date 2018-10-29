page_main_title: Setting gerrit vote
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Setting gerrit vote
page_description: How to set options related to gerrit vote

Gerrit builds can be configured to set custom labels and values on a change once the build completes.
By default `Verified` label is set. Default voting can be disabled by setting `vote` to `false`.

# Default voting configuration

```
vote:
    on_success:
        Verified: 1
    on_failure:
        Verified: -1
    on_timeout:
        Verified: -1
    on_unstable:
        Verified: -1
    on_cancelled:
        Verified: 0
    on_skipped:
        Verified: 0
```

# Disable default voting

```
vote: false
```

# Custom voting configuration

```
vote:
    on_success:
        Verified: 1
        Code-Review: 2
    on_failure:
        Verified: -1
        Code-Review: -2
```
