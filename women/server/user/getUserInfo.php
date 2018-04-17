<?php
require_once '../common/User.php';
require_once '../common/new_PDO.php';

$user_object = new User();
$appId = 'wxc9713edb30ef6b8e';//小程序id
$appSecret = '6e527a0caaf498291536700914da47c1';//秘钥
$date = date('Y/m/d h:i:s');
$time_out = time()+259100;//过期时间

//传过来code，获取openid
if(isset($_REQUEST['code'])){
    $result = $user_object->getUserSessionKeyAndOpenId($appId,$appSecret,$_REQUEST['code']);
    $session_key = $result->session_key;        //获取session_key
    $open_id = $result->openid;                 //获取openid
    //将openid存到数据库
    try{
        $new_pdo = new new_PDO();
        $pdo = $new_pdo->pdo_object();
        //用openid查一下登陆过没有
        $sql = "SELECT * FROM sf_user WHERE open_id='{$open_id}'";
        $result_open_id = $pdo->query($sql);
        $result_open_id->setFetchMode(PDO::FETCH_ASSOC);
        $bool = $result_open_id->fetch();
        //用openid查询唯一后，不存在就insert
        if(!$bool){
//            $sql = "INSERT sf_user (open_id,date,time) VALUES ('{$open_id}','{$date}','{$time_out}') ";
//            $num = $pdo->exec($sql);
//            $lastId = $pdo->lastInsertId();
//            $pdo = null;
//            echo json_encode($lastId);
        }else{
            $user_id = $bool['user_id'];
            $count = intval($bool['count']) + 1;
            //以前登录过哦，更新他的count和time
            $sql = "UPDATE sf_user SET time=:time,count=:count WHERE user_id={$user_id}";
            $stmt = $pdo -> prepare($sql);
            $num = $stmt -> execute([":time" => $time_out,":count" => $count]);
            $pdo = null;
            echo json_encode($bool['user_id']);
        }
    }catch (PDOException $e){
        die('error:'.$e->getMessage());
    }
}
