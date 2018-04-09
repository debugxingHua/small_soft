<?php
require_once 'new_PDO.php';

//获取请求的id
$commodity_id = $_POST['commodity_id'];
$count = $_POST['count'];
$color = $_POST['color'];
$size  = $_POST['size'];
$date = date('Y-m-d h:i:s');


try{
    //新建pdo对象
    $new_pdo = new new_PDO();
    $pdo = $new_pdo->pdo_object();
    //第一步：打开冰箱，用商品id查出购物车里有没有这个商品，有几个。
    $sql_select_sc = "SELECT * FROM sf_shop_cart WHERE commodity_id='{$commodity_id}'";
    $sc_data = $pdo->query($sql_select_sc);
    $sc_data->setFetchMode(PDO::FETCH_ASSOC);
    //判断有几个该商品
    $result_count = $sc_data->rowCount();
    if($result_count == 0){
        //购物车没有，说明该insert到购物车里哈。将商品的id、color、size、存入购物车；
        $add_message = addShopCart($pdo,$commodity_id,$color,$size,$date,$count);
        echo json_encode($add_message);
    }else if($result_count == 1){
        //如果有一条，就要用fetch(),并且对比请求的size和color一样不。
        $row = $sc_data->fetch();
        if($row['size'] == $size && $row['color'] == $color){
            //请求的color和sie在购物车中已存在，那么就把它的count数+1
            $count_new = $count == 1 ? ($row['count'] + $count) : $count;
            $update_message = updateShopCartCount($pdo,$row['sc_id'],$count_new);
            echo json_encode($update_message);
        }else{
            //如果购物车没对应的size和color一样的，那么就加入购物车
            $add_message = addShopCart($pdo,$commodity_id,$color,$size,$date,$count);
            echo json_encode($add_message);
        }
    }else if($result_count > 1){
        //如果有多条，就要用fetchAll(),并且循环来对比请求的size和color
        $check_add = false;
        $message = '';
        $rows = $sc_data->fetchAll();
        foreach($rows as $row){
            //请求的color和size在购物车中已存在，那么可以直接update
            if($row['size'] == $size && $row['color'] == $color){
                $count_new = $count == 1 ? ($row['count'] + $count) : $count;
                $message = updateShopCartCount($pdo,$row['sc_id'],$count_new);
                if($message && $message['num'] > 0){
                    break;
                }
            }
        }
        //message里update了已经，那么就不用add了
        if(!$message){
            $message = addShopCart($pdo,$commodity_id,$color,$size,$date,$count);
        }
        echo json_encode($message);
    }
    unset($pdo);
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}
/**
 *  添加购物车操作。
 * @param $pdo
 * @param $commodity_id
 * @param $color
 * @param $size
 * @param $date
 * @param $count
 * @return array
 */
function addShopCart($pdo,$commodity_id,$color,$size,$date,$count){
    $sql = "INSERT sf_shop_cart (commodity_id,color,size,date,count) VALUES
            ('{$commodity_id}','{$color}','{$size}','{$date}','{$count}') ";
    $num = $pdo->exec($sql);
    $lastId = $pdo->lastInsertId();
    return array('num'=>$num,'lastId'=>$lastId);
}

/**
 *  预处理更新购物车商品的数量
 * @param $pdo
 * @param $sc_id
 * @param $count
 * @return mixed
 */
function updateShopCartCount($pdo,$sc_id,$count){
    $sql = "UPDATE sf_shop_cart SET count=:count WHERE sc_id={$sc_id}";
    $stmt = $pdo -> prepare($sql);
    $num = $stmt -> execute([":count" => $count]);
    return array('num'=>$num);
}