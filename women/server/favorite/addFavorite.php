<?php
require_once "../common/new_PDO.php";

$commodity_id = $_REQUEST['commodity_id'];
$user_id = $_REQUEST['user_id'];
$date = date('Y-m-d h:i:s');
try{
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();

    //查询收藏
    $sql_select = "SELECT * FROM sf_favorite WHERE user_id='{$user_id}}' && commodity_id='{$commodity_id}' ";
    $pdo_stmt = $pdo->query($sql_select);
    $result_count = $pdo_stmt->rowCount();
    $result = $pdo_stmt->fetch();
    //查到更新，查不到insert
    if($result_count == 0){
        $sql_add = "INSERT sf_favorite (user_id,commodity_id,date) VALUES ('{$user_id}','{$commodity_id}','{$date}') ";
        $num = $pdo->exec($sql_add);
        echo json_encode(["errMsg"=>'收藏成功',"num"=>$num]);
    }else{
        $favorite_id = $result['favorite_id'];
        $sql_update = "UPDATE sf_favorite SET date=:date WHERE favorite_id='{$favorite_id}' ";
        $stmt = $pdo -> prepare($sql_update);
        $num = $stmt -> execute([":date" => $date]);
        echo json_encode(["errMsg"=>'已收藏',"num"=>$num]);
    }

}catch (PDOException $e){
    echo json_encode($e->getMessage());
}