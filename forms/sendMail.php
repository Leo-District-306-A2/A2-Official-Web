<?php

require '../mailer/PHPMailerAutoload.php';

$receivingEmail = 'sapsdilshan@gmail.com';
$sendingEmail = 'web.leodistrict306a2@gmail.com';
$password = 'A2@123Leos';
$showingName = 'A2 WEB'

$email = $_POST['email'];
$name = $_POST['name'];
$contactNumber = $_POST['contactNumber'];
$homeTown = $_POST['homeTown'];
$age = $_POST['age'];

$to = "sapsdilshan@gmail.com";
$subject = "New Member Request";
$body = "<strong>Name</strong>: ".$name."<br>".
        "<strong>Email</strong>: ".$email."<br>".
        "<strong>Contact Number</strong>: ".$contactNumber."<br>".
        "<strong>Home Town</strong>: ".$homeTown."<br>".
        "<strong>Age</strong>: ".$age."<br>".;

if(isset($_POST['name'])){


    $mail = new PHPMailer;

    // $mail->SMTPDebug = 4;                               // Enable verbose debug output

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = $sendingEmail;                 // SMTP username
    $mail->Password = 'A2@123Leos';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    $mail->setFrom($sendingEmail, $showingName);
    $mail->addAddress($receivingEmail);     // Add a recipient
    // $mail->addAddress('ellen@example.com');               // Name is optional
    $mail->addReplyTo($sendingEmail);
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = $subject;
    $mail->Body    = $body;
    $mail->AltBody = '';

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
}else{
    echo 'Please fill the form'
}


// mail($to,$subject,$body);


?>