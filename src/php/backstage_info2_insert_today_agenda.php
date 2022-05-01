<?php
    include("connection.php");
    // php的欄位全部都大寫
    $sql = "INSERT INTO `AGENDA` (`DATE`, `START_TIME`, `END_TIME`, `THEME`, `LINK`, `STATUS`, `NAME`, `PHOTO`, `INTRODUCE`, `APPLY_TIME`, `OPEN`, `AGENDA_TIME_ID`, `COMPANY_INFO_ID`)  SELECT CURDATE(), `START_TIME`, `END_TIME`, `THEME`, `LINK`, `STATUS`, `NAME`, `PHOTO`, `INTRODUCE`, `APPLY_TIME`, `OPEN`, `AGENDA_TIME_ID`, `COMPANY_INFO_ID` FROM AGENDA WHERE DATE='2022-04-11';";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>