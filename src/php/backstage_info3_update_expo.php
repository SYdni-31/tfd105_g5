<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);//讓php可以讀 input進來資料 PHP接受JSON POST

    $sql = "UPDATE NEWS SET TITLE=:TITLE, CONTENT=:CONTENT, PHOTO=:PHOTO, LINK=:LINK, TIME=:TIME, STATUS=:STATUS WHERE ID= :ID";//根據前面ID
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":ID", $select["ID"]); //第一 對到上面$sql的  第二是傳回來的值
    $statement->bindValue(":TITLE", $select["TITLE"]);
    $statement->bindValue(":CONTENT", $select["CONTENT"]);
    $statement->bindValue(":PHOTO", $select["PHOTO"]);
    $statement->bindValue(":LINK", $select["LINK"]);
    $statement->bindValue(":TIME", $select["TIME"]);
    $statement->bindValue(":STATUS", $select["STATUS"]);
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>