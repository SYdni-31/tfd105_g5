<?php

    include("connection.php");    
    $select = json_decode(file_get_contents("php://input"), true);
    // 解密密碼
    $pwd = base64_decode($select["PASSWORD"]);
    
    //新增廠商資料
    $sql = " INSERT INTO COMPANY (NAME, LASTNAME, EMAIL, PASSWORD, OPEN, STATUS, LOGINTIME) VALUES ( :NAME, :LASTNAME, :EMAIL, :PASSWORD, :OPEN, :STATUS, :LOGINTIME) ";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":NAME",$select["NAME"]);
    $statement->bindValue(":LASTNAME",$select["LASTNAME"]);
    $statement->bindValue(":EMAIL",$select["EMAIL"]);
    $statement->bindValue(":PASSWORD",$pwd);
    $statement->bindValue(":OPEN", 0 , PDO::PARAM_INT);
    $statement->bindValue(":STATUS", "I");
    $statement->bindValue(":LOGINTIME",date('Y/m/d H:i:s'));
    $statement->execute();
    $resultCount = $statement->rowCount();
    // 新增成功
    if($resultCount > 0){
        // 搜尋剛剛建立的ID
        $sql2 = "SELECT ID FROM COMPANY where NAME = :NAME and LASTNAME = :LASTNAME and EMAIL = :EMAIL   order by LOGINTIME desc limit 1 ";
        $statement2 = $pdo->prepare($sql2);
        $statement2->bindValue(":NAME",$select["NAME"]);
        $statement2->bindValue(":LASTNAME",$select["LASTNAME"]);
        $statement2->bindValue(":EMAIL",$select["EMAIL"]);
        $statement2->execute();
        $company_id = $statement2->fetch();


        //建立廠商策展資料
        $sql3 = "INSERT INTO COMPANY_INFO (ONBOARD, MODIFY_DATE, COMPANY_ID, EXPO_ID) VALUES ( :ONBOARD, :MODIFY_DATE, :COMPANY_ID, :EXPO_ID);";
        $statement3 = $pdo->prepare($sql3);
        $statement3->bindValue(":ONBOARD",0,PDO::PARAM_INT);
        $statement3->bindValue(":MODIFY_DATE",date('Y/m/d H:i:s'));
        $statement3->bindValue(":COMPANY_ID",$company_id['ID']);
        $statement3->bindValue(":EXPO_ID",$select["EXPO_ID"]);
        $statement3->execute();
        $resultCount2 = $statement3->rowCount();
        // 新增成功
        if($resultCount2 > 0){
            // 搜尋剛剛新增的廠商資料
            $sql4 = "SELECT a.*,b.EXPO_ID FROM COMPANY a join COMPANY_INFO b on a.ID=b.COMPANY_ID where NAME = :NAME and LASTNAME = :LASTNAME and EMAIL = :EMAIL   order by LOGINTIME desc limit 1 ";
            $statement4 = $pdo->prepare($sql4);
            $statement4->bindValue(":NAME",$select["NAME"]);
            $statement4->bindValue(":LASTNAME",$select["LASTNAME"]);
            $statement4->bindValue(":EMAIL",$select["EMAIL"]);
            $statement4->execute();
            $company_new = $statement4->fetch();
            $company_new["successful"] = true;
            echo json_encode($company_new);
        }else{
            $company_new["successful"] = false;
            echo json_encode($company_new);
        }
    // 新增失敗
    }else{
        $resultCount["successful"] = false;
        echo json_encode($resultCount);
    }
    
    
?>