<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions

	$song_id = $_POST['song_id']; // retieve the song ID
	$email = $_POST['email'];	// retrieve user email
	$latitude = $_POST['latitude'];		// retrieve latitude
	$longitude = $_POST['longitude'];	// retrieve longitude
	$defaultPoints = 10;


	// Subtract DEFAULT value of points from user
	$query = "SELECT points FROM users WHERE email = '$email'";
	$points = getInfoFromDatabase($query);
	$points = mysqli_fetch_assoc($points);
	$points = $points['points'];
	$points = $points - $defaultPoints;


	if ($points < 0) {
		echo 200; // Error code to indicate that the user does not have enough points to do this drop
	}

	else {
		// Update the user with their new amount of points
		$query = "UPDATE users SET points=$points WHERE email='$email'";
		addToDatabase($query);

		// Get the user ID so it can be stored in the drops table
		$user_id = getInfoFromDatabase("SELECT user_id FROM users WHERE email = '$email'"); //user_id
		$user_id = mysqli_fetch_assoc($user_id);
		$user_id = $user_id['user_id'];

		// Credits the previous 'droppers' with their points
		$previous_drops = "SELECT user_id FROM drops WHERE song_id = $song_id ORDER BY time_stamp DESC";
		$result = getInfoFromDatabase($previous_drops);
		$previous_drops = array();
		while($r = mysqli_fetch_assoc($result)) {
		    $previous_drops[] = $r;
		}
		foreach ($previous_drops as $current_iteration => $value) {

			$cur_user_id = $value['user_id'];
			$query = "SELECT points FROM users WHERE user_id = $cur_user_id";
			$points = getInfoFromDatabase($query);
			$points = mysqli_fetch_assoc($points);
			$points = $points['points'];

			$points += ($current_iteration + 1);
			$query = "UPDATE users SET points = $points WHERE user_id = $cur_user_id";
			addToDatabase($query);
		}

		// Get the most recent drop of this song to use as the prev_song_id
		$query1 = "SELECT drop_id FROM drops WHERE song_id = $song_id ORDER BY time_stamp DESC";
		$redrop = getInfoFromDatabase($query1);
		$redrop = mysqli_fetch_assoc($redrop);
		$redrop = $redrop['drop_id'][0]; 

		$query = "INSERT INTO drops(user_id, song_id, prev_drop_id, latitude, longitude) VALUES($user_id, $song_id, $redrop, $latitude, $longitude)"; // The new drop entry
		addToDatabase($query);
	}

?>