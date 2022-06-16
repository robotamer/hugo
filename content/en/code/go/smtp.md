+++
date = "2015-01-28T19:54:59Z"
modified = ""
title = "Smtp"
linktitle = ""
description = "Simplifies the interface to the go smtp package, and creates a pipe for mail queuing"
keywords = ["golang", "mail", "smtp"]
language = "en"
author = ""
tags = ["gotamer"]
groups = ["code", "go"]
categories = ["code", "go"]
+++


Now gotamer/mail also implements the io.Writer interface.
Example:
 
```go
	package main

	import (
	    "fmt"
	    
	    "bitbucket.org/gotamer/mail"
	)

	func main() {
		s := new(mail.Smtp)
		s.SetHostname("smtp.gmail.com")
		s.SetHostport(587)
		s.SetFromName("GoTamer")
		s.SetFromAddr("xxxx@gmail.com")
		s.SetPassword("*********")
		s.AddToAddr("to@example.com")
		s.SetSubject("GoTamer test smtp mail")
		s.SetBody("The Writer below should replace this default line")
		if _, err := fmt.Fprintf(s, "Hello, smtp mail writer\n"); err != nil {
			fmt.Println(err)
		}
	}
```

As an alternative to `AddToAddr()` there is `SetToAddrs()`. With `SetToAddrs()` you can set one or more recipients as a comma separated list. 

#### A note on the host. 
Go SMTP does not allow to connect to SMPT servers with a self signed certs.  

You will get an error like following:

	x509: certificate signed by unknown authority

The way I got around that is by using [CAcert][1]. [CAcert][1] provides FREE digital certificates.

### Links
 * [Pkg Documantation](http://go.pkgdoc.org/bitbucket.org/gotamer/mail "GoTamer Mail Pkg Documentation")
 * [Repository](https://bitbucket.org/gotamer/mail "GoTamer Mail Repository")


[1]: http://www.cacert.org  "CA Cert"

