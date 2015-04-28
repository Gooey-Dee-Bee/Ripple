<?php
	require_once(__DIR__."/databases.php"); 

	//$post_json = file_get_contents("php://input");
	//$post = json_decode($post_json, true);

	$email = $_GET['email'];
	//$email = "c@smu.edu";

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
		$firstDrop = $result2[0]['time_stamp'];
		$lastDrop = $result2[$total - 1]['time_stamp'];
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

	$info = array(
			'email' => $email,
			'userID' => $userID,
			'points' => $points,
			'total drops' => $total,
			'first drop' => $firstDrop,
			'last drop' => $lastDrop,
			'pop latitude' => $popLat,
			'pop longitude' => $popLong,
			'locations' => $numLocs
		);

	echo json_encode($info);

?>
	



