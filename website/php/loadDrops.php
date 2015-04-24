<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions
	
	require_once(__DIR__."/dropGeo.php");
	$latitude = $_POST['latitude'];		// retrieve latitude
	$longitude = $_POST['longitude'];	// retrieve longitude

	// echo "\n";
	// echo $latitude;
	// echo "\n";
	// echo $longitude;
	// echo "\n";
	$viewableRegion = getSurroundingArea($latitude, $longitude);
	// echo json_encode($viewableRegion);
	// echo "\n";

	$result;
	if(isset($_GET['user_id'])) { // This is to load the drops from a certain user only
		$user_id = $_GET['user_id'];
		$query = "SELECT song_id FROM drops WHERE user_id = $user_id ORDER BY time_stamp";
		$result = getInfoFromDatabase($query);
	
	}

	else { // Load all drops in the database
		$query = "SELECT song_id, latitude, longitude FROM drops GROUP BY song_id ORDER BY time_stamp DESC";
		
		$results = getInfoFromDatabase($query); // Returns the data as an associative array
		$viewableSongs =  array();
		for($i = 0; $i < count($results); $i++)
		{
			if(inViewableRegion($results[$i]['latitude'],$results[$i]['longitude'], $viewableRegion) == TRUE)
			{
				// echo json_encode(inViewableRegion($results[$i]['latitude'],$results[$i]['longitude'], $viewableRegion));
				// echo "\n";
				$newArray = array('song_id' => $results[$i]['song_id']);
				array_push($viewableSongs, $newArray);
				#unset($results[$i]);
			}

			if(count($viewableSongs) >= 10)
				break;
		}

		#echo json_encode($viewableSongs);
	}

	echo json_encode($viewableSongs); // Returns the song ID in reverse chronological order (the first entry was dropped the longest time ago)
?>