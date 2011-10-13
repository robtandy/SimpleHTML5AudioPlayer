  function build_player (id, audio_src, image_src, tool_height, player_width, player_height) {
    // change css to suit height
    var player = $('#' + id + '.player');
    var player_in = $('<div id=' + id + ' class="player_in"></div>');

    var player_audio = $('<audio id=' + id + ' class="player_clip" src="' + audio_src + '">Something went wrong, html5 audio not working.</audio>');
    var player_button = $('<div id=' + id + ' class="play_pause_background"><div id=' + id + ' class="play_pause_button"></div></div>');
    var player_timeline = $('<div id=' + id + ' class="timeline"></div>');
    var player_elapsed = $('<div id=' + id + ' class="time elapsed"><div class="timelabel">00:00</div></div>');
    var player_remain = $('<div id=' + id + ' class="time remain"><div class="timelabel">00:00</div></div>');
    var player_img = $('<img src="' + image_src + '"></img>');

    player.html (player_in);

    player_img.css ('height', player_height + 'px');
    player_img.css ('width', player_width + 'px');

    player_in.prepend (player_img);
    player_in.prepend (player_button);
    player_in.prepend (player_elapsed);
    player_in.prepend (player_remain);
    player_in.prepend (player_timeline);
    
    player.append (player_audio);
    
    audio = player_audio.get (0);


    player_elapsed.css ('left', tool_height + 'px');
    player_elapsed.css ('height', tool_height + 'px');
    player_remain.css ('height', tool_height + 'px');
    player_button.css ('width', tool_height + 'px');
    player_button.css ('height', tool_height + 'px');
    player_button.find ('.play_pause_button').css ('height', tool_height + 'px');
    player_button.find ('.play_pause_button').css ('width', tool_height + 'px');


    console.log ('got audio id ' + audio.id);
    
    $(player_img).bind ('click', 
      (function (audio, img, timeline) {
        return function (an_event) {
          var x = an_event.pageX - img.offset ().left;
          var pos = audio.duration * x / img.width ();
          audio.currentTime = pos;
          timeline.css ('left', x + 'px');

        };
      }) (audio, player_img, player_timeline)
    );

    $(player_button).bind ('click', 
      (function (audio) {
        return function () {
          if (audio.paused) {
            audio.play (); 
          } else {
            audio.pause (); 
          }
        };
      }) (audio)
    );
    
    $(audio).bind ('play', 
      (function (btn) {
        return function () {
          player_button.find('.play_pause_button').addClass ('playing');
        };
      }) (player_button)
    );

    $(audio).bind ('pause', 
      (function (btn) {
        return function () {
          player_button.find('.play_pause_button').removeClass ('playing');
        };
      }) (player_button)
    );

    $(audio).bind ('durationchange', 
      (function (audio, remain) {
        return function () {
          //remaining time
          pos = parseInt (audio.duration, 10);
          mins = Math.floor (pos / 60, 10);
          secs = pos - mins * 60;
          remain.find('.timelabel').html (
              (mins>9?mins:"0"+mins) + ':' + (secs>9?secs:"0"+secs)); 
audio
        };
      }) (audio, player_remain)
    );

    $(audio).bind ('ended', 
      (function (audio, elapsed, remain) {
        return function () {
          audio.currentTime = 0;
          audio.pause ();
        };
      }) (audio, player_elapsed, player_remain)
    );

    $(audio).bind ('timeupdate', 
      (function (audio, elapsed, remain, img) {
        return function () {
          // move timeline to the right along the image
          player_timeline.css ('left', 
            audio.currentTime / audio.duration * img.width () + 'px');

          //elapsed time
          var pos = parseInt (audio.currentTime, 10);
          mins = Math.floor (pos / 60, 10);
          secs = pos - mins * 60;
          elapsed.find('.timelabel').html (
              (mins>9?mins:"0"+mins) + ':' + (secs>9?secs:"0"+secs)); 
          
          //remaining time
          pos = parseInt (audio.duration - audio.currentTime, 10);
          mins = Math.floor (pos / 60, 10);
          secs = pos - mins * 60;
          remain.find('.timelabel').html (
              (mins>9?mins:"0"+mins) + ':' + (secs>9?secs:"0"+secs)); 
        };
      }) (audio, player_elapsed, player_remain, player_img)
    );
  }
