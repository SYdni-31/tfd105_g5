<?php 
include('connection.php');
$username = $_POST['username'];
$email = $_POST['email'];
$mobile = $_POST['mobile'];
$city = $_POST['city'];

// $id = $_POST['id'];
$date = $_POST['date'];
// $START_TIME = $_POST['start_time'];
// $END_TIME = $_POST['end_time'];
$THEME = $_POST['theme'];
$STATUS = $_POST['status'];
$LINK = $_POST['link'];
$NAME = $_POST['name'];
$PHOTO = $_POST['photo'];
$INTRODUCE = $_POST['introduce'];

$sql = "INSERT INTO AGENDA (DATE,THEME,STATUS,LINK,NAME,PHOTO,INTRODUCE) values ('$date', '$THEME', '$STATUS', '$LINK', '$NAME', '$PHOTO', '$INTRODUCE' )";
echo $sql;
$statement = $pdo->prepare($sql);
$statement->execute();
$resultCount = $statement->rowCount();
    
if($resultCount > 0){
   $respBody["successful"] = true;
   
}else{
   $respBody["successful"] = false;
   
}

echo json_encode($respBody);

?>