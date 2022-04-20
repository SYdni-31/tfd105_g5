<?php
    include("connection.php");
    $content = $_GET["content"];
    $sql = "select * from CONTACT where CONTENT like :content or COMPANY like :content";

    $statement2 = $pdo->prepare($sql);
    $statement2->bindValue(":content", '%'.$content.'%');

    $statement2->execute();

    echo json_encode($statement2->fetchAll());
?>