<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);

    $sql = "UPDATE EXPO SET NAME=:NAME, START_TIME=:START_TIME, END_TIME=:END_TIME, OPEN=:OPEN, INTRODUCE=:INTRODUCE WHERE ID= :ID";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":ID", $select["ID"]);
    $statement->bindValue(":NAME", $select["NAME"]);
    $statement->bindValue(":START_TIME", $select["START_TIME"]);
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