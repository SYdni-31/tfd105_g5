<?php
    include("connection.php");
    // 選取全部數量
    // $select = json_decode(file_get_contents("php://input"), true);      // 只有變數可以修改
    $sql= "SELECT  NAME ,CONTENT FROM view_live_board where AGENDA_ID = (SELECT ID FROM TFD105_G5.AGENDA where date = CURDATE() and HOUR(START_TIME) <= HOUR(now()) and HOUR(END_TIME)>= HOUR(now())) ";
    $statement=$pdo->prepare($sql);
    $statement->execute();
    $select=$statement->fetchAll(); 

    if ($select != null){
        $folder['data']=$select;
        echo json_encode($folder);
    };
?>