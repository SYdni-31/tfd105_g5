<?php
    // 方法一透過php
    include("connection.php");
    //html input的name
    $name = $_POST["contect_name"];  
    $mail = $_POST["contect_mail"];
    $phone = $_POST["contect_phone"];
    $company= $_POST["contect_company"];
    $type=$_POST["contect_type"];
    $content = $_POST["contect_content"];
    // INSERT INTO `TFD105_G5`.`CONTACT` (`NAME`, `EMAIL`, `PHONE`, `COMPANY`, `STATUS`, `TIME`) VALUES ('哭哭', 'a1234@gmail.com', '0289091445', '饅頭', b'0', '2022-01-01 16:40:00');
    $sql = "INSERT INTO CONTACT(NAME, EMAIL, PHONE, COMPANY, TYPE, CONTENT, STATUS, TIME) VALUES (:NAME, :EMAIL, :PHONE, :COMPANY, :TYPE, :CONTENT,:STATUS, NOW())";
    $statement = $pdo->prepare($sql);
    //bindValue()第二個參數，可以是變數，也可以是值
    $statement->bindValue(":NAME", $name);
    $statement->bindValue(":EMAIL",  $mail);
    $statement->bindValue(":PHONE", $phone);
    $statement->bindValue(":COMPANY",  $company);
    $statement->bindValue(":TYPE", $type);
    $statement->bindValue(":CONTENT",$content);
    $statement->bindValue(":STATUS", "0", PDO::PARAM_INT);
    $statement->execute();
    $resultCount = $statement->rowCount();
    if($resultCount > 0){
        $resp["successful"] = true;
        header("Location:../contect.html"); 
        }else{
        $resp["successful"] = false;
        }
        echo json_encode($resp);
?>