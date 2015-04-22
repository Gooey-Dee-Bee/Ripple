<?php

	require_once(__DIR__."/databases.php"); // Access to the database functions

	$email = $_POST['email'];	//user's email

	$result = getInfoFromDatabase("SELECT dormant FROM users WHERE email = '$email'");
	$result = $result[0]['dormant'];

	if ($result == 0) {
		$query = "UPDATE users SET dormant = 1 WHERE email = '$email'";
		addToDatabase($query);
	}
	else {
		$query = "UPDATE users SET dormant = 0 WHERE email = '$email'";
		addToDatabase($query);
	}

?>