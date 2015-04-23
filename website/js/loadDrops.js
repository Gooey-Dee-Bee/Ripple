var songsInDB = new Array();

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
$.post("/ripple/php/loadDrops.php",
		{user_id: sessionStorage.getItem('user_id')},
 		function(data, status) {
		console.log('adding songs to user array');
		addSongsToUserArray(JSON.parse(data));
		$('#songBox').show();
	});
}

/*ADD SONGS FROM THE DATABSE TO THE ARRAY*/
function addSongsToArray(jsonArray) {
console.log('add song to array');
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
		songsInDB.push(songId);
	}	
}


/******************* FOR BOTH SONGS FROM DB AND SONGS DROPPED DYNAMICALLY **************/

/*Strings to get Soundcloud players on the page*/
var beginPlayer = '<div class="songPlayer" id="song';
var secondPlayer= '"> <div class="songText"><iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
var midPlayer ='"></iframe></div><div><img class="drop" src="images/dropItIcon.png"  id=song';
var alternateEnd = '"></iframe></div><div>';
var endPlayer =' onClick="bumpSong()"/></div></div>';

/** GRAB THE SONG ID FROM THE SONG URL ON THE PAGE*/
function grabSong() {
	console.log('grab song');
	var songId = document.getElementById("searchQuery").value;
	if(sessionStorage.getItem('points') > 0)
		getSongId(songId);
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

		//FUNCTION TO COMMUNICATE WITH DATABASE IN CHANGING THE STATS
		//ADDING THE NEW SONG TO THE DATABASE
		
	
			alert('the song does not exist');
			addSong(newSongId);
			
			//console.log('adding the song because it is not a duplicate');
			songsInDB.push(newSongId);
			$.post(
			'/ripple/php/insertDrop.php', 
			{song_id: newSongId, email: sessionStorage.getItem('name'), latitude: sessionStorage.getItem('latitude'),
			longitude: sessionStorage.getItem('longitude')}, 

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
				
				bumpSong(songId);
				break;
			}
		}
		 
	
	
    var newcontent = document.createElement('div');
    var newSongListing = beginPlayer+songId+secondPlayer+songId+midPlayer+songId+endPlayer;
    //console.log("ADD SONG "+songId);
    newcontent.innerHTML = newSongListing;
   
    prependElement('songBox', newcontent);
 
    if (sessionStorage.getItem('name') == null) {
    	document.getElementById(songId).style.display = "none";
    	//console.log('should not be displaying');
    }
	
	getUserPoints();
	('#songId').value = "";


	if($('#searchQuery').length)
		document.getElementById("searchQuery").value="";

}



function addUserSong(songId) {
	console.log('add user song');
	for(var i = 0; i < songsInDB.length; i++) {
    var newcontent = document.createElement('div');
    var newSongListing = beginPlayer+songId+secondPlayer+songId+alternateEnd;
    console.log("ADD SONG "+songId);
    newcontent.innerHTML = newSongListing;
   
    prependElement('songBox', newcontent);
 
    if (sessionStorage.getItem('name') == null) {
    	document.getElementById(songId).style.display = "none";
    	//console.log('should not be displaying');
    }
	
	getUserPoints();
	('#songId').value = "";

}}

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
		console.log('bump song');
		$.post(
			'/ripple/php/reDrop.php', 
			{song_id: songIdentity, email: sessionStorage.getItem('name'), latitude: sessionStorage.getItem('location')[0],
			longitude: sessionStorage.getItem('location')[1]}, 

	    	function(returnedData){
	    	/*WHEN REPLACED, GETUSERPOINTS() NEEDS TO BE IN THE FUNCTION OF THE NEW CALL*/
	    			getUserPoints();
	    			//console.log('wtf');
	        	if(returnedData == 200) { // Means they would have less than 0 points after doing to drop (i.e. they have 5 points, and a drop costs 10)
	        		alert("You do not have enough points to complete this drop. Please purchase more!");
	        	}
	        	else if(returnedData == 300) { // User tried to redrop their own song.
	        		alert("You cannot drop your own song. Sorry!");
	        	}
	        }
		)
}
