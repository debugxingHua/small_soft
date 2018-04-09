<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/8
 * Time: 17:05
 */
class User{
    /**
     *  调用接口
     * @param $appId
     * @param $code
     * @return mixed
     */
    public function getUserSessionKeyAndOpenId($appId,$appSecret,$code){
        //调接口：https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
        $url = 'https://api.weixin.qq.com/sns/jscode2session';
        $sl_data=array(
            'appid'=>$appId,
            'secret'=>$appSecret,
            'js_code'=>$code,
            'grant_type'=>'authorization_code'
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);//要访问的地址
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);//执行结果是否被返回，0是返回，1是不返回
        curl_setopt($ch, CURLOPT_POST, 1);// 发送一个常规的POST请求
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($sl_data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        $output = curl_exec($ch);//执行并获取数据
        curl_close($ch);
        return json_decode($output);
    }

    /**
     *  deCodeData,解密数据喽
     * @param $appId
     * @param $session_key
     * @param $encryptedData
     * @param $iv
     * @return int|mixed
     */
    public function deCodeData($appId,$session_key,$encryptedData,$iv){
        include_once "wxBizDataCrypt.php";
        $pc = new WXBizDataCrypt($appId,$session_key);
        $errCode = $pc->decryptData($encryptedData, $iv, $data);
        if ($errCode == 0) {
            //解密了
            return array(
                'status' =>0,
                'data' => json_decode($data)
            );
        } else {
            return array(
                'status' =>1,
                'data' => $errCode
            );
        }
    }
}