<?php
require_once 'User.php';
require_once 'new_PDO.php';

$user_object = new User();
$appId = 'wxc9713edb30ef6b8e';//小程序id
$appSecret = '6e527a0caaf498291536700914da47c1';//秘钥
$date = date('Y/m/d h:i:s');

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
        //用openid查询唯一后，不存在就啥也不做
        if(!$bool){
//            $time_out = time()+259100;//过期时间
//            $sql = "INSERT sf_user (open_id,date,time) VALUES ('{$open_id}','{$date}','{$time_out}') ";
//            $num = $pdo->exec($sql);
//            $lastId = $pdo->lastInsertId();
//            $pdo = null;
            echo json_encode('not_at');
        }else{
//          存在就校验time，time到期，就让前台的storage为空；
            $user_id = $bool['user_id'];
            $time_out = intval($bool['time']);
            $time = time();
            //if过期时间比现在时间小，说明过期了。
            if($time_out < $time){
                echo json_encode('time_out');
            }else{
                echo json_encode('time_again');
            }
        }
    }catch (PDOException $e){
        die('error:'.$e->getMessage());
    }
}
