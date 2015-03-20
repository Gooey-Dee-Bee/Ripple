var dropIdList = new Array();

var Request = new XMLHttpRequest();
Request.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);     
    var textin = JSON.parse(this.responseText);
    
	getDropIds(textin);
	loadSongs();
	
	console.log(textin);
	console.log(JSON.stringify(textin));
	
  }
}
Request.open('GET', 'http://private-0601a-ripple2.apiary-mock.com/songs', true);
Request.send(JSON.stringify(document.body));



function getDropIds(dropArray){

	for(var i = 0; i < dropArray.length; i++) {
		var dropId = JSON.stringify(dropArray[i]["songID"]);
		console.log("DROP ID IS:" +dropId);
		dropId = dropId.substr(1,dropId.length-2);
		dropIdList.push(dropId);
	}
}



function loadSongs() {

	var mydiv = document.getElementById("songBox");
    console.log("SONG LENGTH" + songIdList.length);
	for(var i=0; i < dropIdList.length; i++){
		var songId = dropIdList[i];
		
		
		
		console.log("SONG ID "+songId);
		var newcontent = document.createElement('div');
    	newcontent.innerHTML = beginPlayer+songId+endPlayer;
    	

    	while (newcontent.firstChild) {
        	mydiv.appendChild(newcontent.firstChild);
    	}
	}
}