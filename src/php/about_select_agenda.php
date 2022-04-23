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

    $sql2="select LOGO from view_company_info;";
    $statement2 = $pdo->prepare($sql2);
    $statement2->execute();
    $select2= $statement2->fetchAll();


    if ($select != null){
        $folder['agenda']=$select;
        $folder['carousel']=$select2;
        echo json_encode($folder);
    };
?>