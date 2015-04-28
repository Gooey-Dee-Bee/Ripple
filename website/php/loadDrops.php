<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions
	require_once(__DIR__."/dropGeo.php");

	// ADDED BY WILL FOR IOS APP

	$request_body = file_get_contents('php://input');
	$data = json_decode($request_body);

	if (isset($data->latitude)) {
		$latitude = $data->latitude;
		$longitude = $data->longitude;
	}


    else {
		$latitude = $_POST["latitude"];		// retrieve latitude
		$longitude = $_POST["longitude"];	// retrieve longitude
    }

	$viewableRegion = getSurroundingArea($latitude, $longitude);

	if(isset($_POST['user_id'])) { // This is to load the drops from a certain user only
		$user_id = $_POST['user_id'];
		$query = "SELECT song_id FROM drops WHERE user_id = $user_id ORDER BY time_stamp";
		$result = getInfoFromDatabase($query);	
		echo json_encode($result);
	}

	else { // Load all drops in the database
		$query = "SELECT song_id, latitude, longitude FROM drops GROUP BY song_id ORDER BY MAX(time_stamp) DESC";
		
		$results = getInfoFromDatabase($query); // Returns the data as an associative array
		$viewableSongs =  array();
		for($i = 0; $i < count($results); $i++) {
			if(inViewableRegion($results[$i]['latitude'],$results[$i]['longitude'], $viewableRegion) == TRUE) {
				$newArray = array('song_id' => $results[$i]['song_id']);
				array_push($viewableSongs, $newArray);
			}

			if(count($viewableSongs) >= 50)
				break;
		}

		// Returns the song ID in reverse chronological order (the first entry was dropped the longest time ago)
		echo json_encode(array_reverse($viewableSongs)); 

	}

?>