+++
date = "2013-11-27T19:50:00Z"
modified = ""
title = "Go jkl"
linktitle = ""
description = "Go JKL a static website generator"
keywords = ["code", "go", "website"]
language = "en"
author = ""
groups = ["code", "go"]
categories = ["code", "go"]
+++


I just dumped my home made php script md2html and switched to [jkl](https://github.com/gotamer/jkl).   
This is basiclly my test post!  
jkl is a static site generator written in Go, based on Jekyll.  

All I had to do was convert my template to [Go](http://www.golang.org) tempates, and add the YAML 
front matter to my markdown files.
  
  * jkl is by far faster then md2html
  * provides a build in server
  * The [Go](http://www.golang.org) templates are a bid easier to work with.
 
I still have to figure out a way to deploy my site, since [jkl](https://github.com/gotamer/jkl) only provides S3, but that shouldn't be to hard; meanwhile rsync will do.