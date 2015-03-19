var beginPlayer = '<div class="songPlayer"> <div class="songText"><iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
var endPlayer ='"></iframe></div><img class="drop" src="images/dropit.png"/></div>'


var songIdList = new Array();
songIdList.push("173752179");
songIdList.push("188883966");
songIdList.push("179501785");


function addSong() {
	var songId = document.getElementById("songId").value;
	var mydiv = document.getElementById("songBox");
    var newcontent = document.createElement('div');
    newcontent.innerHTML = beginPlayer+songId+endPlayer;

    while (newcontent.firstChild) {
        mydiv.appendChild(newcontent.firstChild);
    }
	document.getElementById("songBox").innerHTML = value;
	console.log(document.getElementById("song").innerHTML);
}


function loadSongs() {

	var mydiv = document.getElementById("songBox");
    console.log("SONG LENGTH" + songIdList.length);
	for(var i=0; i < songIdList.length; i++){
		var songId = songIdList[i];
		console.log("SONG ID"+songId);
		var newcontent = document.createElement('div');
    	newcontent.innerHTML = beginPlayer+songId+endPlayer;
    	

    	while (newcontent.firstChild) {
        	mydiv.appendChild(newcontent.firstChild);
    	}
    	/*
		document.getElementById("songBox").innerHTML = value;
		console.log(document.getElementById("song").innerHTML);*/
	
	
	}



}


