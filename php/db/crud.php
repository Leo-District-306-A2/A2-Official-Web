<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once 'dbConfig.php';

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

    public function addProject($id, $projectName, $description, $fbLink, $image, $publishedDate, $publishedBy)
    {
        $id = $this->escape_string($id);
        $projectName = $this->escape_string($projectName);
        $description = $this->escape_string($description);
        $fbLink = $this->escape_string($fbLink);
        $image = $this->escape_string($image);
        $publishedDate = $this->escape_string($publishedDate);
        $publishedBy = $this->escape_string($publishedBy);

        $query = "INSERT INTO projects (id, project_name, description, fb_link, image_path, published_date, published_by) VALUES ('$id', '$projectName', '$description', '$fbLink', '$image', '$publishedDate', '$publishedBy')";
        $result = $this->execute($query);
        return $result;
    }

    public function getAllProjects()
    {
        $query = "SELECT id, project_name, description, fb_link, image_path FROM projects ORDER BY published_date DESC";
        $result = $this->getData($query);
        return $result;
    }

    public function getProjectById($id)
    {
        $query = "SELECT * FROM projects WHERE id = '$id'";
        $result = $this->getData($query);
        return $result;
    }

    public function updateProject($id, $projectName, $description, $fbLink, $image, $publishedDate, $publishedBy)
    {
        $id = $this->escape_string($id);
        $projectName = $this->escape_string($projectName);
        $description = $this->escape_string($description);
        $fbLink = $this->escape_string($fbLink);
        $image = $this->escape_string($image);
        $publishedDate = $this->escape_string($publishedDate);
        $publishedBy = $this->escape_string($publishedBy);

        $query = "UPDATE projects SET project_name = '$projectName', description = '$description', fb_link = '$fbLink', image_path = '$image', published_date = '$publishedDate', published_by = '$publishedBy'";
        $result = $this->execute($query);
        return $result;
    }

    public function deleteProject($id)
    {
        $query = "DELETE  FROM projects WHERE id = '$id'";
        $result = $this->execute($query);
        return $result;
    }
}
?>