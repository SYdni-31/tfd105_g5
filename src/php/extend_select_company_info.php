<?php
    include("connection.php");
    // 選取全部數量
    $sql= "select * from view_company_info where ONBOARD=1";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $select= $statement->fetchAll();


    $sql2= "select CI.ID CI_ID, A.* from view_company_info CI join AGENDA A on CI.ID=A.COMPANY_INFO_ID where CI.ONBOARD=1;";
    $statement2 = $pdo->prepare($sql2);
    $statement2->execute();
    $select2= $statement2->fetchAll();


    $sql3= "select CI.ID CI_ID, T.* from view_company_info CI join TECH T on  CI.ID=T.COMPANY_INFO_ID where ONBOARD=1;";
    $statement3 = $pdo->prepare($sql3);
    $statement3->execute();

    $select3= $statement3->fetchAll();

    $select4 = json_decode(file_get_contents("php://input"), true);
    $sql4= "SELECT * FROM view_company_board where (GUEST_ID = :GUEST or COMPANY_ID = :COMPANY);";
    $statement4 = $pdo->prepare($sql4);
    $statement4->bindValue(":GUEST", $select4["guest"]);
    $statement4->bindValue(":COMPANY", $select4["company"]);
    $statement4->execute();

    $select4= $statement4->fetchAll();

    if ($select != null){
        $folder['rooms']=$select;
        $folder['live']=$select2;
        $folder['tech']=$select3;
        $folder['board']=$select4;
        echo json_encode($folder);
    };
?>