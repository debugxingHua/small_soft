<?php
require_once "../new_PDO.php";
$user_id = $_REQUEST['user_id'];

//通过判断status来查询订单、默认1未付款、2已付款待收货、3已收货交易成功、4关闭
if(isset($_REQUEST['status'])){
    $status = $_REQUEST['status'];
    $sql = "SELECT sf_indent.*,sf_commodity.title,sf_commodity.img_url,sf_commodity.money_now,sf_commodity.expressage 
    FROM sf_indent LEFT JOIN sf_commodity ON sf_indent.commodity_id=sf_commodity.commodity_id WHERE sf_indent.user_id= '{$user_id}' 
    && sf_indent.status='{$status}' ORDER BY status,date";
}else{
    $sql = "SELECT sf_indent.*,sf_commodity.title,sf_commodity.img_url,sf_commodity.money_now,sf_commodity.expressage 
    FROM sf_indent LEFT JOIN sf_commodity ON sf_indent.commodity_id=sf_commodity.commodity_id WHERE sf_indent.user_id= '{$user_id}' ORDER BY status,date";
}

try{
    $pdo_object = new new_PDO();
    $pdo = $pdo_object->pdo_object();
    $pdo_stmt = $pdo->query($sql);
    $pdo_stmt->setFetchMode(PDO::FETCH_ASSOC);
    $result = $pdo_stmt->fetchAll();
    echo json_encode($result);
}catch (PDOException $e){
    echo json_encode($e->getMessage());
}