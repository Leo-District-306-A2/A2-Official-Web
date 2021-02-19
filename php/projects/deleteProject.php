<?php
require_once('../db/crud.php');
$crud = new Crud();

$id = $_POST['id'];

$result = $crud->deleteProject($id);

if ($result) {
    echo "success";
}
?>
