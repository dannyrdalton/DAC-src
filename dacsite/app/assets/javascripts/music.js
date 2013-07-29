SC.initialize({
  client_id: 'f116577ada558b6ab3ddc756e60cbc71'
});

SC.stream("/tracks/293", function(sound){
  sound.play();
});
