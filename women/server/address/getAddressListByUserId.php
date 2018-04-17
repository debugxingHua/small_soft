<?php
require_once "../common/new_PDO.php";


$user_id = $_REQUEST['user_id'];
try{
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();

    $sql_select = "SELECT * FROM sf_address WHERE user_id='{$user_id}'";
    $sc_data = $pdo->query($sql_select);
    $sc_data->setFetchMode(PDO::FETCH_ASSOC);
    $result_count = $sc_data->rowCount();

    $result = array();
    if($result_count == 1){
        $res = $sc_data->fetch();
        $result[0] = $res;
    }else if ($result_count > 1){
        $rows = $sc_data->fetchAll();
        foreach($rows as $row){
            $result[count($result)] = $row;
        }
    }else{
        $result['errMsg'] = "空";
    }
    unset($pdo);
    echo json_encode($result);
}catch (PDOException $e){
    echo json_encode('error:'.$e->getMessage());
}