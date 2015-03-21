var beginPlayer = '<div class="songPlayer" id="song';
var secondPlayer= '"> <div class="songText"><iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
var midPlayer ='"></iframe></div><img class="drop" src="images/dropit.png" onClick="bumpSong(this.id)" id="';
var endPlayer ='"/></div>';

//FUNCTIONALITY FOR THE TINY DROP BUTTONS
var songIdList = new Array();
songIdList.push("173752179");
songIdList.push("188883966");
songIdList.push("179501785");

function grabSong() {
	var songId = document.getElementById("songId").value;
	console.log("ADD SONG");
	getSongId(songId);
}



function addSong(songId) {
    var newcontent = document.createElement('div');
    var newSongListing = beginPlayer+songId+secondPlayer+songId+midPlayer+songId+endPlayer;
    console.log("ADD SONG"+newSongListing);
    newcontent.innerHTML = newSongListing;

    prependElement('songBox', newcontent);

	console.log("SONG ADDED");
	document.getElementById("songId").value="";
}

function prependElement(parentID, child){
	parent = document.getElementById(parentID);
	console.log(parent);
	console.log(child);
	parent.insertBefore(child, parent.childNodes[0]);

}

//Load songs statically on the page load
function getSongId(url) {
var Request = new XMLHttpRequest();
Request.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);     
    
    var textin = JSON.parse(this.responseText);
	var newSongId = parseSong(textin);
	
	//NEED A CHECKING FUNCTION TO DETERMINE WHETHER OR NOT THE SONG IS A DUPLICATE AND SHOULD BE ADDED
	//NEED SOMETHING THAT WILL REMOVE IT FROM WHEREVER IT'S AT AND SHIFT EVERYTHING DOWN
	//FUNCTION TO COMMUNICATE WITH DATABASE IN CHANGING THE STATS
	addSong(newSongId);
  }
}

Request.open('GET', 'https://api.soundcloud.com/resolve.json?url='+url+'&client_id=dafab2de81f874d25715f0e225e7c71a', true);
Request.send(JSON.stringify(document.body));
}


function parseSong(trackJson) {
	console.log("PARSE SONG: "+trackJson);
	var id = JSON.stringify(trackJson["id"]);
	console.log("PARSESONG ID IS: "+id);
	
	return id;
}


function bumpSong(songIdentity) {
	var original = document.getElementById("song"+songIdentity);
	var box = document.getElementById("songBox");
	console.log(original);
	original.parentNode.removeChild(original);
	console.log('removed');
	
	addSong(songIdentity);


}
