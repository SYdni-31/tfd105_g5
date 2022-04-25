<?php
    include("connection.php");
    // 選取全部數量
    // $select = json_decode(file_get_contents("php://input"), true);      // 只有變數可以修改
    $sql= "SELECT A.LINK, ifnull(A.NAME,B.NAME) AS NAME,A.COMPANY_INFO_ID,B.EMAIL,B.ID 
    FROM (
        SELECT * FROM AGENDA  
        where date = CURDATE() and HOUR(START_TIME) = HOUR(now()) and HOUR(END_TIME) >= HOUR(now()) and OPEN='1' and STATUS !='D' order by START_TIME desc limit 1) A
        LEFT join COMPANY B ON A.COMPANY_INFO_ID = B.ID";
    $statement=$pdo->prepare($sql);
    $statement->execute();
    $select=$statement->fetchAll(); 

    $sql2= "SELECT CONCAT(DATE,\" \",SUBSTR(START_TIME,1,5)) AS NEXT_TIME FROM AGENDA where CONCAT(DATE,\" \",START_TIME) >= NOW() and OPEN='1' and STATUS !='D' order by DATE,START_TIME  LIMIT 1 ";
    $statement2 = $pdo->prepare($sql2);
    $statement2->execute();
    $select2= $statement2->fetchAll();
    if ($select != null){
        $folder['data']=$select;
    };
    if ($select2 != null){
        $folder['nextData']=$select2;
    };
    echo json_encode($folder);
?>