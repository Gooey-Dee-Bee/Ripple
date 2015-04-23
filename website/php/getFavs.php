<?php
	require_once(__DIR__."/databases.php"); 

	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$userID = $_GET['user_id'];

	$query = "SELECT drop_id FROM favorites WHERE user_id = $userID";

	$result = getInfoFromDatabase($query);

	if(mysql_num_rows($result) == 0){
		echo "does not exist";
	} else {
		echo json_encode($result);
	}



?>