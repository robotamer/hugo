+++
date = "2011-06-01T09:20:26Z"
modified = ""
title = "Linux find & replace HowTo"
linktitle = ""
description = ""
language = "en"
author = ""
tags = ["server", "bash", "linux", "perl", "shell"]
groups = ["linux", "bash"]
categories = ["linux", "bash"]
+++


**Find and chmod files or folders**

`find . -type d -exec chmod 755 {} ;`

`find . -name "*.php" | xargs grep -niP 'thingy'`


**Find a directory and display on screen**

`find . -type d -name 'linux' 2>/dev/null`


**Find/Grep for a string across multiple files with different extensions**

`find ( -name "*js" -o -name "*jsp" -o -name "*jspf" ) | xargs grep -niP 'thingy'`




