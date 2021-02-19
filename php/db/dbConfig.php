<?php

require_once('env.php');

/**
 * Created by PhpStorm.
 * User: thili
 * Date: 1/10/2019
 * Time: 11:30 AM
 */
class DbConfig
{

    private $_host = 'localhost'; //host name
    private $_username = ''; //username for the database
    private $_password = '';  //password for the database
    private $_database = ''; //database name
    protected $connection;

    public function __construct()
    {
        (new DotEnv(dirname(__DIR__) . '../../.env'))->load();
        $this->_host = getenv('DATABASE_HOST');
        $this->_database = getenv('DATABASE_NAME');
        $this->_username = getenv('DATABASE_USER');
        $this->_password = getenv('DATABASE_PASSWORD');

        if (!isset($this->connection)) {
            $this->connection = new mysqli($this->_host, $this->_username, $this->_password, $this->_database);

            if (!$this->connection) {
                echo "Cannot connect to the database Server";
                exit;
            }
        }
        return $this->connection;
    }
}


?>
