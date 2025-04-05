+++
date = "2025-04-04"
modified = ""
title = "telnet to mail server"
linktitle = ""
description = "Telnet in to remote server"
keywords = ["linux", "telnet", "mail", "smtp", "pop3", "openssl", "citadel"]
language = "en"
author = "TaMeR"
tags = ["linux", "telnet", "mail", "smtp", "openssl", "citadel", "pop3"]
groups = ["linux", "mail", "telnet, "openssl"]
categories = ["linux", "mail"]
+++

Telnet to a server
=======================


```sh
export CIT_DOMAIN_NAME=mail.example.net
```

```sh
telnet $CIT_DOMAIN_NAME 587
Trying 107.189.21.115...
Connected to mail.example.net.
Escape character is '^]'.
220 mail.example.net ESMTP Citadel server ready.
ehlo tamer
250-Hello tamer
250-HELP
250-SIZE 10485760
250-STARTTLS
250-AUTH LOGIN PLAIN
250-AUTH=LOGIN PLAIN
250 8BITMIME
starttls
554 TLS not supported here
quit
221 Goodbye...
Connection closed by foreign host.
```

```sh
openssl s_client -debug -starttls smtp -crlf -showcerts -connect $CIT_DOMAIN_NAME:25
```

```sh
openssl s_client -debug  -crlf -showcerts -connect $CIT_DOMAIN_NAME:465
```