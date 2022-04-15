<?php
    include("connection.php");
    // 選取全部數量
    $sql= "select count(*) from EXPO";
    $statement = $pdo->prepare($sql);
    $statement->execute();

    $select= $statement->fetchAll();
    
    // 選取第x頁資料(分頁)
    //等號後方複製就好 變數自己訂
    $select2 = json_decode(file_get_contents("php://input"), true);
    //準備要把@a存進mysql內
    $sql2= "set @a= concat('select * from EXPO limit',' ', (:inpage-1)*:perpage, ', ', :perpage)";
    $statement2 = $pdo->prepare($sql2);
    $statement2->bindValue(":inpage", $select2["inpage"], PDO::PARAM_INT);
    $statement2->bindValue(":perpage", $select2["perpage"], PDO::PARAM_INT);
    $statement2->execute();
    //準備寫進mysql
    $sql3="prepare texts from @a";
    $statement3 = $pdo->prepare($sql3);
    $statement3->execute();
    
    //執行字串
    $sql4="execute texts";
    $statement4 = $pdo->prepare($sql4);
    $statement4->execute();

    $select2= $statement4->fetchAll();
    //如果select內有東西就執行以下東西
    if ($select != null){
        $folder['data_count']=$select;
        $folder['data']=$select2;
        echo json_encode($folder);
    };
?>