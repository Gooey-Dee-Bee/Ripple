<?php
	require_once(__DIR__."/dropHelper.php"); // Allow access to the drop functions
	require_once(__DIR__."/databases.php"); // Allow access to the database functions

	//generate key
	//store it in new user and key database
	//send email using .txt file replacing username and email
	$email = $_POST['email']; // retieve the Email

	//Create random key for this email
	$key = $email . date('mY');	// concatenate email and date in xxXXXX format
	$key = md5($key);	//md5 hash encryption

	$confirm = addToDatabase("INSERT INTO confirm VALUES('$email','$key')");
	

?>