<?php 

//
$BASE_FOLDER = date("Y");
$WEB_DIR = $BASE_FOLDER.DIRECTORY_SEPARATOR.'web';
$APP_DIR = $BASE_FOLDER.DIRECTORY_SEPARATOR.'app';
$FILE_NAME = 'club_data.json';

writeWebJson("test11", formatWebData());

function formatWebData() {
    $social_media = array("facebook"=>"","instagram"=>"","linkedin"=>"","youtube"=>"","web"=>"");
    $news_letter = array("name"=>"", "library_link"=>"");
    $officer_template = array("designation"=>"", "visibility_order"=> 0, "name"=>"", "img"=>"");
    $officers = array();
    // add data t relative array logic goes here
    array_push($officers, $officer_template);
    $main_data = array("clubName"=>"", "social_media"=> $social_media, "logo"=>"", "newsletter" => $news_letter, "officers"=> $officers);
    return $main_data;
}

function writeWebJson($club_name, $data) {
    global  $WEB_DIR, $FILE_NAME;
    // web sub folder create and write empty json 
    initialWrite($WEB_DIR);

    $readdata = json_decode(file_get_contents($WEB_DIR.DIRECTORY_SEPARATOR.$FILE_NAME), true);

    $readdata[$club_name] = $data;
    print_r($readdata);

    file_put_contents($WEB_DIR.DIRECTORY_SEPARATOR.$FILE_NAME, json_encode($readdata));

    $strJsonFileContents = file_get_contents($WEB_DIR.DIRECTORY_SEPARATOR.$FILE_NAME);
    echo $strJsonFileContents;
}

function initialWrite($FOLDER_PATH) {
    global $BASE_FOLDER, $FILE_NAME;
    // create year base folder if not exists
    if (!file_exists($BASE_FOLDER)) {
        mkdir($BASE_FOLDER, 0777, true);
    }

    if (!file_exists($FOLDER_PATH)) {
        mkdir($FOLDER_PATH, 0777, true);
        $fp = fopen($FOLDER_PATH.DIRECTORY_SEPARATOR.$FILE_NAME, 'w');
        fwrite($fp, '{}');
        fclose($fp);
    }
}
?> 