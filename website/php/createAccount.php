<?php
	require_once(__DIR__.'/databases.php');
	require_once(__DIR__.'/sessions.php');

	// DECODE THE INFORMATION (IT IS PASSED IN JSON FORMAT)
	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$email = $post['email'];
	$pword = $post['password'];


	$query = "SELECT * FROM users WHERE email = '$email'";
	if(existsInDatabase($query)) {
		echo "email"; // 'Error Code' that will be tested in the java script and will let the user know the email has already been registered
	}
	else {
		$add_query = "INSERT INTO users(fname, lname, pword, email) VALUES
							('TEST', 'USER', '$pword', '$email')";
		addToDatabase($add_query);
		createSession($email); // User is now logged in with a session
		echo "success";
	}

?>

