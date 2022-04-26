<?php
    include("connection.php");
    //PHP接收 JSON POST
    $select = json_decode(file_get_contents("php://input"), true);

    // 選取全部數量
    $sql="select ID, NAME, LINK from TECH where STATUS != 'D' and COMPANY_INFO_ID=:id";  
    $statement=$pdo->prepare($sql);
    $statement->bindValue(":id", $select["company_info_id"]);
    $statement->execute();
    $select=$statement->fetchAll(); 

    if ($select != null){

    }else{
        $select['fff'] = true;

    };
    echo json_encode($select);
?>