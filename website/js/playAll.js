SC.initialize({
    client_id: 'dafab2de81f874d25715f0e225e7c71a'
});

function playAll(){
	console.log("play all");
	var widgetIframe = document.getElementById('sc-widget'), widget = SC.Widget(widgetIframe);
	
	widget.bind(SC.Widget.Events.PLAY, function() {
		// get information about currently playing sound
		widget.getCurrentSound(function(currentSound) {
      		console.log('sound ' + currentSound.get('') + 'began to play');
    	});
  	});
}
