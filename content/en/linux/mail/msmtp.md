+++
date = "2015-01-28T22:38:12Z"
modified = ""
title = "msmtp"
linktitle = ""
description = "Setting up msmtp as sendmail on debian linux (to send email)"
keywords = ["linux", "howto", "debian", "msmtp", "mail", "smtp", "sendmail"]
language = "en"
author = ""
tags = ["howto", "linux", "debian", "server", "mail", "smtp"]
groups = ["linux", "mail"]
categories = ["linux", "mail"]
+++


# /etc/msmtprc

	defaults
	maildomain      example.net
	syslog          LOG_MAIL
	aliases         /etc/aliases


	account         default
	host            mail.example.net
	port            587
	from            srv7@example.net
	auth            on
	user            user@example.net
	password        ********
	tls             on
	tls_starttls    on
	#tls_certcheck   off
	tls_fingerprint DB:A0:2A:07:00:F9:E3:23:7D:07:E7:52:3C:95:9D:E6:7E:12:54:3F


Your alias file

	# /etc/aliases 
	default: me@example.net


A php script to send mail

	#!/usr/bin/php
	<?php
	 
	define('TAB',"\t");
	 
	$user = $_SERVER['LOGNAME'];
	$host = exec("hostname -f");
	$from = $user.'@'.$host;
	 
	$to      = 'sweety@example.net';
	$subject = 'Testing msmtp';
	$message = 'hello from '. $host;
	$headers = 'From: '.$from.PHP_EOL;
	$headers .= 'X-Mailer: msmtp + PHP '.phpversion();
	 
	if(mail($to, $subject, $message, $headers))
	{
	     echo PHP_EOL.TAB.'Your message was successfully accepted for delivery'.PHP_EOL.PHP_EOL;
	}else{
	     echo PHP_EOL.TAB.'Your message was not accepted for delivery!'.PHP_EOL.PHP_EOL;
	}
	 
	?>
