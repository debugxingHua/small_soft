<?php
require_once 'new_PDO.php';

try{
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();
    //判断是要结算选中的商品还是要全部的购物车数据。
    if(isset($_REQUEST['rt'])){
       $sql = "SELECT sf_shop_cart.*,sf_commodity.title,sf_commodity.img_url,sf_commodity.money_now,sf_commodity.expressage,sf_commodity.status
 FROM sf_shop_cart LEFT JOIN sf_commodity ON sf_shop_cart.commodity_id=sf_commodity.commodity_id WHERE sf_shop_cart.selected=1 ORDER BY sf_shop_cart.date";
    }else{
       $sql = "SELECT sf_shop_cart.*,sf_commodity.title,sf_commodity.img_url,sf_commodity.money_now,sf_commodity.expressage,sf_commodity.status
 FROM sf_shop_cart LEFT JOIN sf_commodity ON sf_shop_cart.commodity_id=sf_commodity.commodity_id ORDER BY sf_shop_cart.date";
    }
    $pdo_stmt = $pdo->query($sql);
    $pdo_stmt->setFetchMode(PDO::FETCH_ASSOC);
    $result = $pdo_stmt->fetchAll();
    unset($pdo);
    echo json_encode($result);
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}