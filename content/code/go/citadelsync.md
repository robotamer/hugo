+++
date = "2013-12-27T20:40:00Z"
description = "Imports vCards in to the Citadel Mail Server"
groups = ["blog"]
language = "en"
linktitle = "Citadel Sync"
tags = ["code", "go", "log"]
title = "﻿Citadel vCard Sync"

+++

#### Features

 - Citadel Sync will work on most operating systems including Linux, Mac, PC, Android ...
 - Converts a multi vCard file in to many for each to hold a single contact
 - Adds UID and REV fields to the vCard if missing
 - Uploads vCards to a given remote [Citadel] Mail Server
 - You can specify, which folder on the server to upload to 
 - Can populate the Display name field from first and last name, or populate first and last name from display name
  

#### Features planned

 - Compare revision state and sync in case you modify a vCard on the server. This 
 is not supported in version 1, vCards on the server will be over written by the local once.
 - Create an executable for Android etc.
 - Create a single vCard to hold all contacts, so it can be used as an address book in Thunderbird etc.

#### Features not supported

 - Does not support non standard vCard fields like:
   *(If you must have one or two of those let me know)*
 	- X-EVOLUTION-RADIO
 	- X-KADDRESSBOOK-X-AssistantsName


#### Hints: 
 - Backup your vCards before you start using citadelsync, both local and server
 - Backup your config file before you upgrade to a new version of citadelsync

### Command Line Flags:

A config file is required, set it with the -c flag.

If the specified config file does not exist, one will be created with default values.

 > -D will delete all items on the remote server, in the given room WITHOUT WARNING

Username and Password for the [Citadel] Mail Server may be
defined in the config file, or optionally on the command line

The -r Flag checks if the room exists on the mail server. You
can use this to verify that you have spelled the room name correctly


	-v=false: version
	-h=false: Prints out this help text
	-c="citadelVcard.json": Config file (*.json)
	-u="": Username
	-p="": Password
	-r=false: Check if the citadel room even exists
	-D=false: Delete all items in the room!
	-i="": Import file (*.vcf)

#### The Environment flags in the config file are:

	0 = Production
	1 = Prints a lot of info
	2 = Debug mode, same as 1 but will exit on error

## Install

### Executable

 > There is an executable version for Linux AMD64 at:
https://bitbucket.org/gotamer/citadel/downloads/citadelsync

### From Source

 > Install go then run

	go get bitbucket.org/gotamer/citadel
	
________________________________________________________

The MIT License (MIT)
========================================================

Copyright © 2013 Dennis T Kaplan <http://www.robotamer.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sub-license, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[Citadel]:(http://www.citadel.org "Citadel")
[GoDoc]:(https://godoc.org/bitbucket.org/gotamer/citadel)

