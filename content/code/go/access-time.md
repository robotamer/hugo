+++
title = "﻿File Access and Create Time"
date = "2015-04-25T14:02:07Z"
linktitle = "﻿File Time"
description = "Gets the Modified, Create and Access time of a file"
groups = ["go"]
keywords = ["fileinfo", "file", "time"]
language = "en"
+++


This works on Linux.  
Haven't tried on any other platform, please report if you do.

https://play.golang.org/p/vJFZ1o_qIp

```go

package main

import(
	"fmt"
	"os"
	"time"
	"syscall"
)

type FileTime struct {
	MTime time.Time
	CTime time.Time
	ATime time.Time
}

const FILE = "/opt/go/LICENSE"

func main(){

	file, err := FTime(FILE)
	if err == nil {
		fmt.Println("Mo Time", file.MTime)
		fmt.Println("Ac Time", file.ATime)
		fmt.Println("Cr Time", file.CTime)
	}
}

// Gets the Modified, Create and Access time of a file
func FTime(file string) (t *FileTime, err error) {
	fileinfo, err := os.Stat(file)
	if err != nil {
	    return
	}
	t = new(FileTime)
	var stat = fileinfo.Sys().(*syscall.Stat_t)
	t.ATime = time.Unix(stat.Atim.Sec, stat.Atim.Nsec)
	t.CTime = time.Unix(stat.Ctim.Sec, stat.Ctim.Nsec)
	t.MTime = time.Unix(stat.Mtim.Sec, stat.Mtim.Nsec)
	return
}
```
