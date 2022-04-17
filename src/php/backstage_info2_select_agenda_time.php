<?php
    include("connection.php");
    // 選取全部數量
    $sql= "select * from AGENDA_TIME where OPEN =0 and STATUS != 'D'";
    $statement = $pdo->prepare($sql);
    $statement->execute();

    $select= $statement->fetchAll();

    if ($select != null){
        echo json_encode($select);
    };
?>