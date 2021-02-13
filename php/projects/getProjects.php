<?php
require_once dirname(__DIR__).'../db/crud.php';
$crud =  new Crud();

$projects = $crud->getAllProjects();

echo "a";
?>
