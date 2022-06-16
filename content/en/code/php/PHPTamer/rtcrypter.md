+++
date = "2015-01-28T19:54:59Z"
modified = ""
title = "RTCrypter"
linktitle = ""
description = "RTCrypter allows for encryption and decryption on the fly using a simple method."
keywords = ["Crypter", "php", "phptamer"]
language = "en"
author = ""
tags = ["phptamer"]
groups = ["code", "php", "PHPTamer"]
categories = ["code", "php", "PHPTamer"]
+++


RTCrypter does not require mcrypt, mhash or any other PHP extension, it uses only PHP.


	$crypt = new RTCrypter();
	$crypt->setCharacters('#@|*-+.,!~`$%^&<>{}[]()0/\123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
	$secretKey = $crypt->genKey();
	

	$crypt = new RTCrypter();
	$crypt->useBase64(FALSE); // TRUE is default
	$crypt->setCharacters('#@|*-+.,!~`$%^&<>{}[]()0/\123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
	$crypt->setScramble($secretKey);


