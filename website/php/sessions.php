<?php
	require_once(__DIR__."/databases.php");
	session_start();


	function startSession($verifiedEmail) {
		$_SESSION['email'] = $verifiedEmail;
	}

	// VERIFIES THAT THE SESSION IS REAL
	function verifySession() {
		if(!isset($_SESSION['email']))
			return FALSE;
		else {
			$query = "SELECT pword FROM users WHERE email = '".$_SESSION['email']."'";
			return existsInDatabase($query);
		}
	}

	//GETS THE INFO RELATED TO THE CURRENT SESSION
	function getSessionInfo(){
		$array = array(
			"email" => $_SESSION['email'],
			"password" => $_SESSION['password']);
		return $array;
	}

	//DESTROYS THE CURRENT SESSION AND RESETS THE SESSION ARRAY
	function logout(){
		$_SESSION = array();
		session_destroy();
	}

?>