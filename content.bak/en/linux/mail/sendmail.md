+++
date = "2015-01-28T22:38:12Z"
title = "Send mail with sendmail"
description = "A howto on sending email via the linux sendmail command"
keywords = ["linux", "howto", "debian", "mail", "smtp", "sendmail", "bash"]
groups = ["linux", "mail"]
groups_weight = 100
tags = ["howto", "linux", "debian", "desktop", "server", "mail", "smtp", "bash"]
linktitle = "sendmail"
[menu.linux]
parent =  "mail"
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
