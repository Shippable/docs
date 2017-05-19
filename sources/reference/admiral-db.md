page_main_title: Shippable installer
main_section: Reference
sub_section: Admiral
page_title: Admiral - Database Configuration
page_description: Admiral Database Configuration
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, postgres

# Admiral Database Configuration
When installing Shippable, you might want to install the database on its own machine.  The Admiral installer can easily be configured to accomplish this.

## IP Address configuration
During the initial command line installation, Shippable will prompt you for the database IP address in the `Collecting required information` section.  Instead of using the default, you should insert the IP address of the machine on which you'd like to install the Shippable database.
```
|___ Please enter your current IP address. This will be the address at which you access the installer webpage. Type D to set default (127.0.0.1) value.
165.227.8.141
|___ Setting value of database IP address
|___ Please enter the IP address of the database or D to set the default (165.227.8.141).
165.227.8.142

```

## New Database installation

Once you give an IP address, Shippable will ask if you'd like to install the database, or if you've already got your database running, and simply want Shippable to connect to it.  On this page, we will explain how to install a fresh database.  Shippable uses postgres version 9.5.

```
|___ Enter I to install a new database or E to use an existing one.
```

Select "I" here.  Next, Shippable prompts you for a password for your database.  Shippable will initialize your database with this password.  Before the final confirmation, make sure that all of your settings are correct. Once initialized, some of these values are difficult to change.

```
|___ These values are easy to set now, but hard to change later! Please confirm that they are correct:
Installer Access Key:     AKIAI...
Installer Secret Key:     zD5SlYS...
Admin Panel Address:      165.227.8.141
Database Address:         165.227.8.142
Database Type:            New
Database Port:            5432
Database Password:        ay3-ay3_capt4in!
|___ Enter Y to confirm or N to re-enter these values.
Y
|___ Confirmation received
|___ Saving values
|___ Saved access key
|___ Saved secret key
|___ Saved admin panel address
|___ Saved database address
|___ Saved database installation type
|___ Saved database port
|___ Saved database password

```

## Remote machine setup

Once you confirm that your values are correct, Shippable will print a command that must be run on your database machine.  This will grant ssh access to the installer so that it can connect and run the installation script.  Make sure to run this command on your database machine before you move on to the next step.

```
|___ Run the following command on 165.227.8.142 to allow SSH access:
sudo mkdir -p /root/.ssh; echo ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCzwSBD2um+6IQg5pTaxln61ByIyTQwf5EbdG+lkCVwKeWOPnGEQvMsHepBhi15eG7icpx1m6Fx+azFAxuxofmmhwCvlZPsqImRzCNCMKrUf0GxdlMjvt5JD5WbMr5WYpPtzh0z7g7Be1DbssrwF6tsmhoJc3AAGoKhdf1pgMHwAuL5i1KxBmSheCJ6SPFctHpct6XuUvVCxRX7Ty6MSqaV+rAvDyGPGBsnN5EKpQriLfMVnTVbblrUw2/ZwEqS2uj+CeHJ9yOxk+cc9/iKio4otuEHfBHwBgEJPfys1liQoPfHar7TIttSfMzB7Xe/nF root@admiral-main >> /root/.ssh/authorized_keys;
|___ Enter Y to confirm that you have run this command
Y
|___ Confirmation received

```

Once you confirm that you've run the command, the installer will proceed to download relevant images and perform the basic setup requirements for running Shippable.
```
|___ Admiral container successfully running
|___ Go to 165.227.8.141:50003 to access the admin panel
|___ Login Token: aacfae98-0cf2-42b1-bc62-0738c3505d74
|___ Installation successfully completed !!!

```

If you ssh into your database machine, you should be able to connect to it by using the `psql` utility.
```
root@admiral-db:~# psql shipdb -U apiuser -h localhost
Password for user apiuser:
psql (9.5.7)
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.

shipdb=> \dt

```

## Checking the configuration and logs
Once the Installation is complete, you can view the database logs by visiting the admiral UI in your browser, and logging in with the provided token.  This will take you to the main configuration panel, where you can see a "database" row.  On the right side, you can select the "config" button to view some of the settings you chose during installation.

```
ipAddress:        138.197.207.237
dbPort:           5432
dbName:           shipdb
dbUser:           apiuser
dbPassword:       ay3-ay3_capt4in!
```

After clicking "initialize" for the first time, your database logs will be populated and you will be able to see the result by clicking the "logs" button.

```
# 22:05:42 #######################################
# Generating system settings
##################################################
|___ Creating system settings table
|___ LOGS_FILE:/var/lib/shippable/logs/db.log
|___ DB_CONFIG_DIR: /etc/shippable/db
|___ Upserting system settings in db
|___ Executing: PGHOST=138.197.207.237 PGPORT=5432 PGDATABASE=shipdb PGUSER=apiuser PGPASSWORD=ay3-ay3_capt4in! psql -U apiuser -d shipdb -h 138.197.207.237 -v ON_ERROR_STOP=1 -f /etc/shippable/db/system_settings.sql
DO
DO
# 22:05:42 #######################################
# Generating system codes
##################################################
|___ Creating system codes table
|___ DB_DATA_DIR: /var/lib/shippable/db/data
|___ DB_CONFIG_DIR: /etc/shippable/db
|___ LOGS_FILE:/var/lib/shippable/logs/db.log
|___ Copying system_codes.sql to db container
'/home/shippable/admiral/common/scripts/configs/system_codes.sql' -> '/etc/shippable/db/system_codes.sql'
|___ Successfully copied system_codes.sql to db container
|___ Upserting system codes in db
|___ Executing: PGHOST=138.197.207.237 PGPORT=5432 PGDATABASE=shipdb PGUSER=apiuser PGPASSWORD=ay3-ay3_capt4in! psql -U apiuser -d shipdb -h 138.197.207.237 -v ON_ERROR_STOP=1 -f /etc/shippable/db/system_codes.sql
DO
...
```
