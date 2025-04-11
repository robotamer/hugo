+++
date = "2025-04-04"
modified = ""
title = "Lighttpd Webserver for Citadel"
linktitle = ""
description = "Setting up Lighttpd Webserver for Citadel"
keywords = ["lighttpd", "howto", "webcit", "citadel"]
language = "en"
author = "TaMeR"
tags = ["lighttpd", "howto", "webcit", "citadel"]
groups = ["linux", "citadel"]
categories = ["linux", "citadel"]
+++

Lighttpd is a free and open-source web server, designed for speed, efficiency, and flexibility.

This tutorial is designed to work hand in glove with our [citadel docker](/linux/citadel/docker) installation tutorial. 
We will install this on Void Linux but besides the installation, everything should work on any NIX.

Void Linux Installation
-----------------------
```sh
xbps-install -Suv
xbps-install -S lighttpd
```

- configuration file location

```
/etc/lighttpd/lighttpd.conf
```

- Check that your configuration is ok:

```sh
lighttpd -tt -f /etc/lighttpd/lighttpd.conf
```

- start the server for testing:

```sh
lighttpd -D -f /etc/lighttpd/lighttpd.conf
```

- Enable Lighttpd to start automatically at boot time:

```sh
ln -s /etc/sv/lighttpd /var/service/
```
- Start the Lighttpd service:

```sh
sv start lighttpd
```

- /etc/lighttpd/lighttpd.conf

```sh
# See /usr/share/doc/lighttpd
# and http://redmine.lighttpd.net/projects/lighttpd/wiki/Docs:ConfigurationOptions

server.username		= "_lighttpd"
server.groupname	= "_lighttpd"
server.document-root	= "/srv/www/lighttpd"
server.errorlog		= "/var/log/lighttpd/error.log"
dir-listing.activate	= "enable"
index-file.names	= ( "index.html" )

server.modules += ( "mod_proxy", "mod_openssl" )

static-file.exclude-extensions = ( ".fcgi", ".php", ".rb", "~", ".inc" )

$SERVER["socket"] == ":443" {
    ssl.engine = "enable"
    ssl.pemfile = "/etc/letsencrypt/live/srv.example.net/fullchain.pem"
    ssl.privkey = "/etc/letsencrypt/live/srv.example.net/privkey.pem"
}


$HTTP["host"] == "mail.example.net" {
  proxy.balance = "hash"
  proxy.server = (
    "" => (
      "citadel" => (
        "host" => "127.0.1.2",
        "port" => "8080"
      )
    )
  )
    ssl.pemfile = "/etc/letsencrypt/live/mail.example.net/fullchain.pem"
    ssl.privkey = "/etc/letsencrypt/live/mail.example.net/privkey.pem"
}

```