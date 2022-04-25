<?php
include("connection.php");
$select=json_decode(file_get_contents("php://input"), true);
$sql="
    select *
    from view_company_board
    where
        COMPANY_INFO_ID=:ID
    order by
        MSGTIME";
$statement=$pdo->prepare($sql);

$statement->bindValue(":ID", $select["id"]);
$statement->execute();
$select=$statement->fetchAll(); 

$select2=json_decode(file_get_contents("php://input"), true);
$sql2 =" 
    select distinct NAME, GUEST_ID, COMPANY_ID
    from view_company_board
    where
        COMPANY_INFO_ID=:ID and COMPANY_ID is not null and NAME like :searchword";

    $statement2=$pdo->prepare($sql2);

    $statement2->bindValue(":ID", $select2["id"]);
    $statement2->bindValue(":searchword", '%'.$select2["searchword"].'%');
    $statement2->execute();
    $select2=$statement2->fetchAll(); 

    $select3=json_decode(file_get_contents("php://input"), true);
$sql3 =" 
    select distinct NAME, GUEST_ID, COMPANY_ID
    from view_company_board
    where
        COMPANY_INFO_ID=:ID and GUEST_ID is not null and NAME like :searchword";

    $statement3=$pdo->prepare($sql3);

    $statement3->bindValue(":ID", $select3["id"]);
    $statement3->bindValue(":searchword", '%'.$select3["searchword"].'%');
    $statement3->execute();
    $select3=$statement3->fetchAll(); 

if ($select != null){
    $folder['txt']=$select;
    $folder['cname']=$select2;
    $folder['gname']=$select3;

    echo json_encode($folder);
};

?>