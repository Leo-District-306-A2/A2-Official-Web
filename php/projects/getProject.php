<?php
require_once('../db/crud.php');
$crud = new Crud();

$project = $crud->getProjectById($_GET['id']);
if (count($project) > 0) {
    echo json_encode($project[0]);
} else {
    echo "error";
}
?>
