+++
date = "2013-12-29T19:50:00Z"
description = "The Google Earth .deb still depends on ia32-libs, but ia32-libs has been removed"
groups = ["blog"]
keywords = ["google", "earth", "googleearth", "debian", "install", "howto"]
language = "en"
linktitle = "Google Earth"
tags = ["howTo", "debian"]
title = "﻿HowTo install Google Earth on Debian"
+++

The Google Earth .DEB still depends on ia32-libs, but ia32-libs has been removed as part of the transition to multiarch, so it won't install.

### Steps

 1. Download the 64-bit google earth .deb file from http://www.google.com/earth
 2. mkdir earth
 3. dpkg-deb -R google-earth*.deb earth
 4. edit the file earth/DEBIAN/control and replace the Depends line as shown below
 5. dpkg-deb -b earth earth.deb
 6. dpkg -i earth.deb
 7. apt-get install -f

Replace  

	Depends: lsb-core (>= 3.2), ia32-libs  

with 

	Depends: lsb-core (>= 3.2),lib32z1, lib32ncurses5, lib32bz2-1.0 
