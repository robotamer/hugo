+++
description = ""
date = "2015-01-28T19:54:59Z"
groups = ["go"]
keywords = ["code", "go"]
language = "en"
linktitle = "﻿Snippets"
title = "﻿Go Snippets"

+++

time
------
### Unix time to Date
	d := time.Unix(1348102780, 0).Format(time.UnixDate)
[GoPlay](http://play.golang.org/p/ZNY_r72Mbj "GoPlay")

unicode/utf8
------------
### RuneCount
	rc := utf8.RuneCount([]byte("dsjkdshdjsdh..Ü..js"))
[GoPlay](http://play.golang.org/p/D428-5_J6V "GoPlay")

encoding/base64
---------------
### Encode
	value = base64.StdEncoding.EncodeToString([]byte("Hello World"))
### Decode
	hw, err := base64.StdEncoding.DecodeString(value)
[GoPlay](http://play.golang.org/p/JrdcvJ_G5F "GoPlay")

