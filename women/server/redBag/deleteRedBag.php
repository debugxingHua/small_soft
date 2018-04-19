<?php
require_once '../common/new_PDO.php';

$rb_id = $_REQUEST['rb_id'];
try{
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();
    $sql_delete = "DELETE FROM sf_red_bag WHERE rb_id='{$rb_id}'";
    $num = $pdo->exec($sql_delete);
    unset($pdo);
    if($num > 0){
        echo json_encode(["errMsg"=>'ok',"num"=>$num]);
    }else{
        echo json_encode(["errMsg"=>'no',"num"=>$num]);
    }
}catch (PDOException $e){
    echo json_encode($e->getMessage());
}