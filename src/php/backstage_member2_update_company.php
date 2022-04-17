<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);

    $sql = "UPDATE COMPANY SET NAME=:NAME, LASTNAME=:LASTNAME, EMAIL=:EMAIL, OPEN=:OPEN  WHERE ID= :ID ";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":NAME", $select["NAME"]);
    $statement->bindValue(":LASTNAME", $select["LASTNAME"]);
    $statement->bindValue(":EMAIL", $select["EMAIL"]);
    $statement->bindValue(":OPEN", $select["OPEN"], PDO::PARAM_INT);
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