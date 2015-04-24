<?php
	require_once(__DIR__."/dropHelper.php"); // Allow access to the drop functions
	require_once(__DIR__."/databases.php"); // Allow access to the database functions
	require_once(__DIR__."/swiftmailer/lib/swift_required.php"); // Access to the swift mailer library

	$email = $_GET['email'];
	main($email);

	//main function that will call all other email functions
	function main($email){
		generate_Key($email);
	}

	function generate_Key($EMAIL)
	{
		//generate key
		//store it in new user and key database
		//send email using .txt file replacing username and email
		$email = $EMAIL; // retieve the Email

		//Create random key for this email
		$key = $email . date('mY');	// concatenate email and date in xxXXXX format
		$key = md5($key);	//md5 hash encryption

		$user_id = getUserIdFromEmail($email);
		addToDatabase("INSERT INTO confirmation(user_id, email, confirm_key) VALUES($user_id, '$email', '$key')");


		send_email($email, $key);
		// }else{
		// 	echo "delete*";
		// 	echo "Could not send email";
		// }
	}

	function format_email($email, $key)
	{
    	//grab the template content
    	$template = file_get_contents("signup_template.txt", FILE_USE_INCLUDE_PATH);
             
    	//replace all the tags
    	$template = ereg_replace('{EMAIL}', $email, $template);
    	$template = ereg_replace('{KEY}', $key, $template);
    	$template = ereg_replace('{SITEPATH}','192.168.10.10/ripple', $template);
         
    	//return the txt of the template
    	return $template;
	}

	function send_email($email, $key)
	{ 
    	//format each email
    	$body = format_email($email, $key);
 
    	//setup the mailer
    	$transport = Swift_MailTransport::newInstance();
    	$mailer = Swift_Mailer::newInstance($transport);
    	$message = Swift_Message::newInstance();
    	$message ->setSubject('Welcome to Ripple!');
    	$message ->setFrom(array('noreply@ripple.com' => 'Ripple Team'));
    	$message ->setTo(array($email => 'New Ripple User'));
     
    	$message ->setBody($body);
             
    	$result = $mailer->send($message);
     
    	return $result;
     
	}
	

?>