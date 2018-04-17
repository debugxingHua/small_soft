<?php
require_once '../common/new_PDO.php';

try{
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();
    //fetch获取数据
    $sql = "UPDATE sf_shop_cart SET selected=:selected  WHERE sc_id='{$_GET["id"]}'";
    $stmt = $pdo-> prepare($sql);
    $num = $stmt-> execute([":selected" => $_GET['selected']]);
    unset($pdo);
    $result = array('num'=>$num);
    echo json_encode($result);
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}