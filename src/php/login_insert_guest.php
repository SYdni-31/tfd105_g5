<?php

    include("connection.php");    
    $select = json_decode(file_get_contents("php://input"), true);
    
    //搜尋訪客資料
    $sql = "SELECT * FROM GUEST WHERE NAME = :NAME and EMAIL =:EMAIL order by LOGINTIME desc limit 1 ";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":NAME",$select["NAME"]);
    $statement->bindValue(":EMAIL",$select["EMAIL"]);
    $statement->execute();
    
    // 抓一筆資料，有的話代表已經登入過，要直接登入不新增
    $guest = $statement->fetch();
    //直接登入不新增，更新登入時間
    if($guest > 0){
        $sql5 = "UPDATE GUEST set LOGINTIME=:LOGINTIME WHERE NAME = :NAME and EMAIL =:EMAIL ";
        $statement5 = $pdo->prepare($sql5);
        $statement5->bindValue(":LOGINTIME",date('Y/m/d H:i:s'));
        $statement5->bindValue(":NAME",$select['NAME']);
        $statement5->bindValue(":EMAIL",$select['EMAIL']);
        $statement5->execute();
        // 更新筆數
        $resultCount5 = $statement5->rowCount();
        if($resultCount5 > 0){
            $guest['successful'] = true;
        }else{
            $guest['successful'] = false;
        }
        echo json_encode($guest);
    //要新增訪客資料
    }else{
        // 搜尋現在進行中的展覽ID
        $sql2 = " SELECT ID FROM EXPO WHERE OPEN='進行中' ";
        $statement2 = $pdo->prepare($sql2);
        $expo_id = $statement2->execute();
        // 新增訪客資料
        $sql3 = " INSERT INTO GUEST (NAME, UNIT, EMAIL, LOGINTIME, EXPO_ID) VALUES (:NAME, :UNIT, :EMAIL, :LOGINTIME, $expo_id) ";
        $statement3 = $pdo->prepare($sql3);
        $statement3->bindValue(":NAME",$select["NAME"]);
        $statement3->bindValue(":UNIT",$select["UNIT"]);
        $statement3->bindValue(":EMAIL",$select["EMAIL"]);
        $statement3->bindValue(":LOGINTIME", date('Y/m/d H:i:s'));
        $statement3->execute();
        $resultCount = $statement3->rowCount();
        // 新增成功
        if($resultCount > 0){
            // 搜尋剛剛建立的訪客資料
            $sql4 = "SELECT * FROM GUEST WHERE NAME = :NAME and EMAIL = :EMAIL order by LOGINTIME desc limit 1 ";
            $statement4 = $pdo->prepare($sql4);
            $statement4->bindValue(":NAME",$select["NAME"]);
            $statement4->bindValue(":EMAIL",$select["EMAIL"]);
            $statement4->execute();
            $guest_new = $statement4->fetch();
            $guest_new["successful"] = true;
            echo json_encode($guest_new);
        
        }else{
            $guest_new["successful"] = false;
        
        }
    }
    
?>