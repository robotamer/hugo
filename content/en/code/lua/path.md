+++
date = "2022-06-19T03:43:44+03:00"
modified = ""
title = "Lua Path"
linktitle = "lua-path"
description = "os path, such as is.dir - can.write - path.appened"
keywords = ["lua", "os", "path", "isdir", isfile, canwrite]
language = "en"
author = "TaMeR"
tags = ["lua", "os", "path"]
groups = ["code", "lua"]
categories = ["code", "lua"]
+++

[Git Path](https://github.com/luatamer/path)

Currently works only on NIX (Linux, BSD, UNIX etc.)
Maybe it will work on Mac since Mac is based on BSD, I have no way of testing.
It will for sure not work on Windows currently.
If you need it to work, let me know I can probably make that happen.

Module depands on nix commands `test` and `realpath`

There are tests for all commands. One test appears to fail even know the result is as
expected. Still working on figuring that out; any help would be welcome.

_____________________________________________________________________________

# Disclaimer
This is my first Lua program/module, well right after `Hello World`.
Any suggestions are more then welcome.
_____________________________________________________________________________

# Documentation

### NAME is.string
#### DESCRIPTION
filepath is.string
All args in this module must be a string, if unsure check first with is.string

_____________________________________________________________________________

### NAME path.append
#### DESCRIPTION
Append file or folder to path, adds seperator if needed

_____________________________________________________________________________

### NAME path.exists
#### DESCRIPTION
checks if filepath exists

_____________________________________________________________________________

### NAME is.dir
#### DESCRIPTION
filepath exists and is a filesytem directory/folder

_____________________________________________________________________________

### NAME is.folder
#### ALIAS
alias for is.dir

_____________________________________________________________________________

### NAME is.file
#### DESCRIPTION
filepath exists and is a filesytem file

_____________________________________________________________________________

### NAME is.symlink
#### DESCRIPTION
filepath exists and is symbolic link

_____________________________________________________________________________

### NAME is.pipe
#### DESCRIPTION
filepath exists and is a pipe

_____________________________________________________________________________

### NAME is.socket
#### DESCRIPTION
filepath exists and is socket

_____________________________________________________________________________

### NAME is.character
#### DESCRIPTION
filepath exists and is character special

_____________________________________________________________________________

### NAME is.block
#### DESCRIPTION
filepath exists and is block special

_____________________________________________________________________________

### NAME can.read
#### DESCRIPTION
filepath exists and we can read the filepath

_____________________________________________________________________________

### NAME can.write
#### DESCRIPTION
filepath exists and we can write to the filepath

_____________________________________________________________________________

### NAME can.run
#### DESCRIPTION
filepath exists and we can run/execute the filepath

_____________________________________________________________________________

### NAME list.all
#### DESCRIPTION
list all files and folders at given filepath

_____________________________________________________________________________

### NAME list.files
#### DESCRIPTION
list all files at given filepath

_____________________________________________________________________________

### NAME list.by_ext
#### DESCRIPTION
list all files at given filepath by extention

_____________________________________________________________________________

### NAME list.folders
#### DESCRIPTION
list all folders at given filepath

_____________________________________________________________________________

### NAME path.split
#### DESCRIPTION
Will return 3 items, works also on windows
folder, filename, extention
path.spilt("/tmp/test.lua.txt")
-> /tmp/ test.lua.txt txt

_____________________________________________________________________________

### NAME path.filename
#### DESCRIPTION
returns filename including extention discarding folder/directory
Returned value will be a filesystem file OR NIL

_____________________________________________________________________________

### NAME path.ext
#### DESCRIPTION
Returns the file extention from the given filepath if exists

_____________________________________________________________________________

### NAME path.dirname
#### DESCRIPTION
returns absolute directory/folder path discarding filename.
Returned value will be a filesystem directory/folder OR NIL

_____________________________________________________________________________

### NAME path.realpath
#### DESCRIPTION
Print the resolved absolute file name; all but the last component must exist
#### ERROR
realpath: [filepath]: No such file or directory     ]]

_____________________________________________________________________________







