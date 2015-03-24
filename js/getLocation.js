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
	    console.log("Error Getting IP Address");
	    $('#location').append("<form id='getLocationForm'><label class='locationLabel'>CITY: </label><input class='locationInput' type='text'/><br><label class='locationLabel'>STATE: </label><input class='locationInput' type='text'/><br><input id='submitLocation' type='submit' value='SUBMIT'/></form>");
	}

});


// <select>
// 	<option value="AL">Alabama</option>
// 	<option value="AK">Alaska</option>
// 	<option value="AZ">Arizona</option>
// 	<option value="AR">Arkansas</option>
// 	<option value="CA">California</option>
// 	<option value="CO">Colorado</option>
// 	<option value="CT">Connecticut</option>
// 	<option value="DE">Delaware</option>
// 	<option value="DC">District Of Columbia</option>
// 	<option value="FL">Florida</option>
// 	<option value="GA">Georgia</option>
// 	<option value="HI">Hawaii</option>
// 	<option value="ID">Idaho</option>
// 	<option value="IL">Illinois</option>
// 	<option value="IN">Indiana</option>
// 	<option value="IA">Iowa</option>
// 	<option value="KS">Kansas</option>
// 	<option value="KY">Kentucky</option>
// 	<option value="LA">Louisiana</option>
// 	<option value="ME">Maine</option>
// 	<option value="MD">Maryland</option>
// 	<option value="MA">Massachusetts</option>
// 	<option value="MI">Michigan</option>
// 	<option value="MN">Minnesota</option>
// 	<option value="MS">Mississippi</option>
// 	<option value="MO">Missouri</option>
// 	<option value="MT">Montana</option>
// 	<option value="NE">Nebraska</option>
// 	<option value="NV">Nevada</option>
// 	<option value="NH">New Hampshire</option>
// 	<option value="NJ">New Jersey</option>
// 	<option value="NM">New Mexico</option>
// 	<option value="NY">New York</option>
// 	<option value="NC">North Carolina</option>
// 	<option value="ND">North Dakota</option>
// 	<option value="OH">Ohio</option>
// 	<option value="OK">Oklahoma</option>
// 	<option value="OR">Oregon</option>
// 	<option value="PA">Pennsylvania</option>
// 	<option value="RI">Rhode Island</option>
// 	<option value="SC">South Carolina</option>
// 	<option value="SD">South Dakota</option>
// 	<option value="TN">Tennessee</option>
// 	<option value="TX">Texas</option>
// 	<option value="UT">Utah</option>
// 	<option value="VT">Vermont</option>
// 	<option value="VA">Virginia</option>
// 	<option value="WA">Washington</option>
// 	<option value="WV">West Virginia</option>
// 	<option value="WI">Wisconsin</option>
// 	<option value="WY">Wyoming</option>
// </select>