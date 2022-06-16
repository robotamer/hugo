+++
title = "Git Alias"
description = "Setting up Git Alias"
date = "2015-01-28T20:07:01Z"
keywords = ["linux", "howto", "debian", "git"]
groups = ["linux"]
groups_weight = 10
linktitle = "Git"
tags = ["howto", "git"]
[menu.linux]
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