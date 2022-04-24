<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);
    // php的欄位全部都大寫
    $sql = "INSERT INTO LIVE_BOARD(CONTENT, STATUS, COMPANY_ID, GUEST_ID, AGENDA_ID) VALUES (:CONTENT, :STATUS, :COMPANY_ID, :GUEST_ID, (SELECT ID FROM AGENDA where date = CURDATE() and HOUR(START_TIME) = HOUR(now()) and HOUR(END_TIME)>= HOUR(now())))";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":CONTENT", $select["CONTENT"]);
    $statement->bindValue(":STATUS", $select["STATUS"]);
    $statement->bindValue(":COMPANY_ID", $select["COMPANY_ID"]);
    $statement->bindValue(":GUEST_ID", $select["GUEST_ID"]);
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>