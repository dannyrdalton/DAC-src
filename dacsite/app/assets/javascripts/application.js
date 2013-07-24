// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

function DACMusicPlayer() {
	
	SC.initialize({
  	client_id: "f116577ada558b6ab3ddc756e60cbc71",
	});

	console.log('hoo hah!');	
	var trackList = [];
	var currentIndex = 0;
	
	SC.stream("/tracks/101745513", function(sound){
      sound.play();
  });

	this.play = function(trackId) {
		console.log('testing');
		SC.stream("/tracks/" + trackId, function(sound){
  		sound.play();
		});	
	};
}
