<?php
    include("connection.php");
    //會議
    $select = json_decode(file_get_contents("php://input"), true); 
    // $sql="select * from agenda where DATE = CURDATE()
    // union
    // select '999',CURDATE(),'12:00:00','13:00:00','午休','','I','','','','','','',''
    // order by START_TIME";
  
    $sql="select * from AGENDA where DATE = :TODAY
    union
    select '999',CURDATE(),'12:00:00','13:00:00','午休','','I','','','','','','',''
    order by START_TIME";
    $statement=$pdo->prepare($sql);
    $statement->bindValue(":TODAY", $select["TODAY"]);
    $statement->execute();
    $select=$statement->fetchAll(); 
    //PHP接收 JSON POST

    //輪播照片
    $sql2="select LOGO from view_company_info;";
    $statement2 = $pdo->prepare($sql2);
    $statement2->execute();
    $select2= $statement2->fetchAll();


    //slogan 日期活動
    $sql3="select NAME,START_TIME,END_TIME,INTRODUCE from EXPO where OPEN ='進行中';";
    $statement3 = $pdo->prepare($sql3);
    $statement3->execute();
    $select3= $statement3->fetchAll();


    if ($select != null){
        $folder['agenda']=$select;
        $folder['carousel']=$select2;
        $folder['expo']=$select3;
        echo json_encode($folder);
    };
?>