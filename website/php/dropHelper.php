<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions
	require_once(__DIR__."/dropGeo.php"); // Allow access to the geog functions

	$defaultPoints = 10;
	$defaultreDropPoints = 5;
	$defaultDaysPassed = 7; // Number of days to check against for a user redropping their own song

	function checkPoints($email, $redrop = FALSE) {
		$points = getPoints($email);

		global $defaultPoints;
		if(!$redrop && ($points - $defaultPoints) < 0) // They don't have enough points to complete a drop
			return FALSE;
		else if($redrop && ($points - $defaultreDropPoints) < 0) 
			return FALSE;
		else
			return TRUE;
	}

	function subtractDefaultPoints($email) {
		$points = getPoints($email);

		global $defaultPoints;
		$points = $points - $defaultPoints;

		updatePoints($email, $points);
	}

	function subtractReDropPoints($email) {
		$points = getPoints($email);

		global $defaultreDropPoints;
		$points = $points - $defaultreDropPoints;

		updatePoints($email, $points);
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

	function updatePoints($email, $points) {
		$query = "UPDATE users SET points=$points WHERE email='$email'";
		addToDatabase($query);
	}

	function getPoints($email) {
		$query = "SELECT points FROM users WHERE email = '$email'";

		$points = getInfoFromDatabase($query);
		$points = $points[0]['points'];

		return $points;
	}

	function insertDrop($email, $song_id, $latitude, $longitude, $prev_id = 0) {
		$user_id = getUserIdFromEmail($email);
		$query = "INSERT INTO drops(user_id, song_id, prev_drop_id, latitude, longitude)
				  VALUES($user_id, $song_id, $prev_id, $latitude, $longitude)";
		addToDatabase($query);
	}

	function sameUserDrop($email, $song_id) {
		$user_id = getUserIdFromEmail($email);

		$query = "SELECT user_id, time_stamp FROM drops WHERE song_id = $song_id";
		$dropUserId = getInfoFromDatabase($query);

		if(isset($dropUserId[0]['user_id'])) {
			// Look through each ID returned
			// Key is what number object you are on from the return list (i.e. 0, 1, 2.....)
			// Value is the actual json key-pair value
			foreach ($dropUserId as $key => $value) {
				if($value['user_id'] == $user_id) {
					// Now we need to check if it has been over 1 week since the song was last dropped
					if(!checkIfAllotedTimeHasPassed($value['time_stamp']));
						return TRUE; // They can't redrop their own song
				}
			}
		}

		return FALSE;

	}


	function checkIfAllotedTimeHasPassed($mysqltimestamp) {
		global $defaultDaysPassed;

		$currentDay = intval(date('d', time())); // The current day in number format
		$currentMonth = intval(date('m', time()));
		$dropDay = intval(date('d', strtotime($mysqltimestamp)); // The day the song was dropped
		$dropMonth = intval(date('m', strtotime($mysqltimestamp)));

		if($currentMonth == $dropMonth && ($currentDay - $dropDay) >= $defaultDaysPassed) {
			return TRUE;
		}
		// If the months have changed, this comparison will determine if it is in range (Assume every month has 31 days)
		else if($currentMonth != $dropMonth && abs(($currentDay - $dropDay)) <= (31 - $defaultDaysPassed)) {
			return TRUE;
		}
		else
			return FALSE;
	}




?>