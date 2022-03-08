+++
title = "Mail Server Fingerprint"
description = "Fetching the SSL Cert from a remote mail server, and extracting the SHA1 Fingerprint."
date = "2015-01-28T19:54:59Z"
keywords = ["linux", "mail", "smtp", "howto", "server", "fingerprint", "SHA1", "ssl", "cert"]
tags = ["howto", "mail", "smtp", "linux"]
linktitle = "Fingerprint"
groups = ["linux", "opensssl" ]
groups_weight = 20
+++

This is useful when you need the fingerprint to identify via TLS

Get the raw certificate:

	echo Q | openssl s_client -connect mail.example.com:443

Copy and paste the scribble from -----BEGIN CERTIFICATE----- to -----END CERTIFICATE----- to a file called cert.pem. Including -----BEGIN CERTIFICATE----- as first and -----END CERTIFICATE----- as last line.

Generate the SHA1 fingerprint by issuing following command:

	openssl x509 -in cert.pem -sha1 -noout -fingerprint

