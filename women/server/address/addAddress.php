<?php
require_once "../common/new_PDO.php";

$user_id = $_REQUEST['user_id'];
$name = $_REQUEST['name'];
$address = $_REQUEST['address'];
$phone = $_REQUEST['phone'];
$postcode = $_REQUEST['postcode'];

try{
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();

    //insert
    $sql = "INSERT sf_address (user_id,name,address,phone,postcode) VALUES ('{$user_id}','{$name}','{$address}','{$phone}','{$postcode}') ";
    $num = $pdo->exec($sql);
    $lastId = $pdo->lastInsertId();
    unset($pdo);
    echo json_encode($lastId);
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}
