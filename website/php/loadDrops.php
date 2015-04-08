<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions

	$query = "SELECT song_id FROM drops"; // For now, just returns everything that is in the drop database

	$result = getInfoFromDatabase($query); // Returns the data as an associative array

	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
	    $rows[] = $r;
	}

	echo json_encode($rows);


?>