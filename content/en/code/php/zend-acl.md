+++
date = "2008-04-27T19:50:00Z"
modified = ""
title = "Zend ACL"
linktitle = ""
description = "Zend ACL plugin with sqlite backend"
language = "en"
author = ""
tags = ["code", "php"]
groups = ["code", "php"]
categories = ["code", "php"]
+++


Tamer_ACL is a simple Zend Framework ACL plugin that uses the sqlite backend to store all the data.  
  
  
#### How To Inatall  
  
Make sure you have a table called **role** in your authentication table and a table called **alias** you may change that to username if you like. The sql code is below.  
Below are the files.  
Before each file you will find installation instructions that should work even for the most novice Linux / Zend Framework developer.  
  
#### Resources  

* [phpclasses.org](http://www.phpclasses.org/browse/package/4100.html)  
* [Google code / REPO](http://code.google.com/p/tamer)  
  
#### Todo  
- Admin Backend  

_______________________

  
#### ZEND_ROOT/backstrap.php  

Create acl object

```php
include_once "Tamer/Acl.php";
$acl = new Tamer_Acl();
```
  
Add the Tamer_Plugin_Auth to the Zend Front Controller  

```php    
$front->setControllerDirectory(APPS . '/default/controllers')
        ->setBaseUrl($cfg->baseUrl)
        ->registerPlugin(new Tamer_Plugin_Auth($auth, $acl))
```
  
  
#### ZEND_ROOT/library/Tamer/Acl.php  

```php

<?php
require_once 'Zend/Acl.php';
require_once 'Zend/Acl/Role.php';
require_once 'Zend/Acl/Resource.php';
require_once 'Zend/Db/Adapter/Pdo/Sqlite.php';

class Tamer_ACL extends Zend_ACL 
{
        public $alias;
        public $role;
        
        public function __construct($alias, $role)
        {       
                $this->alias = $alias;
                $this->role = $role;
                $sqlite = new TamerLiteACL($alias, $role);
                $result = $sqlite->getAclRows();
                foreach($result['roles'] as $v){
                        $this->addRoles($v);
                }
                $this->addResources($result['resources']);
                $this->addAccess($result['access']);
        }
        
        private function addRoles($rows)
        {
                foreach($rows as $v){
                        if($v['parent'] == ''){
                                $this->addRole(new Zend_Acl_Role($v['role']));
                        }else{
                                $this->addRole(new Zend_Acl_Role($v['role']), $v['parent']);
                        }
                }
        }
        
        private function addResources($rows)
        {
                foreach($rows as $v){
                        if($v['parent'] == ''){
                                $this->add(new Zend_Acl_Resource($v['resource']));
                        }else{
                                $this->add(new Zend_Acl_Resource($v['resource']), $v['parent']);
                        }
                }
        }

        private function addAccess($rows)
        {
                foreach($rows as $v){
                        if($v['allow'] == 1){
                                $this->allow($v['role'], $v['resource'], $v['privilege']);
                        }else{
                                $this->deny($v['role'], $v['resource'], $v['privilege']);
                        }
                }
        }
}


class TamerLiteACL 
{
        private $_sqlite_name = '/db/config.db';
        private $_alias;
        private $_role;
        private $_result;
        
        public function __construct($alias, $role)
        {       
                $this->_alias = $alias;
                $this->_role = $role;
                
                try{
                        $this->_sqliteAdapter = new Zend_Db_Adapter_Pdo_Sqlite(array('dbname' => ROOT.$this->_sqlite_name));
                        $this->_sqliteAdapter->getConnection();
                } catch (Zend_Db_Adapter_Exception $e) {
                        echo 'adapter<pre>'.$e->getMessage().'</pre>';
                } catch (Zend_Exception $e) {
                        echo 'adapter<pre>'.$e->getMessage().'</pre>';
                }
                $this->_sqliteAdapter->getProfiler()->setEnabled(true);

                $select = $this->_sqliteAdapter->select()
                                        ->from('acl_roles', array('role', 'parent'))
                                        ->where('type = ?', 1);
                
                $stmt = $this->_sqliteAdapter->query($select);
                $this->_result['roles']['system'] = $stmt->fetchAll();
                
                $select = $this->_sqliteAdapter->select()
                                        ->from('acl_roles', array('role', 'parent'))
                                        ->where('role = ?', $this->_alias)
                                        ->orwhere('parent = ?', $this->_alias);
                
                $stmt = $this->_sqliteAdapter->query($select);
                $this->_result['roles']['alias'] = $stmt->fetchAll();
                
                $stmt = $this->_sqliteAdapter->query(
                "SELECT resource, parent FROM acl_resources WHERE owner = 'system' OR owner = ?", $this->_alias);
                $this->_result['resources'] = $rows = $stmt->fetchAll();
                
                $stmt = $this->_sqliteAdapter->query('SELECT allow, role, resource, privilege FROM acl_access WHERE type = 1 ORDER BY chain');
                $this->_result['access'] = $rows = $stmt->fetchAll();

                $this->_sqliteAdapter->closeConnection();
        }
        
        public function getAclRows()
        {
                return $this->_result;
        }
}




class aclCreate extends Zend_ACL 
{
        public function __construct()
        {
                $this->add(new Zend_Acl_Resource('index'));
                $this->add(new Zend_Acl_Resource('safe'));
                $this->add(new Zend_Acl_Resource('login'), 'safe');
                $this->add(new Zend_Acl_Resource('registration'), 'safe');
                $this->add(new Zend_Acl_Resource('password'), 'safe');
                
                $this->addRole(new Zend_Acl_Role('guest'));
                $this->deny('guest', 'safe', NULL);
                $this->allow('guest', 'registration');
                $this->allow('guest', 'login');
                $this->deny('guest', 'password');
                $this->allow('guest','index');
                
                $this->addRole(new Zend_Acl_Role('member'));
                $this->allow('member', 'safe', NULL);
                
                $this->addRole(new Zend_Acl_Role('admin'));
                $this->allow('admin');
        }

}

class TamerFile_ACL
{
        /*
        @ Call like this from bootstrap
                include_once "Tamer/Acl.php";
                $acl = new Tamer_Acl();
                $acl = new aclCreate();
                $acl = $acl->aclCheck();
        */
        protected $aclCfg;
        
        private $_sqlite_name = '/db/config.db';
        private $_sqliteAdapter;
        private $_table; //Sqlite Table
        
        public $old = FALSE;

        public function __construct()
        {
                $this->aclCfg = ROOT.'/library/Tamer/Acl.php';

                try{
                        $this->_sqliteAdapter = new Zend_Db_Adapter_Pdo_Sqlite(array('dbname' => ROOT.$this->_sqlite_name));
                        $this->_sqliteAdapter->getConnection();
                } catch (Zend_Db_Adapter_Exception $e) {
                        echo 'adapter<pre>'.$e->getMessage().'</pre>';
                } catch (Zend_Exception $e) {
                        echo 'adapter<pre>'.$e->getMessage().'</pre>';
                }
                //$this->dropTable();
                //$this->makeTable();
                //$this->aclCheck();
        }
        
        public function aclCheck()
        {
                $ftime = filemtime($this->aclCfg);
                $sql = 'SELECT time FROM acl_array WHERE time = ?';
                if($this->_result = $this->_sqliteAdapter->fetchRow($sql, $ftime)){     
                        return  $this->aclGet();
                }else{
                        $acl = new aclCreate();
                        $this->aclDelete();
                        $this->aclSave($acl);
                        return $acl;
                }
        }

        public function aclGet()
        {
                $sql = 'SELECT acl FROM acl_array WHERE time = ?';
                $ftime = filemtime($this->aclCfg);
                $this->_result = $this->_sqliteAdapter->fetchRow($sql, $ftime);
                $this->_sqliteAdapter->closeConnection();
                
                return unserialize($this->_result['acl']);
        }
        
        public function aclSave($array)
        {
                $filemtime = filemtime($this->aclCfg);
                $array = serialize($array);
                $data = array('time'=>$filemtime,'acl'=>$array);
                $this->_sqliteAdapter->insert('acl_array', $data);
                $this->_sqliteAdapter->closeConnection();
        }

        public function aclDelete()
        {
                $this->_sqliteAdapter->delete('acl_array');
                $this->_sqliteAdapter->closeConnection();
        }

        
        /**
         * creates the db table
         *
         * @param array $fields
         */
        public function dropTable()
        {
            $this->_result = $this->_sqliteAdapter->getConnection()->exec('DROP TABLE acl_array');
                $this->_sqliteAdapter->closeConnection();
        }
        
        /**
         * creates the db table
         *
         * @param array $fields
         */
        public function makeTable()
        {
                $sql[] = 'CREATE TABLE IF NOT EXISTS acl_roles (role TEXT(50) NOT NULL,parent TEXT(50) default NULL)';
                $sql[] = 'CREATE TABLE IF NOT EXISTS acl_resources (resource TEXT(50) NOT NULL,parent TEXT(50) default NULL)';
                $sql[] = 'CREATE TABLE IF NOT EXISTS acl_access (role TEXT(50) NOT NULL,resource  Text(50) NOT NULL,privilege Text(50),allow Boolean NOT NULL DEFAULT 0)';
                $sql[] = 'CREATE table IF NOT EXISTS acl_array(time INTEGER PRIMARY KEY, acl TEXT)';
                foreach($sql as $v){
                        $this->_sqliteAdapter->query($v);
                }
                $this->_table = true;
                $this->_sqliteAdapter->closeConnection();
        }       
}
?>
```
  
#### ZEND_ROOT/library/Tamer/Plugin/Auth.php  
    
```php
<?php

class Tamer_Plugin_Auth extends Zend_Controller_Plugin_Abstract
{
        private $_auth;
        private $_acl;
        
        private $_noauth = array('module' => 'safe',
                                                        'controller' => 'login',
                                                        'action' => 'index');
        
        private $_noacl = array('module' => 'default',
                                                        'controller' => 'error',
                                                        'action' => 'privileges');
        
        public function __construct($auth, $acl)
        {
                $this->_auth = $auth;
                $this->_acl = $acl;
        }
        
        public function preDispatch(Zend_Controller_Request_Abstract $request)
        {
                if ($this->_auth->hasIdentity()) {
                        $role = $this->_auth->getIdentity()->role;
                } else {
                        $role = 'guest';
                }

                $controller = $request->controller;
                $action         = $request->action;
                $module         = $request->module;
                $resource       = $controller;
                
                if (!$this->_acl->has($resource)) {
                        $resource = null;
                }
                
                if (!$this->_acl->isAllowed($role, $resource, $action)) {
                        if (!$this->_auth->hasIdentity()) {
                                $module = $this->_noauth['module'];
                                $controller = $this->_noauth['controller'];
                                $action = $this->_noauth['action'];
                        } else {
                                $module = $this->_noacl['module'];
                                $controller = $this->_noacl['controller'];
                                $action = $this->_noacl['action'];
                        }
                }
                
                $request->setModuleName($module);
                $request->setControllerName($controller);
                $request->setActionName($action);
        }
}
?>
```
  
  
#### ZEND_ROOT/db/config.sql  
    
```sql
DROP TABLE IF EXISTS acl_array;
DROP TABLE IF EXISTS acl_roles;
DROP TABLE IF EXISTS acl_resources;
DROP TABLE IF EXISTS acl_access;
DROP TRIGGER IF EXISTS update_acl_roles;
DROP TRIGGER IF EXISTS update_acl_roles_access;
DROP TRIGGER IF EXISTS update_acl_roles_parent;
DROP TRIGGER IF EXISTS update_acl_resources_owner;
DROP TRIGGER IF EXISTS update_acl_access_role;

PRAGMA auto_vacuum = 1;
PRAGMA encoding = "UTF-8";

BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS acl_roles (role TEXT(50) NOT NULL,parent TEXT(50) default NULL, type Boolean DEFAULT NULL);

CREATE TABLE IF NOT EXISTS acl_resources (owner TEXT(50) NOT NULL,
resource TEXT(50) NOT NULL,parent TEXT(50) default NULL);

CREATE TABLE IF NOT EXISTS acl_access (role TEXT(50) NOT NULL,
resource TEXT(50) DEFAULT NULL, privilege Text(50) DEFAULT NULL, 
allow Boolean DEFAULT NULL, chain INTEGER DEFAULT NULL, type Boolean DEFAULT NULL);

CREATE TRIGGER update_acl_roles_parent UPDATE OF parent ON acl_roles 
        BEGIN UPDATE acl_roles SET parent = new.role WHERE parent = old.role;
        END;
CREATE TRIGGER update_acl_resources_owner UPDATE OF owner ON acl_resources 
        BEGIN UPDATE acl_resources SET owner = new.role WHERE owner = old.role; 
        END;
CREATE TRIGGER update_acl_access_role UPDATE OF role ON acl_access 
        BEGIN UPDATE acl_access SET role = new.role WHERE role = old.role; 
        END;


INSERT INTO "acl_roles" VALUES ('admin',NULL,1);
INSERT INTO "acl_roles" VALUES ('guest',NULL,1);
INSERT INTO "acl_roles" VALUES ('member',NULL,1);
INSERT INTO "acl_roles" VALUES ('developer','member',1);

INSERT INTO "acl_resources" VALUES ('system','index',NULL);
INSERT INTO "acl_resources" VALUES ('system','safe',NULL);
INSERT INTO "acl_resources" VALUES ('system','login','safe');
INSERT INTO "acl_resources" VALUES ('system','registration','safe');
INSERT INTO "acl_resources" VALUES ('system','admin','safe');

INSERT INTO "acl_access" VALUES ('admin',NULL,NULL,1,NULL,1);
INSERT INTO "acl_access" VALUES ('guest','index',NULL,1,1,1);
INSERT INTO "acl_access" VALUES ('guest','safe',NULL,NULL,2,1);
INSERT INTO "acl_access" VALUES ('guest','login',NULL,1,3,1);
INSERT INTO "acl_access" VALUES ('guest','registration',NULL,1,4,1);
INSERT INTO "acl_access" VALUES ('member','safe',NULL,1,1,1);
INSERT INTO "acl_access" VALUES ('member','login',NULL,NULL,2,1);
INSERT INTO "acl_access" VALUES ('member','registration',NULL,NULL,3,1);
COMMIT;
```