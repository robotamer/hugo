+++
description = "Learn go with a little coding story"
date = "2015-01-28T19:54:59Z"
groups = ["code", "go", "gotamer"]
keywords = ["learn", "howto", "golang", "pointer", "interface"]
language = "en"
linktitle = "Gophy"
tags = ["code", "go"]
title = "A Gopher named Gophy"

+++

If you are just starting out with Go, head over to the [Go Playground][play] and concentrate on 
figuring out how my little [Go Story][play] works. 
It's about a Gopher, named Gophy who joint the Gophers but lost his identity in the process.   
Once you get how he gets his identity back you'll be golden.

Here is the code:

	package main

	import "fmt"

	type I interface{}

	var gophers map[uint]I = make(map[uint]I)

	type gopher struct {
		Name string
	}

	func main() {

		g := AddToGophers("Goghy")

		fmt.Printf("Hello, %s\n", g.Name)
		fmt.Printf("Now %s is a %T, %s\n", g.Name, gophers[1], gophers[1])

		gg := GetGopher(1)
		fmt.Printf("Bye, %s\n", gg.Name)
	}

	func GetGopher(i uint) *gopher {
		g := gophers[i]
		// I wont my gopher identity back
		return g.(*gopher)
	}

	func AddToGophers(n string) gopher {
		g := new(gopher)
		g.Name = n
		gophers[1] = g
		return *g
	}



[play]: http://play.golang.org/p/fjK_EoQDtR "Go Playground"
[go]: http://golang.org/  "Go Programming Language"
