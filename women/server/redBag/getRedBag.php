<?php
require_once '../common/new_PDO.php';

$user_id = $_REQUEST['user_id'];
try{
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();

    $sql = "SELECT * FROM sf_red_bag WHERE user_id='{$user_id}'";
    $stmt = $pdo->query($sql);
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $result_count = $stmt->rowCount();
    $result = $stmt->fetch();

    echo json_encode($result);
}catch (PDOException $e){
    echo json_encode($e->getMessage());
}