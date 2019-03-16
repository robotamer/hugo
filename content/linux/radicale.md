+++
description = "The Radicale Project is a complete CalDAV (calendar) and CardDAV (contact) server solution."
date = "2015-01-28T20:07:00Z"
groups = ["linux"]
groups_weight = 12
keywords = ["linux", "howto", "server", "Radicale", "CardDAV", "debian", "CalDAV"]
linktitle = "Radicale"
tags = ["linux", "howto", "radicale"]
title = "CalDAV and CardDAV Server"
[menu.linux]
+++

Calendars and address books are available for both local and remote access, possibly limited through authentication policies. They can be viewed and edited by calendar and contact clients on mobile phones or computers. [radicale.org](http://radicale.org)


This is my working setup on *Linux Debian* with the python *uwsgi* server and *Nginx*.  
I could not get the database to work, so the backend is file based!

### Install 

	apt-get install radicale uwsgi uwsgi-plugin-http uwsgi-plugin-python


### /etc/radicale/config

	[encoding]
	request = utf-8
	stock = utf-8


	[auth]
	type = IMAP
	imap_hostname = localhost
	imap_port = 143
	imap_ssl = False

	[rights]
	type = from_file
	file = /home/username/radicale/etc/rights

	[storage]
	filesystem_folder = /home/username/radicale/collections

	[logging]
	config = /home/username/radicale/etc/logging
	#debug = True


### /home/username/radicale/etc/logging

	[loggers]
	keys = root

	[handlers]
	keys = console,file

	[formatters]
	keys = simple,full

	[logger_root]
	level = DEBUG
	handlers = file

	[handler_console]
	class = StreamHandler
	level = DEBUG
	args = (sys.stdout,)
	formatter = simple

	[handler_file]
	class = FileHandler
	args = ('/home/username/radicale/radicale.log',)
	level = INFO
	formatter = full

	[formatter_simple]
	format = %(message)s

	[formatter_full]
	format = %(asctime)s - %(levelname)s: %(message)s


### nginx

	server {
		listen         80;
		server_name    dav.example.com;
		rewrite        ^ https://$server_name$request_uri? permanent;
	}

	server {
		listen 443;
		server_name     dav.example.com;
		root            /home/username/radicale/;
		index           index.html index.htm;
		access_log      /home/username/www/log/radicale-access.log;
		error_log       /home/username/www/log/radicale-error.log;

		ssl on;
		ssl_certificate      /home/username/etc/ssl/dav.example.com.unified.crt;
		ssl_certificate_key  /home/username/etc/ssl/dav.example.com.key;

		add_header      X-Frame-Options deny;

		gzip_static            on;
		gzip_http_version      1.1;
		gzip_proxied           expired no-cache no-store private auth;
		gzip_disable           "MSIE [1-6]\.";
		gzip_vary              on;

		location / {
			include uwsgi_params;
			uwsgi_pass unix:///tmp/radicale.sock;
		}
	}

### /home/username/radicale/radicale.wsgi  

	#!/usr/bin/env python

	import radicale

	radicale.log.start()
	application = radicale.Application()


### /etc/uwsgi/apps-available/radicale.ini  

	[uwsgi]
	uid = www-data
	gid = www-data
	socket = /tmp/radicale.sock
	plugins = http, python
	wsgi-file = /home/username/radicale/radicale.wsgi


