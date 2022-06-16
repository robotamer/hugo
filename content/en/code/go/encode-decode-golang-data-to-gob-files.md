+++
date = "2015-01-02T12:50:00Z"
modified = ""
title = "Encode/Decode Golang data to Gob files"
linktitle = ""
description = "Save() and Load() any Go values to/from files"
keywords = ["golang", "encode", "decode", "struct", "file", "files", "gob"]
language = "en"
author = ""
tags = ["gotamer", "gob", "encode", "decode"]
groups = ["code", "go"]
categories = ["code", "go"]
+++


Golang has a package called Gob to encode and decode values in to go specific binary format for transmiting as streams or for saving to file. 

Below are two functions, Load and Save to encode/decode go values including struct's in to files.


```go

package main

import (
	"encoding/gob"
	"fmt"
	"os"
	"runtime"
)

const file = "/tmp/test.gob"

type User struct {
	Name, Pass string
}

func main(){
	var datato = &User{"Donald","DuckPass"}
	var datafrom = new(User)

	err := Save(file, datato)
	Check(err)
	err = Load(file, datafrom)
	Check(err)
	fmt.Println(datafrom)
}

// Encode via Gob to file
func Save(path string, object interface{}) error {
	file, err := os.Create(path)
	if err == nil {
		encoder := gob.NewEncoder(file)
		encoder.Encode(object)
	}
	file.Close()
	return err
 }

// Decode Gob file
func Load(path string, object interface{}) error {
	file, err := os.Open(path)
	if err == nil {
		decoder := gob.NewDecoder(file)
		err = decoder.Decode(object)
	}
	file.Close()
	return err
}

func Check(e error) {
	if e != nil {
		_, file, line, _ := runtime.Caller(1)
		fmt.Println(line, "\t", file, "\n", e)
		os.Exit(1)
	}
}

```
