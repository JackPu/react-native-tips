<?php
    // for fetch test 
    $arr = array();
    $arr[] = array(
        "name" => 'Mermaid 3D',
        "box" => '$552,198,479',
        "role" => 'Director',
        "src" => 'http://img1.vued.vanthink.cn/vueda062af23e30cb6c783ac196b351b7cd0.jpeg',
    );
    $arr[] = array(
        "name" => 'Xi you xiang mo pian',
        "box" => '$207,927,982',
        "role" => 'Director',
        "src" => "http://img1.vued.vanthink.cn/vued1e3b845ae8ebd6b81f12ebc69a625471.jpeg",
    );
    $arr[] = array(
        "name" => 'Kung Fu Hustle',
        "box" => '$102,034,104',
        "role" => 'Director/Actor',
        "src" => "http://img1.vued.vanthink.cn/vued71b205dde2efaa97a4d31a90cd336b3b.jpeg",
    );
    $arr[] = array(
        "name" => 'CJ7',
        "box" => '$102,034,104',
        "role" => 'Director/Actor',
        "src" => "http://img1.vued.vanthink.cn/vuedbff3a5e40bbdfae0bdeb6d030ef6ec50.jpeg"
    );
    $arr[] = array(
        "name" => 'Shaolin Soccer',
        "box" => '$42,776,032',
        "role" => 'Director/Actor',
        "src" => "http://img1.vued.vanthink.cn/vuedd4f383353248019306d41c487c5d56f5.jpeg",
    );

    header("content-type:text/json");
    echo json_encode(array("errcode" => 0 ,"data" => $arr));

?>

