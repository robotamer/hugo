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

Lets first create a variable, so you can just copy/paste the code.  
Replace *mail.example.net* with the your telnet destination domain name.

```sh
export CIT_DOMAIN_NAME=mail.example.net
```

- c = Client, this is what you will enter
- s = Server, response we receive.

```sh
c: telnet $CIT_DOMAIN_NAME 587
s: Trying 107.189.21.115...
s: Connected to mail.example.net.
s: Escape character is '^]'.
s: 220 mail.example.net ESMTP Citadel server ready.
c: EHLO $USER
s: 250-Hello "your user name"
s: 250-HELP
s: 250-SIZE 10485760
s: 250-STARTTLS
s: 250-AUTH LOGIN PLAIN
s: 250-AUTH=LOGIN PLAIN
s: 250 8BITMIME
c: STARTTLS
s: 554 TLS not supported here
c: QUIT
s: 221 Goodbye...
s: Connection closed by foreign host.
```

```sh
openssl s_client -debug -starttls smtp -crlf -showcerts -connect $CIT_DOMAIN_NAME:25
```

```sh
openssl s_client -debug  -crlf -showcerts -connect $CIT_DOMAIN_NAME:465
```