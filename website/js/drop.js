var beginPlayer = '<div class="songPlayer" id="song';
var secondPlayer= '"> <div class="songText"><iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
var midPlayer ='"></iframe></div><div><img class="drop" src="images/dropItIcon.png" onClick="bumpSong(this.id)" id="';
var endPlayer ='"/></div></div>';


function grabSong() {
	var songId = document.getElementById("songId").value;
	
	console.log("grab song - ");
	getSongId(songId);
}



function addSong(songId) {
    var newcontent = document.createElement('div');
    var newSongListing = beginPlayer+songId+secondPlayer+songId+midPlayer+songId+endPlayer;
    //console.log("ADD SONG"+newSongListing);
    newcontent.innerHTML = newSongListing;
    console.log('adding all of the classes in drop.js');
   

    prependElement('songBox', newcontent);

	 
    if (sessionStorage.getItem('name') == null) {
    	document.getElementById(songId).style.display = "none";
    	console.log('should not be displaying');
    	}
	//console.log("SONG ADDED");
	document.getElementById("songId").value="";	

}

function prependElement(parentID, child){
	parent = document.getElementById(parentID);
	//console.log(parent);
	//console.log(child);
	parent.insertBefore(child, parent.childNodes[0]);


}

//Load songs statically on the page load
function getSongId(url) {
	var songExists = false;
	var Request = new XMLHttpRequest();
	Request.onreadystatechange = function () {
	  if (this.readyState === 4 && this.status === 200) {
	    console.log('Status:', this.status);
	    console.log('Headers:', this.getAllResponseHeaders());
	    console.log('Body:', this.responseText);     
	    
	    var textin = JSON.parse(this.responseText);
		var newSongId = parseSong(textin);

		//FUNCTION TO COMMUNICATE WITH DATABASE IN CHANGING THE STATS
		//ADDING THE NEW SONG TO THE DATABASE
		$.post(
			'/ripple/php/insertDrop.php', 

			{id: newSongId, email: sessionStorage.getItem('name')}, 

	    	function(returnedData){
	        	console.log(returnedData);
	        }
		);
		
		for(var i = 0; i < songsInDB.length; i++) {
			if(songsInDB[i] == newSongId){
				//console.log("SAME THING");
				songExists = true;
				}
		}
		
		if (songExists == false){
			addSong(newSongId);
			songsInDB.push(newSongId);
			}
		else{
			//console.log("THIS ALREADY EXISTS");
			bumpSong(newSongId);
			//console.log("SONG IS BUMPED");
			}
	  }
	}

	Request.open('GET', 'https://api.soundcloud.com/resolve.json?url='+url+'&client_id=dafab2de81f874d25715f0e225e7c71a', true);
	Request.send();
}


function parseSong(trackJson) {
	//console.log("PARSE SONG: "+trackJson);
	var id = JSON.stringify(trackJson["id"]);
	//console.log("PARSESONG ID IS: "+id);
	
	return id;
}



function bumpSong(songIdentity) {
	var original = document.getElementById("song"+songIdentity);
	var box = document.getElementById("songBox");
	//console.log(original);
	original.parentNode.removeChild(original);
	//console.log('removed');
	
	addSong(songIdentity);


}


