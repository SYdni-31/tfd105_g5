<?php
    include("connection.php");
    $sql= "select * from EXPO";
    $statement = $pdo->prepare($sql);
    $statement->execute();

    $select= $statement->fetchAll();
    if ($select != null){
        echo json_encode($select);
    };
?>