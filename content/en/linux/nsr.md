+++
date = "2012-06-27T22:57:08Z"
description = "Tool when working on the network settings of a remote linux server"
groups = ["linux"]
groups_weight = 5
keywords = ["howto", "linux", "debian", "server", "network"]
linktitle = "NSRBS"
tags = ["howto", "linux", "debian", "server", "network", "bash"]
title = "Network Safety Restart Bash Script"
[menu.linux]
+++

If you ever work on a remote servers network settings then this script may safe you from having to call support, and waiting on them.

When started/executed it

 * Sleeps first for 1 hour
 * Then it renames the ”/etc/network/interfaces” file by adding the current time stamp to the end of the file
 * It renames a file called ”/etc/network/interfaces.org” to ”/etc/network/interfaces”
 * And finally it restarts the server.

It also warns you a couple minutes before it does all that so you can terminate the program. Of course if you have been locked out you can't terminate it, and it will execute. *Giving you a fresh start!*


To start

	network_Safety_Restart.sh start &

To Stop

	network_Safety_Restart.sh stop


Here is the linkto the [Gist](https://gist.github.com/robotamer/1479769) or you can just copy and paste from below.



network_Safety_Restart.sh

	#! /bin/sh
	 
	PATH=/sbin:/usr/sbin:/bin:/usr/bin
	 
	. /lib/lsb/init-functions
	 
	export PIDFILESTART=/tmp/network-safty-restart-start.pid
	export PIDFILESTOP=/tmp/network-safty-restart-stop.pid
	export FILE=/etc/network/interfaces
	 
	case "$1" in
	  start)  
		if [ -f ${PIDFILESTART} ]; then
	        	rm ${PIDFILESTART}
		fi
		if [ -f ${PIDFILESTOP} ]; then
	        	rm ${PIDFILESTOP}
		fi	
		ps -fe | grep ${1} | head -n1 | cut -d" " -f 6 > ${PIDFILESTART}
	 
	        sleep 3600 
	 
	        log_action_msg "WARNING: Will in 120 sec rename ${FILE} and then restart"
	        sleep 60
	        log_action_msg "WARNING: Will in 60 sec rename ${FILE} and then restart"
	        sleep 60
	 
		if ! [ -f ${PIDFILESTOP} ]; then
			log_action_msg "Restarting NOW"
	        	SUFFIX=$(date +%s)
	        	cp ${FILE} ${FILE}.${SUFFIX}
	        	sleep 1
	        	cp ${FILE}.org ${FILE}
	        	sleep 1
	        	reboot -d -f -i
		else
			rm ${PIDFILESTOP}
			log_action_msg "NOT Restaring as you wish"
	    	fi
	        ;;
	  stop)
		if [ -f ${PIDFILESTART} ]; then
	        	rm ${PIDFILESTART}
			touch ${PIDFILESTOP}
			log_action_msg "Terminating restart script"
	 
		fi
		log_action_msg "Terminated restart script"
	 
		exit 0
	        ;;
	  *)
	        echo "Usage: $0 start|stop" >&2
	        exit 3
	        ;;
	esac

