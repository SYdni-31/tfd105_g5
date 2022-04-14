<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);

    $sql = "UPDATE COMPANY_INFO SET ONBOARD=:ONBOARD WHERE ID= :ID";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":ID", $select["ID"]);
    $statement->bindValue(":ONBOARD", $select["ONBOARD"], PDO::PARAM_INT);
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>