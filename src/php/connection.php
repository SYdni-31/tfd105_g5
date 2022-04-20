<?php    
    $db_host = "127.0.0.1";
    $db_user = "root";
    $db_pass = "password";
    $db_select = "TFD105_G5";

    // $db_host = "127.0.0.1";
    // $db_user = "tibamefe_since2021";
    // $db_pass = "vwRBSb.j&K#E";
    // $db_select = "tibamefe_tfd105g5";


    $dsn = "mysql:host=".$db_host.";dbname=".$db_select;

    $pdo = new PDO($dsn, $db_user, $db_pass);
?>