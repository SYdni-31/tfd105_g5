<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);

    $sql = "UPDATE GUEST SET NAME=:NAME, UNIT=:UNIT, EMAIL=:EMAIL WHERE ID= :ID";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":ID", $select["ID"]);
    $statement->bindValue(":NAME", $select["NAME"]);
    $statement->bindValue(":UNIT", $select["UNIT"]);
    $statement->bindValue(":EMAIL", $select["EMAIL"]);
    // $statement->bindValue(":MODIFY_DATE", $select["MODIFY_DATE"]);
    // $statement->bindValue(":date", $date-> format( 'Y-m-d' ));
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>