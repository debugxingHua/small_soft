<?php
require_once 'new_PDO.php';

try{
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();
    //fetch获取数据
    $sql = "UPDATE sf_shop_cart SET count=:count  WHERE sc_id='{$_GET["id"]}'";
    $stmt = $pdo-> prepare($sql);
    $num = $stmt-> execute([":count" => $_GET['count']]);
    unset($pdo);
    $result = array('num'=>$num);
    echo json_encode($result);
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}