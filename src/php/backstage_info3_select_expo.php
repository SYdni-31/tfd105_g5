<?php
    include("connection.php");
    // 選取全部數量
    $sql= "select count(*) from NEWS  where STATUS !=\"D\" ";//狀態不等於d的都可以出來 
    $statement = $pdo->prepare($sql);
    $statement->execute();

    $select= $statement->fetchAll();
    
    // 選取第x頁資料(分頁)  // json_decode — 對 JSON 格式的字符串進行編碼//file_get_contents() 函數把整個文件讀入一個字符串中。
    $select2 = json_decode(file_get_contents("php://input"), true);//變數可以訂 不用改這是 讓php可以讀 input進來資料 PHP接受JSON POST

    $sql2= "set @a= concat('select * from NEWS where STATUS !=\"D\"  limit',' ', (:inpage-1)*:perpage, ', ', :perpage)";//字串串接 計算 改select * from EXPO
    $statement2 = $pdo->prepare($sql2);
    $statement2->bindValue(":inpage", $select2["inpage"], PDO::PARAM_INT); //大寫
    $statement2->bindValue(":perpage", $select2["perpage"], PDO::PARAM_INT);
    $statement2->execute();
    //準備把@a存進sql
    $sql3="prepare texts from @a"; //準備好concat要放 寫進sql
    $statement3 = $pdo->prepare($sql3);
    $statement3->execute();
    
    //執行
    $sql4="execute texts";
    $statement4 = $pdo->prepare($sql4);
    $statement4->execute();
    

    $select2= $statement4->fetchAll(); //statement4 fetchall後放入select2裡(?)

    if ($select != null){
        $folder['data_count']=$select; //$folder 自己取的變數
        $folder['data']=$select2;
        echo json_encode($folder);
    };
?>