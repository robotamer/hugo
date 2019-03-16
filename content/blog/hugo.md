+++
date = "2013-12-01T19:50:00Z"
description = "Hugo is a static website generator written in the Go programing language"
groups = ["blog"]
keywords = ["code", "go", "golang", "website", "static", "generator"]
language = "en"
linktitle = "Huge"
tags = ["code", "go", "website"]
title = "﻿Hugo, a static website generator"
+++

Just a couple of days ago I posted about jkl, a static website generator written in Go, and based on Jekyll.

While setting up jkl, I stumbled over Hugo! I was impressed at first sight with Hugo.
Since then I have reconfigured my site to work with Hugo.
I didn't have to fiddle with the Hugo code, everything just works, and it really does most everything that comes to mind.
This whole website thing has been bothering me for a long time; and finally I am a happy champer.

There are a few thinks I still have to setup, like the indexes are done but the links don't seam to work as expected, or I am doing something wrong. However this is minor considering that I am glad that Hugo even has a link and menu generating system. 

Also the rss feeds needs some work, but again Hugo has that build in, I just have to set it up right.

Hugo's front matter can be defined with YAML, TOML, or JSON. Which one you like is up to you, you can even use a 
different one on each page.
Here is the TOML for this page:

	+++
	linktitle = "Huge"
	title = "﻿Hugo, a static website generator"
	description = "Hugo is a static website generator written in the Go programing language"
	keywords = ["code","go", "golang", "website","static","generator"]
	tags = ["code","go","website"]
	groups = ["blog"]
	language = "en"
	date = "2013-12-01"
	+++

#### In short, I can highlly recommend [Hugo](http://github.com/spf13/hugo) to any coder!
