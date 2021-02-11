<?php
include_once '../db/crud.php';


if(isset($_POST['submit']) && isset($_FILES['projectImage'])){
    $projectName = $_POST['projectName'];
    $projectDescription = $_POST['projectDescription'];
    $fbLink = $_POST['fbLink'];

 
    $now = new DateTime();
    $date = $now->format('Y-m-d H:i:s');
    $timeStamp = $now->getTimestamp();


    $fileName =$_FILES['projectImage']['name'];
    $fileExt = strtolower( end(explode('.',$fileName)));
    $fileSize=$_FILES['projectImage']['size'];
    $fileTmp= $_FILES['projectImage']['tmp_name'];

    // image upload with base 64
    $type = pathinfo($fileTmp, PATHINFO_EXTENSION);
    $data = file_get_contents($fileTmp);
    $base64 = 'data:image/' . $fileExt . ';base64,' . base64_encode($data);   

    $crud = new Crud();        
    $id = uniqid('project');
    $result = $crud->addProject($id, $projectName, $projectDescription, $fbLink , $date, "Admin",$base64);

    if($result){
        echo "Added Successfully";
    }else{
        echo "error";
    }
    

    
    // with upload method
    // $uploadDirectory = '../../assets/img/projects/'.$projectName.$timeStamp;
    // mkdir($uploadDirectory);
    // $fileName = $_FILES['projectImage']['name'];
    // $fileExt = strtolower( end(explode('.',$fileName)));    
    // $uploaded = move_uploaded_file($_FILES['projectImage']['tmp_name'], $uploadDirectory.'/image.'.$fileExt);
    // if($uploaded){
    //     $crud = new Crud();        
    //     $imagePathToSave = $projectName.$timeStamp.'/image.'.$fileExt;
    //     $id = uniqid('project');
    //     $result = $crud->addProject($id, $projectName, $projectDescription, $fbLink ,$imagePathToSave , $date, "Admin",$base64);
    
    //     if($result){
    //         echo "Added Successfully";
    //     }
    //     else{
    //         if(is_dir($uploadDirectory)){
    //             unlink($uploadDirectory.'/image.'.$fileExt);
    //             rmdir($uploadDirectory);
    //         }
    //         echo "error";
    //     }
    // }else{
    //     echo "error";
    // }
   
}else{
    echo "error";
}

// $redirect =  __DIR__."/../../pages/projects";

header('Location: http://localhost:1234/a2web/A2-Official-Web/pages/projects/new');
exit;
?>