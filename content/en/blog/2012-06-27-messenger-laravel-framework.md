+++
date = "2012-06-27T23:27:29Z"
description = "A Messenger (error, info, ...) for the Laravel Framework"
groups = ["blog", "php"]
language = "en"
linktitle = "Messenger"
tags = ["php", "laravel", "twitter"]
title = "Messenger Laravel Framework"
+++

![Laravel Framework](http://blog.robotamer.com/wp-content/uploads/2012/06/laravel.png) This is a fork and upgrade of the [davzie](http://forums.laravel.com/profile.php?id=583) message class.
A info, error etc messenger class that allows you to add validation errors, statuses etc to flash data and then retrieve them in a nicely formatted way in your front-end. Automates the process a little when you're adding and retrieving messages, especially in a CRUD type environment. The formatting integrates well with Twitter's Bootstrap Alert formatting.

This upgraded version works smoothly with the Laravel validation class

[gist id=3007511](https://gist.github.com/robotamer/3007511#file-msg-php)

```php
<?php

class Msg {

     public static $msgss = array();

     /**
      * Add a message to the message array (adds to the user's session)
      * @param string  $type    You can have several types of messages, these are class names for Bootstrap's messaging classes, usually, info, error, success, warning
      * @param string $message  The message you want to add to the list
      */
     public static function add($type = 'info', $message = FALSE){
         if(!$message) return FALSE;
         if(is_array($message)){
             foreach($message as $msg){
                 static::$msgss[$type][] = $msg;
             }
         }else{
             static::$msgss[$type][] = $message;
         }
         Session::flash('messages', static::$msgss);
     }

     /**
      * Pull back those messages from the session
      * @return array
      */
     public static function get(){
         return (Session::has('messages')) ? Session::get('messages') : FALSE;
     }
    
     /**
      * Gets all the messages from the session and formats them accordingly for Twitter bootstrap.
      * @return string
      */
     public static function getHtml(){
         $output = FALSE;
         if (Session::has('messages')){
             $messages = Session::get('messages');
             foreach($messages as $type => $msgs){
                 if(is_integer($type)) $type = 'error';
                 $output .= '<div class="alert alert-'.$type.'"><a class="close" data-dismiss="alert">×</a>';
                 if(is_array($msgs)){
                 foreach($msgs as $msg) $output .= '<p>'.$msg.'</p>';
                 }else{
                      $output .= '<p>'.$msgs.'</p>';
                 }
                 $output .= '</div>';
             }
         }
         return $output;
     }
}
?>
```
