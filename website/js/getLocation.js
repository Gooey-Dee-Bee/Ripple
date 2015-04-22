$(document).ready(function(){
	//CHECK IF LOGGED IN, FIRST
	
	if(sessionStorage.location == null || sessionStorage.location == 'undefined') {

		if(navigator.geolocation)
		{
			var location = navigator.geolocation.getCurrentPosition(showPosition);

	    	document.getElementById("location").style.display = 'none';
			allowDrops();
		
		} else
		{
	  		alert ("Couldn't get location. Sorry bitch");

		}
	
	} else {

		console.log("sessionStorage.location = " + sessionStorage.location);
		stopLoader();

	}

});

function showPosition(position) {
    alert("Latitude: " + position.coords.latitude + 
    "Longitude: " + position.coords.longitude);

	sessionStorage.latitude = position.coords.latitude;
	sessionStorage.longitude = position.coords.longitude;
	sessionStorage.location = "this exists";

	// ****  NOW DO WHAT WE NEED TO SINCE WE HAVE THE LOCATION  ****

	stopLoader();
	makeRequest();

	// return location;
}

	
function showLoggedInPage() {
	document.getElementById("songBox").style.display = 'block';

}	

function stopLoader() {
	$('#loader').remove();
}








