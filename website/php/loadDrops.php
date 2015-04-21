<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions


	$result;
	if(isset($_GET['user_id'])) { // This is to load the drops from a certain user only
		$user_id = $_GET['user_id'];
		$query = "SELECT song_id FROM drops WHERE user_id = $user_id ORDER BY time_stamp";
		$result = getInfoFromDatabase($query);
	}

	else { // Load all drops in the database
		$query = "SELECT DISTINCT song_id FROM drops ORDER BY time_stamp LIMIT 10"; // For now, just returns everything that is in the drop database
		$result = getInfoFromDatabase($query); // Returns the data as an associative array
	}

	echo json_encode($result); // Returns the song ID in reverse chronological order (the first entry was dropped the longest time ago)
?>