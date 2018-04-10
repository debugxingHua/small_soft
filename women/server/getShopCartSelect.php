<?php
require_once 'new_PDO.php';

try{
//    var_dump($_REQUEST['user_id']);
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();
    if(isset($_REQUEST['user_id'])){
       $sql = "SELECT sf_shop_cart.*,sf_commodity.title,sf_commodity.img_url,sf_commodity.money_now,sf_commodity.expressage,sf_commodity.status FROM
sf_shop_cart LEFT JOIN sf_commodity ON sf_shop_cart.commodity_id=sf_commodity.commodity_id WHERE sf_shop_cart.user_id=".$_REQUEST['user_id']." ORDER BY sf_shop_cart.date";
    }
    $pdo_stmt = $pdo->query($sql);
    $pdo_stmt->setFetchMode(PDO::FETCH_ASSOC);
    $result = $pdo_stmt->fetchAll();
    unset($pdo);
    echo json_encode($result);
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}