<?php

    include("connection.php");    
    $select = json_decode(file_get_contents("php://input"), true);
    $eml = $select["login_id"];
    $pwd = base64_decode($select["companyPassword"]);
    // exit();
    
    //建立SQL語法  :name可替換為? 
    $sql = "SELECT a.ID,a.NAME,a.LASTNAME,a.EMAIL,a.PASSWORD,b.ID as INFO_ID FROM COMPANY a  join COMPANY_INFO b on a.ID=b.COMPANY_ID WHERE a.STATUS != 'D' and a.EMAIL = :email and a.PASSWORD = :pwd ";
    $statement = $pdo->prepare($sql);
    // $statement = $pdo->query($sql);
    $statement->bindValue(":email",$eml);
    $statement->bindValue(":pwd",$pwd);
    // $statement->bindValue(":name",$select["companyPassword"]);
    $statement->execute();
    
    // $sql_guest = "SELECT * FROM GUEST WHERE NAME = :name and EMAIL = :email";
    // $statement_guest = $pdo->prepare($sql_guest);

    // $sql = "SELECT ID,NAME,LASTNAME,EMAIL,PASSWORD FROM COMPANY_INFO WHERE STATUS != 'D' and EMAIL = :email and PASSWORD = :pwd";
    // $sql = "SELECT ID,NAME,LASTNAME,EMAIL,PASSWORD FROM COMPANY_INFO WHERE STATUS != 'D' and EMAIL = :email and PASSWORD = :pwd";

    // 抓一筆資料
    $company = $statement->fetch();
    // $num = mysql_num_rows($statement);
    // $resultCount = $statement->rowCount();
    // $resultCount = $statement->fetchALL();
    // echo($resultCount);
    // echo($company);
    // echo($pwd);
    // session_start();

    // print_r($_SESSION);
    // print_r($resultCount);
    // $resultCount_succ= $resultCount[0];
    if($company > 0){

        // $resultCount['successful'] = true;
        $company['successful'] = true;
        echo json_encode($company);

        // set session
        // session_start();
        // $_SESSION["login_id"] = $eml;
        // echo($eml);
        // $_SESSION["companyPassword"] = $pwd;
        // echo($pwd);
        // echo($_SESSION["companyPassword"]);
    }else{

        // echo($pwd);
        $company['successful'] = false;
        echo json_encode($company);
    }
    
    // if($eml != null && $pwd != null && $resultCount[3] == $eml &&  ){

    // }
    
?>