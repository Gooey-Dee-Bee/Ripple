SC.initialize({
  client_id: 'dafab2de81f874d25715f0e225e7c71a'
});

var titleEntered = "Stay With Me" ; 
console.log("SEARCH.JS");
SC.get('/tracks', { title: titleEntered }, function(tracks) {
  console.log(tracks);
});