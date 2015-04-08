function setUpPage() {
	console.log("SET UP INFORMATION");
	console.log("SESSION NAME: "+ sessionStorage.getItem('name'));
	console.log("SESSION PLACE: "+ sessionStorage.getItem('location'));

	if(sessionStorage.getItem("name") == null) {
		console.log("There is no name associated with session");
		document.getElementById("dropBox").style.display = 'none';
	}
	else {
	
		document.getElementById("loginFields").style.display = "none";
		$('#accountInfo').removeAttr("class");
		document.getElementById('userName').innerHTML = sessionStorage.name;
		
		if (sessionStorage.getItem('location') == null)
			document.getElementById("dropBox").style.display = 'none';
		else
			document.getElementById("dropBox").style.display = 'block';	
			
		
		
		
		console.log("session name:"+sessionStorage.getItem("name"));
		console.log("session location: "+sessionStorage.getItem('location'));
		
	}
}


