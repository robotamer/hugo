+++
date = "2012-07-13T20:45:12.00Z"
description = "Get php files in dir with recursive lambda callback function"
groups = ["php"]
keywords = ["php", "recursive", "lambda", "callback", "function"]
language = "en"
tags = ["php"]
title = "Read Folder"

+++

This is a *Lambda* function also called anonymous function within a regular function that scans a given directory and it's sub directories returning an array of all php files within.

Following is a snip output of the Zend files. 

	[6] => /usr/share/php/Zend/Captcha/ReCaptcha.php
	[7] => /usr/share/php/Zend/Captcha/Base.php
	[8] => /usr/share/php/Zend/Feed/Rss.php
	[9] => /usr/share/php/Zend/Feed/Atom.php
	[52] => /usr/share/php/Zend/Feed/Writer/Source.php
	[53] => /usr/share/php/Zend/Feed/Pubsubhubbub.php
	[54] => /usr/share/php/Zend/Feed/Element.php
	[55] => /usr/share/php/Zend/Feed/Reader/Feed/Rss.php
	[90] => /usr/share/php/Zend/Feed/Builder.php
	[91] => /usr/share/php/Zend/Feed/Writer.php
	[92] => /usr/share/php/Zend/Config.php
	[93] => /usr/share/php/Zend/Json/Server.php
	[94] => /usr/share/php/Zend/Json/Exception.php
	[95] => /usr/share/php/Zend/Json/Encoder.php
	[865] => /usr/share/php/Zend/View/Stream.php
	[866] => /usr/share/php/Zend/View/Interface.php
	[867] => /usr/share/php/Zend/View/Abstract.php
	[868] => /usr/share/php/Zend/Search/Exception.php
	[869] => /usr/share/php/Zend/Search/Lucene.php

```php
<?php

/**
 *
 * @param string $dir
 * @return array 
 */
function get_php_files_in_dir($dir)
{
	$bin = array ();
	$run = function(&$run, $dir, &$bin) {
		if ($handle = opendir($dir)) {
			while (false !== ($file = readdir($handle))) {
				if ($file != "." && $file != "..") {
					if (strpos($file, '.php') > 0) {
						$bin[] = $dir . '/' . $file;
					} elseif (is_dir($dir . '/' . $file)) {
						$run($run, $dir . '/' . $file, $bin);
					}
				}
			}
		}
		closedir($handle);
	};
	$run($run, $dir, $bin);
	return $bin;
}
?>
```

[gist id=3107221](https://gist.github.com/robotamer/3107221#file-get_php_files_in_dir-php)
