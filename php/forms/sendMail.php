<?php

require '../mailer/PHPMailerAutoload.php';

$receivingEmail = 'secretariat@leodistrict306a2.org';
$sendingEmail = 'web.leodistrict306a2@gmail.com';
$password = 'A2@123Leos';
$showingName = 'A2 WEB';

$footerMsg = 'This email was sent by: '.$_SERVER['HTTP_HOST'];

//get the data from form
$email = $_POST['email'];
$name = $_POST['name'];
$contactNumber = $_POST['contactNumber'];
$homeTown = $_POST['homeTown'];
$age = $_POST['age'];
$message = $_POST['message'];

$subject = "New Member Request";
$body = '<h4>New member request has been captured from Leo District 306 A2 web site</h4><div><strong>Name</strong>: '.$name.'<br>'.
        '<strong>Email</strong>: '.$email.'<br>'.
        '<strong>Contact Number</strong>: '.$contactNumber.'<br>'.
        '<strong>Home Town</strong>: '.$homeTown.'<br>'.
        '<strong>Age</strong>: '.$age.'<br>'.
        '<strong>Message</strong>: '.$message.
        '</div>
        <div style="margin-top: 20px">
        '.$footerMsg.
        '</div>';

if(isset($_POST['name'])){

    $mail = new PHPMailer;

    // $mail->SMTPDebug = 4;                               

    $mail->isSMTP();                                    
    $mail->Host = 'smtp.gmail.com';  
    $mail->SMTPAuth = true;                              
    $mail->Username = $sendingEmail;                 
    $mail->Password = $password;                          
    $mail->SMTPSecure = 'tls';                          
    $mail->Port = 587;                                    

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
        echo 'OK';
    }
} else {
    echo 'Please complete the form data!';
}

?>
