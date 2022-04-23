<?php
    // 方法一透過php
    include("connection.php");
    $select2 = json_decode(file_get_contents("php://input"), true);

    $sql2 = "UPDATE TECH SET STATUS=:STATUS WHERE ID=:ID";
    $statement2 = $pdo->prepare($sql2);
    $statement2->bindValue(":ID", $select2['ID']);
    $statement2->bindValue(":STATUS", "D");

    $statement2->execute();
    $resultCount2 = $statement2->rowCount();
    

    if($resultCount2 > 0){
        $resp["successful2"] = true;
        
    }else{
        $resp["successful2"] = false;
        
    }
    echo json_encode($resp);
?>