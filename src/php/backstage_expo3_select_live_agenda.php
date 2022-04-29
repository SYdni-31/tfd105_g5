<?php
include("connection.php");
// 選取全部數量
$sql="select count(*) from view_live_agenda where STATUS !=\"D\" ";
$statement=$pdo->prepare($sql);
$statement->execute();
$select=$statement->fetchAll(); 
//PHP接收 JSON POST
// 選取第x頁資料(分頁)
//等號後方複製就好 變數自己訂
$select2=json_decode(file_get_contents("php://input"), true);
$sql2= "set @a= concat('select *,concat(DATE,\" \",START_TIME) as START ,concat(DATE,\" \",END_TIME) as END from view_live_agenda where ID like' , '\"%', :search_word, '%\"','or NAME like', '\"%', :search_word, '%\"', 'or START_TIME like', '\"%', :search_word, '%\"', 'or APPLY_TIME like', '\"%', :search_word, '%\"','or END_TIME like','\"%',:search_word,'%\"', ' order by ID limit', ' ', (:inpage-1)*:perpage, ', ', :perpage)";
//準備要把@a存進mysql內
$statement2 = $pdo->prepare($sql2);
$statement2->bindValue(":inpage", $select2["inpage"], PDO::PARAM_INT);
$statement2->bindValue(":perpage", $select2["perpage"], PDO::PARAM_INT);
$statement2->bindValue(":search_word", $select2["search_word"]);
$statement2->execute();

//第三部是將第二步的變數給拿出來
$sql3="prepare texts from @a";
$statement3 = $pdo->prepare($sql3);
$statement3->execute();


//第四部是執行第三部的文字
$sql4="execute texts";
    $statement4 = $pdo->prepare($sql4);
    $statement4->execute();


$select2= $statement4->fetchALL();
if ($select != null){
    $folder['data_count']=$select;
    $folder['data']=$select2;
    echo json_encode($folder);
};
?>