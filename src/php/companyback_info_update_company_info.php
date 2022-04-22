<?php
include("connection.php");
$select = json_decode($_POST["updated_data"], true);
//isset:是否有圖片
if(isset($_FILES["file"])){
    if($_FILES["file"]["error"]>0){
        echo "上傳失敗: 錯誤代碼".$_FILES["file"]["error"];
    }else{
         //取得上傳的檔案資訊=======================================
         $orgfilename = $_FILES["file"]["name"];    //檔案名稱含副檔名 
         $filesnamearr = explode(".",$orgfilename);
         $fileName = Time().".".$filesnamearr[1];
         $filePath_Temp = $_FILES["file"]["tmp_name"];
         $fileType = $_FILES["file"]["type"];
         $fileSize = $_FILES["file"]["size"];

         
        //Web根目錄真實路徑，動態抓取檔案要儲存的路徑
        $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
         //檔案最終存放位置
         $filePath = $ServerRoot."/tfd105/g5/img/c_back/".$fileName;

         //將暫存檔搬移到正確位置，從server上的路徑move到新的路徑
        move_uploaded_file($filePath_Temp, $filePath);

        $sql = "UPDATE COMPANY_INFO SET VIDEO=:VIDEO, LOGO=:img_data, INTRODUCE=:INTRODUCE,ROBOT=:ROBOT,TYPE=:TYPE, ONBOARD=0, MODIFY_DATE=NOW() WHERE ID=:ID";
        $statement = $pdo->prepare($sql);
        $statement->bindValue(":ID", $select["ID"]);
        $statement->bindValue(":VIDEO", $select["VIDEO"]);
        $statement->bindValue(":INTRODUCE", $select["INTRODUCE"]);
        $statement->bindValue(":ROBOT", $select["ROBOT"]);
        $statement->bindValue(":TYPE", $select["TYPE"]);
        $statement->bindValue(":img_data", "img/c_back/".$fileName);
        
    }
}else{
    $sql = "UPDATE COMPANY_INFO SET VIDEO=:VIDEO,INTRODUCE=:INTRODUCE,ROBOT=:ROBOT,TYPE=:TYPE, ONBOARD=0, MODIFY_DATE=NOW() WHERE ID=:ID";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":ID", $select["ID"]);
    $statement->bindValue(":VIDEO", $select["VIDEO"]);
    $statement->bindValue(":INTRODUCE", $select["INTRODUCE"]);
    $statement->bindValue(":ROBOT", $select["ROBOT"]);
    $statement->bindValue(":TYPE", $select["TYPE"]); 
    // print_r ($select);
    // exit();
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
