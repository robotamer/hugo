+++
date = "2025-04-12"
modified = ""
title = "Citadel Let's Encrypt certificate authority setup"
linktitle = ""
description = "Configuring Citadel to use the Let's Encrypt Certificate Authority"
keywords = ["howto", "webcit", "citadel", "certbot", "letsencrypt", "ssl", "openssl"]
language = "en"
author = "TaMeR"
tags = ["howto", "webcit", "citadel", "certbot", "letsencrypt", "ssl", "openssl"]
groups = ["linux", "citadel"]
categories = ["linux", "citadel"]
+++

Signed TLS certificates are now available at no cost from the nonprofit [Let's Encrypt Certificate Authority](https://letsencrypt.org/). 
To use these on a Citadel system, you will need the [Certbot](https://certbot.eff.org) utility installed. 

```sh
export CIT_DOMAIN_NAME=mail.example.net

certbot certonly --agree-tos --non-interactive --text --rsa-key-size 4096 \
	--email admin@${CIT_DOMAIN_NAME} \
	--webroot --webroot-path /usr/local/webcit \
	--domains ${CIT_DOMAIN_NAME}
cp /etc/letsencrypt/live/${CIT_DOMAIN_NAME}/privkey.pem /usr/local/citadel/keys/citadel.key 
cp /etc/letsencrypt/live/${CIT_DOMAIN_NAME}/fullchain.pem /usr/local/citadel/keys/citadel.cer
```


Now create these two files.
--------------------------

    cat /etc/letsencrypt/renewal-hooks/pre/citadel.sh
____
```sh
#!/bin/sh
docker stop citadel
```

    # cat /etc/letsencrypt/renewal-hooks/post/citadel.sh
________
```sh
#!/bin/sh
cp /etc/letsencrypt/live/${CIT_DOMAIN_NAME}/fullchain.pem /usr/local/citadel/keys/citadel.cer
cp /etc/letsencrypt/live/${CIT_DOMAIN_NAME}/privkey.pem /usr/local/citadel/keys/citadel.key
wait
docker start citadel
```

