<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions
	require_once(__DIR__."email.php");

	$email = $_POST['email'];
	$pword = $_POST['password'];

	$query = "SELECT * FROM users WHERE email = '$email'";
	if(existsInDatabase($query)) {
		echo 200; // 'Error Code' that the email has already been registered.
	}
	else {
		$add_query = "INSERT INTO users(pword, email) VALUES('$pword', '$email')";
		addToDatabase($add_query);
		echo send_mail($email); // 100 on success, 300 on error
	}
?>

