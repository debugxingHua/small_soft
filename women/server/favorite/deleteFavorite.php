<?php
require_once "../common/new_PDO.php";

$favorite_id = $_REQUEST['favorite_id'];

try{
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();

    $sql_update = "DELETE FROM sf_favorite WHERE favorite_id='{$favorite_id}' ";
    $num = $pdo->exec($sql_update);
    unset($pdo);
    echo json_encode(["errMsg"=>'删除成功',"num"=>$num]);
}catch (PDOException $e){
    echo json_encode($e->getMessage());
}