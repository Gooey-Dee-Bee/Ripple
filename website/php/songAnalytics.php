<?php
	require_once(__DIR__."/databases.php");

	$songID = $_GET['song_id'];
	//$songID =  136949481;

	$result = getInfoFromDatabase(
		"SELECT email, latitude, longitude, time_stamp
		FROM drops NATURAL JOIN users
		WHERE song_id = '$songID'
		ORDER BY time_stamp");

	$total = count($result);
	if($total == 0){
		echo 404;
		exit;
	}

	$last = $total - 1;

	$result2 = getInfoFromDatabase(
		"SELECT latitude, longitude, count(*) as c
		FROM drops
		WHERE song_id = '$songID'
		GROUP BY latitude, longitude
		ORDER BY c");
	$totLoc = count($result2);
	$popLat = $result2[0]['latitude'];
	$popLong = $result2[0]['longitude'];
	


	/*echo json_encode($result);
	echo "\n<br />";
	echo $last;
	echo "\n<br />";
	echo $result[0]['time_stamp'];
	echo "\n<br />";
	echo $result[$last]['time_stamp'];*/

	$info = array(
		'firstUser' => $result[0]['email'],
		'firstLat' => $result[0]['latitude'],
		'firstLong' => $result[0]['longitude'],
		'firstTime' => $result[0]['time_stamp'],
		'lastLat' => $result[$last]['latitude'],
		'lastLong' => $result[$last]['longitude'],
		'lastTime' => $result[$last]['time_stamp'],
		'count' => $total, //number of drops total
		'numOrigDrops' => $totLoc, //number of different locations
		'popLat' => $popLat,
		'popLong' => $popLong);

	//echo "\n<br />";

	echo json_encode($info);
	
?>