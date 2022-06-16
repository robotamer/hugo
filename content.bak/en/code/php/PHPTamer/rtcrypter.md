+++
description = "RTCrypter allows for encryption and decryption on the fly using a simple method."
date = "2015-01-28T19:54:59Z"
groups = ["code", "php"]
groups_weight = 20
keywords = ["Crypter", "php", "phptamer"]
linktitle = "Crypter"
tags = ["phptamer"]
title = "RTCrypter"

+++

RTCrypter does not require mcrypt, mhash or any other PHP extension, it uses only PHP.


	$crypt = new RTCrypter();
	$crypt->setCharacters('#@|*-+.,!~`$%^&<>{}[]()0/\123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
	$secretKey = $crypt->genKey();
	

	$crypt = new RTCrypter();
	$crypt->useBase64(FALSE); // TRUE is default
	$crypt->setCharacters('#@|*-+.,!~`$%^&<>{}[]()0/\123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
	$crypt->setScramble($secretKey);


