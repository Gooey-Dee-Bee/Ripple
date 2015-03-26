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
	    
	    document.getElementById("location").style.display = 'none';
		document.getElementById("dropBox").style.display = 'block';
		document.getElementById("songBox").style.display = 'block';
		
	    console.log("User city: " + visitor_city);
	}
	else
	{
		$('#location').append("<form id='location form'><label>Zip Code: </label><input required='required' class='locationInput' type='text' id='zipcode'/><br/><input type='button' id='locationSubmit' value='SUBMIT' onClick='disappearZip()'/></form>");
	    console.log("Error Getting IP Address");
	}
});

function disappearZip () {

	
	if(isValidUSZip(document.getElementById("zipcode").value) == true)
	{
	//Call to push zipcode into the database?
		document.getElementById("location").style.display = 'none';
		document.getElementById("dropBox").style.display = 'block';
		document.getElementById("songBox").style.display = 'block';
	} else {
			alert("If you're a living person, you have a zipcode. Please enter it correctly.");
	}




}


function isValidUSZip(sZip) {
   		return /^\d{5}(-\d{4})?$/.test(sZip);
	}