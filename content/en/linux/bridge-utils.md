+++
description = "Bridging Network Connections for LXC"
date = "2015-01-28T20:07:00Z"
groups = ["linux"]
groups_weight = 20
keywords = ["linux", "howto", "server", "lxc", "br"]
linktitle = "Bridge-Utils"
tags = ["linux", "howto", "lxc"]
title = "Bridge-Utils for LXC"
[menu.linux]
+++

Bridging Network Connections
----------------------------

Install

	apt-get install bridge-utils


Start the bridge:

	brctl addbr br0


Edit: /etc/network/interfaces

	# The loopback network interface
	auto lo
	iface lo inet loopback

	# Bridge between eth0 and eth1
	auto br0

	# DHCP would look like this but we will use static
	# iface br0 inet dhcp

	iface br0 inet static
	address 192.168.1.100
	network 192.168.1.0
	gateway 192.168.1.1
	broadcast 192.168.1.255
	netmask 255.255.255.0
	dns-nameservers 192.168.1.1
	#dns-search example.com 

	  pre-up ip link set eth0 down
	  pre-up ip link set eth1 down
	  pre-up brctl addbr br0
	  pre-up brctl addif br0 eth0 eth1
	  pre-up ip addr flush dev eth0
	  pre-up ip addr flush dev eth1
	  post-down ip link set eth0 down
	  post-down ip link set eth1 down
	  post-down ip link set br0 down
	  post-down brctl delif br0 eth0 eth1
	  post-down brctl delbr br0


Restart network:

	/etc/init.d/networking stop
	/etc/init.d/networking start


Turn on the bridge:  

	ip link set br0 up


Let's check: 
 
	ifconfig
	brctl show
	ip addr show


Bridge Notes:
How to remove a bridge {bring down first then delete}

	ip link set br0 down
	brctl delbr br0



LXC Setup
=========

	#cat /etc/network/interfaces
	auto lo
	iface lo inet loopback
	up route add -net 127.0.0.0 netmask 255.0.0.0 dev lo
	down route add -net 127.0.0.0 netmask 255.0.0.0 dev lo

	# device: eth0
	auto eth0
	iface eth0 inet manual

	auto br0
	iface br0 inet static
		   address 70.22.189.58
		   netmask 255.255.255.248
		   gateway 70.22.189.57
		   broadcast 70.22.189.63
		   bridge_ports eth0
		   bridge_fd 0
		   bridge_maxwait 0
		   bridge_stp off
		    post-up ip route add 70.22.189.59 dev br0
		    post-up ip route add 70.22.189.60 dev br0
		    post-up ip route add 70.22.189.61 dev br0
		    post-up ip route add 70.22.189.62 dev br0


More info at:
[shorewall.net](http://www.shorewall.net/LXC.html)

