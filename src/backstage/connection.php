<?php
$db_host = "localhost:3306";
$db_user = "root";
$db_pass = "password";
$db_select = "TFD105_G5";

$dsn = "mysql:host=" . $db_host . ";dbname=" . $db_select;

$pdo = new PDO($dsn, $db_user, $db_pass);
?>