<?php
	require_once(__DIR__."/databases.php");

	// $lat = $_GET['latitude'];
	// $long = $_GET['longitude'];
	// //$lat = 32.846;
	// //$long = -96.7837;
	// $roundLat = round($lat);// . "%";
	// $roundLong = round($long);// . "%";
	// //echo $roundLat . " and " . $roundLong . "\n<br />";
	// $today = date("Y-m-d");
	// $today = $today . "%";

	// //all dropIds, songIDs and timestamps for specific area
	// $query1 = getInfoFromDatabase(
	// 	"SELECT drop_id, song_id, time_stamp
	// 	FROM drops
	// 	WHERE round(latitude, 5) = round($lat, 5)
	// 	AND round(longitude, 5) = round($long, 5)");
	// //echo CAST(latitude as decimal) . " vs " . CAST($lat as decimal) . "\n<br />";
	// 	//AND CAST(longitude as decimal) = CAST($long as decimal)
	// $totalSpec = count($query1);
	// if($totalSpec == 0){
	// 	echo 404; //location does not exist bro
	// 	exit;
	// }
	// echo json_encode($query1);
	// $query2 = getInfoFromDatabase(
	// 	"SELECT count(drop_id) as c
	// 	FROM drops
	// 	WHERE round(latitude, 5) = round($lat, 5)
	// 	AND round(longitude, 5) = round($long, 5)
	// 	AND time_stamp LIKE '$today'");
	// $specToday = $query2[0]['c'];

	// 	//all dropIDs, songIDs and timestamps for rounded area
	// $query3 = getInfoFromDatabase(
	// 	"SELECT drop_id, song_id, time_stamp
	// 	FROM drops
	// 	WHERE round(latitude) = '$roundLat'
	// 	AND round(longitude) = '$roundLong'");
	// $totalGen = count($query3);
	// echo "\n<br />";
	// echo json_encode($query3);
	// $query4 = getInfoFromDatabase(
	// 	"SELECT count(drop_id) as c
	// 	FROM drops
	// 	WHERE round(latitude) = '$roundLat'
	// 	AND round(longitude) = '$roundLong'
	// 	AND time_stamp LIKE '$today'");
	// $genToday = $query4[0]['c'];

	// $info = array (
	// 	'totalSpec' => $totalSpec,
	// 	'specToday' => $specToday,
	// 	'totalGen' => $totalGen,
	// 	'genToday' => $genToday
	// 	);
	// echo "\n<br />";
	// echo json_encode($info);

	// echo "\n<br />";
	// echo "\n<br />";
	// $final = array('specific list' => $query1, 'general list' => $query3, 'gen info' => $info);
	// echo json_encode($final);

	$latitude = $_GET['latitude'];
	$longitude = $_GET['longitude'];
	$distance = $_GET['distance']; // In Miles

	// 3959 represents the earth's radius. Change it to the correct amount in the preferred units of choice
	// (i.e 6371 for KM)
	$haversineQuery = "SELECT song_id, 
		(3959 * acos(cos(radians($latitude)) * cos(radians(latitude)) * cos(radians(longitude) - radians($longitude)) 
		+ sin(radians($latitude)) * sin(radians(latitude)))) AS distance FROM drops 
		GROUP BY song_id HAVING distance < $distance ORDER BY distance";

	$specificLocationResults = getInfoFromDatabase($haversineQuery);
	// Song id's and their distance from the passed in Latitude and Longitude. Orderd by closest song at sub[0]
	echo json_encode($specificLocationResults); 
?>