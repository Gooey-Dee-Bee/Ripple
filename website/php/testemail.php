<?php
	require_once(__DIR__."/PHPMailer/PHPMailerAutoload.php");

	sendMail('averyferrante@yahoo.com');

	function sendMail($email) {
		$mail = new PHPMailer();
		$mail->IsSendmail();

		$address = 'averyferrante@yahoo.com';
		$mail->AddAddress($address, 'New Ripple User');

		$from = 'noreply@ripple.com';
		$mail->SetFrom($from, 'Ripple Team');

		$subject = "Test Email.";
		$mail->Subject = $subject;

		$body = "This is a test email. I hope it works! <a href='http://www.google.com'>GOOGLE</a>";
		$mail->MsgHTML($body);
		$altBody = "You do not have an HTML enabled email service.";
		$mail->AltBody = $altBody;

		if(!$mail->Send())
			echo "ERROR SENDING MAIL";
		else
			echo "SENT SUCCESSFULLY!";
	}