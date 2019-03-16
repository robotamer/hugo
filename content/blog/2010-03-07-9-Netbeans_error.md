+++
date = "2010-03-07T19:21:00Z"
description = "Solved: java-common: Package updates entail \"Network is unreachable\" in Java programs"
groups = ["blog"]
language = "en"
tags = ["linux", "java"]
title = "Netbeans error"
+++

I been using Netbeans and following solved the problem:

```
	manticore:/etc/sysctl.d# telnet ::ffff:192.168.1.1
	Trying ::ffff:192.168.1.1...
	telnet: Unable to connect to remote host: Network is unreachable
	manticore:/etc/sysctl.d# sysctl net.ipv6.bindv6only
	net.ipv6.bindv6only = 1
	manticore:/etc/sysctl.d# sysctl net.ipv6.bindv6only=0
	net.ipv6.bindv6only = 0
	manticore:/etc/sysctl.d# telnet ::ffff:192.168.1.1
	Trying ::ffff:192.168.1.1...
	Connected to ::ffff:192.168.1.1.
	Escape character is '^]'.
```