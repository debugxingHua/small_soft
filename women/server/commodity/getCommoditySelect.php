<?php
require_once '../common/new_PDO.php';

try{
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();
    //fetchAll获取全部数据
    $sql = "SELECT * FROM sf_commodity ";
    $result = $pdo->query($sql);
    $result->setFetchMode(PDO::FETCH_ASSOC);
    $all= $result->fetchAll();

    $pdo = null;
    echo json_encode($all);
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}
