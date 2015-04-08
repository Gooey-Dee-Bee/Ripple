<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions

	// DECODE THE INFORMATION (IT IS PASSED IN JSON FORMAT)
	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$email = $post['email'];
	$pword = $post['password'];


	$query = "SELECT * FROM users WHERE email = '$email'";
	if(existsInDatabase($query)) {
		echo 200; // 'Error Code' that will be tested in the java script and will let the user know the email has already been registered
	}
	else {
		$add_query = "INSERT INTO users(pword, email) VALUES
							('$pword', '$email')";
		addToDatabase($add_query);
<<<<<<< HEAD
		echo 100;
=======
		startSession($email); // User is now logged in with a session
		echo 100; //Success
>>>>>>> 662b64a22b1341e16be2117cf9e093ef75d399b7
	}
?>

