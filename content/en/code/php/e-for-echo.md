+++
date = "2011-06-01T02:01:27Z"
modified = ""
title = "e() for echo"
linktitle = ""
description = "echo, print, print_r(), and var_export() replacement"
keywords = ["php", "echo", "print", "print_r", "var_export"]
language = "en"
author = ""
tags = ["code", "php"]
groups = ["code", "php"]
categories = ["code", "php"]
+++


It's really annoying having to thing of html stuff like pre & br everytime you need to display something.  

And it's even worst if you like me test your code in cli and cgi.  

So I wrote this little method to take care of it all. It's nothing complicated but sure useful.  
 

It detects cgi and cli, and formats everything accordingly.

```php
    
<?php

/**
 * e() --- Prints human-readable information about a variable
 *
 * string e ( mixed $expression[, string $name [, bool $return = false ]] )
 *
 * Replacement for php echo, print, print_r(), var_export() etc
 */

/**
 * @category    TaMeR
 * @copyright   Copyright (c) 2008 - 2011 Dennis T Kaplan
 * @license     http://www.gnu.org/licenses/gpl.txt
 * @link        http://github.com/pzzazz/TaMeR
 * @author      Dennis T Kaplan
 * @date        May 1, 2011
 * @version     1.0
 * @access      public
 * @param       mixed   $var
 * @param       string  $name
 * @param       boolean $return
 * @return      string
 **/
function e($var, $name = FALSE, $return = FALSE) {
    $preO = $preC = ''; $br = PHP_EOL;
    if( ! isset($_SERVER['argv'])){
        $preO = '

'; $preC = '';
        $h1O = '<h1>';   $h1C = '</h1>';
        $br = '<br></br>'.PHP_EOL;
    }
    if(!is_array($var) && !is_object($var))
    {
        if ($name !== FALSE) echo $br.$name.': ';
        echo (isset($_SERVER['argv']))
                  ? $var.$br
                  : htmlspecialchars($var).$br;
    }else{
        if($return === FALSE) {
            if ($name !== FALSE) echo $br.$h1O.$name.': '.$h1C;
            echo $preO.print_r($var, TRUE).$preC.$br;
        }else{
            if ($name !== FALSE){
                return '';
            }else{
                return $br.$preO.var_export($var, TRUE).$preC.$br;
            }
        }
    }
}
?>
    
```