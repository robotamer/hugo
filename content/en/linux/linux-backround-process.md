+++
date = "2011-06-01T09:24:12Z"
modified = ""
title = "Linux backround process"
linktitle = ""
description = ""
language = "en"
author = ""
tags = ["bash", "linux", "scp", "shell"]
groups = ["linux"]
categories = ["linux"]
+++


Running as background process with _nohub_

```bash   
    nohup scp  & > nohup.out 2 > &1

    nohup scp -r -p root@www.example.com:/var/www/ /var/www/ & >nohup.out 2>&1

    nohup scp -r -p root@www.example.com:/var/www/logs /var/www/ & >nohup.out 2>&1
```