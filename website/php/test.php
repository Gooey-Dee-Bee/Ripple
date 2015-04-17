<?php
	require_once(__DIR__."/databases.php");

	$query = "SELECT * FROM users";
	$result = getInfoFromDatabase($query);
	$final = array();
	while($r = mysqli_fetch_assoc($result)) {
		$final[] = $r;
	}

	echo json_encode($final[0]["email"]);


?>