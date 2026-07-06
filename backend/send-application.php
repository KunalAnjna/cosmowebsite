<?php
/**
 * send-application.php
 * Receives the Job Application form (multipart/form-data) and emails the
 * details + resume attachment directly — no third-party form service needed.
 *
 * SETUP (one-time):
 * 1. Upload this file + the "PHPMailer" folder to your website's server,
 *    in the same folder as ApplyHere.html (or update the require paths below).
 * 2. Fill in the SMTP settings below (see instructions at the bottom of this file).
 * 3. In ApplyHere.html, change the form's action to "send-application.php".
 */

// ---------- CONFIG: EDIT THESE ----------
$SMTP_HOST     = 'smtp.gmail.com';           // Gmail SMTP server
$SMTP_USERNAME = 'Kunalanjna9910@gmail.com'; // The Gmail account that will SEND the mail
$SMTP_PASSWORD = 'iybdbwnvfrdjulof';    // Gmail "App Password" (NOT your normal password)
$SMTP_PORT     = 587;
$TO_EMAIL      = 'Kunalanjna9910@gmail.com';  // Where applications should be delivered
$TO_NAME       = 'Cosmo Instruments HR';
// -----------------------------------------

header('Content-Type: application/json');

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// ---- Basic validation ----
$required = ['name', 'age', 'location', 'email', 'contact', 'qualification', 'experience', 'position'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => "Missing field: $field"]);
        exit;
    }
}

if (!isset($_FILES['resume_attachment']) || $_FILES['resume_attachment']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Resume file is required']);
    exit;
}

$resume = $_FILES['resume_attachment'];

// Limit file size to 5MB and only allow pdf/doc/docx
$allowedExt = ['pdf', 'doc', 'docx'];
$ext = strtolower(pathinfo($resume['name'], PATHINFO_EXTENSION));
if (!in_array($ext, $allowedExt)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid file type']);
    exit;
}
if ($resume['size'] > 5 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'File too large (max 5MB)']);
    exit;
}

// Sanitize inputs for safe email display
function clean($v) {
    return htmlspecialchars(trim($v), ENT_QUOTES, 'UTF-8');
}

$name          = clean($_POST['name']);
$age           = clean($_POST['age']);
$location      = clean($_POST['location']);
$email         = clean($_POST['email']);
$contact       = clean($_POST['contact']);
$qualification = clean($_POST['qualification']);
$experience    = clean($_POST['experience']);
$position      = clean($_POST['position']);

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = $SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = $SMTP_USERNAME;
    $mail->Password   = $SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $SMTP_PORT;

    // Recipients
    $mail->setFrom($SMTP_USERNAME, 'Cosmo Instruments Website');
    $mail->addAddress($TO_EMAIL, $TO_NAME);
    $mail->addReplyTo($email, $name); // so HR can hit "reply" and reach the applicant

    // Attachment
    $mail->addAttachment($resume['tmp_name'], $resume['name']);

    // Content
    $mail->isHTML(true);
    $mail->Subject = "New Job Application - $position - $name";
    $mail->Body    = "
        <h2>New Job Application</h2>
        <p><b>Name:</b> $name</p>
        <p><b>Age:</b> $age</p>
        <p><b>Location:</b> $location</p>
        <p><b>Email:</b> $email</p>
        <p><b>Contact No:</b> $contact</p>
        <p><b>Qualification:</b> $qualification</p>
        <p><b>Experience:</b> $experience</p>
        <p><b>Position Applying For:</b> $position</p>
        <p>Resume is attached to this email.</p>
    ";
    $mail->AltBody = "New Job Application\nName: $name\nAge: $age\nLocation: $location\nEmail: $email\nContact: $contact\nQualification: $qualification\nExperience: $experience\nPosition: $position";

    $mail->send();
    echo json_encode(['ok' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => "Mail could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
