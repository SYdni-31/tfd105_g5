<?php
    include("connection.php");
    // 選取全部數量
    $select = json_decode(file_get_contents("php://input"), true);
    $sql= "select * from view_company_info where ID=:ID";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":ID", $select["id"]);
    $statement->execute();
    $select= $statement->fetchAll();

    $select3 = json_decode(file_get_contents("php://input"), true);
    $sql3= "select CI.ID CI_ID, T.* from view_company_info CI join TECH T on  CI.ID=T.COMPANY_INFO_ID where COMPANY_INFO_ID=:ID and STATUS !='D';";
    $statement3 = $pdo->prepare($sql3);
    $statement3->bindValue(":ID", $select3["id"]);
    $statement3->execute();

    $select3= $statement3->fetchAll();

    if ($select != null){
        $folder['rooms']=$select;
        $folder['tech']=$select3;
        echo json_encode($folder);
    };
?>