<?php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);

    $sql = "DELETE FROM EXPO WHERE ID= :ID";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":ID", $select["ID"]);
    $statement->execute();
    $resultCount = $statement->rowCount(); //php內建計算刪除數量
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>