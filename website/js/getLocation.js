$(document).ready(function(){
	if(google.loader.ClientLocation)
	{
	    visitor_lat = google.loader.ClientLocation.latitude;
	    visitor_lon = google.loader.ClientLocation.longitude;
	    visitor_city = google.loader.ClientLocation.address.city;
	    visitor_region = google.loader.ClientLocation.address.region;
	    visitor_country = google.loader.ClientLocation.address.country;
	    visitor_countrycode = google.loader.ClientLocation.address.country_code;
	    //DO SOMETHING WITH THIS INFO
	    console.log("User city: " + visitor_city);
	}
	else
	{
		$('#location').append("<form id='location form'><label>CITY</label><input class='locationInput' type='text'/><br/><label>STATE</label><input class='locationInput' type='text'/><br/><input type='submit' id='locationSubmit' value='SUBMIT'/></form>");
	    console.log("Error Getting IP Address");
	}
});

