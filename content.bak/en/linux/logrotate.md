+++
date = "2013-12-02T19:50:00Z"
title = "Log Rotate"
description = "Simple log rotate bash script"
groups = ["linux", "bash"]
groups_weight = 25
keywords = ["linux", "bash", "logrotate"]
tags = ["linux", "bash", "logrotate"]
linktitle = "logrotate"
[menu.linux]
+++

Simple:
 - Create following file
 - Change the MAXSIZE & LOGDIR (see file) 
 - Add a cron job


Create following file:
```bash
nano /var/www/log/logrotate.sh
```

```bash
#!/bin/bash

MAXSIZE=1024
LOGDIR=/var/www/log/

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

cd $LOGDIR

for FILENAME in *.log; do
        SIZE=$(du -b $FILENAME | cut -f 1)
        if(($SIZE>$MAXSIZE)); then
                TIMESTAMP=`date +%Y%m%d`
                NEWFILENAME=$FILENAME.$TIMESTAMP
                mv $FILENAME $NEWFILENAME
                touch $FILENAME
                chown www-data.tamer $FILENAME
                gzip -f -9 $NEWFILENAME
                chown tamer.www-data $NEWFILENAME.gz
        fi
done
```

Now the Cron job; Here set to weekly at 5am  
```bash
crontab: `0 5 * * 1 /var/www/log/logrotate.sh`
```

{{< lastmod >}}