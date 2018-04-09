<?php
require_once 'new_PDO.php';


try{
    //新建pdo对象
    $opts_values = array(
        PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8'
    );
    $pdo = new PDO($dsn,$user,$password,$opts_values);
    //fetch获取数据
    $sql = "DELETE FROM sf_shop_cart WHERE sc_id='{$_GET["id"]}'";
    $num = $pdo->exec($sql);
    unset($pdo);
    $result = array('num'=>$num);
    echo json_encode($result);
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}