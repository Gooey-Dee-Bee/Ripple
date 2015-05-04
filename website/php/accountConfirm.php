<?php
 	require_once(__DIR__."/dropHelper.php"); // Allow access to the drop functions
 	require_once(__DIR__."/databases.php"); // Allow access to the database functions

 	$html_start = "<html><head><title>Account Confirmation</title></head><body>";
 	$html_end   = "</body></html>";
 	$site_path = "http://192.168.10.10/ripple/index.html";

 	$html_error = "<h2>An Error Occured</h2><p>An error occured in processing your account.
 					Please make sure the link in your URL exactly matches the one sent via email.</br>
 					If this problem persists, please contact the system administrator.</p>";

 	$html_success = "<h2>Confirmation Successful!</h2><p>Your account was successfully confirmed.
 					 Please click the link below to begin using Ripple Music.</br></br></br>
 					 <a href=\"$site_path\">Ripple Music</a></p>";
	
 	if(!isset($_GET['email']) || !isset($_GET['key'])) {
 		displayError();
 	}
 	else {
 		$key = $_GET['key'];
 		$email = $_GET['email'];
 		$user_id = getUserIdFromEmail($email);

 		$query = "SELECT email, confirm_key FROM confirmation WHERE user_id = $user_id";
 		$result = getInfoFromDatabase($query);

 		if($result[0]['confirm_key'] != $key || $result[0]['email'] != $email)
 			displayError();
 		else {
 			$activateQuery = "UPDATE confirmation SET active = 1 WHERE user_id = $user_id";
 			addToDatabase($activateQuery);
 			displaySuccess();
 		}
 	}

 	function displayError() {
 		global $html_error, $html_start, $html_end;
 		echo $html_start;
 		echo $html_error;
 		echo $html_end;
 	}

 	function displaySuccess() {
 		global $html_success, $html_start, $html_end;
 		echo $html_start;
 		echo $html_success;
 		echo $html_end;
 	}
?>