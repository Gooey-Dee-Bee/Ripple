<?php
	require_once(__DIR__."/databases.php");

	//$lat = $_GET['latitude'];
	//$long = $_GET['long'];
	$lat = '32.846';
	$long = '-96.7837';
	$roundLat = round($lat) . "%";
	$roundLong = round($long) . "%";
	$today = date("Y-m-d");
	$today = $today . "%";

	//all dropIds, songIDs and timestamps for specific area
	$query1 = getInfoFromDatabase(
		"SELECT drop_id, song_id, time_stamp
		FROM drops
		WHERE CAST(latitude as decimal)= CAST($lat as decimal)
		AND CAST(longitude as decimal) = CAST($long as decimal)");
	$totalSpec = count($query1);
	if($totalSpec == 0){
		echo 404; //location does not exist bro
		exit;
	}
	echo json_encode($query1);
	$query2 = getInfoFromDatabase(
		"SELECT count(drop_id) as c
		FROM drops
		WHERE CAST(latitude as decimal)= CAST($lat as decimal)
		AND CAST(longitude as decimal) = CAST($long as decimal)
		AND time_stamp LIKE '$today'");
	$specToday = $query2[0]['c'];

		//all dropIDs, songIDs and timestamps for rounded area
	$query3 = getInfoFromDatabase(
		"SELECT drop_id, song_id, time_stamp
		FROM drops
		WHERE round(latitude)= '$roundLat'
		AND round(longitude) = '$roundLong'");
	$totalGen = count($query3);
	echo "\n<br />";
	echo json_encode($query3);
	$query4 = getInfoFromDatabase(
		"SELECT count(drop_id) as c
		FROM drops
		WHERE round(latitude) = '$roundLat'
		AND round(longitude) = '$roundLong'
		AND time_stamp LIKE '$today'");
	$genToday = $query4[0]['c'];

	$info = array (
		'totalSpec' => $totalSpec,
		'specToday' => $specToday,
		'totalGen' => $totalGen,
		'genToday' => $genToday
		);
	echo "\n<br />";
	echo json_encode($info);

	echo "\n<br />";
	echo "\n<br />";
	$final = array('specific list' => $query1, 'general list' => $query3, 'gen info' => $info);
	echo json_encode($final);







?>