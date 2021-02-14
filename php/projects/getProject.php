<?php
require_once dirname(__DIR__).'../db/crud.php';
$crud =  new Crud();

$project = $crud->getProjectById($_GET['id'])[0];

echo json_encode($project);
?>
