<!DOCTYPE html>
<html>
	<head>
		<title>Ripple: Confirm Email</title>
		<link rel="icon" type="image/jpg" href="/ripple/images/dropItIcon.png">
		<script type="text/javascript" src="/ripple/js/generic.js"></script>
	</head>
	<body>
		<?php
		 	require_once(__DIR__."/dropHelper.php"); // Allow access to the drop functions
		 	require_once(__DIR__."/databases.php"); // Allow access to the database functions
			
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
		 			$javascript = "<script>setName('$email');window.location.replace('/ripple/index.html');</script>";
		 			echo $javascript;
		 		}
		 	}

		 	function displayError() {
		 		echo "<h1>Unknown error occured. Please make sure you followed the link exactly.</h1>";
		 	}
		?>
	</body>
</html>
