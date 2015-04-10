function setUpPage() {
	console.log("SET UP INFORMATION");
	console.log("SESSION NAME: "+ sessionStorage.getItem('name'));
	console.log("SESSION PLACE: "+ sessionStorage.getItem('location'));

	console.log('GENERIC BEING CALLED NOW');

	//if there is a location but there is no name
	if(sessionStorage.getItem('location') != null && sessionStorage.getItem("name") == null) {
		console.log('there is a location associated with this session');
		makeRequest();
		disallowDrops();	
	}
	
	//if name is null and location is null
	else if(sessionStorage.getItem("name") == null ) {
		disallowDrops();
	}
	//if there is name 
	else {
			console.log("name associated with session");
			document.getElementById("loginFields").style.display = "none";
			showAccountInfo();
		
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
	$('#songBox').css('display','block');
};

function disallowDrops() {
	$('#songBox').css('display','block');
	$('#dropBox').css('display','none');
	$('.drop').css('display','none');
	console.log('disallowing drops');
};
