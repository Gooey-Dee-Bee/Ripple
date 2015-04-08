function setUpPage() {
	console.log("SET UP INFORMATION");
	console.log("SESSION NAME: "+ sessionStorage.getItem('name'));
	console.log("SESSION PLACE: "+ sessionStorage.getItem('location'));

	if(sessionStorage.getItem('location') != null) {
		console.log('there is a location associated with this session');
		makeRequest();
	}
	
	//If there is no name associated with the session
	if(sessionStorage.getItem("name") == null) {
		console.log("There is no name associated with session. Drops shouldn't display.");
		disallowDrops();
	}
	//if there is name
	else {
			console.log("name associated with session");
			document.getElementById("loginFields").style.display = "none";
			$('#accountInfo').removeAttr("class");
			document.getElementById('userName').innerHTML = sessionStorage.name;
		
			//if there is no location
			if (sessionStorage.getItem('location') == null){
				disallowDrops();
				console.log("no place associated");
			}
			//if there is a location
			else {
				console.log("place is associated, drops should display");
				allowDrops();
				makeRequest();
			}
			
	
			console.log("session name:"+sessionStorage.getItem("name"));
			console.log("session location: "+sessionStorage.getItem('location'));	
	}
}


function allowDrops() {
	$('#dropBox').css('display','block');
	$('.drop').css('display','block');
};

function disallowDrops() {
	$('#dropBox').css('display','none');
	$('.drop').css('display','none');
	console.log('disallowing drops');
};
