<?php
    include("connection.php");
    $select = json_decode($_POST["datas"], true);
    
    // print_r($select);
    // exit();

if(isset($_FILES["file"])){ //函数檢測變量是否有變動
    //判斷是否上傳成功
    if($_FILES["file"]["error"] > 0){
        echo "上傳失敗: 錯誤代碼".$_FILES["file"]["error"];
    }else{
        //取得上傳的檔案資訊=======================================
        $oldfileName = $_FILES["file"]["name"];    //檔案名稱含副檔名 
        $fileNameArr= explode(".",$oldfileName);
        $fileName= Time(). ".".  $fileNameArr[1];
        $filePath_Temp = $_FILES["file"]["tmp_name"];   //Server上的暫存檔路徑含檔名        
        $fileType = $_FILES["file"]["type"];    //檔案種類        
        $fileSize = $_FILES["file"]["size"];    //檔案尺寸
        //=======================================================

        //Web根目錄真實路徑，動態抓取檔案要儲存的路徑
        $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
        
        //檔案最終存放位置
        $filePath = $ServerRoot."/speaker_img/".$fileName;
  
        //將暫存檔搬移到正確位置，從server上的路徑move到新的路徑
        move_uploaded_file($filePath_Temp, $filePath);

        $sql = "UPDATE NEWS SET TITLE=:TITLE, CONTENT=:CONTENT, LINK=:LINK, TIME=:TIME, PHOTO=:fileName, OPEN=:OPEN, STATUS=:STATUS WHERE ID= :ID";
        $statement = $pdo->prepare($sql);
        $statement->bindValue(":TIME", $select["TIME"]);
        $statement->bindValue(":CONTENT", $select["CONTENT"]);
        $statement->bindValue(":LINK", $select["LINK"]);
        $statement->bindValue(":TITLE", $select["TITLE"]);
        $statement->bindValue(":STATUS","U");
        $statement->bindValue(":fileName", "img/news/".$fileName);
        $statement->bindValue(":OPEN", $select["OPEN"], PDO::PARAM_INT);
        $statement->bindValue(":ID", $select["ID"]);

        
    }
}else{

    $sql = "UPDATE NEWS SET TITLE=:TITLE, CONTENT=:CONTENT, LINK=:LINK, TIME=:TIME, OPEN=:OPEN, STATUS=:STATUS WHERE ID= :ID";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":TIME", $select["TIME"]);
    $statement->bindValue(":CONTENT", $select["CONTENT"]);
    $statement->bindValue(":LINK", $select["LINK"]);
    $statement->bindValue(":TITLE", $select["TITLE"]);
    $statement->bindValue(":STATUS","U");
    $statement->bindValue(":OPEN", $select["OPEN"],PDO::PARAM_INT);
    $statement->bindValue(":ID", $select["ID"]);
}

   
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>