+++
date = "2011-06-17T10:10:09Z"
modified = ""
title = "fixing php's gettype function"
linktitle = ""
description = ""
language = "en"
author = ""
tags = ["code", "php"]
groups = ["code", "php"]
categories = ["code", "php"]
+++


```php
<?php    

public static function getType($value, $max_length = 50){

	$type = gettype($value);

	if($type == 'NULL'
			|| $type == 'boolean'
			|| $type == 'integer'
			|| $type == 'double'
			|| $type == 'object'
			|| $type == 'resource'
			|| $type == 'array'
		)
		return array('type'=>$type,'value'=>$value);

	if($type == 'string' && empty($value))
		return array('type'=>'NULL','value'=>$value);

	if($type == 'string' && strlen($value) > $max_length)
		return array('type'=>'blob','value'=>$value);

	if($type == 'string' && substr($value, 0,1) === '0')
		return array('type'=>'string','value'=>$value);

	if($type == 'string' && is_numeric($value)){
		$int   = (int) $value;
		$float = (float) $value;

		if($int == $value){
			$value = $int;
			$type = 'integer';
		}elseif($float == $value){
			$value = $float;
			$type = 'double';
		}
	}elseif($type == 'string'){
		$type = 'string';
	}else{
		$type = 'blob';
	}
	return array('type'=>$type,'value'=>$value);
}
    
?>
```    







