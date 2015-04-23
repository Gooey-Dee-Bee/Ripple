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
		
	// 	// Credits the previous 'droppers' with their points
	// 	$previous_drops = "SELECT user_id FROM drops WHERE song_id = $song_id ORDER BY time_stamp DESC";
	// 	$result = getInfoFromDatabase($previous_drops);
	// 	$previous_drops = array();
	// 	while($r = mysqli_fetch_assoc($result)) {
	// 	    $previous_drops[] = $r;
	// 	}
	// 	foreach ($previous_drops as $current_iteration => $value) {

	// 		$cur_user_id = $value['user_id'];
	// 		$query = "SELECT points FROM users WHERE user_id = $cur_user_id";
	// 		$points = getInfoFromDatabase($query);
	// 		$points = mysqli_fetch_assoc($points);
	// 		$points = $points['points'];

	// 		$points += ($current_iteration + 1);
	// 		$query = "UPDATE users SET points = $points WHERE user_id = $cur_user_id";
	// 		addToDatabase($query);
	// 	}		

	 	if(!sameUserDrop($email, $song_id)) { // Make sure it is not the same user trying to re-drop their song
			$prev_id = getPrevDropId($song_id);
			insertDrop($email, $song_id, $latitude, $longitude, $prev_id);
			subtractReDropPoints($email);
		}

		else
			echo 300; // User attempted to drop their own song agian.
	}

?>