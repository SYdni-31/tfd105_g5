<?php
    include("connection.php");
    // 選取全部數量
    $sql= "select count(*) from AGENDA_TIME  where STATUS !=\"D\"";
    $statement = $pdo->prepare($sql);
    $statement->execute();

    $select= $statement->fetchAll();
    // php的欄位全部都大寫
    // 選取第x頁資料(分頁)
    // 讓php讀懂input進來的資料(轉json格式)
    $select2 = json_decode(file_get_contents("php://input"), true);
    // 只要傳值不用收值
    // concat 是變成字串，inpage是傳回來的值是第幾頁
    $sql2= "set @a= concat('select * from AGENDA_TIME where STATUS !=\"D\" and ( ID like' , '\"%', :search_word, '%\"','or START_TIME like', '\"%', :search_word, '%\"', 'or END_TIME like', '\"%', :search_word, '%\"', 'or OPEN like', '\"%', :search_word, '%\" )', ' limit',' ', (:inpage-1)*:perpage, ', ', :perpage)";
    $statement2 = $pdo->prepare($sql2);
    $statement2->bindValue(":inpage", $select2["inpage"], PDO::PARAM_INT);
    $statement2->bindValue(":perpage", $select2["perpage"], PDO::PARAM_INT);
    $statement2->bindValue(":search_word", $select2["search_word"]);
    $statement2->execute();
    // 準備把@a存進sql
    $sql3="prepare texts from @a";
    $statement3 = $pdo->prepare($sql3);
    $statement3->execute();
    
    // 執行
    $sql4="execute texts";
    $statement4 = $pdo->prepare($sql4);
    $statement4->execute();
    // 第二個資料的變數是 statement4
    $select2= $statement4->fetchAll();

    if ($select != null){
        $folder['data_count']=$select;
        $folder['data']=$select2;
        echo json_encode($folder);
    };
?>