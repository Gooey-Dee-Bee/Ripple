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

		$query = 'SELECT * FROM song WHERE song_id = $song_id';
		if(!existsInDatabase($query)) { // Checking to see if this entry already exists in the song table
			$query = "INSERT INTO song VALUES($song_id, 1, 'filler', 'filler.com')"; // Lots of filler stuff that will hopefully be fixed
			addToDatabase($query);
		}

		// Get the user ID so it can be stored in the drops table
		$user_id = getInfoFromDatabase("SELECT user_id FROM users WHERE email = '$email'"); //user_id
		$user_id = mysqli_fetch_assoc($user_id);
		$user_id = $user_id['user_id'];

		$query = "INSERT INTO drops(user_id, song_id, latitude, longitude) VALUES($user_id, $song_id, $latitude, $longitude)"; // The new drop entry
		addToDatabase($query);
	}


?>