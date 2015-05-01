<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions
	require_once(__DIR__."/dropGeo.php"); // Allow access to the geog functions

	$defaultPoints = 10;
	$defaultreDropPoints = 5;

	function checkPoints($email, $redrop = FALSE) {
		$points = getPoints($email);

		global $defaultPoints, $defaultreDropPoints;
		if(!$redrop && ($points - $defaultPoints) < 0) // They don't have enough points to complete a drop
			return FALSE;
		else if($redrop && ($points - $defaultreDropPoints) < 0) 
			return FALSE;
		else
			return TRUE; // They have enough points to complete the drop
	}

	function subtractDefaultPoints($email) {
		global $defaultPoints;
		subtractPoints($email, $defaultPoints);
	}

	function subtractReDropPoints($email) {
		global $defaultreDropPoints;
		subtractPoints($email, $defaultreDropPoints);
	}

	function getPrevDropId($song_id, $latitude, $longitude) {
		$surrArea = getSurroundingArea($latitude, $longitude);
		$query = "SELECT drop_id, latitude, longitude FROM drops WHERE song_id = $song_id ORDER BY time_stamp DESC";
		$redrop = getInfoFromDatabase($query);

		foreach ($redrop as $key => $value) {
			if(inViewableRegion($value['latitude'], $value['longitude'], $surrArea)) {
				return $value['drop_id'];
			}
		}

			return "Error";
	}

	function hasBeenDroppedInAreaBefore($song_id, $latitude, $longitude) {
		$query = "SELECT * FROM drops WHERE song_id = $song_id";
		$pastDrops = getInfoFromDatabase($query);
		$surrArea = getSurroundingArea($latitude, $longitude);

		foreach ($pastDrops as $key => $value) {
			if(inViewableRegion($value['latitude'], $value['longitude'], $surrArea))
				return TRUE;			
		}
		return FALSE;
	}

	function addToTotalPoints($email, $points) {
		$query = "UPDATE users SET total_points = total_points + $points WHERE email = '$email'";
		addToDatabase($query);
	}

	function addPoints($email, $points) {
		$query = "UPDATE users SET points = points + $points WHERE email = '$email'";
		addToDatabase($query);
	}

	function subtractPoints($email, $points) {
		$query = "UPDATE users SET points = points - $points WHERE email = '$email'";
		addToDatabase($query);
	}

	function getPoints($email) {
		$query = "SELECT points FROM users WHERE email = '$email'";

		$points = getInfoFromDatabase($query);
		return $points[0]['points'];
	}

	function insertDrop($email, $song_id, $latitude, $longitude, $prev_id = 0) {
		$user_id = getUserIdFromEmail($email);
		$query = "INSERT INTO drops(user_id, song_id, prev_drop_id, latitude, longitude)
				  VALUES($user_id, $song_id, $prev_id, $latitude, $longitude)";
		addToDatabase($query);
	}

	function sameUserDrop($email, $song_id) { // This determines if the user dropped the song more than 24 hours ago
		$user_id = getUserIdFromEmail($email);

		// This query makes sure atleast 24 hours has elapsed before the same user can drop his/her own song
		$query = "SELECT user_id FROM drops WHERE DATEDIFF(NOW(), time_stamp) <= 1 AND song_id = $song_id";
		$dropUserId = getInfoFromDatabase($query);

		if(isset($dropUserId[0]['user_id'])) {
			// Look through each ID returned
			// Key is what number object you are on from the return list (i.e. 0, 1, 2.....)
			// Value is the actual json key-pair value
			foreach ($dropUserId as $key => $value) {
				if($value['user_id'] == $user_id) {
					return TURE;
				}
			}
		}

		return FALSE;

	}

	function checkIfUserHasDroppedBefore($email, $song_id) { // See if this user has dropped this song before
		$user_id = getUserIdFromEmail($email);
		$query = "SELECT * FROM drops WHERE user_id = $user_id AND song_id = $song_id";
		return existsInDatabase($query);
	}


?>