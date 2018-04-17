<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/8
 * Time: 16:16
 */
class new_PDO{
    public function pdo_object(){
        $dbType = "mysql";
        $host = "localhost";
        $dbName = "sf_women";
        $user = "root";
        $password = "hxh5801050";
        $dsn = "{$dbType}:host={$host};dbname={$dbName}";
        //新建pdo对象
        $opts_values = array(
            PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8'
        );
        $pdo = new PDO($dsn,$user,$password,$opts_values);
        return $pdo;
    }
}