<?php

	require_once(__DIR__."/databases.php"); // Access to the database functions

	$email = $_POST['email'];	//user's email

	$result = getInfoFromDatabase("SELECT active FROM confirmation WHERE email = '$email'");
	$result = $result[0]['active'];

	if ($result == 0) {
		$query = "UPDATE confirmation SET active = 1 WHERE email = '$email'";
		addToDatabase($query);
	}
	else {
		$query = "UPDATE confirmation SET active = 0 WHERE email = '$email'";
		addToDatabase($query);
	}

?>