+++
date = "2011-06-20T11:58:00.00Z"
description = "Multiple PHP installations so you can run 5.3.x on one box"
groups = ["php"]
language = "en"
tags = ["code", "HowTo", "php"]
title = "Multiple PHP installations"

+++

How to install **PHP 5.3.X** as secondary php version from source
  
    
    PHPV=5.3.6
    cd /usr/local/src
    wget http://us.php.net/get/php-$PHPV.tar.gz/from/this/mirror
    mv mirror php-$PHPV.tar.gz
    tar xzvf php-$PHPV.tar.gz
    chown -R $USER:$USER php-$PHPV/
    cd php-$PHPV/
    
    apt-get install libxml2-dev libssl-dev libcurl4-gnutls-dev libjpeg62-dev libpng12-dev libfreetype6-dev unixodbc-dev
    
    ./configure 
      --prefix=/usr/local/php5.3 
      --with-config-file-path=/usr/local/etc/php5.3 
      --with-config-file-scan-dir=/usr/local/etc/php5.3/$SAPIconf.d 
      --with-libdir=/lib 
      --disable-cgi 
      --with-libxml-dir=/usr/ 
      --with-mysql=/usr/ 
      --enable-pdo 
      --with-pdo-mysql 
      --with-mysqli 
      --with-zlib-dir=/usr 
      --with-curl 
      --with-gd 
      --with-jpeg-dir=/usr/lib 
      --with-png-dir=/usr/lib 
      --with-freetype-dir=/usr/lib 
      --with-gettext 
      --enable-mbstring 
      --enable-soap 
      --enable-ftp 
      --enable-fpm 
      --with-openssl
    
    make
    make test
    make install
    
    


  

  

  

More help in case you have errors:
[PHP-Configure-und-Compile-Fehler](http://www.robo47.net/text/6-PHP-Configure-und-Compile-Fehler)

