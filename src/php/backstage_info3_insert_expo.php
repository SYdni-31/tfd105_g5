<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);

    $sql = "INSERT INTO EXPO(NAME, START_TIME, END_TIME, OPEN, INTRODUCE) VALUES (:NAME, :START_TIME, :END_TIME, :OPEN, :INTRODUCE)";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":NAME", $select["NAME"]);
    $statement->bindValue(":START_TIME", $select["START_TIME"]);  //欄位皆大寫
    $statement->bindValue(":END_TIME", $select["END_TIME"]);
    $statement->bindValue(":OPEN", $select["OPEN"]);
    $statement->bindValue(":INTRODUCE", $select["INTRODUCE"]);
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>