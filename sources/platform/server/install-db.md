page_main_title: Shippable installer
main_section: Platform
sub_section: Shippable Server
sub_sub_section: Configuration
page_title: Admiral - Database Configuration
page_description: Admiral Database Configuration
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, postgres

# Database (PostgreSQL) Configuration

Shippable Server uses PostgreSQL as its database. You have a few choices of where you want to install Postgres:

* Fresh installation on the same machine as Installer
* Fresh installation on a different machine from the Installer (**Recommended**)
* Use an existing Postgres instance, either from a previous Shippable installation, or your own instance

Our recommended approach is to install Postgres on a different machine from Installer.

## Installing Postgres

### Fresh instance on the same machine

A fresh PostgreSQL installation can be done as part of installing Admiral. This will install version 9.5.

The steps are listed below:

* When you run the `sudo ./admiral.sh install` command, you will be prompted to enter the database IP address in the `Collecting required information` section.
```
|___ Setting value of database IP address
|___ Please enter the IP address of the database or D to set the default (165.227.8.141).
D

```
Enter `D` since this will install Postgres on the same machine.
* Next, you'll be asked if you'd like to install a new database, or if you've already got your database running, and simply want Shippable to connect to it. Enter `I`.

```
|___ Enter I to install a new database or E to use an existing one.
I
```
* Next, enter an easy-to-remember password for your database. Shippable will initialize your database with this password.  

```
|___ A new database will be installed
|___ DB_PORT is not set
|___ Setting value of database port
|___ DB_PASSWORD is not set
|___ Setting database password
|___ Please enter the password for your database.
```

* Before the final confirmation, make sure that all of your settings are correct. Once initialized, some of these values are difficult to change.

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

And that's it. A fresh Postgres instance is installed on the same machine at this point.

### Fresh instance on a new machine

You can choose to install Postgres on a separate server from the one where Admiral is installed. This will install version 9.5.

The steps are listed below:

* When you run the `sudo ./admiral.sh install` command, you will be prompted to enter the database IP address in the `Collecting required information` section.
```
|___ Setting value of database IP address
|___ Please enter the IP address of the database or D to set the default (165.227.8.141).
165.227.8.142

```
Enter the IP address of the machine where you want to install Postgres.
* Next, you'll be asked if you'd like to install a new database, or if you've already got your database running, and simply want Shippable to connect to it. Enter `I`.

```
|___ Enter I to install a new database or E to use an existing one.
I
```
* Next, enter an easy-to-remember password for your database. Shippable will initialize your database with this password.  

```
|___ A new database will be installed
|___ DB_PORT is not set
|___ Setting value of database port
|___ DB_PASSWORD is not set
|___ Setting database password
|___ Please enter the password for your database.
# Enter your password
```


* Before the final confirmation, make sure that all of your settings are correct. Once initialized, some of these values are difficult to change.

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

* You will be asked to run a command on the machine where you want to install the database. Run the command and then enter `Y` in the Admiral window to continue.

```
|___ Run the following command on 165.227.8.142 to allow SSH access:
sudo mkdir -p /root/.ssh; echo ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC+FsDyga5BoKJVosJPRrHXuoCdvhMEmess3FlD4XbeZnw73R1YaVWPA/9iyXiWPtff5FOiSS1OY/io0UqFaxBeS7I916X9A2OgA6Y+8I0OM25Kgjhka/lmP7xBzopokXOrYHaXstWRcrkzMsSREBn6+DwaPlutT0FjCD2ajAsEX2QUZlD3dVlX6wARibePeH0GY2i45xFOqVNUPCysA20N6vb3S5BY5WK95BcXo3Cgv5EPqQ72WvHfdXUjM0ZRlCzgjfzc+kzpW2f5gXUspsiLkqqywWR+lUy+y0AtdvB0Vq3pfUlC9dCYAUuFbSfcFJgyw0lCP2/Cwae31Bn8KMEP root@shippable-server-1 | sudo tee -a /root/.ssh/authorized_keys;
|___ Enter Y to confirm that you have run this command
Y
```

* Admiral will continue running and install your Postgres instance in the process.

And that's it. A fresh Postgres instance is installed on the specified machine at this point.

### Connecting to an existing instance

You can choose to connect to an existing instance of Postgres instead of installing a new one. This could be an instance left over from a previous Shippable installation or your own instance.

The requirements for the existing instance are:

- Port 5432 should be opened as the default database port. If your database is listening for connections on another port, please open this port to the machine where Admiral is installed.
- Database must be **Postgres version 9.5** or higher.
- Database must have a user called `apiuser`.
- User `apiuser` must have full privileges on a database called `shipdb`.

The steps for using an existing database are listed below:

* When you run the `sudo ./admiral.sh install` command, you will be prompted to enter the database IP address in the `Collecting required information` section.

```
|___ Setting value of database IP address
|___ Please enter the IP address of the database or D to set the default (165.227.8.141).
54.84.214.94

```
Enter the IP address of the machine where your Postgres instance is running.

* Next, you will be asked if you want to install a new database or use an existing one:
```
|___ Enter I to install a new database or E to use an existing one.
|___ Existing databases must be Postgres 9.5 and have a user named apiuser with full permissions on a database named shipdb.
E
```
Enter **E**.

* Specify database port. If it is 5432 you can enter **D**.
```
|___ An existing database will be used for this installation
|___ DB_PORT is not set
|___ Setting value of database port
|___ Please enter the database port or D to set the default (5432).
D
```

* Enter your database password:
```
|___ DB_PASSWORD is not set
|___ Setting database password
|___ Please enter the password for your database.|___ DB_PASSWORD is not set
|___ Setting database password
|___ Please enter the password for your database.
myPassword
```

* The rest of the installation will connect to the database and create required tables.

* If you ssh into your database machine, you should be able to connect to it by using the `psql` utility.
```
root@admiral-db:~# psql shipdb -U apiuser -h localhost
Password for user apiuser:
psql (9.5.7)
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.

shipdb=> \dt

```

## Viewing configuration

You can view database configuration by clicking on the **Control plane** in the left navigation bar and scrolling down to the **DATABASE** section in the Admiral UI:

<img src="/images/platform/admiral/admiral-database-config.png" alt="Database config">

## Viewing logs

The **logs** button (paper clip icon) for **DATABASE** will show the logs from installation and initialization.

<img src="/images/platform/admiral/admiral-database-logs.png" alt="Database logs">
