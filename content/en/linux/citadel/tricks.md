+++
date = "2025-04-12"
modified = ""
title = "Citadel QnA & Tricks"
linktitle = ""
description = "Citadel and Webcit Questiosn & Answers, and Tricks"
keywords = ["howto", "webcit", "citadel"]
language = "en"
author = "TaMeR"
tags = ["howto", "webcit", "citadel"]
groups = ["linux", "citadel"]
categories = ["linux", "citadel"]
+++

Some of the tricks one picks up over time in the [support forum](http://uncensored.citadel.org/dotgoto?room=Citadel%20Support).


Q&A
====

- How did you change the Lobby /dotskip?room=_BASEROOM_  to wiki?page=home?

> webcit has a "-g" flag that will enter its value as the first command sent to it. (The container has a similar flag that will pass it along to webcit.)
> So you can do something like
> 
> `webcit [other commands] -g "/dotgoto?room=Welcome"`
>
> You can put anything in there you want. I chose to go with the welcome wiki because we can control exactly what it says on the front page. 

______________


- How do I get verbose log from citadel and webcit?

> **-x9** does the magic:

>```sh
docker run -i --rm --network host \
    --volume=/usr/local/citadel:/citadel-data citadeldotorg/citadel \
    --http-port=8080 --https-port=8443 \
    -x9 >>citadel.out 2>>citadel.err
```
Do what you need to do, such as [telnet](/tags/telnet) to citadel then stop the running docker with **Ctrl-C** 

> ```sh
less citadel.err
```
