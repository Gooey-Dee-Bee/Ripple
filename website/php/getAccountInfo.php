<?php
	// THIS GETS ALL THE INFO ASSOCIATED WITH A USER TO DISPLAY ON THE MAIN PAGE (SUCH AS NAME AND # OF DROPS)

	require_once(__DIR__."/sessions.php"); // Allow access to the sessions functions

	if(verifySession())
		echo json_encode(getSessionInfo());
	else
		return 200; // No session is active (no user is logged in)
?>