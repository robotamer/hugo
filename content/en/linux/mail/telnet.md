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
Replace *mail.example.net* with your telnet destination domain name.

```sh
export REMOTE_SRV=mail.example.net
```

- c = Client, this is what you will enter
- s = Server, response we receive.

```sh
c: telnet $REMOTE_SRV 587
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
openssl s_client -debug -starttls smtp -crlf -showcerts -connect $REMOTE_SRV:25
```

```sh
openssl s_client -debug  -crlf -showcerts -connect $REMOTE_SRV:465
```
telnet start
------------
```sh
$ telnet $REMOTE_SRV 25
$ telnet $REMOTE_SRV 143
```
To connect using the TLS protocol on port 587, use:
--------------
```sh
$ openssl s_client -starttls smtp -connect $REMOTE_SRV:587

$ openssl s_client -debug -starttls smtp -crlf -connect $REMOTE_SRV:587
```

IMAP Port 143 starttls
----------------------
```sh
$ openssl s_client -starttls imap -connect $REMOTE_SRV:143
```

To use SSL on port 465:
-----------------------
```sh
$ openssl s_client -connect $REMOTE_SRV:465
```

On most SMTP servers you will get a list of commands back when using the Extended Hello (EHLO) command:
```sh
250-smtp.sendgrid.net
250-8BITMIME
250-PIPELINING
250-SIZE 31457280
250-AUTH PLAIN LOGIN
250 AUTH=PLAIN LOGIN
```
Using PLAIN
-----------
The PLAIN mechanism expects a base64 encoded string containing both username and password, each prefixed with a NULL byte. To generate this string using the base64 binary, run this command:
```sh
$ echo -ne "\0username\0password" | base64
AHVzZXJuYW1lAHBhc3N3b3Jk
```

```sh
AUTH PLAIN AHVzZXJuYW1lAHBhc3N3b3Jk
235 Authentication successful
```

Using LOGIN authentication
-----------
The LOGIN mechanism also expects base64 encoded username and password, but separately. First, generate the base64 encoded strings:
```sh
$ echo -ne "username" | base64
dXNlcm5hbWU=
$ echo -ne "password" | base64
cGFzc3dvcmQ=
```
and authenticate with the SMTP server:

```sh
AUTH LOGIN
```
You will be prompted for the username first, then the password.


IMAP port 143 example
-------------
```sh
C: a001 CAPABILITY
S: * CAPABILITY IMAP4rev1 STARTTLS LOGINDISABLED
S: a001 OK CAPABILITY completed
C: a002 STARTTLS
S: a002 OK Begin TLS negotiation now
<TLS negotiation, further commands are under [TLS] layer>
C: a003 CAPABILITY
S: * CAPABILITY IMAP4rev1 AUTH=PLAIN
S: a003 OK CAPABILITY completed
C: a004 LOGIN joe password
S: a004 OK LOGIN completed
```

SMTP Example:
----
```sh
$ telnet 172.16.6.165 25
Trying 172.16.6.165...
Connected to my_esa.
Escape character is '^]'.
220 my_esa.local ESMTP
helo
250 my_esa.local
mail from: <test@test.com>
250 sender <test@test.com> ok
rcpt to: <user@other.com> 
250 recipient <user@other.com> ok
data
354 go ahead
subject: TESTING SMTP
This is line one.
This is line two.
. 
250 ok: Message 214 accepted
quit
221 my_esa.local
Connection closed by foreign host.
```


Commonly Seen SMTP Error Codes
==============================
4xx Codes:
---------
```
421 #4.4.5 Too many TLS sessions at this time
421 #4.4.5 Too many connections from your host
421 #4.4.5 Too many connections to this host
421 #4.4.5 Too many connections to this listener
421 #4.x.2 Too many messages for this session
421 <hostname> Service not available, closing transaction channel
421 Exceeded allowable connection time
421 Exceeded bad SMTP command limit, disconnecting
421 The evaluation license has expired
451 #4.3.0 Server Error
452 #4.3.1 queue full
452 #4.3.1 server resources low - try again later
452 #4.3.1 temporary system error (12)
452 #4.5.3 Too many recipients
454 TLS not available due to a temporary reason
```

5xx Codes:
----------
```
500 #5.5.1 command not recognized
500 Line too long
501 #5.0.0 EHLO requires domain address
501 #5.5.2 syntax error XXX
501 #5.5.4 Invalid arguments to AUTH command
501 Unknown command XXX
501 Unknown option XXX
501 Unknown value XXX
503 #5.3.3 AUTH not available
503 #5.5.0 AUTH not permitted during a mail transaction
503 #5.5.0 Already authenticated
503 #5.5.1 MAIL first
503 #5.5.1 RCPT first
503 Bad sequence of commandsDATA within mailmerge transaction
503 Bad sequence of commandsXPRT within plain transaction
503 Bad sequence of commandsnow receiving parts
503 Not in a mailmerge transaction
504 #5.5.1 AUTH mechanism XXX is not available
504 Command parameter XXX unrecognized
504 Invalid XDFN syntax
504 Invalid part number
504 Invalid part number XXX
504 No variable value specified
504 Other parts still missing
504 Reserved variable name
504 Syntax error in *parts syntax
504 XDFN command must not contain NULL characters
530 #5.7.0 Must issue a STARTTLS command first
530 #5.7.0 This sender must issue a STARTTLS command first
530 Authentication required
538 #5.7.11 Encryption required
552 #5.3.4 message header size exceeds limit
552 #5.3.4 message size exceeds limit
552 size limit exceeded
554 #5.3.0 Server Error
554 Too many hops
554 message body contains illegal bare CR/LF characters.
```