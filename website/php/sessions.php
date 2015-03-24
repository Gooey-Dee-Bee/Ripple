<?php
	require_once(__DIR__.'/databases.php');
	session_start();


	// SETS THE SESSION VARIABLE THAT IS USED TO KEEP TRACK OF USERS
	function createSession($userEmail) { 
		$_SESSION['email'] = $userEmail;
	}

	// VALIDATES THAT THE CURRENT VARIABLES IN SESSION ARE VALID
	function verifySession() { 
		if(!isset($_SESSION['email']))
			return FALSE;

		$query = "SELECT * FROM users WHERE email = '$email'";
		return existsInDatabase($query);
	}

	// RESETS THE SESSION VARIABLES AND ENDS THE SESSION
	function endSession() { 
		$_SESSION = array();
		session_destroy();
	}
?>