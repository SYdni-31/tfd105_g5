<?php

    include("connection.php");    
    $select = json_decode(file_get_contents("php://input"), true);

    //搜尋廠商的名稱
    $sql = "SELECT a.LASTNAME FROM COMPANY a WHERE a.STATUS != 'D' and a.EMAIL = :EMAIL order by LOGINTIME limit 1";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":EMAIL",$select['EMAIL']);
    $statement->execute();
    // 抓一筆資料
    $company = $statement->fetch();
    if($company > 0){
        $company['successful'] = true;
        echo json_encode($company);
    }else{
        $company['successful'] = false;
        echo json_encode($company);
    }
?>