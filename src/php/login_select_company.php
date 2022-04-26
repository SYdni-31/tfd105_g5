<?php

    include("connection.php");    
    $select = json_decode(file_get_contents("php://input"), true);
    $eml = htmlspecialchars($select["login_id"]);
    // 解密密碼
    $pwd = base64_decode($select["companyPassword"]);
       
    //搜尋廠商資料
    $sql = "SELECT a.ID,a.NAME,a.LASTNAME,a.EMAIL,a.PASSWORD,b.ID as INFO_ID,a.OPEN  FROM COMPANY a  join COMPANY_INFO b on a.ID=b.COMPANY_ID WHERE a.STATUS != 'D' and a.EMAIL = :email and a.PASSWORD = :pwd  ";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":email",$eml);
    $statement->bindValue(":pwd",$pwd);
    $statement->execute();
   
    // 抓一筆資料
    $company = $statement->fetch();
    if($company > 0){
        // 如果OPEN為0，尚未通過審核
        if($company['OPEN'] == 0){
            $company['successfulOpen'] = false;
        }else{
            $company['successfulOpen'] = true;
            $sql2 = "UPDATE COMPANY set LOGINTIME=:LOGINTIME WHERE EMAIL = :email and PASSWORD = :pwd ";
            $statement2 = $pdo->prepare($sql2);
            $statement2->bindValue(":LOGINTIME",date('Y/m/d H:i:s'));
            $statement2->bindValue(":email",$eml);
            $statement2->bindValue(":pwd",$pwd);
            $statement2->execute();
            // 更新筆數
            $resultCount = $statement2->rowCount();
            if($resultCount > 0){
                $company['successful'] = true;
                
            }else{
                $company['successful'] = false;
            }
        }
    }else{
        $company['successfulOpen'] = true;
        $company['successful'] = false;
    }
    echo json_encode($company);
    
?>