<?php
require_once('../db/crud.php');
$crud =  new Crud();

$start = $_GET['start'];
$size = $_GET['size'];

$projects = $crud->getProjectsRange($start, $size);
$projects_count = $crud->getProjectCount();
$projectsDetails = new \stdClass();
$projectsDetails->projects = $projects;
$projectsDetails->count = $projects_count;

echo json_encode($projectsDetails);
?>
