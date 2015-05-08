<?php
	require_once(__DIR__."/databases.php"); // Access to the database functions
	require_once(__DIR__."/encryption.php");

	$email = $_POST['email'];
	$pword = $_POST['password'];

	$result = getInfoFromDatabase("SELECT pword FROM users WHERE email = '$email'");
	$result = $result[0]['pword'];

	#$result = decrypt($result, ENCRYPTION_KEY);
	$encryptedpword = encrypt($pword, ENCRYPTION_KEY);

	if(isset($result) && $result == $encryptedpword) {
		echo 100;
	}

	else {
		echo 200; // Credentials not right / account doesn't exist
	}
?>