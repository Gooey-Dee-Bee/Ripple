<?php
	require_once(__DIR__."/dropHelper.php"); // Allow access to the database functions

	$pointCounter = 1;
	//use while look to go up the user tree until previous drop id == null?
	$user;
	$drop;
	$prev_drop;

	function traceBack( $user_id, $drop_id, $prev_drop_id){
		global $user, $drop, $prev_drop, $pointCounter;

		$user = user_id;
		$drop = $drop_id;
		$prev_drop = $prev_drop_id;
		$nextPrev = "SELECT prev_drop_id FROM drops WHERE drop_id = '$prev_drop'";

		while (getInfoFromDatabase($nextPrev)!=0) {
			//get info about previous drop from database
			$prevDropUser = "SELECT user_id FROM drops WHERE drop_id = '$prev_drop'";
			$prevDropUser = getInfoFromDatabase($prevDropUser);
			//increase points by pointCounter for that user
			$query = "UPDATE users SET points = points+'$pointCounter' WHERE user_id = '$prevDropUser'";
			addToDatabase($query);
			$pointCounter += 1;
			//reset variables to be valid for the prevdrop and repeat
			$drop = getInfoFromDatabase($nextPrev);
			$query2 = "SELECT prev_drop_id FROM drops WHERE drop_id = '$drop'";
			$prev_drop = getInfoFromDatabase($query2);
		}
	}

?>