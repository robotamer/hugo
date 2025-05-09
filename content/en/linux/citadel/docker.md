+++
date = "2025-04-04"
modified = ""
title = "Citadel Docker"
linktitle = ""
description = "Setting up Citadel with Docker"
keywords = ["docker", "howto", "webcit", "citadel"]
language = "en"
author = "TaMeR"
tags = ["docker", "howto", "webcit", "citadel"]
groups = ["linux", "citadel"]
categories = ["linux", "citadel"]
+++

We will use `mail` as hostname, `mail.example.net` as our domain, 
and `203.0.113.1` as our public facing IP address on this page for the citadel server. 
Replace with your own. 

Pre-Install
----------
- Before you start set your DNS to point your domain to the servers IP. 
How to do that is out of this manuals scope.

- Make sure docker is installed already.
Installation of docker is a prerequisite that is out of scope of this documentation. 

___
Installation
------------
Next we will set some variables, *replace* with your domain and IP address then execute following in your servers shell.

```sh
export CIT_HOST_NAME=mail
export CIT_DOMAIN_NAME=mail.example.net
export CIT_IP_ADDRESS=203.0.113.1
```

```sh
mkdir -p /usr/local/citadel
mkdir -p /usr/local/webcit/.well-known
mkdir -p /usr/local/webcit/static.local/t
echo "127.0.1.1   $CIT_DOMAIN_NAME   $CIT_HOST_NAME">>/etc/hosts
echo "$CIT_IP_ADDRESS   $CIT_DOMAIN_NAME   $CIT_HOST_NAME">>/etc/hosts
```

Now your */etc/hosts* file should look something like following. We only added the last two lines. Make sure `127.0.1.1` is a unique IP address in the first column. If you have a IP6 address you may add it as well.

```sh
#
# /etc/hosts: static lookup table for host names
#

#<ip-address>		<hostname.domain.tld>	<hostname>
127.0.0.1		localhost.local		localhost
::1				localhost.local		localhost ip6-localhost

127.0.1.1		mail.example.net		mail
203.0.113.1		mail.example.net		mail
```

Create Docker
-------------
- Choice 1: Bind to IP 0.0.0.0 

```sh
docker run -d --restart=unless-stopped --network host \
    --volume=/usr/local/citadel:/citadel-data \
    --volume=/usr/local/webcit/.well-known:/usr/local/webcit/.well-known \ 
    --name=citadel citadeldotorg/citadel
```

- Choice 2: Bind to `0.0.0.0` except change port 80 to 8080. 

```sh
docker run -d --restart=unless-stopped --network host \
    --volume=/usr/local/citadel:/citadel-data \
    --volume=/usr/local/webcit/.well-known:/usr/local/webcit/.well-known \
    --volume=/usr/local/webcit/static.local:/usr/local/webcit/static.local \
    --name=citadel citadeldotorg/citadel --http-port=8080 --https-port=8443
```

Stop
----
```sh
docker stop citadel
```
Start
-----
```sh
docker start citadel
```
Restart
-------
```sh
docker restart citadel
```
Upgrade
-------
```sh
docker stop citadel
docker rm citadel
docker pull citadeldotorg/citadel
-- Create (see above))
```

Backup
-------
```sh
docker stop citadel
docker rename citadel citadel_02
-- Create (see above))
```


Attach will attach to ctdlvisor
-----------------
```sh
# /usr/local/bin/ctdlvisor
docker attach citadel
```

Enter the container as root
-----------------
```sh
docker exec -it citadel sh
ls -alh
exit
```

List all running containers
---------------------------
```sh
docker container ls
OR
docker ps
``` 

List the content of a folder in the container
---------------------------------------------
```sh
docker exec -it citadel ls -al /usr/local/webcit/static
```


Other helpful commands you can try to understand what goes on
-----------------
```sh
docker --help
docker exec -it citadel  cat /etc/hosts
docker container ls
docker ps
docker ps -a
docker ps citadel
docker exec -it citadel cat /etc/hosts
docker inspect --format '{{ .NetworkSettings.IPAddress }}' citadel
docker inspect --format '{{ .Config.Hostname  }}' citadel
```

Citadel Repo
------------
https://code.citadel.org