<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('dbConfig.php');

class Crud extends DbConfig
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getData($query)
    {
        $result = $this->connection->query($query);
        if ($result == false) {
            echo $this->connection->error;
            return false;
        }

        $rows = array();
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    }

    public function execute($query)
    {
        $result = $this->connection->query($query);
        if ($result == false) {
            echo $this->connection->error;
            return false;
        } else {
            return true;
        }
    }

    public function escape_string($value)
    {
        return $this->connection->real_escape_string($value);
    }

    public function addProject($title, $description, $facebook, $image_1, $image_2, $image_3, $image_4, $publishedDate, $publishedBy)
    {
        $title = $this->escape_string($title);
        $description = $this->escape_string($description);
        $facebook = $this->escape_string($facebook);
        $publishedDate = $this->escape_string($publishedDate);
        $publishedBy = $this->escape_string($publishedBy);

        $query = "INSERT INTO projects (title, description, facebook, image_1, image_2, image_3, image_4, published_date, published_by) VALUES ('$title', '$description', '$facebook', '$image_1', '$image_2', '$image_3', '$image_4', '$publishedDate', '$publishedBy')";
        $result = $this->execute($query);
        return $result;
    }

    public function getAllProjects()
    {
        $query = "SELECT * FROM projects ORDER BY published_date DESC";
        $result = $this->getData($query);
        return $result;
    }

    public function getProjectsRange($start, $size)
    {
        $query = "SELECT * FROM projects ORDER BY published_date DESC LIMIT ".$start." , ".$size;
        $result = $this->getData($query);
        return $result;
    }

    public function getProjectCount(){
        $query = "SELECT COUNT(*) as project_count FROM projects";
        $result = $this->getData($query);
        return $result;
    }

    public function getProjectById($id)
    {
        $query = "SELECT * FROM projects WHERE id = '$id'";
        $result = $this->getData($query);
        return $result;
    }

    public function updateProject($id, $title, $description, $facebook, $publishedDate, $publishedBy)
    {
        $id = $this->escape_string($id);
        $title = $this->escape_string($title);
        $description = $this->escape_string($description);
        $facebook = $this->escape_string($facebook);
        $publishedDate = $this->escape_string($publishedDate);
        $publishedBy = $this->escape_string($publishedBy);

        $query = "UPDATE projects SET title = '$title', description = '$description', facebook = '$facebook', published_date = '$publishedDate', published_by = '$publishedBy' WHERE id = '$id'";
        $result = $this->execute($query);
        return $result;
    }

    public function updateProjectImage($id, $image_id, $value)
        {
            $query = "UPDATE projects SET " . $image_id . " = '$value' WHERE id = '$id'";
            $result = $this->execute($query);
            return $result;
        }

    public function deleteProject($id)
    {
        $query = "DELETE FROM projects WHERE id = '$id'";
        $result = $this->execute($query);
        return $result;
    }
}

?>
