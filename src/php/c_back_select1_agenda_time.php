<?php
include("connection.php");
$sql = "select DATE, COUNT(*) from AGENDA where open = '1' and status !='D' and THEME = '技術分享' group by DATE having COUNT(*) >= (select COUNT(*) from AGENDA_TIME where OPEN ='1')";

$statement = $pdo->prepare($sql);
$statement->execute();
$date = $statement->fetchAll();
if($date>0){
    // $date["successful"] = true;
    echo json_encode($date);
}else{
    //$data["successful"] = false; 物件陣列表達試 加個suceessful到物件內
    // $data["successful"] = false;
}
?>