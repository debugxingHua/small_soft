<?php
require_once "../common/new_PDO.php";
$user_id = $_REQUEST['user_id'];
//结果：订单+对应的color、size、商品信息
$result_all = array();
$result_indent = array();
$color_array = array();
$size_array = array();
$count_array = array();
$commodity = array();
//因为重写了订单添加。将从commodity_id等字段存储成了数组。所以需要在每个订单里都依次查询出多少个商品

try{
    $pdo_object = new new_PDO();
    $pdo = $pdo_object->pdo_object();
    //判断是全部订单，还是只获取对应status的订单
    if(isset($_REQUEST['status'])){
        $status = $_REQUEST['status'];
        $sql_indent = "SELECT * FROM sf_indent WHERE user_id= '{$user_id}' && status='{$status}' ORDER BY date DESC,status";
    }else{
        $sql_indent = "SELECT * FROM sf_indent WHERE user_id= '{$user_id}' ORDER BY date DESC,status";
    }
    $pdo_stmt = $pdo->query($sql_indent);
    $pdo_stmt->setFetchMode(PDO::FETCH_ASSOC);
    //订单数量
    $result_count = $pdo_stmt->rowCount();
    //多条，需要循环两次，订单、商品
    if($result_count > 1){
        $result_indent = $pdo_stmt->fetchAll();
        for($k=0;$k<$result_count;$k++){
            $commodity_id_array[$k] = explode(',',$result_indent[$k]['commodity_id']);
            $color_array[$k] = explode(',',$result_indent[$k]['color']);
            $size_array[$k] = explode(',',$result_indent[$k]['size']);
            $count_array[$k] = explode(',',$result_indent[$k]['count']);
            //遍历这个订单的所有商品id，并用id查到对应的商品
            for ($i=0;$i<count($commodity_id_array[$k]);$i++){
                $sql_commodity = "SELECT commodity_id,title,img_url,money_now FROM sf_commodity WHERE commodity_id= '{$commodity_id_array[$k][$i]}'";
                $pdo_stmt1 = $pdo->query($sql_commodity);
                $pdo_stmt1->setFetchMode(PDO::FETCH_ASSOC);
                $result_commodity = $pdo_stmt1->fetch();
                $commodity[$k][$i] = $result_commodity;//第5个参数返回的是订单对应的商品信息集合
                $commodity[$k][$i]['count'] = $count_array[$k][$i];
                $commodity[$k][$i]['size'] = $size_array[$k][$i];
                $commodity[$k][$i]['color'] = $color_array[$k][$i];
            }
            //商品存储到对应的订单下
            $result_indent[$k]['commodity'] = $commodity;
            $commodity = array();
        }
        echo json_encode(['errMsg'=>'多条','indent'=>$result_indent]);
    }else if($result_count == 1){
    //单条，需要循环商品
        $result_indent = $pdo_stmt->fetch();
        $commodity_id_array = explode(',',$result_indent['commodity_id']);
        $color_array = explode(',',$result_indent['color']);
        $size_array = explode(',',$result_indent['size']);
        $count_array = explode(',',$result_indent['count']);
        //遍历这个订单的所有商品id，并用id查到对应的商品
        for ($i=0;$i<count($commodity_id_array);$i++){
            $sql_commodity = "SELECT commodity_id,title,img_url,money_now FROM sf_commodity WHERE commodity_id= '{$commodity_id_array[$i]}'";
            $pdo_stmt2 = $pdo->query($sql_commodity);
            $pdo_stmt2->setFetchMode(PDO::FETCH_ASSOC);
            $result_commodity = $pdo_stmt2->fetch();
            $commodity[$i] = $result_commodity;//商品信息
            $commodity[$i]['count'] = $count_array[$i];
            $commodity[$i]['size'] = $size_array[$i];
            $commodity[$i]['color'] = $color_array[$i];
            $result_indent['commodity'][$i] = $commodity;
            $commodity = array();
        }
        //为了匹配多条的格式，前端统一遍历处理
        $result_indents[0] = $result_indent;
        echo json_encode(['errMsg'=>'一条','indent'=>$result_indents]);
    }else{
        echo json_encode(['errMsg'=>'空']);
    }
}catch (PDOException $e){
    echo json_encode($e->getMessage());
}


//通过判断status来查询订单、默认1未付款、2已付款待收货、3已收货交易成功、4关闭
//if(isset($_REQUEST['status'])){
//    $status = $_REQUEST['status'];
//    $sql = "SELECT sf_indent.*,sf_commodity.title,sf_commodity.img_url,sf_commodity.money_now,sf_commodity.expressage
//    FROM sf_indent LEFT JOIN sf_commodity ON sf_indent.commodity_id=sf_commodity.commodity_id WHERE sf_indent.user_id= '{$user_id}'
//    && sf_indent.status='{$status}' ORDER BY status,date";
//}else{
//    $sql = "SELECT sf_indent.*,sf_commodity.title,sf_commodity.img_url,sf_commodity.money_now,sf_commodity.expressage
//    FROM sf_indent LEFT JOIN sf_commodity ON sf_indent.commodity_id=sf_commodity.commodity_id WHERE sf_indent.user_id= '{$user_id}' ORDER BY status,date";
//}
