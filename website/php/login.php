<?php
	require_once(__DIR__."/databases.php"); // Access to the database functions

	$email = $_POST['email'];
	$pword = $_POST['password'];

	$result = getInfoFromDatabase("SELECT pword FROM users WHERE email = '$email'");
	$result = $result[0]['pword'];


	if(isset($result) && $result == $pword) {
		echo 100;
	}

	else {
		echo 200; // Credentials not right / account doesn't exist
	}
?>