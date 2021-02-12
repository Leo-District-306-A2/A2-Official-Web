<?php
include_once '../db/crud.php';


if(isset($_POST['submit'])) {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $facebook = $_POST['facebook'];
    $published_by = $_POST['published_by'];

    $image_1 = "";
    if ($_FILES['image_1']['size'] != 0) {
        $image_1 = genBase64Img($_FILES['image_1']);
    }

    $image_2 = "";
     if($_FILES['image_2']['size'] != 0) {
        $image_2 = genBase64Img($_FILES['image_2']);
     }

     $image_3 = "";
     if($_FILES['image_3']['size'] != 0) {
        $image_3 = genBase64Img($_FILES['image_3']);
     }

    $image_4 = "";
     if($_FILES['image_4']['size'] != 0) {
        $image_4 = genBase64Img($_FILES['image_4']);
     }

    echo $image_1;

    $now = new DateTime();
    $date = $now->format('Y-m-d H:i:s');
    $timeStamp = $now->getTimestamp();

    $crud = new Crud();        
    $id = uniqid('project');
    $result = $crud->addProject($id, $title, $description, $facebook, $image_1, $image_2, $image_3, $image_4, $date, $published_by);

    if($result){
        echo "Added Successfully";
    }else{
        echo "error";
    }
   
}else{
    echo "error";
}

// $redirect =  __DIR__."/../../pages/projects";

// header('Location: http://localhost:1234/a2web/A2-Official-Web/pages/projects/new');

function genBase64Img($imgFile) {
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
