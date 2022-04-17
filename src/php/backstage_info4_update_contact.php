<?php
include("connection.php");
$select = json_decode(file_get_contents("php://input"), true);

$sql = "UPDATE CONTACT SET REPLY_CNT=:REPLY_CNT,STATUS=:STATUS WHERE ID= :ID";
$statement = $pdo->prepare($sql);
$statement->bindValue(":REPLY_CNT",$select["REPLY_CNT"]);
$statement->bindValue(":STATUS",$select["STATUS"],PDO::PARAM_INT);
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