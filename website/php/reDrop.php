<?php
	require_once(__DIR__."/dropHelper.php"); // Allow access to the database functions
	require_once(__DIR__."/dropGeo.php"); // Allow access to the geography functions

	$song_id = $_POST['song_id']; // retieve the song ID
	$email = $_POST['email'];	// retrieve user email
	$latitude = $_POST['latitude'];		// retrieve latitude
	$longitude = $_POST['longitude'];	// retrieve longitude


	if (!checkPoints($email)) {
		echo 200; // Error code to indicate that the user does not have enough points to do this drop
	}
	 else {	
	 	if(!sameUserDrop($email, $song_id)) { // Make sure it is not the same user trying to re-drop their song
			$prev_id = getPrevDropId($song_id, $latitude, $longitude);
			if($prev_id == "Error")
				echo "No Previous ID was found. This should not be possible.";
			else {
				insertDrop($email, $song_id, $latitude, $longitude, $prev_id);
				subtractReDropPoints($email);
			}
		}

		else
			echo 300; // User attempted to drop their own song agian.
	}

?>