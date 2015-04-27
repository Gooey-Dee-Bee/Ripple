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
		if(!sameUserDrop($email, $song_id)) { // No record of the song dropped in the last 24 hours
			subtractDefaultPoints($email);
			insertDrop($email, $song_id, $latitude, $longitude);
		}

		else
			echo 300; // Error code for same link posing
	}


?>