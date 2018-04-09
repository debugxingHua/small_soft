<?php
require_once 'new_PDO.php';

try{
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();
    //遍历id数组，得到id后改变selected
    $id_e = str_replace(['[',']','"'],'',$_REQUEST['id']);
    $id_array = explode(',',$id_e);
    var_dump($id_array);

    for ($i = 0; $i < count($id_array); $i++){
        //这就是她的id了,开始循环update
        $id = intval($id_array[$i]);
        $sql = "UPDATE sf_shop_cart SET selected=:selected  WHERE sc_id='{$id}'";
        $stmt = $pdo-> prepare($sql);
        $num = $stmt-> execute([":selected" => $_REQUEST['selected']]);
    }
    unset($pdo);
    echo json_encode($num);
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}