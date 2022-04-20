<?php
include("connection.php");
$select = json_decode($_POST["updated_data"], true);
// $sql = "UPDATE view_company_info SET VIDEO=:VIDEO,STATUS=:STATUS WHERE ID= :ID";
// $statement = $pdo->prepare($sql);
// $statement->bindValue(":ID", $select["ID"]);
// $statement->bindValue(":LOGO", $select["LOGO"]);
// $statement->bindValue(":VIDEO", $select["VIDEO"]);
// $statement->bindValue(":INTRODUCE", $select["INTRODUCE"]);
// $statement->bindValue(":ROBOT", $select["ROBOT"]);
// $statement->bindValue(":TYPE", $select["TYPE"]);
// $statement->execute();
print_r ($select);
exit();
?>