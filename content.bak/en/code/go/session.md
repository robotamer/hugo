+++
description = "Session for go consists of a way to preserve data across subsequent accesses in network related applications."
date = "2015-01-28T19:54:59Z"
groups = ["code", "go"]
keywords = ["code", "go", "gotamer", "network", "session", "cookie"]
linktitle = "Session"
tags = ["gotamer", "network"]
title = "Session"

+++

Feutures: 

 * Custom backends to store session data locally.
 * Flash messages: session values that last until read.
 * Low dependency and therefore versitile, for example, it does not depened on the go http pkg 

Built-in backends to store sessions locally:

 * storeMap ⬄ A in memory map[string]sessions store 
 * storeLeveldb ⬄ Stores session data in a leveldb 

Simple Sample code the uses the default storeMap backend: 

```go
package main

import(
	"bitbucket.org/gotamer/net/session"
	"fmt"
)

func main(){
	id := save()
	load(id)
}

func save() string {
	sess := session.New()
	sess.Set("Alias","GoTamer")
	err := sess.Save()
	Check(err)
	fmt.Println("Session Saved", sess)
	sid, err := sess.Id()
	Check(err)
	return sid
}

func load(sid string){
	sess, err := session.Load(sid)
	Check(err)
	fmt.Println("Session Load: ", sess)
}

```

Sample code the uses the leveldb backend: 

```go
package main

import(
	"bitbucket.org/gotamer/net/session"
	"fmt"
)

var path = "/tmp/sessions"

func init(){
	session.StoreLeveldb(path)	
}

func main(){
	id := save()
	load(id)
}

func save() string {
	sess := session.New()
	sess.Set("Alias","GoTamer")
	err := sess.Save()
	Check(err)
	fmt.Println("Session Saved", sess)
	sid, err := sess.Id()
	Check(err)
	return sid
}

func load(sid string){
	sess, err := session.Load(sid)
	Check(err)
	fmt.Println("Session Load: ", sess)
}

```

Additional backends can be created by simply implementing following interfaces: 

```go
type Store interface {
	Save(session *sessionObject) (err error)
	Load(sid string) (session *sessionObject, err error)
	Delete(sid string) (err error)
}
```

Some code has been borrowed from http://www.stathat.com/src/bingo witch is licensed also under MIT. 

Code is available at <https://bitbucket.org/gotamer> 

