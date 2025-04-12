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

Q&A
====

How did you change the Lobby /dotskip?room=_BASEROOM_  to wiki?page=home?
> webcit has a "-g" flag that will enter its value as the first command sent to it. (The container has a similar flag that will pass it along to webcit.)
> So you can do something like
> 
> `webcit [other commands] -g "/dotgoto?room=Welcome"`
>
> You can put anything in there you want. I chose to go with the welcome wiki because we can control exactly what it says on the front page. 
