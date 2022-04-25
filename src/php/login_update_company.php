<?php

    include("connection.php");    
    $select = json_decode(file_get_contents("php://input"), true);

    //更新廠商的密碼
    $sql = "UPDATE COMPANY set PASSWORD=:PASSWORD WHERE EMAIL = :EMAIL ";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":PASSWORD",$select['PASSWORD']);
    $statement->bindValue(":EMAIL",$select['EMAIL']);
    $statement->execute();
    //更新幾筆資料
    $resultCount = $statement->rowCount();
    if($resultCount > 0){
        $resp['successful'] = true;
    }else{
        $resp['successful'] = false;
    }

    echo json_encode($resp);
    
?>