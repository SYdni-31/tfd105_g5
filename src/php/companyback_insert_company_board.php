<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);

    $sql = "INSERT INTO COMPANY_BOARD(C_MSG, C_MSGTIME, OPEN, COMPANY_INFO_ID, GUEST_ID, COMPANY_ID) VALUES (:MESSAGE, NOW(), 1, :ID, :GUEST, :COMPANY)";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":GUEST", $select["guest"]);
    $statement->bindValue(":COMPANY", $select["company"]);
    $statement->bindValue(":MESSAGE", $select["message"]);
    $statement->bindValue(":ID", $select["BOARD_ID"]);
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>