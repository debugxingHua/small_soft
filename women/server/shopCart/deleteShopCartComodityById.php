<?php
require_once '../common/new_PDO.php';


try{
    $pdo_object = new new_PDO();
    $pdo = $pdo_object->pdo_object();
    //fetch获取数据
    $sql = "DELETE FROM sf_shop_cart WHERE sc_id='{$_GET["id"]}'";
    $num = $pdo->exec($sql);
    unset($pdo);
    $result = array('num'=>$num);
    echo json_encode($result);
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}