<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);
    print_r($select);
    // exit();
    //php的欄位全部都大寫
    $sql = "UPDATE AGENDA_TIME SET START_TIME=:START_TIME, END_TIME=:END_TIME, STATUS=:STATUS , OPEN=:OPEN WHERE ID= :ID";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":ID", $select["ID"]);
    $statement->bindValue(":START_TIME", $select["START_TIME"]);
    $statement->bindValue(":END_TIME", $select["END_TIME"]);
    $statement->bindValue(":STATUS", "U");
    $statement->bindValue(":OPEN", $select["OPEN"] , PDO::PARAM_INT);
    $statement->execute();
    $resultCount = $statement->rowCount();
    print_r($resultCount);
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;

    
    }

    echo json_encode($resp);
?>