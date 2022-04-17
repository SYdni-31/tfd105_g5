<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);

    $sql = "UPDATE AGENDA_TIME SET OPEN=:OPEN WHERE ID= :ID";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":ID", $select["ID"]);
    $statement->bindValue(":OPEN", $select["OPEN"], PDO::PARAM_INT);
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>