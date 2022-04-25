<?php
include("connection.php");
$select = json_decode(file_get_contents("php://input"), true);      // 只有變數可以修改

$sql = "select CONCAT(substring(START_TIME,1,5),'~',substring( END_TIME,1,5)) as time , t.ID from AGENDA_TIME t where status !='D' and open = '1' and not exists(
    select * from AGENDA a where open = '1' and DATE = :DATE and t.ID=a.AGENDA_TIME_ID);";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":DATE",$select["DATE"]);
$statement->execute();
$time = $statement->fetchAll();
if($time>0){
    echo json_encode($time);
}else{
    echo"失敗";
}
?>