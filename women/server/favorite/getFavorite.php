<?php
require_once "../common/new_PDO.php";

$user_id = $_REQUEST['user_id'];
try{
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();

    //查询收藏
    $sql_select = "SELECT sf_favorite.*,sf_commodity.* FROM 
sf_favorite LEFT JOIN sf_commodity ON sf_favorite.commodity_id=sf_commodity.commodity_id 
WHERE sf_favorite.user_id='{$user_id}}' ORDER BY sf_favorite.date DESC ";
    $pdo_stmt = $pdo->query($sql_select);
    $pdo_stmt->setFetchMode(PDO::FETCH_ASSOC);
    $result = $pdo_stmt->fetchAll();

    echo json_encode(["errMsg"=>'ok',"result"=>$result]);
}catch (PDOException $e){
    echo json_encode($e->getMessage());
}