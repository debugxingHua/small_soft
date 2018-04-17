<?php
require_once '../common/new_PDO.php';

$date = date('Y/m/d h:i:s');
$user_id = $_REQUEST['user_id'];
$address_id = $_REQUEST['address_id'];
$types = $_REQUEST['types'];
$red_bag = $_REQUEST['red_bag'];
$money = $_REQUEST['money'];
$pay_money = $_REQUEST['pay_money'];
$yf  = $_REQUEST['yf'];
$leaveWordInput = $_REQUEST['leave_word_input'];
//商品,array
$commodity_list = json_decode($_REQUEST['commodity']);
$commodity_count = count($commodity_list);
//commodity_id、color、count、size
$commodity_id_array = array();
$color_array = array();
$size_array = array();
$count_array = array();
//商品信息依次拼接成一个字符串，方便get的时候explode成数组;
foreach ($commodity_list as $commodity){
    array_push($commodity_id_array,$commodity->commodity_id);
    array_push($color_array,$commodity->color);
    array_push($size_array,$commodity->size);
    array_push($count_array,$commodity->count);
}
$commodity_id = implode(',',$commodity_id_array);
$color = implode(',',$color_array);
$size = implode(',',$size_array);
$count = implode(',',$count_array);
try{
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();

    //insert订单、
    $sql = "INSERT sf_indent (address_id,commodity_id,user_id,color,size,date,count,red_bag,leave_word_input,money,pay_money,expressage) VALUES
            ('{$address_id}','{$commodity_id}','{$user_id}','{$color}','{$size}','{$date}','{$count}','{$red_bag}','{$leaveWordInput}',
            '{$money}','{$pay_money}','{$yf}') ";
    $pdo->exec($sql);
    $lastId = $pdo->lastInsertId();
    //判断从购物车来的，删除购物车里的
    if($lastId > 0 && $types == 'cart'){
        $sql_delete = "DELETE FROM sf_shop_cart WHERE selected='1'";
        $pdo->exec($sql_delete);
    }
    unset($pdo);
    echo json_encode($lastId);
}catch (PDOException $e){
    echo json_encode($e->getMessage());
}