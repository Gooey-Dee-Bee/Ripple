function setUpPage() {
	console.log("SET UP INFORMATION");
	console.log("SESSION NAME: "+ sessionStorage.getItem('name'));
	console.log("SESSION PLACE: "+ sessionStorage.getItem('location'));

	console.log('GENERIC BEING CALLED NOW');

	$.get('/ripple/php/getUserInfo.php',{email: sessionStorage.getItem('name')}, function(data) {
		console.log('User Account Status' + sessionStorage.acct_status);
		var array = JSON.parse(data);
		sessionStorage.acct_status = array.acct_status;
	});

	//if there is a location but there is no name
	if(sessionStorage.getItem('location') != null && sessionStorage.getItem("name") == null) {
		//console.log('there is a location associated with this session');
		makeRequest();
		disallowDrops();
		$('#loginFields').fadeIn();
		$('#accountInfo').hide();
	}
	//if name is null and location is null
	else if(sessionStorage.getItem("name") == null ) {
		disallowDrops();
		$('#accountInfo').hide();
		$('#loginFields').fadeIn();
		//console.log('account info should not be showing');
	}
	//if there is name 
	else {
			
			//console.log("name associated with session");
			document.getElementById("loginFields").style.display = "none";
			showAccountInfo();
			getUserPoints();
			//if there is no location
			if (sessionStorage.getItem('location') == null){
				disallowDrops();
			//	console.log("no place associated");
			} else {
				//if there is a location
			//	console.log("place is associated, drops should display");
				allowDrops();
				makeRequest();
			}
			
			//console.log("session name:"+sessionStorage.getItem("name"));
			//console.log("session location: "+sessionStorage.getItem('location'));	
	}
}


function allowDrops() {
	console.log('allowing drops');
	$('#dropBox').html('<div id="searchBox">'+
				'<form id="search" action="">'+
					'<input type="text" id="searchQuery" placeholder="SEARCH FOR A SONG">'+
					'<button type="submit" class="analyticOption">Search</button>'+
					'</form></div>');
	$('#search').on('submit', function(event){
		event.preventDefault();
		var query = $("#searchQuery").val();
		search(query);
	});

	$('.drop').css('display','block');
	$('#songBox').css('display','block');
	//$('#infoBox').css('display','block');
};

function disallowDrops() {
	$('#dropBox').html("<div style='font-size:1.1em; font-family:'Poiret One''>"+
	 				"(Don't have an account? <a href='landingpage.html'>Make one.</a>)</div>");
	$('#songBox').css('display','block');
	
	$('.drop').css('display','none');
	//$('#infoBox').css('display','none');
	//console.log('disallowing drops');
};



function getUserPoints() {
	$.get("/ripple/php/getUserInfo.php",
		{email: sessionStorage.getItem('name')}, 
		function(data, status) {
			console.log("GET USER POINTS: "+JSON.parse(data));
			var accountInformation = JSON.parse(data);
			// Adding variables to the sessionStorage!
			sessionStorage.points = accountInformation['points'];
			sessionStorage.drops = accountInformation['total_drops'];
			sessionStorage.user_id = accountInformation['userId'];
			//console.log('points '+ sessionStorage.getItem('points'));
			//console.log('total drops '+sessionStorage.getItem('drops'));
			//console.log('user id is '+sessionStorage.getItem('user_id'));
			
			
			document.getElementById('dropNumber').innerHTML = sessionStorage.getItem('points');
		});

}


