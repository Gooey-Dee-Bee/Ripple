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
		console.log("sessionStorage.location = " + sessionStorage.location)
	if(sessionStorage.getItem('name') != null)
		showLoggedInPage();
	}

});

function showPosition(position) {
    alert("Latitude: " + position.coords.latitude + 
    "Longitude: " + position.coords.longitude);

	sessionStorage.latitude = position.coords.latitude;
	sessionStorage.longitude = position.coords.longitude;

	// ****  NOW DO WHAT WE NEED TO SINCE WE HAVE THE LOCATION  ****

	makeRequest();

	// return location;
}

function disappearZip () {
	console.log("HELLO?");

	var zip = document.getElementById("zipcode").value;
	if(isValidUSZip(zip) == true)
	{
	//Call to push zipcode into the database?
		showLoggedInPage();
		sessionStorage.location = zip;
		console.log("session zip: " +zip);
		window.location.replace('index.html');
	} else {
			alert("If you're a living person, you have a zipcode. Please enter it correctly.");
	}
}


function isValidUSZip(sZip) {
   		return /^\d{5}(-\d{4})?$/.test(sZip);
	}
	
function showLoggedInPage() {

	document.getElementById("location").style.display = 'none';
	document.getElementById("songBox").style.display = 'block';

	

}	


}

}

}	


