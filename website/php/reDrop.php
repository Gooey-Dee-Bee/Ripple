<?php
	require_once(__DIR__."/dropHelper.php"); // Allow access to the database functions
	require_once(__DIR__."/dropGeo.php"); // Allow access to the geography functions
	require_once(__DIR__."/pointTraceBack.php"); // Allow the points crediting system function 
	require_once(__DIR__."/databases.php"); // Allow access to the database functions

	$song_id = $_POST['song_id']; // retieve the song ID
	$email = $_POST['email'];	// retrieve user email
	$latitude = $_POST['latitude'];		// retrieve latitude
	$longitude = $_POST['longitude'];	// retrieve longitude


	if(!existsInDatabase("SELECT * FROM drops WHERE song_id = $song_id")) { // This is the first time the song has been posted
		if(!checkPoints($email))
			echo 200; // Error code to indicate that the user does not have enough points to do this drop
		else {
			subtractDefaultPoints($email);
			insertDrop($email, $song_id, $latitude, $longitude);
		}
	}

	 else {	// The song is in the database, so it is a redrop
	 	if(!checkPoints($email, TRUE)) { // Not enough points to do a redrop
	 		echo 200;
	 		return;
	 	}
	 	
	 	if(!sameUserDrop($email, $song_id)) { // No record of the user dropping this song in the last 24 hours

	 		if(checkIfUserHasDroppedBefore($email, $song_id)) {
	 			// The user has dropped this song before, so no one gets points
				$prev_id = getPrevDropId($song_id, $latitude, $longitude);
				insertDrop($email, $song_id, $latitude, $longitude, $prev_id);
				subtractReDropPoints($email);
			}
			else {
				// The user has not dropped this song before, so points will be given
				$prev_id = getPrevDropId($song_id, $latitude, $longitude);
				traceBack($prev_id);
				insertDrop($email, $song_id, $latitude, $longitude, $prev_id);
				subtractReDropPoints($email);
			}
			
		}

		else
			echo 300; // User attempted to drop their own song in under 24 hours.
	}

?>