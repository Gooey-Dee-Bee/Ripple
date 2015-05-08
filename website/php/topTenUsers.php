<?php
	require_once(__DIR__."/databases.php");

	$query = "SELECT email, user_id, points, count(user_id) as numDrops
				FROM drops NATURAL JOIN users
				GROUP BY user_id 
				ORDER BY numDrops desc
				LIMIT 10";

	$result = getInfoFromDatabase($query);

	 $final = array();
	 foreach ($result as $key => $value) {
	 	$user_id = $value['user_id'];
		$query = "SELECT count(song_id) as cs
	 			  FROM drops WHERE prev_drop_id != 0 AND user_id = $user_id";
		$redrop = getInfoFromDatabase($query);
	 	$final[] = array(
	 		'email' => $value['email'],
	 		'points' => $value['points'],
	 		'numDrops' => $value['numDrops'],
	 		'numReDrops' => $redrop[0]['cs']
	 		);
	 }
	 //returns email address as email, points as points 
	 //number of drops as numDrops and number of redrops (not their original song) as numReDrops
	 echo json_encode($final);

?>