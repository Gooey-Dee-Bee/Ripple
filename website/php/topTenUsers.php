<?php
	require_once(__DIR__."/databases.php");

	$query = "SELECT email, points, count(user_id) as numDrops
				FROM drops NATURAL JOIN users
				GROUP BY user_id 
				ORDER BY numDrops desc
				LIMIT 10";

	$result = getInfoFromDatabase($query);


	//returns email address as email, points as points, and number of drops as numDrops
	echo json_encode($result);

?>