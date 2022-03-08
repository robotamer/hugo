+++
title = "ssh authorization"
description = "key-based authorization with SSH"
date = "2015-01-28T19:54:59Z"
keywords = ["linux", "howto", "debian", "bash", "ssh"]
tags = ["howto", "linux", "debian", "server", "ssh"]
groups = ["linux", "opensssl" ]
groups_weight = 8
+++

Create a public ssh key, if you haven’t one already. Look at ~/.ssh. If you see a file named id_dsa.pub then you obviously already have a public key. If not, simply create one.

	ssh-keygen -t dsa

ItemMake sure your .ssh dir is 700:

	chmod 700 ~/.ssh

Get your public ssh key on the server you want to login automatically.

	scp ~/.ssh/id_dsa.pub remoteuser@remoteserver.com:

Append the contents of your public key to the ~/.ssh/authorized_keys and remove it. Simply issue something like

	cat id_dsa.pub >> .ssh/authorized_keys

Remove your public key from the home directory on the server.  
Done!

You can now login without getting asked for a password.

	ssh -l remoteuser remoteserver.com or ssh remoteuser@remoteserver.com


