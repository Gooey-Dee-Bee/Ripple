<?php
	session_start();

	// DECODE THE INFORMATION (IT IS PASSED IN JSON FORMAT)
	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$email = $post['email'];
	$pword = $post['password'];



	$result = getInfoFromDatabase("SELECT pword FROM users WHERE email = '$email'");
	$result = mysqli_fetch_assoc($result);
	$result = $result['pword'];

	if($result == $pword) {
		$_SESSION['email'] = $email; // Account exists, set the session variables.
		$_SESSION['password'] = $pword;
		echo "Successfully Logged In";
	}
	else {
		echo "Account Not Found";
	}



	function getInfoFromDatabase($query) {
		$con = mysqli_connect('localhost', 'root', 'mysqlpassword', 'Ripple');
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}

		$result = mysqli_query($con, $query);
		mysqli_close($con);

		return $result; 
	}

	//beginning of getSessionInfo
	function getSessionInfo(){
		$array = array(
			"email" => $_SESSION['email'],
			"password" => $_SESSION['password']);
		return $array;
	}

	//logout function to destroy the current session?
	function logout(){
		if(isset($_SESSION['email']))
			unset($_SESSION['email']);
	}

?>