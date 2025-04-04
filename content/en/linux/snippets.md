+++
date = "2015-01-28T20:07:00Z"
modified = ""
title = "Linux Snippets"
linktitle = ""
description = "snippets for linux commands like find and replace, nohup, scp"
keywords = ["linux", "howto", "debian", "bash"]
language = "en"
author = ""
tags = ["howto", "linux", "debian", "desktop", "server", "bash"]
groups = ["linux"]
categories = ["linux"]
+++


#### Find and chmod files or folders
	find . -type d -exec chmod 755 {} \;
	find . -type f -exec chmod 644 {} \;

#### Find a directory and display on screen
	find . -type d -name 'linux' 2>/dev/null


#### Find/Grep for a string across multiple files with different extensions
	find . -name "*.php" | xargs grep -niP 'thingy'
	find \( -name "*js" -o -name "*jsp" -o -name "*jspf" \) | xargs grep -niP 'thingy'

#### Find and replace
	find . -type f -name "*.php" -exec sed -i 's/numRows/rowCount/g' {} \;

#### How much space is used by folder
	$ du -hs ~/.local/share/Trash
	96M	/home/tamer/.local/share/Trash

#### running as background process
	nohup scp <params> & > nohup.out 2 > &1
	nohup scp -r -p root@www.example.com:/var/www/ /var/www/ & >nohup.out 2>&1
	nohup scp -r -p root@www.example.com:/var/www/logs /var/www/ & >nohup.out 2>&1

#### Copying an image file to USB
	cat file.iso > /dev/sdb
	sync


#### Killing
	killall -9 nginx

#### Mounting an imge file
	mount -o loop file.img /mnt/image

#### Creating a file stsyem
	mkfs.ext2 /dev/sdb2

#### Labeling a file system
	e2label /dev/sdb2 RoboTamer

#### Searing bash history
 	history | grep -i "search term"

Debian Specific
---------------

####  See what is installed
	dpkg -l | grep php5

#### Start a program
	service program_name start

#### Stop a program
	service program_name stop

#### Start a programs at boot time
	insserv -d program_name

#### Remove program from boot time
	insserv -r program_name

