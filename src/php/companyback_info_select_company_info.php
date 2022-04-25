<?php
include("connection.php");
$select = json_decode(file_get_contents("php://input"), true);
$sql = "SELECT * FROM view_company_info where COMPANY_ID = :ID";
$statement = $pdo->prepare($sql); 
$statement->bindValue(":ID",$select["ID"]);
$statement->execute();
$select = $statement->fetchAll();
if($select != null){
    echo json_encode($select);
}
?>