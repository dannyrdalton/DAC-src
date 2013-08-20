app.service('MusicPlayer', ['$rootScope', '$cookieStore',
	function($rootScope, $cookieStore) {
		self = this;
		
		SC.initialize({
      client_id: 'f116577ada558b6ab3ddc756e60cbc71'
    });
	/*	
		$(document).keyup(function(event) {
			if (event.keyCode === 32) {
				self.playPause();
			}
		});

		$(document).keydown(function(event) {
			if (event.keyCode === 32) {
				event.preventDefault();
			}
		}); */
		
		//private variables
		var playlist = [];
		var currentIndex = -1;
		var currentTrack = {};
		var currentSound = {};
		var playing = false;

		//helper functions
		//for a track that is not already on the playlist (or is on the playlist and played from the blog)
		var playNewSound = function(sound) {
			sound.play({
				onplay: function() {
					$rootScope.$broadcast('playlist.change');
				},
      	onfinish: function() {
       		self.skipFwd();
       	}
   		});
		};
		
		//checks whether or not the playlist contains a given track. uses track_id (which is the soundcloud API id) to check for sameness
		var containsTrack = function(playlist, track) {
			for (var i = 0; i < playlist.length; i++) {
				if (playlist[i].track_id === track.track_id) return true;
			}
			return false;
		};

		//finds index of a given track in the playlist
		var indexOfTrack = function(playlist, track)	 {
			for (var i = 0; i < playlist.length; i++) {
				if (playlist[i].track_id === track.track_id) return i;
			}
			return -1;
		};
		
		//public
		//getters
		this.getPlaylist = function() {
			return playlist;
		};
		
		//setters
		this.setInitialPlaylist = function(newPlaylist) {
			playlist = newPlaylist;
			if (playlist !== null) {
				currentIndex = playlist.length - 1;
				currentTrack = playlist[playlist.length - 1];
				$rootScope.$broadcast('playlist.new');
				//preload first track in playlist so user can click play right away
				SC.stream('/tracks/' + currentTrack.track_id, function(sound) {
					currentSound = sound;
				});
			} else {
				playlist = [];
			}
		};

		this.setPlaylist = function(newPlaylist) {
			playlist = newPlaylist;
		};

		//music controls
		this.playPause = function() { 
			if (currentSound) {
				if (playing) {
					playing = false;
					currentSound.pause();
				} else {
					playing = true;
					currentSound.play({
						onfinish: function() {
							self.skipFwd();
						}
					});
				}
			}	
		};

		this.playFromBlog = function(track) {
			SC.stream('/tracks/' + track.track_id, function(sound) {
				if (playing) {
					currentSound.stop();
				}
				//if track already in playlist, move track to front of playlist
				if (containsTrack(playlist, track)) {
					console.log(playlist);
					playlist.splice(indexOfTrack(playlist, track), 1);
				}
				playlist.push(track);
				currentIndex = playlist.length - 1;
				currentTrack = track;
				currentSound = sound;
				playing = true;
				playNewSound(sound);
			});
		};

		this.playFromPlaylist = function(track) {
			SC.stream('/tracks/' + track.track_id, function(sound) {
				if (playing) {
					currentSound.stop();
				}
				currentIndex = indexOfTrack(playlist, track);
				currentTrack = playlist[currentIndex];
				currentSound = sound;
				playing = true;
				sound.play({
					onfinish: function() {
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
