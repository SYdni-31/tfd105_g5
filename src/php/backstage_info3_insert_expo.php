<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);

    $sql = "INSERT INTO NEWS(TITLE, CONTENT, PHOTO, LINK, TIME,STATUS ) VALUES (:TITLE, :CONTENT, :PHOTO, :LINK, :TIME, :STATUS)";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":TITLE", $select["TITLE"]);
    $statement->bindValue(":CONTENT", $select["CONTENT"]);  //欄位皆大寫
    $statement->bindValue(":PHOTO", $select["PHOTO"]);
    $statement->bindValue(":LINK", $select["LINK"]);
    $statement->bindValue(":TIME", $select["TIME"]);
    $statement->bindValue(":STATUS", "I");
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>