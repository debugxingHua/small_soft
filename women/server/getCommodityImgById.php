<?php
require_once 'new_PDO.php';

try{
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();
    //fetch获取全部客户数据
    $sql = "SELECT * FROM sf_commodity_img WHERE commodity_id='{$_GET["commodity_id"]}'";
    $pdo_stmt = $pdo->query($sql);
    $pdo_stmt->setFetchMode(PDO::FETCH_ASSOC);
    $result = $pdo_stmt->fetchAll();
    unset($pdo);
    echo json_encode($result);
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}