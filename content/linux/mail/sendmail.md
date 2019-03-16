+++
description = "A howto on sending email via the linux sendmail command"
date = "2015-01-28T22:38:12Z"
groups = ["linux"]
groups_weight = 100
keywords = ["linux", "howto", "debian", "mail", "smtp", "sendmail", "bash"]
linktitle = "sendmail"
tags = ["howto", "linux", "debian", "desktop", "server", "mail", "smtp", "bash"]
title = "Send mail with sendmail"
[menu.linux]
parent =  "mail"
+++

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
