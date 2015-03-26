<?php
	require_once(__DIR__."/databases.php"); // Access to the database functions
	require_once(__DIR__."/sessions.php"); // Access to the sessions functioins

	// DECODE THE INFORMATION (IT IS PASSED IN JSON FORMAT)
	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$email = $post['email'];
	$pword = $post['password'];



	$result = getInfoFromDatabase("SELECT pword FROM users WHERE email = '$email'");
	$result = $result['pword'];

	if($result == $pword) {
		startSession($email);
		echo "Successfully Logged In";
	}
	else {
		echo "Account Not Found";
	}
?>