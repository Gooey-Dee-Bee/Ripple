<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions
	require_once(__DIR__."/PHPMailer/PHPMailerAutoload.php");

	function send_email($email) {
		$key = generateKey($email);
		$html_body = format_html_email($email, $key);


    	$mail = new PHPMailer();
		$mail->IsSendmail();

		$mail->AddAddress($email, 'New Ripple User');

		$from = 'noreply@ripple.com';
		$mail->SetFrom($from, 'Ripple Team');

		$subject = "Welcome to Ripple!";
		$mail->Subject = $subject;

		$mail->MsgHTML($html_body);

		$altBody = format_plain_email($email, $key);
		$mail->AltBody = $altBody;

		if(!$mail->Send())
			echo 300; // Not sent successfully
		else
			echo 100;
     
	}

	function generateKey($email) {
		//Create random key for this email
		$key = $email . date('mY');	// concatenate email and date in xxXXXX format
		$key = md5($key);
		$key = substr($key, 0, 12); // Limit to only 12 characters

		$user_id = getUserIdFromEmail($email);
		addToDatabase("INSERT INTO confirmation(user_id, email, confirm_key) VALUES($user_id, '$email', '$key')");
		return $key;	//md5 hash encryption
	}

	function format_html_email($email, $key) {
    	//grab the template content
    	$template = file_get_contents('signup_template.html', FILE_USE_INCLUDE_PATH);            
    	//replace all the tags
    	$template = str_replace('{EMAIL}', $email, $template);
    	$template = str_replace('{KEY}', $key, $template);
    	$template = str_replace('{SITEPATH}','192.168.10.10/ripple', $template);
         
    	return $template;
	}

	function format_plain_email($email, $key) {
    	//grab the template content
    	$template = file_get_contents('signup_template.txt', FILE_USE_INCLUDE_PATH);            
    	//replace all the tags
    	$template = str_replace('{EMAIL}', $email, $template);
    	$template = str_replace('{KEY}', $key, $template);
    	$template = str_replace('{SITEPATH}','192.168.10.10/ripple', $template);
         
    	return $template;
	}

?>