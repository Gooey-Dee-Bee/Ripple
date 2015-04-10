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

	getSongId(songId);
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
			{id: newSongId, email: sessionStorage.getItem('name')}, 

	    	function(returnedData){
	        	console.log(returnedData);
	        }
		);
			} else{
			bumpSong(newSongId);
			}
	});
}


/*
	var songExists = false;
	var Request = new XMLHttpRequest();
	Request.onreadystatechange = function () {
	  if (this.readyState === 4 && this.status === 200) {
	    console.log('Status:', this.status);
	    console.log('Headers:', this.getAllResponseHeaders());
	    console.log('Body:', this.responseText);     
	    
	    var textin = JSON.parse(this.responseText);
		var newSongId = parseSong(textin);
		
		console.log('before the post stuff');
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

			{id: newSongId, email: sessionStorage.getItem('name')}, 

	    	function(returnedData){
	        	console.log(returnedData);
	        }
		);
			
			
			} else{
			bumpSong(newSongId);
			}
	  }
	}
	console.log('url is ' + url);
	Request.open('GET', 'https://api.soundcloud.com/resolve.json?url='+url+'&client_id=dafab2de81f874d25715f0e225e7c71a', true);
	Request.send();
}

*/


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
	document.getElementById("songId").value="";	

}

/*ENSURES THE LATEST SONG IS ON TOP*/
function prependElement(parentID, child){
	parent = document.getElementById(parentID);
	parent.insertBefore(child, parent.childNodes[0]);
}



/* BUMP A SONG UP THAT IS ALREADY ON THE PLAYLIST */
function bumpSong(songIdentity) {
	var original = document.getElementById("song"+songIdentity);
	var box = document.getElementById("songBox");
	original.parentNode.removeChild(original);
	
	addSong(songIdentity);
}
