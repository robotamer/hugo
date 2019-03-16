+++
date = "2011-06-10T06:33:51Z"
groups = ["blog"]
language = "en"
tags = ["code", "pdo", "php", "sql"]
title = "num_row with PDO"

+++

There is no num_row() function for PHP PDO  

Here are my two solutions:  

  

**One with prepare & execute**:

```php
    db->prepare($sql);
    $sth->execute(array($key));
    $rows = $sth->fetch(PDO::FETCH_NUM);
    echo $rows[0];
```

**One with query:**

```php
    db->query($sql);
    $row = $result->fetch(PDO::FETCH_NUM);
    echo $row[0];
```