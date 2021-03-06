+++
date = "2012-07-01T07:37:41.00Z"
modified = ""
title = "Autoload"
linktitle = ""
description = "SplClassLoader Implementation"
language = "en"
author = ""
tags = ["php", "zend", "HowTo"]
groups = ["code", "php"]
categories = ["code", "php"]
+++


I have been looking around for some good examples to use the new PHP autoloader interoperability standard according to the PHP Standards Recommendation #0 (PSR-0).

And since I could find anything good, I had to figure it out by my self, here is the result.

[gist id=3027247](https://gist.github.com/robotamer/3027247)

HowTo:  

```php
	<?php
	# Adds your library to the beginning of the php include path
	addInclude('~/code/libs', FALSE);

	$loader = new SplClassLoader();

	# adds the php include path to the class
	$loader->setIncludePathLookup(true);

	$loader->add('Zend');
	$loader->add('PEAR');

	# Give the path if it isn't in the php include path like this
	$loader->add('Symfony', '/path/to/symfony');

	$loader -> register();
	?>
```

```php
<?php
/**
 * SplClassLoader implementation that implements the technical interoperability
 * standards for PHP 5.3 namespaces and class names.
 *
 * https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-0.md
 *
 * Example usage:
 *
 *     $classLoader = new \SplClassLoader();
 *
 *     // Configure the SplClassLoader to act normally or silently
 *     $classLoader->setMode(\SplClassLoader::MODE_NORMAL);
 *
 *     // Add a namespace of classes
 *     $classLoader->add('Doctrine', array(
 *         '/path/to/doctrine-common', '/path/to/doctrine-dbal', '/path/to/doctrine-orm'
 *     ));
 *
 *     // Add a prefix
 *     $classLoader->add('Swift', '/path/to/swift');
 *
 *     // Add a prefix through PEAR1 convention, requiring include_path lookup
 *     $classLoader->add('PEAR');
 *
 *     // Allow to PHP use the include_path for file path lookup
 *     $classLoader->setIncludePathLookup(true);
 *
 *     // Possibility to change the default php file extension
 *     $classLoader->setFileExtension('.php');
 *
 *     // Register the autoloader, prepending it in the stack
 *     $classLoader->register(true);
 *
 * @author Guilherme Blanco <guilhermeblanco@php.net>
 * @author Jonathan H. Wage <jonwage@gmail.com>
 * @author Roman S. Borschel <roman@code-factory.org>
 * @author Matthew Weier O'Phinney <matthew@zend.com>
 * @author Kris Wallsmith <kris.wallsmith@gmail.com>
 * @author Fabien Potencier <fabien.potencier@symfony-project.org>
 */
 
include 'SplAutoloader.php';
class SplClassLoader implements SplAutoloader
{
    /**
     * @var string
     */
    private $fileExtension = '.php';
 
    /**
     * @var boolean
     */
    private $includePathLookup = false;
 
    /**
     * @var array
     */
    private $resources = array();
 
    /**
     * @var integer
     */
    private $mode = self::MODE_NORMAL;
 
    /**
     * {@inheritdoc}
     */
    public function setMode($mode)
    {
    	if ($mode & self::MODE_SILENT && $mode & self::MODE_NORMAL) {
    	    throw new \InvalidArgumentException(
    	        sprintf('Cannot have %s working normally and silently at the same time!', __CLASS__)
    	    );
    	}
 
        $this->mode = $mode;
    }
 
    /**
     * Define the file extension of resource files in the path of this class loader.
     *
     * @param string $fileExtension
     */
    public function setFileExtension($fileExtension)
    {
        $this->fileExtension = $fileExtension;
    }
 
    /**
     * Retrieve the file extension of resource files in the path of this class loader.
     *
     * @return string
     */
    public function getFileExtension()
    {
        return $this->fileExtension;
    }
 
    /**
     * Turns on searching the include for class files. Allows easy loading installed PEAR packages.
     *
     * @param boolean $includePathLookup
     */
    public function setIncludePathLookup($includePathLookup)
    {
        $this->includePathLookup = $includePathLookup;
    }
 
    /**
     * Gets the base include path for all class files in the namespace of this class loader.
     *
     * @return boolean
     */
    public function getIncludePathLookup()
    {
        return $this->includePathLookup;
    }
 
    /**
     * {@inheritdoc}
     */
    public function register($prepend = false)
    {
        spl_autoload_register(array($this, 'load'), true, $prepend);
    }
 
    /**
     * {@inheritdoc}
     */
    public function unregister()
    {
        spl_autoload_unregister(array($this, 'load'));
    }
 
    /**
     * {@inheritdoc}
     */
    public function add($resource, $resourcePath = null)
    {
        $this->resources[$resource] = (array) $resourcePath;
    }
 
    /**
     * {@inheritdoc}
     */
    public function load($resourceName)
    {
        $resourceAbsolutePath = $this->getResourceAbsolutePath($resourceName);
 
        switch (true) {
            case ($this->mode & self::MODE_SILENT):
                if ($resourceAbsolutePath !== false) {
                    require $resourceAbsolutePath;
                }
                break;
 
            case ($this->mode & self::MODE_NORMAL):
            default:
                require $resourceAbsolutePath;
                break;
        }
 
        if ($this->mode & self::MODE_DEBUG && ! $this->isResourceDeclared($resourceName)) {
            throw new \RuntimeException(
                sprintf('Autoloader expected resource "%s" to be declared in file "%s".', $resourceName, $resourceAbsolutePath)
            );
        }
    }
 
    /**
     * Transform resource name into its absolute resource path representation.
     *
     * @params string $resourceName
     *
     * @return string Resource absolute path.
     */
    private function getResourceAbsolutePath($resourceName)
    {
        $resourceRelativePath = $this->getResourceRelativePath($resourceName);
 
        foreach ($this->resources as $resource => $resourcesPath) {
            if (strpos($resourceName, $resource) !== 0) {
                continue;
            }
 
            foreach ($resourcesPath as $resourcePath) {
                $resourceAbsolutePath = $resourcePath . DIRECTORY_SEPARATOR . $resourceRelativePath;
 
                if (is_file($resourceAbsolutePath)) {
                    return $resourceAbsolutePath;
                }
            }
        }
 
        if ($this->includePathLookup && ($resourceAbsolutePath = stream_resolve_include_path($resourceRelativePath)) !== false) {
            return $resourceAbsolutePath;
        }
 
        return false;
    }
 
    /**
     * Transform resource name into its relative resource path representation.
     *
     * @params string $resourceName
     *
     * @return string Resource relative path.
     */
    private function getResourceRelativePath($resourceName)
    {
        // We always work with FQCN in this context
        $resourceName = ltrim($resourceName, '\\');
        $resourcePath = '';
 
        if (($lastNamespacePosition = strrpos($resourceName, '\\')) !== false) {
            // Namespaced resource name
            $resourceNamespace = substr($resourceName, 0, $lastNamespacePosition);
            $resourceName      = substr($resourceName, $lastNamespacePosition + 1);
            $resourcePath      =  str_replace('\\', DIRECTORY_SEPARATOR, $resourceNamespace) . DIRECTORY_SEPARATOR;
        }
 
        return $resourcePath . str_replace('_', DIRECTORY_SEPARATOR, $resourceName) . $this->fileExtension;
    }
 
    /**
     * Check if resource is declared in user space.
     *
     * @params string $resourceName
     *
     * @return boolean
     */
    private function isResourceDeclared($resourceName)
    {
    	return class_exists($resourceName, false)
    	    || interface_exists($resourceName, false)
    	    || (function_exists('trait_exists') && trait_exists($resourceName, false));
    }
}

?>
```
```php

<?php
/**
 * Adds a directory to the php include path
 */

/**
 * @category   RoboTamer
 * @package    Functions
 * @subpackage File
 * @author     Dennis T Kaplan
 * @copyright  Copyright (c) 2008 - 2012 Dennis T Kaplan
 * @license    http://www.opensource.org/licenses/MIT
 * @link       http://blog.robotamer.com
 *
 * @param string  $dir The directory to add to the path
 * @param boolean $at_end If true, place this directory at the end of the include path. Otherwise, place it at the beginning.
 */
function addInclude($dir, $at_end = TRUE)
{
    $exist = file_exists($dir);
    if ( ! $exist || ($exist && filetype($dir) != 'dir'))
    {
        trigger_error("Include path '{$dir}' does not exist", E_USER_WARNING);
        echo '<pre>'; print_r(debug_backtrace()); echo '</pre>';
        exit;
    }
    $dir   = rtrim($dir, "/");
    $paths = ltrim(get_include_path(), ".".PATH_SEPARATOR);
    $paths = explode(PATH_SEPARATOR, $paths);
    $ds    = '.'.PATH_SEPARATOR;
    if (strlen($paths[0]) && array_search($dir, $paths) === false) {
        $at_end ? array_push($paths, $dir) : array_unshift($paths, $dir);
        $paths = implode(PATH_SEPARATOR, $paths);
        set_include_path($ds.$paths);
    } else {
        set_include_path($ds.$dir);
    }
}
/* #Test it
echo get_include_path();
echo '<br />';
addInclude('/var/www/library/');
echo get_include_path();
echo '<br />';
*/
?>

```

```php
<?php

function autoload($className)
{
    $className = ltrim($className, '\\');
    $fileName  = '';
    $namespace = '';
 
    if ($lastNsPos = strripos($className, '\\')) {
        $namespace = substr($className, 0, $lastNsPos);
        $className = substr($className, $lastNsPos + 1);
        $fileName  = str_replace('\\', DIRECTORY_SEPARATOR, $namespace) . DIRECTORY_SEPARATOR;
    }
 
    $fileName .= str_replace('_', DIRECTORY_SEPARATOR, $className) . '.php';
 
    require $fileName;
}
?>
```

