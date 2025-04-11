+++
date = "2025-04-06"
title = "IMAP mail server"
linktitle = ""
description = "inap commands"
language = "en"
author = "TaMeR"
keywords = ["linux", "telnet", "mail", "imap", "citadel"]
tags = ["linux", "telnet", "mail", "openssl", "citadel", "imap"]
groups = ["linux", "mail", "telnet"]
categories = ["linux", "mail"]
modified = ""
+++
Syntax
-------
- Login
    A1 LOGIN username password
Values can be quoted to enclose spaces and special characters. A " must then be escape with a \
    A1 LOGIN "username" "password"

- List Folders/Mailboxes
    A1 LIST "" *
    A1 LIST INBOX *
    A1 LIST "Archive" *

- Create new Folder/Mailbox
    A1 CREATE INBOX.Archive.2012
    A1 CREATE "To Read"

- Delete Folder/Mailbox
    A1 DELETE INBOX.Archive.2012
    A1 DELETE "To Read"

- Rename Folder/Mailbox
    A1 RENAME "INBOX.One" "INBOX.Two"

- List Subscribed Mailboxes
    A1 LSUB "" *

- Status of Mailbox (There are more flags than the ones listed)
    A1 STATUS INBOX (MESSAGES UNSEEN RECENT)

- Select a mailbox
    A1 SELECT INBOX

- List messages
    A1 FETCH 1:* (FLAGS)
    A1 UID FETCH 1:* (FLAGS)

- Retrieve Message Content
    A1 FETCH 2 body[text]
    A1 FETCH 2 all
    A1 UID FETCH 102 (UID RFC822.SIZE BODY.PEEK[])

- Close Mailbox
    A1 CLOSE

- Logout
    A1 LOGOUT
