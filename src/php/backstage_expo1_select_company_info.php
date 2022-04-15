<?php
    include("connection.php");
    // 選取全部數量
    $sql= "select count(*) from view_company_info";
    $statement = $pdo->prepare($sql);
    $statement->execute();

    $select= $statement->fetchAll();
    
    // 選取第x頁資料(分頁)
    $select2 = json_decode(file_get_contents("php://input"), true);
    $sql2= "set @a= concat('select  ID, NAME, ONBOARD, INTRODUCE, LOGO, TYPE, ROBOT, VIDEO, COMPANY_ID, EXPO_NAME from view_company_info where COMPANY_ID like' , '\"%', :search_word, '%\"','or NAME like', '\"%', :search_word, '%\"', 'or EXPO_NAME like', '\"%', :search_word, '%\"', ' limit',' ', (:inpage-1)*:perpage, ', ', :perpage)";
    $statement2 = $pdo->prepare($sql2);
    $statement2->bindValue(":inpage", $select2["inpage"], PDO::PARAM_INT);
    $statement2->bindValue(":perpage", $select2["perpage"], PDO::PARAM_INT);
    $statement2->bindValue(":search_word", $select2["search_word"]);

    $statement2->execute();

    $sql3="prepare texts from @a";
    $statement3 = $pdo->prepare($sql3);
    $statement3->execute();
    

    $sql4="execute texts";
    $statement4 = $pdo->prepare($sql4);
    $statement4->execute();

    $select2= $statement4->fetchAll();

    if ($select != null){
        $folder['data_count']=$select;
        $folder['data']=$select2;
        echo json_encode($folder);
    };
?>