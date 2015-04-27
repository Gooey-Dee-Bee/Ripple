<?php
	require_once(__DIR__."/dropHelper.php"); // Allow access to the drop functions
	require_once(__DIR__."/databases.php"); // Allow access to the database functions

	$point_limit = 10;
	$id_query;
	$drop_id_query;
	$email_query;

	function traceBack($prev_drop_id){
		global $point_limit, $id_query, $drop_id_query, $email_query;
		$pointCounter = 1;

		// It is possible for a user to redrop a song multiple times, so they can
		// Show up multiple times during the reDrop point chaining, so we must
		// Keep track of the user id's that have been accredited points so we don't
		// Keep crediting the same user with points.
		$pastUserId = array();


		setIdQuery($prev_drop_id);
		$result = getInfoFromDatabase($id_query); // Get the user ID
		$result = $result[0]['user_id'];
		while($result != 0) { // While there are still valid user_id's to be added

			setEmailQuery($result);
			$user_email = getInfoFromDatabase($email_query); // Get the users email for adding points below
			$user_email = $user_email[0]['email'];


			// Only give points if the user hasn't received points during this process. This prevents a user that has
			// redropped their own song from continuously getting points added to themselves.
			if(!in_array($result, $pastUserId)) {
				$points = getPoints($user_email);
				$points += $pointCounter; // Add the appropriate amount of points
				updatePoints($user_email, $points); // Points have been credited

				if($pointCounter < $point_limit) // Increment point counter appropriately
					$pointCounter += 1;

				$pastUserId[] = $result; // Add the user_id to the list
			}


			setDropIdQuery($prev_drop_id);
			$prev_drop_id = getInfoFromDatabase($drop_id_query); // Get the next drop ID
			$prev_drop_id = $prev_drop_id[0]['prev_drop_id'];


			setIdQuery($prev_drop_id);
			$result = getInfoFromDatabase($id_query);
			$result = $result[0]['user_id'];

		}
	}

	// This will get the user_id associated with the previous drop
	function setIdQuery($prev_drop_id) {
		global $id_query;
		$id_query = "SELECT user_id FROM drops WHERE drop_id = $prev_drop_id";
	}

	// This will get the next previous drop id so we can get the next user id to give points
	function setDropIdQuery($prev_drop_id) {
		global $drop_id_query;
		$drop_id_query = "SELECT prev_drop_id FROM drops WHERE drop_id = $prev_drop_id";
	}

	// This is just to get the email so we can use dropHelper functions that take an email parameter
	function setEmailQuery($user_id) {
		global $email_query;
		$email_query = "SELECT email FROM users WHERE user_id = $user_id";
	}

?>