+++
date = "2015-01-28T22:38:12Z"
modified = ""
title = "Send mail with sendmail"
linktitle = ""
description = "A howto on sending email via the linux sendmail command"
keywords = ["linux", "howto", "debian", "mail", "smtp", "sendmail", "bash"]
language = "en"
author = ""
tags = ["howto", "linux", "debian", "desktop", "server", "mail", "smtp", "bash"]
groups = ["linux", "mail"]
categories = ["linux", "mail"]
+++


```bash
	#!/bin/bash

	SENDMAIL=/usr/sbin/sendmail
	RECIPIENT=tosomeone@example.com
	FROM=me@example.com
	
	cat <<EOF | $SENDMAIL -t ${RECIPIENT}
	From: ${FROM} 
	To: ${RECIPIENT}
	Subject: testmail
	 
	some test text as body of the email.
	EOF
```
