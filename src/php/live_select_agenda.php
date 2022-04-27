<?php
    include("connection.php");
    
    // $select = json_decode(file_get_contents("php://input"), true);      // 只有變數可以修改
    // 查詢現在的直播資訊
    $sql= "SELECT A.LINK, ifnull(A.NAME,D.NAME) AS NAME,A.COMPANY_INFO_ID,D.EMAIL,D.ID 
    FROM (
        SELECT * FROM AGENDA  
        where date = CURDATE() and HOUR(START_TIME) = HOUR(now()) and HOUR(END_TIME) >= HOUR(now()) and ( open='1' or open is null ) and STATUS !='D' order by START_TIME desc limit 1) A
       join (
        select b.* from COMPANY_INFO a join COMPANY b on  a.COMPANY_ID = b.ID ) D
        limit 1";
    $statement=$pdo->prepare($sql);
    $statement->execute();
    $select=$statement->fetchAll(); 
    
    // 下一次直播時間
    $sql2= "SELECT CONCAT(DATE,\" \",SUBSTR(START_TIME,1,5)) AS NEXT_TIME FROM AGENDA where CONCAT(DATE,\" \",START_TIME) >= NOW() and ( open='1' or open is null ) and STATUS !='D' order by DATE,START_TIME  LIMIT 1 ";
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