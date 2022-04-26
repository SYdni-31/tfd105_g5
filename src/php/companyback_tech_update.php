<?php
    // 方法一透過php
    include("connection.php");
    $select = json_decode(file_get_contents("php://input"), true);

    $sql = "UPDATE TECH SET NAME=:NAME, LINK=:LINK, STATUS=:STATUS WHERE ID=:ID AND COMPANY_INFO_ID=:COMPANY_INFO_ID";
    $statement = $pdo->prepare($sql);
    //bindValue()第二個參數，可以是變數，也可以是值
    $statement->bindValue(":ID", $select['ID']);
    $statement->bindValue(":NAME", $select['NAME']);
    $statement->bindValue(":LINK",  $select['LINK']);
    $statement->bindValue(":STATUS", 'U');
    $statement->bindValue(":COMPANY_INFO_ID", $select['COMPANY_INFO_ID']);


    $statement->execute();
    $resultCount = $statement->rowCount();


    if($resultCount > 0){
        $resp["successful"] = true;
        
        }else{
        $resp["successful"] = false;
        
        }
        echo json_encode($resp);
  
?>