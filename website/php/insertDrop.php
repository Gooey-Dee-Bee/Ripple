<?php
	require_once(__DIR__."/dropHelper.php"); // Allow access to the database functions

	$song_id = $_POST['song_id']; // retieve the song ID
	$email = $_POST['email'];	// retrieve user email
	$latitude = $_POST['latitude'];		// retrieve latitude
	$longitude = $_POST['longitude'];	// retrieve longitude

	if (!checkPoints($email)) {
		echo 200; // Error code to indicate that the user does not have enough points to do this drop
	}

	else {
		// Update the user with their new amount of points
		subtractDefaultPoints($email);
		insertDrop($email, $song_id, $latitude, $longitude);
	}


?>