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

        $query = "INSERT INTO projects (id, project_name, description, fb_link, image, published_date, published_by) VALUES ('$id', '$projectName', '$description', '$fbLink', '$image', '$publishedDate', '$publishedBy')";
        $result = $this->execute($query);
        return $result;
    }
}
?>