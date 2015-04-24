<?php
	require_once(__DIR__."/dropHelper.php"); // Allow access to the drop functions
	require_once(__DIR__."/databases.php"); // Allow access to the database functions

	//main function that will call all other email functions
	function main($email){
		generate_Key($email);
	}

	function generate_Key($EMAIL)
	{
		//generate key
		//store it in new user and key database
		//send email using .txt file replacing username and email
		$email = $EMAIL // retieve the Email

		//Create random key for this email
		$key = $email . date('mY');	// concatenate email and date in xxXXXX format
		$key = md5($key);	//md5 hash encryption

		$confirm = addToDatabase("INSERT INTO confirm VALUES('$email','$key')");

		if($confirm){
			format_email($email, $key);
		}else{
			echo "delete*";
			echo "Could not send email";
		}
	}

	function format_email($email, $key)
	{
    	//grab the template content
    	$template = file_get_contents('/signup_template.txt');
             
    	//replace all the tags
    	$template = ereg_replace('{EMAIL}', '$email', $template);
    	$template = ereg_replace('{KEY}', '$key', $template);
    	$template = ereg_replace('{SITEPATH}','54.69.13.79/ripple', $template);
         
    	//return the txt of the template
    	return $template;
	}
	

?>