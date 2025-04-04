+++
date = "2015-01-28T20:07:00Z"
modified = ""
title = "Linux Containers"
linktitle = ""
description = "Setting up and using Linux Containers (LXC) on Debian"
keywords = ["linux", "howto", "server", "lxc", "br", "Linux Containers", "virtualization"]
language = "en"
author = "TaMeR"
tags = ["linux", "howto", "lxc"]
groups = ["linux"]
categories = ["linux"]
+++


Linux Containers provide a Free Software virtualization system for computers running GNU/Linux. This is accomplished through kernel level isolation. It allows one to run multiple virtual units simultaneously. Those units, similar to chroots, are sufficiently isolated to guarantee the required security, but utilize available resources efficiently, as they run on the same kernel.

	apt-get install lxc bridge-utils debootstrap

First we will setup our Bridge: [Linux:bridge-utils](Bridge-Utils.html)

/etc/fstab

	cgroup          /sys/fs/cgroup         cgroup  defaults        0       0

	mount -a

	
	LXCDIR=/var/lib/lxc
	cd $LXCDIR
	nano vm0.cfg


Following is a template config file. If you are also looking at other howto's, don't get coughed up at the fstab mount option. The debian script takes care of that. You will at leased have to change the IP address.

**vm0.cfg**
	
	lxc.utsname = vm0
	lxc.rootfs = /var/lib/lxc/vm0/rootfs

	lxc.tty = 4
	lxc.network.type = veth
	lxc.network.flags = up
	lxc.network.link = br0
	lxc.network.name = eth0
	lxc.network.mtu = 1500

	# security parameter
	lxc.cgroup.devices.deny = a # Deny all access to devices
	lxc.cgroup.devices.allow = c 1:3 rwm   # dev/null
	lxc.cgroup.devices.allow = c 1:5 rwm   # dev/zero
	lxc.cgroup.devices.allow = c 5:1 rwm   # dev/console
	lxc.cgroup.devices.allow = c 5:0 rwm   # dev/tty
	lxc.cgroup.devices.allow = c 4:0 rwm   # dev/tty0
	lxc.cgroup.devices.allow = c 4:1 rwm   # dev/tty1
	lxc.cgroup.devices.allow = c 4:2 rwm   # dev/tty2
	lxc.cgroup.devices.allow = c 1:9 rwm   # dev/urandon
	lxc.cgroup.devices.allow = c 1:8 rwm   # dev/random
	lxc.cgroup.devices.allow = c 136:* rwm # dev/pts/*
	lxc.cgroup.devices.allow = c 5:2 rwm   # dev/pts/ptmx
	lxc.cgroup.devices.allow = c 254:0 rwm # dev/rtc

	# mounts point
	lxc.mount.entry=proc   /var/lib/lxc/vm0/rootfs/proc proc nodev,noexec,nosuid 0 0
	lxc.mount.entry=devpts /var/lib/lxc/vm0/rootfs/dev/pts devpts defaults 0 0
	lxc.mount.entry=sysfs  /var/lib/lxc/vm0/rootfs/sys sysfs defaults  0 0


Command
	
	lxc-create -f $LXCDIR/vm0.cfg -n vm0
	cp /usr/lib/lxc/templates/lxc-debian $LXCDIR


At this point you might wont to make lxc-debian your own. At leased change the release from Lenny to Squeeze  

	./lxc-debian -p vm0

The vm0 should have been created now. Your root password is root.
Before we start it up we will make some config changes. 

First edit your network config
	
	nano $LXCDIR/vm0/rootfs/etc/network/interfaces

File needs to look like this: // Note change the IP addresses to yours, if you don't know how, you know you shouldn't be here //
	
	# The loopback network interface
	auto lo
	iface lo inet loopback
	up route add -net 127.0.0.0 netmask 255.0.0.0 dev lo
	down route add -net 127.0.0.0 netmask 255.0.0.0 dev lo

	auto eth0
	iface eth0 inet static
	address 70.22.189.59
	netmask 255.255.255.248
	gateway 70.22.189.57


Now we will try to boot the system.
	
	cd $LXCDIR
	lxc-start -n vm0


default password:

 * user: root
 * password: root

Tip: copy your ~/.ssh folder to each server for passwordless login

	
	nano /etc/default/locale

And add:
	
	LANG=en_US.UTF-8


Configure locales

	dpkg-reconfigure locales



Open  /etc/inittab and make sure you comment out like this: 
	
	1:2345:respawn:/sbin/getty 38400 console
	#c1:12345:respawn:/sbin/getty 38400 tty1 linux
	#c2:12345:respawn:/sbin/getty 38400 tty2 linux
	#c3:12345:respawn:/sbin/getty 38400 tty3 linux
	#c4:12345:respawn:/sbin/getty 38400 tty4 linux


Now you should be at the vm0 login, try user root with pass root  
Try to ping a domain you know works, and it should give you a response otherwise your network setup failed.

Assuming it worked, let's make it permanent. 

	ln -s $LXCDIR/vm0/config /etc/lxc/vm0.conf

Turn this on and add vm0 to the container variable.

	cd /etc/default/
	nano lxc



Next we will setup the server:

LXC Debian Server Setup
----------------------


--------------------------

Useful Resources:

[teegra.net](http://lxc.teegra.net)

[linuxfoundation.org](http://www.linuxfoundation.org/collaborate/workgroups/networking)

[wiki.debian.org](http://wiki.debian.org/HighPerformanceComputing)

[qemu-buch.de](http://qemu-buch.de)

[nigel.mcnie.name](http://nigel.mcnie.name/blog/a-five-minute-guide-to-linux-containers-for-debian)

Found another approach which looks interesting  
[wiki.pcprobleemloos.nl](http://wiki.pcprobleemloos.nl/using_lxc_linux_containers_on_debian_squeeze/creating_a_lxc_virtual_machine_template)


