<?php
require_once('../db/crud.php');

$title = $_POST['title'];
$description = $_POST['description'];
$facebook = $_POST['facebook'];
$published_by = $_POST['published_by'];

$image_1 = $_POST['image_1'];
$image_2 = $_POST['image_2'];
$image_3 = $_POST['image_3'];
$image_4 = $_POST['image_4'];

$now = new DateTime();
$date = $now->format('Y-m-d H:i:s');
$timeStamp = $now->getTimestamp();

$crud = new Crud();
$result = $crud->addProject($title, $description, $facebook, $image_1, $image_2, $image_3, $image_4, $date, $published_by);

if ($result) {
    echo "success";
} else {
    echo "error";
}
exit;
?>
