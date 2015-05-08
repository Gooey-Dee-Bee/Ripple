<?php
	require_once(__DIR__."/dropHelper.php"); // Allow access to the database functions
	require_once(__DIR__."/dropGeo.php"); // Allow access to the geography functions
	require_once(__DIR__."/pointTraceBack.php"); // Allow the points crediting system function 

	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$song_id = $post['song_id']; // retieve the song ID
	$email = $post['email'];	// retrieve user email
	$latitude = $post['latitude'];		// retrieve latitude
	$longitude = $post['longitude'];	// retrieve longitude

	if(!hasBeenDroppedInAreaBefore($song_id, $latitude, $longitude)) { // This is the first time the song has been posted
		if(!checkPoints($email)) {
			$return_result['result'] = "failure";
			$return_result['reason'] = "Not enough points";
			echo json_encode($return_result); // Error code to indicate that the user does not have enough points to do this drop
		}
		else {
			subtractDefaultPoints($email);
			insertDrop($email, $song_id, $latitude, $longitude);
			// THIS ASSUMES IT WORKS -- WILL NEED REVISION
			$return_result['result'] = "success";
			echo json_encode($return_result);
		}
	}

	 else {	// The song is in the database for this area, so it is a redrop
	 	if(!checkPoints($email, TRUE)) { // Not enough points to do a redrop
			$return_result['result'] = "failure";
			$return_result['reason'] = "Not enough points";
			echo json_encode($return_result);
	 		return;
	 	}
	 	
	 	if(!sameUserDrop($email, $song_id)) { // No record of the user dropping this song in the last 24 hours

	 		if(checkIfUserHasDroppedBefore($email, $song_id)) {
	 			// The user has dropped this song before, so no one gets points
				$prev_id = getPrevDropId($song_id, $latitude, $longitude);
				insertDrop($email, $song_id, $latitude, $longitude, $prev_id);
				subtractReDropPoints($email);
				// THIS ASSUMES IT WORKS -- WILL NEED REVISION
				$return_result['result'] = "success";
				echo json_encode($return_result);
			}
			else {
				// The user has not dropped this song before, so points will be given
				$prev_id = getPrevDropId($song_id, $latitude, $longitude);
				traceBack($prev_id);
				insertDrop($email, $song_id, $latitude, $longitude, $prev_id);
				subtractReDropPoints($email);
				// THIS ASSUMES IT WORKS -- WILL NEED REVISION
				$return_result['result'] = "success";
				echo json_encode($return_result);
			}
			
		}

		else {
			$return_result['result'] = "failure";
			$return_result['reason'] = "User's song";
			echo json_encode($return_result); // User attempted to drop their own song in under 24 hours.
		}
	}

?>