<?php
	require_once(__DIR__."/databases.php");

	$query = "SELECT email, points, count(user_id), as numDrops
				FROM drops NATURAL JOIN users
				GROUP BY user_id 
				ORDER BY numDrops desc
				LIMIT 10";

	$result = getInfoFromDatabase($query);

	// ATTEMPT TO RETURN THE NUMBER OF REDROPS FOR EACH PERSON
	// $reDropArray = array();
	// foreach ($result as $key => $value) {
	// 	$user_id = $value['user_id'];
	// 	echo "USER_ID: $user_id";
	// 	$query = "SELECT count(song_id) AS reDrop, email
	// 			  FROM drops NATURAL JOIN users WHERE prev_drop_id != 0 AND user_id = $user_id";
	// 	$redrop = getInfoFromDatabase($query);
	// 	if(!empty($redrop))
	// 		$reDropArray[] = $redrop[0];
	// }


	//returns email address as email, points as points, and number of drops as numDrops
	echo json_encode($result);


?>