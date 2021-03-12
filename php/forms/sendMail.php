<?php

require '../mailer/PHPMailerAutoload.php';

$receivingEmail = 'web.leodistrict306a2@gmail.com';
$sendingEmail = 'webadmin@leodistrict306a2.org';
$password = 'A2@123Leos';
$showingName = 'A2 Official Website';

$footerMsg = 'This email was sent by: '.$_SERVER['HTTP_HOST'];

//get the data from form
$email = $_POST['email'];
$name = $_POST['name'];
$contactNumber = $_POST['contactNumber'];
$homeTown = $_POST['homeTown'];
$age = $_POST['age'];
$message = $_POST['message'];
$subject = "A2 Web | Join us request";
$subject_submitter = "A2 Web | Received your Join Us request";

// captcha
$secretKey = '6LfELXsaAAAAANrISxAW2m-FDLZGe8gd3AOYaMlF';

$body = '<!DOCTYPE html>
         <html lang="en">
         <head>
             <title>An Accessible Account Update Email</title>
             <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
             <meta name="viewport" content="width=device-width, initial-scale=1">
             <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
             <style type="text/css">
                 /* CLIENT-SPECIFIC STYLES */
                 body, table, td, a {
                     -webkit-text-size-adjust: 100%;
                     -ms-text-size-adjust: 100%;
                 }

                 table, td {
                     mso-table-lspace: 0pt;
                     mso-table-rspace: 0pt;
                 }

                 img {
                     -ms-interpolation-mode: bicubic;
                 }

                 /* RESET STYLES */
                 img {
                     border: 0;
                     height: auto;
                     line-height: 100%;
                     outline: none;
                     text-decoration: none;
                 }

                 table {
                     border-collapse: collapse !important;
                 }

                 body {
                     height: 100% !important;
                     margin: 0 !important;
                     padding: 0 !important;
                     width: 100% !important;
                 }

                 /* iOS BLUE LINKS */
                 a[x-apple-data-detectors] {
                     color: inherit !important;
                     text-decoration: none !important;
                     font-size: inherit !important;
                     font-family: inherit !important;
                     font-weight: inherit !important;
                     line-height: inherit !important;
                 }

                 /* GMAIL BLUE LINKS */
                 u + #body a {
                     color: inherit;
                     text-decoration: none;
                     font-size: inherit;
                     font-family: inherit;
                     font-weight: inherit;
                     line-height: inherit;
                 }

                 /* SAMSUNG MAIL BLUE LINKS */
                 #MessageViewBody a {
                     color: inherit;
                     text-decoration: none;
                     font-size: inherit;
                     font-family: inherit;
                     font-weight: inherit;
                     line-height: inherit;
                 }

                 a {
                     color: #B200FD;
                     font-weight: 600;
                     text-decoration: underline;
                 }

                 a:hover {
                     color: #000000 !important;
                     text-decoration: none !important;
                 }

                 @media screen and (min-width: 600px) {
                     h1 {
                         font-size: 48px !important;
                         line-height: 48px !important;
                     }

                     .intro {
                         font-size: 24px !important;
                         line-height: 36px !important;
                     }
                 }
             </style>
         </head>
         <body style="margin: 0 !important; padding: 0 !important;">

         <div style="display: none; max-height: 0; overflow: hidden;">

         </div>
         <div style="display: none; max-height: 0px; overflow: hidden;">
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         </div>

         <div role="article" aria-label="An email from Your Brand Name" lang="en"
              style="background-color: white; color: #2b2b2b; font-family: \'Avenir Next\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'; font-size: 18px; font-weight: 400; line-height: 28px; margin: 0 auto; max-width: 600px; padding: 40px 20px 40px 20px;">

             <header>
                 <a href="http://leodistrict306a2.org">
                     <center><img src="http://leodistrict306a2.org/assets/img/logos/A2_Logo_2020_21.png" alt="" height="200"
                                  width="200"></center>
                 </a>
                 <h6 style="color: #000000; font-size: 32px; line-height: 32px; margin: 10px 0 30px 0; text-align: center;">
                     Leo District 306 A2, Sri Lanka
                 </h6>
             </header>

             <main>
                 <div style="background-color: rgb(0, 0, 0, 0.05); border-radius: 4px; padding: 24px 48px;">
                     <p style="margin-bottom: 0; margin-top: 0;">
                         We have received Join Us request <strong>'. $name . '</strong> through our official website.<br/>
                     </p>
                     <ul style="margin-top: 0;">
                         <li>Name: '. $name . '</li>
                         <li>Email: '. $email .'</li>
                         <li>Contact Number: '.$contactNumber.'</li>
                         <li>Home town: '.$homeTown.'</li>
                         <li>Age: '.$age.'</li>
                         <li>Message: <br> '.$message.'</li>
                     </ul>
                 </div>
             </main>

             <footer style="text-align: center;">
                 <img style="width:150px; margin-top: 20px; display: block; margin-left: auto; margin-right: auto;"
                      src="http://leodistrict306a2.org/assets/img/common/footer/all_logos_bar.png">
                 <h3 align="center" style="margin: 0;">Leo District 306 A2. Sri Lanka.</h3>
                 <a style="position: relative; top: -5px;font-size: 16px;text-decoration: none; color: gray; display: block; margin-left: auto; margin-right: auto;"
                    href="http://leodistrict306a2.org/">www.leodistrict306a2.org</a>
                 <p style="font-size: 12px; text-align: center; margin: 0; color: darkgray;">
                     This is system generated email from Leo District 306 A2 Official Web page.
                 </p>
             </footer>

         </div>
         </body>
         </html>';

         $body_submitter = '<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <title>An Accessible Account Update Email</title>
                                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                                <style type="text/css">
                                    /* CLIENT-SPECIFIC STYLES */
                                    body, table, td, a {
                                        -webkit-text-size-adjust: 100%;
                                        -ms-text-size-adjust: 100%;
                                    }

                                    table, td {
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                    }

                                    img {
                                        -ms-interpolation-mode: bicubic;
                                    }

                                    /* RESET STYLES */
                                    img {
                                        border: 0;
                                        height: auto;
                                        line-height: 100%;
                                        outline: none;
                                        text-decoration: none;
                                    }

                                    table {
                                        border-collapse: collapse !important;
                                    }

                                    body {
                                        height: 100% !important;
                                        margin: 0 !important;
                                        padding: 0 !important;
                                        width: 100% !important;
                                    }

                                    /* iOS BLUE LINKS */
                                    a[x-apple-data-detectors] {
                                        color: inherit !important;
                                        text-decoration: none !important;
                                        font-size: inherit !important;
                                        font-family: inherit !important;
                                        font-weight: inherit !important;
                                        line-height: inherit !important;
                                    }

                                    /* GMAIL BLUE LINKS */
                                    u + #body a {
                                        color: inherit;
                                        text-decoration: none;
                                        font-size: inherit;
                                        font-family: inherit;
                                        font-weight: inherit;
                                        line-height: inherit;
                                    }

                                    /* SAMSUNG MAIL BLUE LINKS */
                                    #MessageViewBody a {
                                        color: inherit;
                                        text-decoration: none;
                                        font-size: inherit;
                                        font-family: inherit;
                                        font-weight: inherit;
                                        line-height: inherit;
                                    }

                                    a {
                                        color: #B200FD;
                                        font-weight: 600;
                                        text-decoration: underline;
                                    }

                                    a:hover {
                                        color: #000000 !important;
                                        text-decoration: none !important;
                                    }

                                    @media screen and (min-width: 600px) {
                                        h1 {
                                            font-size: 48px !important;
                                            line-height: 48px !important;
                                        }

                                        .intro {
                                            font-size: 24px !important;
                                            line-height: 36px !important;
                                        }
                                    }
                                </style>
                            </head>
                            <body style="margin: 0 !important; padding: 0 !important;">

                            <div style="display: none; max-height: 0; overflow: hidden;">

                            </div>
                            <div style="display: none; max-height: 0px; overflow: hidden;">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>

                            <div role="article" aria-label="An email from Your Brand Name" lang="en"
                                 style="background-color: white; color: #2b2b2b; font-family: \'Avenir Next\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'; font-size: 18px; font-weight: 400; line-height: 28px; margin: 0 auto; max-width: 600px; padding: 40px 20px 40px 20px;">

                                <header>
                                    <a href="http://leodistrict306a2.org">
                                        <center><img src="http://leodistrict306a2.org/assets/img/logos/A2_Logo_2020_21.png" alt="" height="200"
                                                     width="200"></center>
                                    </a>
                                    <h6 style="color: #000000; font-size: 32px; line-height: 32px; margin: 10px 0 30px 0; text-align: center;">
                                        Leo District 306 A2, Sri Lanka
                                    </h6>
                                </header>

                                <main>
                                    <div style="background-color: rgb(0, 0, 0, 0.05); border-radius: 4px; padding: 24px 48px;">
                                        <p style="margin-bottom: 0; margin-top: 0;">
                                            Dear ' . $name . ', <br>
                                            We have received Join Us request successfully as below.
                                        </p>
                                        <ul style="margin-top: 0;">
                                            <li>Name: '. $name . '</li>
                                            <li>Email: '. $email .'</li>
                                            <li>Contact Number: '.$contactNumber.'</li>
                                            <li>Home town: '.$homeTown.'</li>
                                            <li>Age: '.$age.'</li>
                                            <li>Message: <br> '.$message.'</li>
                                        </ul>
                                    </div>
                                </main>

                                <footer style="text-align: center;">
                                    <img style="width:150px; margin-top: 20px; display: block; margin-left: auto; margin-right: auto;"
                                         src="http://leodistrict306a2.org/assets/img/common/footer/all_logos_bar.png">
                                    <h3 align="center" style="margin: 0;">Leo District 306 A2. Sri Lanka.</h3>
                                    <a style="position: relative; top: -5px;font-size: 16px;text-decoration: none; color: gray; display: block; margin-left: auto; margin-right: auto;"
                                       href="http://leodistrict306a2.org/">www.leodistrict306a2.org</a>
                                    <p style="font-size: 12px; text-align: center; margin: 0; color: darkgray;">
                                        This is system generated email from Leo District 306 A2 Official Web page.
                                    </p>
                                </footer>

                            </div>
                            </body>
                            </html>';

if(isset($_POST['name'])){
    $userResponse = $_POST['g-recaptcha-response'];
    if($userResponse != ''){
        $result = checkCaptcha($userResponse, $secretKey);
        if ($result['success']) {

            $mail = new PHPMailer(true);
            // $mail->SMTPDebug = 4;
            // $mail->isSMTP();
            $mail->Host = 'europe3.pvtwebs.com';
            $mail->SMTPAuth = true;
            $mail->Username = $sendingEmail;
            $mail->Password = $password;
            $mail->SMTPSecure = 'tls';
            $mail->Port = 465;

            $mail->setFrom($sendingEmail, $showingName);
            $mail->addAddress($receivingEmail);
            $mail->addReplyTo($sendingEmail);
            $mail->isHTML(true);

            $mail->Subject = $subject;
            $mail->Body    = $body;
            $mail->AltBody = '';

            if(!$mail->send()) {
                echo 'Message could not be sent.';
                echo 'Mailer Error: ' . $mail->ErrorInfo;
            } else {
                $mail-> ClearAllRecipients( );
                $mail->addAddress($email);
                $mail->Subject = $subject_submitter;
                $mail->Body    = $body_submitter;
                $mail->send();
                echo 'OK';
            }
        
        } else {
            echo 'Can\'t submit data. Please Try again!';
        }
        
    }else{
        echo 'Please verify that you are not a robot!';
    }
} else {
    echo 'Please complete the form data!';
}


function checkCaptcha($userResponse,$secretKey){
    $ch = curl_init();
    $requestData = array(
        'secret' => $secretKey,
        'response' => $userResponse
    );
    curl_setopt($ch, CURLOPT_URL,"https://www.google.com/recaptcha/api/siteverify");
    curl_setopt($ch, CURLOPT_POST, count($requestData));
    curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($requestData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);    
    curl_close ($ch);
    return json_decode($result , true);
}

?>
