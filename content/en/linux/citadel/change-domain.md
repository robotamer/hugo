+++
date = "2025-04-04"
modified = ""
title = "Change Citadel Domain"
linktitle = ""
description = "Change the Citadel domain address in docker installation"
keywords = ["docker", "howto", "webcit", "citadel"]
language = "en"
author = "TaMeR"
tags = ["docker", "howto", "webcit", "citadel"]
groups = ["linux", "citadel"]
categories = ["linux", "citadel"]
+++

We will use `mail` as hostname, `mail.example.net` as our original domain, and `mail.example.com` as our new domain; 
and `203.0.113.1` as our public facing IP address on this page for the citadel server. 
Replace with your own. 

Pre-Install
----------
- Before you start set your DNS to point your domain to the servers IP. 
How to do that is out of this manuals scope.

___

Next we will set some variables, *replace* with your domain and IP address then execute following in your servers shell.

```sh
export CIT_DOMAIN_ORG=mail.example.net
export CIT_DOMAIN_NEW=mail.example.com
```


Change your */etc/hosts* & *lighttpd.conf* file replace old with new domain
```sh
# Replace text in files
sed -i "s|$CIT_DOMAIN_ORG|$CIT_DOMAIN_NEW|g" /etc/hosts
sed -i "s|$CIT_DOMAIN_ORG|$CIT_DOMAIN_NEW|g" /etc/lighttpd/lighttpd.conf

# Check config file
lighttpd -tt -f /etc/lighttpd/lighttpd.conf
```
If there is an error at this point check your */etc/lighttpd/lighttpd.conf* file. Fix the problem and run last command again. 

- No error continue
```sh
certbot certonly --agree-tos --non-interactive --text --rsa-key-size 4096 \
	--email webmaster@${CIT_DOMAIN_NEW} \
	--webroot --webroot-path /srv/www/lighttpd \
	--domains ${CIT_DOMAIN_NEW}
```

- No error continue
```
sv stop lighttpd
```

- No error continue
```
cp /etc/letsencrypt/live/${CIT_DOMAIN_NEW}/privkey.pem /usr/local/citadel/keys/citadel.key 
cp /etc/letsencrypt/live/${CIT_DOMAIN_NEW}/fullchain.pem /usr/local/citadel/keys/citadel.cer
```

- No error continue
```sh
docker stop citadel
wait
docker rename citadel citadel.net
```

- No error continue
```sh
docker run -d --restart=unless-stopped --network host \
    --volume=/usr/local/citadel:/citadel-data \
    --volume=/usr/local/webcit/.well-known:/usr/local/webcit/.well-known \
    --volume=/usr/local/webcit/static.local:/usr/local/webcit/static.local \
    --name=citadel citadeldotorg/citadel --http-port=8080 --https-port=8443
```

- No error continue
```sh
sv start lighttpd
```

- Last we change the certbot post renewal hook
```sh
sed -i "s|$CIT_DOMAIN_ORG|$CIT_DOMAIN_NEW|g" /etc/letsencrypt/renewal-hooks/post/citadel.sh
```

All done check your new setup.  
If you have a problem ask questions at [Citadel Support](https://uncensored.citadel.org/readfwd?go=Citadel%20Support)

