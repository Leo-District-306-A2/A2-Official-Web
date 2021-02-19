<?php
require_once('../db/crud.php');
$crud = new Crud();

$id = $_POST['id'];
$title = $_POST['title'];
$description = $_POST['description'];
$facebook = $_POST['facebook'];
$published_by = $_POST['published_by'];

$deleted_images = $_POST['deleted_images'];
$uploaded_images = $_POST['uploaded_images'];

if (check_includes($deleted_images, "image_1")) {
    $crud->updateProjectImage($id, "image_1", "");
}

if (check_includes($deleted_images, "image_2")) {
    $crud->updateProjectImage($id, "image_2", "");
}

if (check_includes($deleted_images, "image_3")) {
    $crud->updateProjectImage($id, "image_3", "");
}

if (check_includes($deleted_images, "image_4")) {
    $crud->updateProjectImage($id, "image_4", "");
}

if (check_includes($uploaded_images, "image_1")) {
    $crud->updateProjectImage($id, "image_1",genBase64Img($_FILES['image_1']));
}

if (check_includes($uploaded_images, "image_2") && $_FILES['image_2']['size'] != 0) {
    $crud->updateProjectImage($id, "image_2",genBase64Img($_FILES['image_2']));
}

if (check_includes($uploaded_images, "image_3") && $_FILES['image_3']['size'] != 0) {
    $crud->updateProjectImage($id, "image_3",genBase64Img($_FILES['image_3']));
}

if (check_includes($uploaded_images, "image_4") && $_FILES['image_4']['size'] != 0) {
    $crud->updateProjectImage($id, "image_4",genBase64Img($_FILES['image_4']));
}

$now = new DateTime();
$date = $now->format('Y-m-d H:i:s');
$timeStamp = $now->getTimestamp();


$result = $crud->updateProject($id, $title, $description, $facebook, $date, $published_by);

if ($result) {
    echo "success";
} else {
    echo "error";
}

function check_includes($string, $word) {
    return (strpos($string, $word) !== false);
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
