<?php
    include("connection.php");
    // 選取全部數量
    $select = json_decode(file_get_contents("php://input"), true); 
    $sql="select * from agenda where DATE = :today
    union
    select '999',CURDATE(),'12:00:00','13:00:00','午休','','I','','','','','','',''
    order by START_TIME";
    $statement=$pdo->prepare($sql);
    $statement->bindValue(":today", $select["Today"]);
    $statement->execute();
    $select=$statement->fetchAll(); 
    //PHP接收 JSON POST

    if ($select != null){
        echo json_encode($select);
    };
?>