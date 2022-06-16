+++
date = "2015-01-28T20:07:01Z"
modified = ""
title = "Git Alias"
linktitle = ""
description = "Setting up Git Alias"
keywords = ["linux", "howto", "debian", "git"]
language = "en"
author = ""
tags = ["howto", "git"]
groups = ["linux", "git"]
categories = ["linux"]
+++


#### Git Alias:  

I thought this deserves it's own little page.

Following will create an alias for git add, commit, and push
```bash
git config alias.acp '! acp() { git add . && git commit -m \"$1\" && git push ; } ; acp'  
```
Use it like this:
```bash
git acp "your commit message"
```
Depending on your setup, you may also want to add `git pull` before you `git add`, but I am sure you can figure out how to do that. Isn't this something?

{{< lastmod >}}