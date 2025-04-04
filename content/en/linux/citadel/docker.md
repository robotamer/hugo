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



Citadel via Docker Installation Manual
==============

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

```
mkdir -p /usr/local/citadel
mkdir -p /usr/local/webcit/.well-known
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
docker run -d --restart=unless-stopped --hostname=${CIT_DOMAIN_NAME}  \
   --volume=/usr/local/citadel:/citadel-data \
   --volume=/usr/local/webcit/.well-known:/usr/local/webcit/.well-known \
   --volume=/usr/local/webcit/static.local:/usr/local/webcit/static.local \
   -p 25:25     \
   -p 110:110   \
   -p 119:119   \
   -p 143:143   \
   -p 465:465   \
   -p 504:504   \
   -p 563:563   \
   -p 587:587   \
   -p 993:993   \
   -p 995:995   \
   -p 5222:5222 \
   -p 8080:80   \
   --name=citadel citadeldotorg/citadel
```

Note: We don't need port 443 because we will run that behind a webserver proxy

- Choice 3: Bind to specific domain 

We will have to use a bridge for that. See docker manual.
________________

Stop
----
    docker stop citadel

Start
-----
    docker start citadel

Restart
-------
    docker restart citadel

Upgrade
-------
    docker stop citadel
    docker rm citadel
    docker pull citadeldotorg/citadel
    -- Create (see above))

Attach will attach to ctdlvisor
-----------------
```
# /usr/local/bin/ctdlvisor
docker attach citadel
```

Enter the container as root
-----------------
```
docker exec -it citadel sh
ls -alh
exit
```

List all running containers
---------------------------
```
docker container ls
OR
docker ps
``` 

List the content of a folder in the container
---------------------------------------------
```
docker exec -it citadel ls -al /usr/local/webcit/static
```


Other helpful commands you can try to understand what goes on
-----------------
```
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