var songsInDB = new Array();

/*GET SONGS FROM THE DATABASE*/
function makeRequest(){
$.get("/ripple/php/loadDrops.php", function(data, status) {
		console.log('adding songs to array');
		addSongsToArray(JSON.parse(data));
	});
}

/*ADD SONGS FROM THE DATABSE TO THE ARRAY*/
function addSongsToArray(jsonArray) {

	for(var i = 0; i < jsonArray.length; i++){
		var songId = JSON.stringify(jsonArray[i]["song_id"]);
		//console.log("FUCK BITCHES");
		songId = songId.substr(1,songId.length-2);
		
		console.log("song id: "+songId);
		addSong(songId);
		songsInDB.push(songId);
	}	
}


/******************* FOR BOTH SONGS FROM DB AND SONGS DROPPED DYNAMICALLY **************/

/*Strings to get Soundcloud players on the page*/
var beginPlayer = '<div class="songPlayer" id="song';
var secondPlayer= '"> <div class="songText"><iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
var midPlayer ='"></iframe></div><div><img class="drop" src="images/dropItIcon.png" onClick="bumpSong(this.id)" id="';
var endPlayer ='"/></div></div>';

/** GRAB THE SONG ID FROM THE SONG URL ON THE PAGE*/
function grabSong() {
	var songId = document.getElementById("songId").value;
	if(sessionStorage.getItem('points') > 0)
		getSongId(songId);
	else
		alert("We know this is a great song, but you don't have enough points to drop it right now. Why don't you buy some more?");
}


/*GET THE SONG ID FROM SOUNDCLOUD*/
//Load songs statically on the page load
function getSongId(url) {
var songExists = false;
$.get('https://api.soundcloud.com/resolve.json?url='+url+'&client_id=dafab2de81f874d25715f0e225e7c71a', function(data, status) {
		//var textin = JSON.parse(data);
		console.log(data['id']);
		
		var newSongId = parseSong(data);
		console.log('new song id is '+newSongId);

		//FUNCTION TO COMMUNICATE WITH DATABASE IN CHANGING THE STATS
		//ADDING THE NEW SONG TO THE DATABASE
		for(var i = 0; i < songsInDB.length; i++) {
			if(songsInDB[i] == newSongId){
				songExists = true;
			}
		}
		if (songExists == false){
			addSong(newSongId);
			songsInDB.push(newSongId);
			$.post(
			'/ripple/php/insertDrop.php', 
			{song_id: newSongId, email: sessionStorage.getItem('name'), latitude: sessionStorage.getItem('location'),
			longitude: sessionStorage.getItem('location')}, 

	    	function(returnedData){
	    	getUserPoints();
	        	if(returnedData == 200) { // Means they would have less than 0 points after doing to drop (i.e. they have 5 points, and a drop costs 10)
	        		alert("You do not have enough points to complete this drop. Please purchase more!");
	        	}
	        }
		);
			} else{
			bumpSong(newSongId);
			}
	});
}



/*PARSE THE JSON FROM SOUNDCLOUD FOR ONLY THE ID*/
function parseSong(trackJson) {
	var id = JSON.stringify(trackJson["id"]);
	return id;
}


/**ADD SONG FRAME TO THE SONG FEED (used for static and dynamic)**/
function addSong(songId) {
    var newcontent = document.createElement('div');
    var newSongListing = beginPlayer+songId+secondPlayer+songId+midPlayer+songId+endPlayer;
    //console.log("ADD SONG"+newSongListing);
    newcontent.innerHTML = newSongListing;
   
    prependElement('songBox', newcontent);
 
    if (sessionStorage.getItem('name') == null) {
    	document.getElementById(songId).style.display = "none";
    	console.log('should not be displaying');
    	}
	//console.log("SONG ADDED");

	//document.getElementById("songId").value="";	
	
	getUserPoints();

	document.getElementById("songId").value="";	



}

/*ENSURES THE LATEST SONG IS ON TOP*/
function prependElement(parentID, child){
	parent = document.getElementById(parentID);
	if(parent)
		parent.insertBefore(child, parent.childNodes[0]);
}



/* BUMP A SONG UP THAT IS ALREADY ON THE PLAYLIST */
function bumpSong(songIdentity) {
	if(sessionStorage.getItem('points') > 0){
	
	var original = document.getElementById("song"+songIdentity);
	var box = document.getElementById("songBox");
	original.parentNode.removeChild(original);
	/*NEEDS TO BE SUBSTITUTED FOR A FUNCTION THAT'S SPECIFIC TO BUMPING*/
	$.post(
			'/ripple/php/reDrop.php', 
			{song_id: songIdentity, email: sessionStorage.getItem('name'), latitude: sessionStorage.getItem('location')[0],
			longitude: sessionStorage.getItem('location')[1]}, 

	    	function(returnedData){
	    	/*WHEN REPLACED, GETUSERPOINTS() NEEDS TO BE IN THE FUNCTION OF THE NEW CALL*/
	    			getUserPoints();
	        	if(returnedData == 200) { // Means they would have less than 0 points after doing to drop (i.e. they have 5 points, and a drop costs 10)
	        		alert("You do not have enough points to complete this drop. Please purchase more!");
	        	}
	        }
		);
	addSong(songIdentity);
	


	}
	else
		alert("We know this is the best song ever. Buy more drops to keep sharing your great taste.");

}
