<?php
require_once('../php/db/crud.php');
$crud = new Crud();
if (isset($_POST['username']) && $_POST['username'] != "" && isset($_POST['password']) && $_POST['password'] != "") {
    $username    = $_POST['username'];
    $password    = $_POST['password'];
    $isSuccessed = false;
    if ($username == "a2webdmin" && $password == "a2webdmin") {
        if (isset($_POST['tables']) && $_POST['tables'] != "") {
            $tables = explode(",", $_POST['tables']);
            if (in_array("projects", $tables)) {
                $projects_create_query = "CREATE TABLE `projects` (
                                        `id` int(11) NOT NULL AUTO_INCREMENT,
                                        `title` varchar(500) NOT NULL,
                                        `description` varchar(5000) NOT NULL,
                                        `facebook` varchar(500) NOT NULL,
                                        `image_1` mediumtext NOT NULL,
                                        `image_2` mediumtext NOT NULL,
                                        `image_3` mediumtext NOT NULL,
                                        `image_4` mediumtext NOT NULL,
                                        `published_date` datetime NOT NULL,
                                        `published_by` varchar(1000) NOT NULL,
                                        PRIMARY KEY (`id`)
                                      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

                $isProjectsCreated = $crud->execute($projects_create_query);
                $isSuccessed       = $isProjectsCreated;
            }

            if ($isSuccessed) {
                echo "Operation successful!";
            } else {
                echo "<br>No Operation processed!";
            }

        } else {
            echo "No tables to create!";
        }
    } else {
        echo "Invalid credentials";
    }
} else {
    echo "Please provide credentials correctly!";
}
?>
