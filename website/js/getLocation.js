$(document).ready(function(){
	//CHECK IF LOGGED IN, FIRST
	
	if(sessionStorage.location == null) {

		if(google.loader.ClientLocation)
		{
	    	visitor_lat = google.loader.ClientLocation.latitude;
	    	visitor_lon = google.loader.ClientLocation.longitude;
	    	visitor_city = google.loader.ClientLocation.address.city;
	    	visitor_region = google.loader.ClientLocation.address.region;
	    	visitor_country = google.loader.ClientLocation.address.country;
	    	visitor_countrycode = google.loader.ClientLocation.address.country_code;
	    	//DO SOMETHING WITH THIS INFO
	    
	    	document.getElementById("location").style.display = 'none';
			allowDrops();
		
			sessionStorage.location = google.loader.ClientLocation;
		
	    	console.log("User city: " + visitor_city);
		} else
		{
			document.getElementById("searchBox").style.display = "none";
			document.getElementById("songSearchSuggest").style.display = "none";
			$('#location').append("<form id='location form'><label>Zip Code: </label><input required='required' class='locationInput' type='text' id='zipcode'/><br/><input type='button' id='locationSubmit' value='SUBMIT' onClick='disappearZip()'/></form>");
	    	console.log("Error Getting IP Address"); 	
		}
	
	} else {
	if(sessionStorage.getItem('name') != null)
		showLoggedInPage();
			
	}
});

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
	
