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
			document.getElementById("dropBox").style.display = 'block';
			document.getElementById("songBox").style.display = 'block';
		
			sessionStorage.location = google.loader.ClientLocation;
		
	    	console.log("User city: " + visitor_city);
		}
		else
		{
			$('#location').append("<form id='location form'><label>Zip Code: </label><input required='required' class='locationInput' type='text' id='zipcode'/><br/><input type='button' id='locationSubmit' value='SUBMIT' onClick='disappearZip()'/></form>");
	    	console.log("Error Getting IP Address");
		}
	
		}
		
	else {
		showLoggedInPage();
	}
});

function disappearZip () {

console.log("HELLO?");

	var zip = document.getElementById("zipcode").value;
	if(isValidUSZip(zip) == true)
	{
	//Call to push zipcode into the database?
		document.getElementById("location").style.display = 'none';
		document.getElementById("dropBox").style.display = 'block';
		document.getElementById("songBox").style.display = 'block';
		
		sessionStorage.location = zip;
		console.log("session zip: " +zip);
		
		getName(zip);
	} else {
			alert("If you're a living person, you have a zipcode. Please enter it correctly.");
	}



}


function isValidUSZip(sZip) {
   		return /^\d{5}(-\d{4})?$/.test(sZip);
	}
	
function showLoggedInPage() {

	document.getElementById("location").style.display = 'none';
			document.getElementById("dropBox").style.display = 'block';
			document.getElementById("songBox").style.display = 'block';


}
	
function getName(zipCode){
console.log("HELLO?");

	var Request = new XMLHttpRequest();
	Request.onreadystatechange = function () {
  		if (this.readyState === 4 && this.status === 200) {
    	console.log('Status:', this.status);
    	console.log('Headers:', this.getAllResponseHeaders());
    	console.log('Body:', this.responseText);     

    
    	var textin = JSON.parse(this.responseText);
		console.log(textin);

		var city = textin["city"];
		console.log("Ciity: " + city);
		document.getElementById("locationName").innerHTML=city;
		 }

		 //ALERT: HARDCODED
}

Request.open('GET', 'http://www.zipcodeapi.com/rest/etz9JI8N47HQVohRdSaOBNk0HiLbMDv074aRNiERqlImK0dYSoMub7vTpg4bUzc1/info.json/'+zipCode+'/degrees', true);
Request.send(JSON.stringify(document.body));

}