<?php
	require_once(__DIR__.'/databases.php');
	require_once(__DIR__.'/sessions.php');

	// DECODE THE INFORMATION (IT IS PASSED IN JSON FORMAT)
	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$email = $post['email'];
	$pword = $post['password'];

	$query = "SELECT pword FROM users WHERE email = '$email'";



	$result = getInfoFromDatabase($query);
	$result = mysqli_fetch_assoc($result);
	$result = $result['pword'];


	if(isset($result) && $result == $pword) {
		createSession($email); // User is now logged in with a session
		echo "Successfully Logged In";
	}
	else {
		echo "Account Not Found";
	}

?>