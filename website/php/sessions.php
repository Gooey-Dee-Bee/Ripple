<?php
	require_once(__DIR__."/databases.php");
	session_start();

	// STARTS A SESSION BY SETTING A VARIABLE SESSION
	function startSession($verifiedEmail) {
		$_SESSION['email'] = $verifiedEmail;
	}

	// VERIFIES THAT THE SESSION IS REAL
	function verifySession() {
		if(!isset($_SESSION['email']))
			return FALSE;
		else {
			$query = "SELECT * FROM users WHERE email = '".$_SESSION['email']."'";
			return existsInDatabase($query);
		}
	}

	//GETS THE INFO RELATED TO THE CURRENT SESSION AS AN ASSOCIATIVE ARRAY
	function getSessionInfo(){
		$query = "SELECT * FROM users WHERE email = '".$_SESSION['email']."'";
		return getInfoFromDatabase($query);
	}

	//DESTROYS THE CURRENT SESSION AND RESETS THE SESSION ARRAY
	function logout(){
		$_SESSION = array();
		session_destroy();
	}
?>