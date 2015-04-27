<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions

	// DECODE THE INFORMATION (IT IS PASSED IN JSON FORMAT)
	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$email = $post['email'];
	$pword = $post['password'];


	$query = "SELECT * FROM users WHERE email = '$email'";
	if(existsInDatabase($query)) {
		echo 200; // 'Error Code' that the email has already been registered. JS needs to return an error
	}
	else {
		$add_query = "INSERT INTO users(pword, email) VALUES('$pword', '$email')";
		addToDatabase($add_query);
		shell_exec("php ".__DIR__."/email.php $email > /var/log/ripple/error.log &"); // Email confirmation service ran in BG
		echo 100;
	}
?>

