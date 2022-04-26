<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);
    // php的欄位全部都大寫
    $sql = "INSERT INTO TECH (NAME, LINK, STATUS, COMPANY_INFO_ID) VALUES (:NAME, :LINK, :STATUS, :COMPANY_INFO_ID)";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":NAME", $select["NAME"]);
    $statement->bindValue(":LINK", $select["LINK"]);
    $statement->bindValue(":STATUS", "I");
    $statement->bindValue(":COMPANY_INFO_ID", $select["ID"]);
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>