var songsInDB = new Array();

function makeRequest(){
var Request = new XMLHttpRequest();
Request.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    //console.log('Body:', this.responseText);     

    console.log('makingtheRequest');
    var textin = JSON.parse(this.responseText);
    console.log(textin);
	var songInformation = addSongsToArray(textin);
	addSongsToArray(songInformation);	
	
  }
}
//http://private-0601a-ripple2.apiary-mock.com/songs
Request.open('GET', '/ripple/php/loadDrops.php', true);
Request.send(JSON.stringify(document.body));

}



function addSongsToArray(jsonArray, callback) {

	for(var i = 0; i < jsonArray.length; i++){
		var songId = JSON.stringify(jsonArray[i]["song_id"]);
		//console.log("FUCK BITCHES");
		songId = songId.substr(1,songId.length-2);
		console.log("song id: "+songId);
		addSong(songId);
		songsInDB.push(songId);

	}
	
	
}