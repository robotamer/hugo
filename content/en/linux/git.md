+++
description = "Setting up and using Git"
date = "2015-01-28T20:07:01Z"
groups = ["linux"]
groups_weight = 10
keywords = ["linux", "howto", "debian", "git"]
linktitle = "Git"
tags = ["linux", "howto", "git"]
title = "Git Howto"
[menu.linux]
+++

#### Stop tracking a file but keep the file:

	git rm --cached filename


Git Setup
=========

#### Remote Server

Go to your web root directory

	cd /var/www/

identify your self to git

	git config --global user.name "Dennis T Kaplan"

	git config --global user.email "alias@example.com"

Create git

	git init

Create a live branch

	git branch live

Make the live branch active

	git checkout live

#### Local

Go to your working directory

	cd /var/www/

identify your self to git

	git config --global user.name "Dennis T Kaplan"

	git config --global user.email "alias@example.com"

Create git

	git init

create the ignore file

	nano .gitignore

Place this in to your .gitignore file:

	# Packages #
	############
	# it's better to unpack these files and commit the raw source
	# git has its own built in compression methods
	*.7z
	*.dmg
	*.gz
	*.iso
	*.jar
	*.rar
	*.tar
	*.zip

	# Logs and databases #
	######################
	*.log
	*.sqlite
	*.db3
	*/temp/*

	# OS generated files #
	######################
	.DS_Store*
	ehthumbs.db
	Icon?
	Thumbs.db

	# Backup files #
	######################
	*~
	*.orig
	*.bak
	test*

Add your files to git

	git add .

Commit them

	git commit -m 'init'

Add your remote git server

	git remote add ssh://username@example.com/var/www/.git

send your data to the remote server

	git push

#### Remote Server

Checkout master branch so we can test the changes

	git checkout master

see if it works and if it does go back to the live branch

	git checkout live

pull in master to live

	git merge master


