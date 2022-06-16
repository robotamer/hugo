+++
date = "2011-06-26T10:24:08Z"
modified = ""
title = "msmtp install, config and test"
linktitle = ""
description = ""
language = "en"
author = ""
tags = ["server"]
groups = ["linux", "mail"]
categories = ["linux", "mail"]
+++


Why have more then one mail server? Or why even have a mail server at all, if you can use gmail?
Well there are many reasons to have at leased one mail server, but having one on each server doesn't make sense at all.
I tried both ssmtp and msmtp, and decided on msmtp.
<!-- more -->


### msmtp is an SMTP client.


In the default mode, it transmits a mail to an SMTP server, which takes care of further delivery.
To use this program with your mail user agent (MUA), create a configuration  file with your mail account(s) and tell your MUA to call msmtp instead of  /usr/sbin/sendmail.
**Features include:**

 * Sendmail compatible interface (command line options and exit codes).
 * TLS/SSL support, including client certificates.
 * Authentication methods PLAIN, LOGIN, CRAM-MD5, EXTERNAL, GSSAPI, SCRAM-SHA-1, DIGEST-MD5, and NTLM.
 * PIPELINING support for increased transmission speed.
 * DSN (Delivery Status Notification) support.
 * RMQS (Remote Message Queue Starting) support (ETRN keyword).
 * IPv6 support.
 * LMTP support.
 * Support for multiple accounts.


msmtp is [free software](http://www.gnu.org/philosophy/free-sw.html); you can redistribute it and/or modify it under the terms of the  [GNU General Public License](http://www.gnu.org/licenses/gpl.html) as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.


* * *

### Requirements

**Platforms**

msmtp runs on a wide variety of platforms. It needs little more than an ANSI C  compiler and Berkeley-style sockets.
**Libraries**
msmtp does not need any additional libraries, but it can use the following to enhance its feature set:

	
 * [GnuTLS](http://www.gnu.org/software/gnutls/) (>=1.2.0)
The GnuTLS library provides TLS/SSL support. It is highly recommended.

 * [OpenSSL](http://www.openssl.org/) (>=0.9.6)
OpenSSL is supported as an alternative to GnuTLS.

 * [GNU SASL](http://josefsson.org/libgsasl/) (>=0.2.4)
Using the GNU SASL library adds support for the GSSAPI, DIGEST-MD5, SCRAM-SHA-1, and NTLM  authentication methods. (The methods PLAIN, LOGIN, and CRAM-MD5  are always supported).

 * [GNU Libidn](http://www.gnu.org/software/libidn/)
Support for Internationalized Domain Names (IDN) is available if you have GNU  Libidn installed.


### install

    apt-get install msmtp

### configure

Below you will see that I commented out tls_trust_file and went with tls_fingerprint.
You can not use both at the same time, and I figure that tls_fingerprint is faster, however the gmail finger print may change over the years so going with tls_trust_file is probably safer.
   
    # /etc/msmtprc
    defaults
    logfile         ~/.msmtp.log
    #tls_trust_file /etc/ssl/certs/ca-certificates.crt
    
    account         default
    host            smtp.gmail.com
    port            587
    from            xxxxx@gmail.com
    auth            on
    user            xxxxx@gmail.com
    password        *******
    tls             on
    tls_starttls    on
    tls_fingerprint DB:A0:2A:07:00:F9:E3:23:7D:07:E7:52:3C:95:9D:E6:7E:12:54:3F
    logfile         /var/log/msmtp.log
    

### Test

Send out a test mail:
    
    echo -e "Subject: msmtp test mailnThis is a test mail from msmtp" | msmtp --debug --from=default -t xxxxx@gmail.com
    

[Link to developer site](http://msmtp.sourceforge.net/)
