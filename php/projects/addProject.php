<?php
include_once '../db/crud.php';


if(isset($_POST['submit']) && isset($_FILES['projectImage'])){
    $projectName = $_POST['projectName'];
    $projectDescription = $_POST['projectDescription'];
    $fbLink = $_POST['fbLink'];

 
    $now = new DateTime();
    $date = $now->format('Y-m-d');
    $timeStamp = $now->getTimestamp();
    $uploadDirectory = '../../assets/img/projects/'.$projectName.$timeStamp;
    mkdir($uploadDirectory);

   
    $fileName = $_FILES['projectImage']['name'];
    $fileExt = strtolower( end(explode('.',$fileName)));    
    $uploaded = move_uploaded_file($_FILES['projectImage']['tmp_name'], $uploadDirectory.'/image.'.$fileExt);
    if($uploaded){
        $crud = new Crud();        
        $imagePathToSave = $projectName.$timeStamp.'/image.'.$fileExt;
        $id = uniqid('project');
        $result = $crud->addProject($id, $projectName, $projectDescription, $fbLink ,$imagePathToSave , $date, "Admin");
    
        if($result){
            echo "Added Successfully";
        }
        else{
            if(is_dir($uploadDirectory)){
                unlink($uploadDirectory.'/image.'.$fileExt);
                rmdir($uploadDirectory);
            }
            echo "error";
        }
    }else{
        echo "error";
    }
   
}else{
    echo "error";
}

// header('Location: http://localhost:1234/a2web/A2-Official-Web/');
exit;
?>