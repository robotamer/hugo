+++
date = "2010-03-18T22:07:15Z"
modified = ""
title = "Creating models for the Zend Framework from command line via phpcli"
linktitle = ""
description = ""
language = "en"
author = ""
tags = ["cli", "php", "zend"]
groups = ["blog"]
categories = ["code", "php"]
+++


This is a php cli script that will create a database model from the database provided 

Download via git from [github -> phpcli](http://github.com/pzzazz/phpcli)
 
```php    
    php zend/model.php -h
    
    This is a command line PHP script.
    
    Set table
    
    Options:
    -path=[ ]
    -table=[ ]
    
    Usage:
    php zend/model.php -arg=value
```
    


**Database Structure:**

    
```sql    
    CREATE TABLE users (
          Alias TEXT UNIQUE,
          Password TEXT,
          eMail TEXT,
          Avatar TEXT,
          Timezone TEXT,
          IP TEXT,
          count INTEGER,
          cookie TEXT,
          vars TEXT,
          status INTEGER DEFAULT 1,
          added date,
          updated datetime,
          PRIMARY KEY(Alias)
    );
```


**Sample Output:**

```sh
    
    $ php zend/model.php -path=/var/www/TaMeR/data/tmp.db3 -table=users



    
    
    
    class _Model_users
    {
    	protected $_Alias;
    	protected $_Password;
    	protected $_eMail;
    	protected $_Avatar;
    	protected $_Timezone;
    	protected $_IP;
    	protected $_count;
    	protected $_cookie;
    	protected $_vars;
    	protected $_status;
    	protected $_added;
    	protected $_updated;
    
    
    	public function setAlias($Alias){
    		$this->_Alias = (string) $Alias;
    		return $this;
    	}
    
    	public function getAlias($Alias){
    		return $this->_Alias;
    	}
    
    	public function setPassword($Password){
    		$this->_Password = (string) $Password;
    		return $this;
    	}
    
    	public function getPassword($Password){
    		return $this->_Password;
    	}
    
    	public function seteMail($eMail){
    		$this->_eMail = (string) $eMail;
    		return $this;
    	}
    
    	public function geteMail($eMail){
    		return $this->_eMail;
    	}
    
    	public function setAvatar($Avatar){
    		$this->_Avatar = (string) $Avatar;
    		return $this;
    	}
    
    	public function getAvatar($Avatar){
    		return $this->_Avatar;
    	}
    
    	public function setTimezone($Timezone){
    		$this->_Timezone = (string) $Timezone;
    		return $this;
    	}
    
    	public function getTimezone($Timezone){
    		return $this->_Timezone;
    	}
    
    	public function setIP($IP){
    		$this->_IP = (string) $IP;
    		return $this;
    	}
    
    	public function getIP($IP){
    		return $this->_IP;
    	}
    
    	public function setcount($count){
    		$this->_count = (int) $count;
    		return $this;
    	}
    
    	public function getcount($count){
    		return $this->_count;
    	}
    
    	public function setcookie($cookie){
    		$this->_cookie = (string) $cookie;
    		return $this;
    	}
    
    	public function getcookie($cookie){
    		return $this->_cookie;
    	}
    
    	public function setvars($vars){
    		$this->_vars = (string) $vars;
    		return $this;
    	}
    
    	public function getvars($vars){
    		return $this->_vars;
    	}
    
    	public function setstatus($status){
    		$this->_status = (int) $status;
    		return $this;
    	}
    
    	public function getstatus($status){
    		return $this->_status;
    	}
    
    	public function setadded($added){
    		$this->_added = (string) $added;
    		return $this;
    	}
    
    	public function getadded($added){
    		return $this->_added;
    	}
    
    	public function setupdated($updated){
    		$this->_updated = (string) $updated;
    		return $this;
    	}
    
    	public function getupdated($updated){
    		return $this->_updated;
    	}
    }
    
```