<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions
	require_once(__DIR__."/dropGeo.php");
	$latitude = $_POST['latitude'];		// retrieve latitude
	$longitude = $_POST['longitude'];	// retrieve longitude

	$viewableRegion = getSurroundingArea($latitude, $longitude);

	$result;
	if(isset($_GET['user_id'])) { // This is to load the drops from a certain user only
		$user_id = $_GET['user_id'];
		$query = "SELECT song_id FROM drops WHERE user_id = $user_id ORDER BY time_stamp";
		$result = getInfoFromDatabase($query);
	}

	else { // Load all drops in the database
		$query = "SELECT DISTINCT song_id, latitude, longitude FROM drops ORDER BY time_stamp LIMIT 10"; // For now, just returns everything that is in the drop database
		
		$results = getInfoFromDatabase($query); // Returns the data as an associative array
		
		for($i = 0; $i < count($results); $i = $i + 1)
		{
	
		}

		echo json_encode($results);
	}

	#echo json_encode($results); // Returns the song ID in reverse chronological order (the first entry was dropped the longest time ago)
?>