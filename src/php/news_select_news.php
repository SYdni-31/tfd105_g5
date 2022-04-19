<?php
    include("connection.php");
    // 選取全部數量
    $sql="select * from NEWS where STATUS != "D" and OPEN = 1 order by TIME";
    $statement=$pdo->prepare($sql);
    $statement->execute();
    $select=$statement->fetchAll(); 
    //PHP接收 JSON POST

    if ($select != null){
        echo json_encode($select);
    };
?>