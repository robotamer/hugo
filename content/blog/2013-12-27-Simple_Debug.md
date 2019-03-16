+++
date = "2013-12-27T20:40:00Z"
description = "The things you can do, in this case with the Go programing language"
groups = ["blog"]
keywords = ["code", "go", "golang", "log", "debug"]
language = "en"
linktitle = "Simple Debug"
tags = ["code", "go", "log"]
title = "﻿Sometimes I fall in love with code"

+++

I don't use this, since I need often more but isn't this just need? 

http://play.golang.org/p/QFheQeChIn

```go
	package main

	import "log"

	const debug debugging = true // or flip to false

	type debugging bool

	func (d debugging) Printf(format string, args ...interface{}) {
		d {
			log.Printf(format, args...)
		}
	}

	func main() {
		debug.Printf("foo %d %.2f", 42, 12.7)
	}
```