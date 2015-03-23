
var songsInDB = new Array();

function loadSongs() {
	var mydiv = document.getElementById("songBox");
    console.log("SONG LENGTH" + songIdList.length);
	for(var i=0; i < songIdList.length; i++){
		var songId = songIdList[i];
		var newcontent = document.createElement('div');
    	newcontent.innerHTML = beginPlayer+songId+secondPlayer+songId+midPlayer+songId+endPlayer;
    	

    	while (newcontent.firstChild) {
        	mydiv.appendChild(newcontent.firstChild);
    	}	
	}
}

var Request = new XMLHttpRequest();
Request.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);     

    
    var textin = JSON.parse(this.responseText);
	var songInformation = addSongsToArray(textin);
	addSongsToArray(songInformation);
  }
}

Request.open('GET', 'http://private-0601a-ripple2.apiary-mock.com/songs', true);
Request.send(JSON.stringify(document.body));

function addSongsToArray(jsonArray) {

	for(var i = 0; i < jsonArray.length; i++){
		var songId = JSON.stringify(jsonArray[i]["songID"]);
		console.log("FUCK BITCHES");
		songId = songId.substr(1,songId.length-2);
		console.log("song id: "+songId);
		addSong(songId);
		songsInDB.push(songId);

	}
}