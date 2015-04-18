<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions

	$defaultPoints = 10;

	function checkPoints($email) {
		$points = getPoints($email);

		if(($points - $defaultPoints) < 0) // They don't have enough points to complete a drop
			return FALSE;
		else
			return TRUE;
	}

	function subtractDefaultPoints($email) {
		$points = getPoints($email);

		$points = $points - $defaultPoints;

		updatePoints($email, $points);
	}


	function updatePoints($email, $points) {
		$query = "UPDATE users SET points=$points WHERE email='$email'";
		addToDatabase($query);
	}

	function getPoints($email) {
		$query = "SELECT points FROM users WHERE email = '$email'";

		$points = getInfoFromDatabase($query);
		$points = $points[0]['points'];

		return $points
	}



?>