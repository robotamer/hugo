+++
date = "2011-11-22T03:54:53.00Z"
description = "How to search the Linux bash history"
groups = ["linux", "bash"]
keywords = ["history", "linux", "bash"]
language = "en"
linktitle = "History"
tags = ["bash", "shell", "HowTo"]
title = "Linux bash history"
[menu.linux]
parent = "bash"
weight = 4
+++

Have you ever executed something on the linux shell and didn't remember later how it was done?

Well if you remember just part of it you can search for it:

	history | grep -i "[search string]"

