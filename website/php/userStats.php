<?php
	require_once(__DIR__."/databases.php"); 


	$email = $_GET['email'];


	$query1 = "SELECT user_id, points FROM users WHERE email = '$email'";
	$result1 = getInfoFromDatabase($query1);
	if(count($result1) == 0){
		echo 404; //okay there needs to be an error if the search is not legit...
		exit; //my current method for not executing the rest of script...
	}

	$userID = $result1[0]['user_id'];
	$points = $result1[0]['points'];

	$query2 = "SELECT time_stamp 
				FROM drops 
				WHERE user_id = '$userID'
				ORDER BY time_stamp desc";
	$result2 = getInfoFromDatabase($query2);
	$total = count($result2);
	if($total == 0){
		$firstDrop = "no drops";
		$lastDrop = "no drops";
	} else {
		$firstDrop = $result2[$total - 1]['time_stamp'];
		$lastDrop = $result2[0]['time_stamp'];
	}

	$query3 = "SELECT latitude, longitude, count(*) as c
				FROM drops
				WHERE user_id = '$userID'
				GROUP BY latitude, longitude
				ORDER BY c";
	$result3 = getInfoFromDatabase($query3);
	$numLocs = count($result3);
	$popLat = $result3[0]['latitude'];
	$popLong = $result3[0]['longitude'];
	//more than one location, return true. else, false.
	if($numLocs > 1){
		$numLocs = true;
	} else {
		$numLocs = false;
	}
	//total points
	$totalQuery = "SELECT total_points FROM users WHERE email = '$email'";
	$totalpoints = getInfoFromDatabase($totalQuery);
	$totalpoints = $totalpoints[0]['total_points'];
	$totalpoints = $totalpoints - 50; // Remove the starting # of points to accurately represent total number of points earned
	//if user has bought points
	$purchaseQuery = "SELECT user_id FROM payment WHERE user_id = '$userID'";
	$purchaseQuery = getInfoFromDatabase($purchaseQuery);
	if (sizeof($purchaseQuery)>0){
		$purchaseQuery = 1;
	} else {
		$purchaseQuery = 0;
	}

	$query5 = "SELECT count(*) as c FROM drops
				WHERE user_id = '$userID'
				AND prev_drop_id != 0";
	$result5 = getInfoFromDatabase($query5);
	$numReDrops = $result5[0]['c'];

	$info = array(
			'email' => $email,
			'points' => $points,
			'total points' => $totalpoints,
			'purchased points' => $purchaseQuery,
			'total drops' => $total,
			'total redrops' => $numReDrops,
			'first drop' => $firstDrop,
			'last drop' => $lastDrop,
			'pop latitude' => $popLat,
			'pop longitude' => $popLong,
			'locations' => $numLocs
		);

	echo json_encode($info);

?>
	



