<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);
    //php的欄位全部都大寫
    $sql = "UPDATE AGENDA_TIME SET STATUS=:STATUS WHERE ID= :ID";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":STATUS", "D");
    $statement->bindValue(":ID", $select["ID"]);
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>