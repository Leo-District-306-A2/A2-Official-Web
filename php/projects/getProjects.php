<?php
require_once('../db/crud.php');
$crud =  new Crud();

$projects = $crud->getAllProjects();

echo json_encode($projects);
?>
