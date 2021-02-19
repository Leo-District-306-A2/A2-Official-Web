<?php
require_once('../db/crud.php');

$title = $_POST['title'];
$description = $_POST['description'];
$facebook = $_POST['facebook'];
$published_by = $_POST['published_by'];
$upload_count = (int)$_POST['upload_count'];

$now = new DateTime();
$date = $now->format('Y-m-d H:i:s');
$timeStamp = $now->getTimestamp();

$image_1 = "";
if ($upload_count > 0 && $_FILES['image_1']['size'] != 0) {
    $image_1 = genBase64Img($_FILES['image_1']);
    $upload_count -= 1;
}

$image_2 = "";
if ($upload_count > 0 && $_FILES['image_2']['size'] != 0) {
    $image_2 = genBase64Img($_FILES['image_2']);
    $upload_count -= 1;
}

$image_3 = "";
if ($upload_count > 0 && $_FILES['image_3']['size'] != 0) {
    $image_3 = genBase64Img($_FILES['image_3']);
    $upload_count -= 1;
}

$image_4 = "";
if ($upload_count > 0 && $_FILES['image_4']['size'] != 0) {
    $image_4 = genBase64Img($_FILES['image_4']);
    $upload_count -= 1;
}

$crud = new Crud();
$result = $crud->addProject($title, $description, $facebook, $image_1, $image_2, $image_3, $image_4, $date, $published_by);

if ($result) {
    echo "success";
} else {
    echo "error";
}


function genBase64Img($imgFile)
{
    $fileName = $imgFile['name'];
    $exploded = explode('.', $fileName);
    $fileExt = end($exploded);
    $fileSize = $imgFile['size'];
    $fileTmp = $imgFile['tmp_name'];

    // image upload with base 64
    $type = pathinfo($fileTmp, PATHINFO_EXTENSION);
    $data = file_get_contents($fileTmp);
    $base64 = 'data:image/' . strtolower($fileExt) . ';base64,' . base64_encode($data);
    return $base64;
}

exit;
?>
