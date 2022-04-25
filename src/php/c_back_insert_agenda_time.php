<?php
include("connection.php");
$select = json_decode(file_get_contents("php://input"), true);
$sql = "INSERT INTO AGENDA (DATE,THEME,LINK,STATUS,APPLY_TIME,OPEN,START_TIME, END_TIME,AGENDA_TIME_ID,COMPANY_INFO_ID)
select :DATE ,'技術分享',:LINK,'I',NOW(),b'0',START_TIME,END_TIME,ID,:INFO_ID from AGENDA_TIME where ID = :ID";
$statement = $pdo->prepare($sql);
$statement->bindValue(":DATE",$select["DATE"]);
$statement->bindValue(":LINK",$select["LINK"]);
$statement->bindValue(":ID",$select["ID"]);
$statement->bindValue(":INFO_ID",$select["INFO_ID"]);
$statement->execute();
$result=$statement->rowcount();
if($result>0){
    $resp["successful"] = true;
}else{
    $resp["successful"] = false;
}
echo json_encode($resp);
?>