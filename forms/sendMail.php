<?php

require '../mailer/PHPMailerAutoload.php';

$name = $_POST['name'];
$email = $_POST['email'];
$contactNumber = $_POST['contactNumber'];
$homeTown = $_POST['homeTown'];
$age = $_POST['age'];

$to = "sapsdilshan@gmail.com";
$subject = "New Member Request";
$body = "Here is a new user";

if(isset($_POST['name'])){


    $mail = new PHPMailer;

    // $mail->SMTPDebug = 4;                               // Enable verbose debug output

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'travelme.developer@gmail.com';                 // SMTP username
    $mail->Password = 'TravelMe@123';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    $mail->setFrom('travelme.developer@gmail.com', 'Mailer');
    $mail->addAddress('sapsdilshan@gmail.com');     // Add a recipient
    // $mail->addAddress('ellen@example.com');               // Name is optional
    $mail->addReplyTo('travelme.developer@gmail.com');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
}


// mail($to,$subject,$body);


?>