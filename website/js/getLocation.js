$(document).ready(function(){
	//CHECK IF LOGGED IN, FIRST
	
	if(sessionStorage.location == null) {

		if(navigator.geolocation)
		{
			var location = navigator.geolocation.getCurrentPosition(showPosition);
			var lat = location.latitude;
			var lon = location.longitude;

	    	document.getElementById("location").style.display = 'none';
			allowDrops();
		
			sessionStorage.latitude = lat;
			sessionStorage.longitude = lon;
		
	    	console.log("latitude: " + lat + "  longitude: " + lon);
		} else
		{
			document.getElementById("dropBox").style.display = "none";
			$('#location').append("<form id='location form'><label>Zip Code: </label><input required='required' class='locationInput' type='text' id='zipcode'/><br/><input type='button' id='locationSubmit' value='SUBMIT' onClick='getLocation()'/></form>");
	    	console.log("Error Getting IP Address"); 	
		}
	
	} else {
	if(sessionStorage.getItem('name') != null)
		showLoggedInPage();
	}
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    alert("Latitude: " + position.coords.latitude + 
    "Longitude: " + position.coords.longitude);

	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var location = new Object();
	location.latitude = lat;
	location.longitude = lon;

	return location;
}

function getLocation1() {
	visitor_lat = google.loader.ClientLocation.latitude;
	visitor_lon = google.loader.ClientLocation.longitude;
	visitor_city = google.loader.ClientLocation.address.city;
	visitor_region = google.loader.ClientLocation.address.region;
	visitor_country = google.loader.ClientLocation.address.country;
	visitor_countrycode = google.loader.ClientLocation.address.country_code;

	var loc = [];
	loc[0] = visitor_lat;
	loc[1] = visitor_lon;

	return loc;

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