page_main_title: Shippable installer
main_section: Reference
sub_section: Admiral
page_title: Admiral - BitBucket Server Integration
page_description: Shippable Server (SE/EE) and BitBucket Server Integration

# Bitbucket Server integration

Bitbucket Server integration is supported with Shippable Server SE and EE editions. To build repositories
hosted on BitBucket Server with Shippable server, you will need to sign into Shippable with your Bitbucket
server account.

Steps to configure Bitbucket Server integration -

## Generate SSH keys.

  * Follow the steps [here](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html).

    As an example,
    `
    ambarishs-MacBook-Pro:aws ambarish$ ssh-keygen
    Generating public/private rsa key pair.
    Enter file in which to save the key (/Users/ambarish/.ssh/id_rsa): /Users/ambarish/aws/id_rsa
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /Users/ambarish/aws/id_rsa.
    Your public key has been saved in /Users/ambarish/aws/id_rsa.pub.
    The key fingerprint is:
    SHA256:7gx+OWkEMnQgmPVyx8DJf9a8T683e2bC6xgEWIqjsuk ambarish@ambarishs-MacBook-Pro.local
    The key's randomart image is:
    +---[RSA 2048]----+
    | +oooo    .      |
    |o  o=o.. +       |
    |  ..oo= oo.      |
    |   oooo.o o.     |
    |  . .o +S  ..    |
    |   +   .. ...    |
    |  o   ...o o.o   |
    | .   . +*   .o* +|
    |  E   .oo.  o++O |
    +----[SHA256]-----+
    `

  * Export the public key by running the following command - `openssl rsa -in <path to id_rsa> -pubout`

    As an example,

    `
    ambarishs-MacBook-Pro:aws ambarish$ openssl rsa -in ./id_rsa -pubout
    writing RSA key
    -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApiLruFBLrjtwO+ZgZx0/
    RyhBWfTrjfRYAW4U6cc12CTwLgxx2dVzcXu+MQ+wVKxSdGyGgNzWPHPSw23Sjdtq
    eU76ELXYRjpAnfTadzMuhESFJI14ndsY8mOAqNqAwgkU0N+ZQ7mkjrSWqykbwkOP
    5uKBamcfdICQzuTSfk94XhLj4gQUTiIu3XTWKsIacRsGIl2700ZDJW19lf+oO3TX
    2uCHinlQRHSOWfaAoQtXOGx+zvwcmMXqN4mqC2sAwb+WiGmmEd/HPBeN8GJaTtWh
    D0y07fyeLmTh7LVkBlNAiXsZjTIQhD5DGeJ6CHPd/sn1091F8JhxVWPRlTY8uadm
    7QIDAQAB
    -----END PUBLIC KEY-----
    `

  * The exported public key will be used in the next step.

## Install add-ons in your BitBucker Server.

  * Log into your Bitbucket Server dashboard and click on the gear/administration icon.
  * Click on `Find new add-ons`.
  * Search for `Shippable`
  * Install the `Shippable CI/CD for Bitbucket Server` add-on by clicking on the `Install` button.
  * Install the `Shippable OAuth for Bitbucket Server` add-on by clicking on the `Install` button.

## Enable BitBucket Server Auth and SCM in Shippable Server UI (Admiral).

  * Launch Admiral and click on `Configure & Install`.
  * Click on the `Bitbucket Server` checkbox.
  * Make a note of `WWW URL` and `Callback URL`.

## Configure OAuth in your BitBucker Server.

  * Log into your Bitbucket Server dashboard and click on the gear/administration icon.
  * Click on `Application Links`.
  * Enter the `WWW URL` (from step 3) and click Continue in the `Configure Application URL` popup.
  * Specify `Shippable` in `Application Name`.
  * Select `Generic Application` for `Application Type`.
  * Click on the `Create incoming link` checkbox.
  * Click `Continue` to proceed to the `Link Applications` popup.
  * Specify any secret/password in `Consumer Key` and make a note of it.
  * Specify `Shippable` in `Consumer Name`.
  * Copy and paste the public key generated at the end of Step 1 in  `Public Key`.
  * Click on `Continue`.

## Configure OAuth in Admiral.

  * Switch back to Admiral and click on `Configure & Install`.
  * Enter the password/secret specified in Step 4 in `Client ID`.
  * Enter the private key (contents of id_rsa file generated in step 1) in `Client Secret`.
  * Click on `Save` and `Restart Services`.

## Login to Shippable Server.
  * Click on `Login` and `BITBUCKET SERVER`.
  * Grant access to the permissions requested in the OAuth dialog.
  * You should see the all your projects under Subscriptions in the left sidebar.
