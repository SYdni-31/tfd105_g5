<?php
    include("connection.php");
    //等號後方複製就好 變數自己訂
    $select = json_decode(file_get_contents("php://input"), true);
    //準備要把@a存進mysql內
    $sql = "DELETE FROM CONTACT WHERE ID= :ID";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":ID", $select["ID"]);
    $statement->execute();
    $resultCount = $statement->rowCount(); //php內建計算(新增,刪除,修改)數量
    if($resultCount > 0){
        $resp["successful"] = true;
        
        }else{
        $resp["successful"] = false;
        
        }
        //丟到js的fetch
        echo json_encode($resp);
?>