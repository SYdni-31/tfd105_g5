<?php
    include("connection.php");
    $select = json_decode($_POST["datas"], true);
    // $select = json_decode(file_get_contents("php://input"), true);

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
    
            //顯示檔案資訊
            // echo "檔案存放位置：".$filePath;
            // echo "<br/>";
            // echo "類型：".$fileType;
            // echo "<br/>";
            // echo "大小：".$fileSize;
            // echo "<br/>";
            // echo "副檔名：".getExtensionName($filePath);
            // echo "<br/>";
            // echo "<img src='/FileUpload/".$fileName."'/>";
        }
    
        //取得檔案副檔名
        // function getExtensionName($filePath){
        //     $path_parts = pathinfo($filePath);
        //     return $path_parts["extension"];
        // }
    
    

    $sql = "INSERT INTO NEWS(TITLE, CONTENT, PHOTO, LINK, TIME,STATUS,OPEN ) VALUES (:TITLE, :CONTENT, :fileName, :LINK, :TIME, :STATUS,:OPEN)";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":TITLE", $select["TITLE"]);
    $statement->bindValue(":CONTENT", $select["CONTENT"]);  //欄位皆大寫
    $statement->bindValue(":fileName", "speaker_img/".$fileName);
    $statement->bindValue(":LINK", $select["LINK"]);
    $statement->bindValue(":TIME", $select["TIME"]);
    $statement->bindValue(":STATUS", $select["STATUS"]);
    $statement->bindValue(":OPEN", $select["OPEN"] , PDO::PARAM_INT);
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if($resultCount > 0){
    $resp["successful"] = true;
    
    }else{
    $resp["successful"] = false;
    
    }

    echo json_encode($resp);
?>