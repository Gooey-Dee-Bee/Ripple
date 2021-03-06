var songsInDB = new Array();
var songsFromUser = new Array();

/*GET SONGS FROM THE DATABASE*/
function makeRequest(){
console.log('make request');
$.post("/ripple/php/loadDrops.php", 
		{latitude: sessionStorage.getItem('latitude'), longitude: sessionStorage.getItem('longitude')},
		function(data, status) {
			//console.log('adding songs to array');
			addSongsToArray(JSON.parse(data));
		});
}


function makeRequestForUser(){
	console.log('makeRequestForUser');
	if (sessionStorage.getItem('name') === null) {
		//alert('not permitted to be here');
		window.location.replace('index.html');
	}
	$.post("/ripple/php/loadDrops.php",
		{user_id: sessionStorage.getItem('user_id')},
 		function(data, status) {
			console.log('adding songs to user array');
			var array = JSON.parse(data);
			if (array[0] == null) {
				$('#noSongs').show();
			}
			else {
				addSongsToUserArray(array);
				$('#noSongs').hide();
				$('#songBox').show();
			}
	});
}

/*ADD SONGS FROM THE DATABSE TO THE ARRAY*/
function addSongsToArray(jsonArray) {
	console.log('add song to array');
	if (jsonArray.length == 0) {
		$('#noSongs').show();
		$('#songBox').hide();
	}
	for(var i = 0; i < jsonArray.length; i++){
		var songId = JSON.stringify(jsonArray[i]["song_id"]);
		//console.log("FUCK BITCHES");
		songId = songId.substr(1,songId.length-2);
		
		//console.log("song id: "+songId);
		addSong(songId);
		songsInDB.push(songId);
	}	
}

/*ADD SONGS FROM THE DATABSE TO THE ARRAY*/
function addSongsToUserArray(jsonArray) {
console.log('add song to user array');
	for(var i = 0; i < jsonArray.length; i++){
		var songId = JSON.stringify(jsonArray[i]["song_id"]);
		//console.log("FUCK BITCHES");
		songId = songId.substr(1,songId.length-2);
		
		console.log("song id: "+songId);
		addUserSong(songId);
		songsFromUser.push(songId);
	}	
}


/******************* FOR BOTH SONGS FROM DB AND SONGS DROPPED DYNAMICALLY **************/

/*Strings to get Soundcloud players on the page*/

	var beginPlayer = '<div class="songPlayerSearch" id="song';
		var secondPlayer= '"> <div class="songText"><iframe id=';
		var thirdPlayer = ' src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
		var midPlayer = '"></iframe></div><div><img class="drop" src="images/dropItIcon.png" onClick="bumpSong(this.id)" id="';
		var endPlayer = '"/></div></div>';


/********* Variables for user *********/
var beginPlayerUser = '<div class="songPlayerSearch" id="song';
var secondPlayerUser= '"> <div class="songText"><iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
var midPlayerUser = '"></iframe></div><div><div class="dropFromSearch" id="drops';
var endPlayerUser = '" style="width:10px; margin:5px; font-weight:bold;"></div></div></div>';



/** GRAB THE SONG ID FROM THE SONG URL ON THE PAGE*/
function grabSong() {
	console.log('grab song');
	var songId = document.getElementById("searchQuery").value;
	if (sessionStorage.acct_status == 0) {
		alert('Please confirm your account in order to drop a song');
	}
	else if(sessionStorage.getItem('points') > 0) {
		getSongId(songId);
	}
	else
		alert("We know this is a great song, but you don't have enough points to drop it right now. Why don't you buy some more?");
}


/*GET THE SONG ID FROM SOUNDCLOUD*/
//Load songs statically on the page load
function getSongId(url) {
console.log('get song ID');
var songExists = false;
console.log('GETTING THE SONG URL');
$.get('https://api.soundcloud.com/resolve.json?url='+url+'&client_id=dafab2de81f874d25715f0e225e7c71a', function(data, status) {
		//var textin = JSON.parse(data);
		//console.log('this new thing is'+data['id']);
		
		var newSongId = parseSong(data);
		//console.log('new song id is '+newSongId);
		addSong(newSongId);
			
			//console.log('adding the song because it is not a duplicate');
		songsInDB.push(newSongId);
		$.post('/ripple/php/drop.php', 
			{song_id: newSongId, email: sessionStorage.getItem('name'), latitude: sessionStorage.getItem('latitude'), longitude: sessionStorage.getItem('longitude')}, 
	    	function(returnedData){
	    		getUserPoints();
	        	if(returnedData == 200) { // Means they would have less than 0 points after doing to drop (i.e. they have 5 points, and a drop costs 10)
	        		alert("You do not have enough points to complete this drop. Please purchase more!");
	        	}
	        	else if(returnedData == 300) { // The user attempted to post a link they have already posted
	        		alert("You cannot drop your own song. Sorry!");
	        	}
	        }
		);
			
	});
}



/*PARSE THE JSON FROM SOUNDCLOUD FOR ONLY THE ID*/
function parseSong(trackJson) {
	console.log('parse song');
	var id = JSON.stringify(trackJson["id"]);
	return id;
}


/**ADD SONG FRAME TO THE SONG FEED (used for static and dynamic)**/
function addSong(songId) {
console.log('add song');
	for(var i = 0; i < songsInDB.length; i++) {
			//console.log('ADDING SONGS IN DB AND SHIT'+songsInDB[i]);
			if(songsInDB[i] == songId){
				var original = document.getElementById("song"+songId);
				var box = document.getElementById("songBox");
				original.parentNode.removeChild(original);
				//console.log('wtf');
				break;
			}
		}
		 
	
	console.log('adding song in addSONG');
    var newcontent = document.createElement('div');
    //var newSongListing = beginPlayer+songId+secondPlayer+songId+secondPlayer2+songId+midPlayerUser+songId+endPlayer;
    var newSongListing = beginPlayer+songId+secondPlayer+songId+thirdPlayer+songId+midPlayer+songId+endPlayer;
    newcontent.innerHTML = newSongListing;
   
   console.log(newSongListing);
    prependElement('songBox', newcontent);
 
    if (sessionStorage.getItem('name') == null) {
    	$('.drop').hide();
    	//console.log('should not be displaying');
    }
	
	getUserPoints();
	('#songId').value = "";


	if($('#searchQuery').length)
		document.getElementById("searchQuery").value="";

}



function addUserSong(songId) {
	console.log('add user song');
	
	$.get('php/songAnalytics.php', {song_id:songId}, function(data, result) {
		data = JSON.parse(data);
		var dropCount = data['count'];

		var rando = "<div style='text-align:center; font-size:2em; width:60px;'> <div style='font-size:20px;'>drop count</div>"+parseInt(dropCount)+"</div>";
	  
		
		
		
		
		
    	var newcontent = document.createElement('div');
   	 	var newSongListing = beginPlayerUser+songId+secondPlayerUser+songId+midPlayerUser+songId+endPlayerUser;
    	newcontent.innerHTML = newSongListing;
   
    	prependElement('songBox', newcontent);
    	$('#drops'+songId).html(rando);
 
    if (sessionStorage.getItem('name') == null) {
    	document.getElementById(songId).style.display = "none";
    	//console.log('should not be displaying');
    }
	
	getUserPoints();
	('#songId').value = "";

	});
}

/*ENSURES THE LATEST SONG IS ON TOP*/
function prependElement(parentID, child){
console.log('prepend element');	
	parent = document.getElementById(parentID);
	if(parent)
		parent.insertBefore(child, parent.childNodes[0]);
}



/* BUMP A SONG UP THAT IS ALREADY ON THE PLAYLIST */
function bumpSong(songIdentity) {
		/*NEEDS TO BE SUBSTITUTED FOR A FUNCTION THAT'S SPECIFIC TO BUMPING*/
		//songIdentity = songIdentity.substr(4,songIdentity.length);
		console.log(songIdentity);
		
		
		console.log('bump song');
		if (sessionStorage.acct_status == 0) {
			alert('Please confirm your account in order to drop a song');
		}
		else {
			$.post(
				'/ripple/php/drop.php', 
				{song_id: songIdentity, email: sessionStorage.getItem('name'), latitude: sessionStorage.getItem('latitude'),
				longitude: sessionStorage.getItem('longitude')}, 

		    	function(returnedData){
		    	/*WHEN REPLACED, GETUSERPOINTS() NEEDS TO BE IN THE FUNCTION OF THE NEW CALL*/
		    			getUserPoints();

		    			//console.log('wtf');
		        	if(returnedData == '200') { // Means they would have less than 0 points after doing to drop (i.e. they have 5 points, and a drop costs 10)
		        		alert("You do not have enough points to complete this drop. Please purchase more!");
		        		console.log('not enough points');
		        	}
		        	else if(returnedData == '300') { // User tried to redrop their own song.
		        		alert("You cannot drop your own song. Sorry!");
		        		console.log('dropping your own song');
		        	}
		        	
		        	else {
		        		
		        		console.log(songIdentity);
		        		addSong(songIdentity);
		        	}
		        }
			);
		}
		
}
