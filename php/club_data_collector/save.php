<?php 

//
$BASE_FOLDER = date("Y");
$WEB_DIR = $BASE_FOLDER.DIRECTORY_SEPARATOR.'web';
$APP_DIR = $BASE_FOLDER.DIRECTORY_SEPARATOR.'app';
$FILE_NAME = 'club_data.json';

writeWebJson("clubName1", formatWebData());
writeAppJson(formatAppData());

function writeAppJson($data) {
    global  $APP_DIR, $FILE_NAME;
    // web sub folder create and write empty json
    initialWrite($APP_DIR, '{"imgBaseUrl": "clubs/imgs", "clubs": []}');

    $content = json_decode(file_get_contents($APP_DIR.DIRECTORY_SEPARATOR.$FILE_NAME), true);
    array_push($content["clubs"], $data);
    //print_r($content);

    file_put_contents($APP_DIR.DIRECTORY_SEPARATOR.$FILE_NAME, json_encode($content));
    //$strJsonFileContents = file_get_contents($APP_DIR.DIRECTORY_SEPARATOR.$FILE_NAME);
    //echo $strJsonFileContents;
}

function writeWebJson($club_name, $data) {
    global  $WEB_DIR, $FILE_NAME;
    // web sub folder create and write empty json 
    initialWrite($WEB_DIR);

    $content = json_decode(file_get_contents($WEB_DIR.DIRECTORY_SEPARATOR.$FILE_NAME), true);
    $content[$club_name] = $data;
    // print_r(content);

    file_put_contents($WEB_DIR.DIRECTORY_SEPARATOR.$FILE_NAME, json_encode($content));
    // $strJsonFileContents = file_get_contents($WEB_DIR.DIRECTORY_SEPARATOR.$FILE_NAME);
    // echo $strJsonFileContents;
}

function formatAppData() {
    $officer_template = array("designation"=>"", "visibility_order"=> 0, "name"=>"", "gender"=>"", "phone"=>"", "email"=>"", "mylci"=>"", "address"=>"", "img"=>"test/test");
    $officers = array();
    // add data to relative array logic goes here - start
     array_push($officers, $officer_template);
    // add data to relative array logic goes here - end
    $club = array("clubName"=>"", "logo"=> "", "officers"=>$officers);
    return $club;
}

function formatWebData() {
    $social_media = array("facebook"=>"","instagram"=>"","linkedin"=>"","youtube"=>"","web"=>"");
    $news_letter = array("name"=>"", "library_link"=>"");
    $officer_template = array("designation"=>"", "visibility_order"=> 0, "name"=>"", "img"=>"");
    $officers = array();
    // add data to relative array logic goes here - start
    array_push($officers, $officer_template);
    // add data to relative array logic goes here - end
    $club = array("clubName"=>"", "social_media"=> $social_media, "logo"=>"", "newsletter" => $news_letter, "officers"=> $officers);
    return $club;
}

function initialWrite($FOLDER_PATH, $INITIAL_WRITE = "{}") {
    global $BASE_FOLDER, $FILE_NAME, $WEB_DIR, $APP_DIR;
    // create year base folder if not exists
    if (!file_exists($BASE_FOLDER)) {
        mkdir($BASE_FOLDER, 0777, true);
    }

    if (!file_exists($FOLDER_PATH)) {
        mkdir($FOLDER_PATH, 0777, true);
        $fp = fopen($FOLDER_PATH.DIRECTORY_SEPARATOR.$FILE_NAME, 'w');
          fwrite($fp, $INITIAL_WRITE);
        fclose($fp);
    }
}
?> 
