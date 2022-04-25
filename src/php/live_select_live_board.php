<?php
    include("connection.php");
    // 選取全部數量
    // $select = json_decode(file_get_contents("php://input"), true);      // 只有變數可以修改
    $sql= "SELECT  NAME ,CONTENT FROM view_live_board where AGENDA_ID = (SELECT ID FROM AGENDA where date = CURDATE() and STATUS !='D' and HOUR(START_TIME) = HOUR(now()) and HOUR(END_TIME)>= HOUR(now()) order by ID desc limit 1) ";
    $statement=$pdo->prepare($sql);
    $statement->execute();
    $select=$statement->fetchAll(); 

    if ($select != null){
        $folder['data']=$select;
        echo json_encode($folder);
    }else{
        echo ("false");
    };
?>