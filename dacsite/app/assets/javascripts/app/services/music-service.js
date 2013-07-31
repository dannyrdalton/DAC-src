app.service('MusicPlayer', ['$cookieStore',
	function($cookieStore) {
		self = this;
		SC.initialize({
      client_id: 'f116577ada558b6ab3ddc756e60cbc71'
    });
		
		$(document).keyup(function(event) {
			if (event.keyCode === 32) {
				self.playPause();
			}
		});

		$(document).keydown(function(event) {
			if (event.keyCode === 32) {
				event.preventDefault();
			}
		});
		
		//private
		console.log($cookieStore.get('_dac_playlist'));
		var playlist = $cookieStore.get('_dac_playlist');
		var currentIndex;
		var currentSound;
		var playing = false;
		
		if (!playlist) {
			playlist = [];
			currentIndex = -1;
			currentTrack = {};
			currentSound = {};
		} else {
			currentIndex = 0;
			currentTrack = playlist[playlist.length - 1];
			SC.stream('/tracks/' + currentTrack.track_id, function(sound) {
				currentSound = sound;
			});
		}
		
		//public
		this.playPause = function() {
			if (currentSound) {
				if (playing) {
					playing = false;
					currentSound.pause();
				} else {
					playing = true;
					currentSound.play();
				}
			}	
		};

		this.playFromBlog = function(track) {
			SC.stream('/tracks/' + track.track_id, function(sound) {
				if (playing) {
					currentSound.stop();
				}
				//if track already in playlist, move track to front of playlist
				if (playlist.indexOf(track) !== -1) {
					console.log(playlist);
					playlist.splice(playlist.indexOf(track), 1);
				}
				playlist.push(track);
				$cookieStore.put('_dac_playlist', playlist);
				currentIndex = playlist.length - 1;
				currentTrack = track;
				currentSound = sound;
				playing = true;
				sound.play({
					onplay: function() {
						console.log('weeoooooo');
					},
					whileplaying: function() {
					},
					onfinish: function() {
						console.log('yeahhhh buddyyy');
						self.skipFwd();
					}
				});
			});
		};

		this.skipBack = function() {
			if (currentSound) {
				//calculate new index and get track at that index
				var newIndex = currentIndex - 1;
				if (newIndex < 0) newIndex = playlist.length - 1;
				var newTrack = playlist[newIndex];
				
				//stream new Track
				SC.stream('/tracks/' + newTrack.track_id, function(sound) {
					if (playing) {
						currentSound.stop();
					}
					currentIndex = newIndex;
					currentTrack = newTrack;
					currentSound = sound;
					playing = true;
					sound.play({
						onfinish: function() {
							self.skipFwd();
						}
					});
				});
			}
		};

		this.skipFwd = function() {
			if (currentSound) {
				var newIndex = currentIndex + 1;
				if (newIndex === playlist.length) newIndex = 0;
				var newTrack = playlist[newIndex];

				SC.stream('/tracks/' + newTrack.track_id, function(sound) {
					if (playing) {
						currentSound.stop();
					}
					currentIndex = newIndex;
					currentTrack = newTrack;
					currentSound = sound;
					playing = true;
					sound.play({
						onfinish: function() {
							self.skipFwd();
						}
					});
				});
			}
		};
	}
]);
