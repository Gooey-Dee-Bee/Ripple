SC.initialize({
	client_id: 'dafab2de81f874d25715f0e225e7c71a'
});

var query = "Stay With Me";
console.log("SEARCH.JS");
// SC.get('/tracks', { q: query }, function(tracks) {
// 	console.log(tracks);
// });



function showSongSearch() {
	document.getElementById('searchBox').style.display = "block";
	document.getElementById('dropBox').style.display = "none";
	document.getElementById('songSearchSuggest').style.display = "none";
	document.getElementById('urlSearchSuggest').style.display = "block";
	console.log('show Song Search');
}

function showURLSearch() {
	document.getElementById('dropBox').style.display = "block";
	document.getElementById('searchBox').style.display = "none";
	document.getElementById('urlSearchSuggest').style.display = "none";
	document.getElementById('songSearchSuggest').style.display = "block";
	console.log('show URL Search');
}

//showSongSearch();
showURLSearch();