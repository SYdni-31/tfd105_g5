<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);
    // php的欄位全部都大寫
    $sql = "INSERT INTO AGENDA_TIME(START_TIME, END_TIME, STATUS, OPEN) VALUES (:START_TIME, :END_TIME, :STATUS, :OPEN)";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":START_TIME", $select["START_TIME"]);
    $statement->bindValue(":END_TIME", $select["END_TIME"]);
    $statement->bindValue(":STATUS", $select["STATUS"]);
    $statement->bindValue(":OPEN", $select["OPEN"] , PDO::PARAM_INT);
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>