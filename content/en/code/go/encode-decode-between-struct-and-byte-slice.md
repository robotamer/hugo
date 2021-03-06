+++
date = "2015-01-28T19:54:59Z"
modified = ""
title = "Encode/Decode between struct and byte slice"
linktitle = ""
description = "This is handy if you need to send a struct to a database or network"
keywords = ["golang", "encode", "decode", "convert", "struct", "byte", "slice", "byteslice"]
language = "en"
author = ""
tags = ["gotamer", "database", "gob"]
groups = ["code", "go"]
categories = ["code", "go"]
+++


*sbs* stands for Struct to Byte Slice and back to Struct

## Internals:

*sbs* encodes your struct first to a Gob, then it convers it to a byte slice; it reverses the process for decoding.


#### Example

```go

	type Foo struct {
		A int
		B string
	}

	p := &Foo{111,"A string"}

	byteslice, err := sbs.Enc(p)
	...

	foo := new(Foo)
	structobject, err := sbs.Dec(foo, byteslice)
	...
```

Code is available at <https://bitbucket.org/gotamer/sbs>
