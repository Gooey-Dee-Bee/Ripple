<?php
	require_once(__DIR__."/databases.php");

	$lat = $_GET['latitude'];
	$long = $_GET['long'];
	$roundLat = round($lat);
	$roundLong = round($long);
	$today = date("Y-m-d");
	$today = $today . "%";

	//all songIDs and timestamps for specific area
	$query1 = getInfoFromDatabase(
		"SELECT song_id, time_stamp
		FROM drops
		WHERE latitude = '$lat'
		AND longitude ='$long'");
	$totalSpec = count($query1);
	if($totalSpec == 0){
		echo 404; //location does not exist bro
		exit;
	}
	echo json_encode($query1);
	$query2 = getInfoFromDatabase(
		"SELECT count(drop_id) as c
		FROM drops
		WHERE latitude = '$lat'
		AND longitude = '$long'
		AND time_stamp LIKE '$today'");
	$specToday = $query2[0]['c'];

		//all songIDs and timestamps for specific area
	$query3 = getInfoFromDatabase(
		"SELECT song_id, time_stamp
		FROM drops
		WHERE latitude = '$roundLat'
		AND longitude ='$roundLong'");
	$totalGen = count($query3);
	echo json_encode($query3);
	$query4 = getInfoFromDatabase(
		"SELECT count(drop_id) as c
		FROM drops
		WHERE latitude = '$roundLat'
		AND longitude = '$roundLong'
		AND time_stamp LIKE '$today'");
	$genToday = $query4[0]['c'];

	$info = array (
		'totalSpec' => $totalSpec,
		'specToday' => $specToday,
		'totalGen' => $totalGen,
		'genToday' => $genToday
		);





?>