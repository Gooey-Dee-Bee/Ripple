<?php
	require_once(__DIR__."/dropHelper.php"); // Allow access to the database functions

	$song_id = $_POST['song_id']; // retieve the song ID
	$email = $_POST['email'];	// retrieve user email
	$latitude = $_POST['latitude'];		// retrieve latitude
	$longitude = $_POST['longitude'];	// retrieve longitude

	//use while look to go up the user tree until previous drop id == null?
	if(!sameUserDrop($email, $song_id)){

	}

	if (!checkPoints($email)) {
		echo 200; // Error code to indicate that the user does not have enough points to do this drop
	}

	else {
		if(!sameUserDrop($email, $song_id)) { // Make sure the same user is not posting a link multiple times
			subtractDefaultPoints($email);
			insertDrop($email, $song_id, $latitude, $longitude);
		}

		else
			echo 300; // Error code for same link posing
	}


?>