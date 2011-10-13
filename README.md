SimpleHTML5AudioPlayer
======================

## DESCRIPTION

This is simply to make using the HTML5 audio tag a little bit easier.  It abstracts away
some of the cruft of creating an audio player and specifically, makes it easy to have more
than one (or many!) audio players on a single page.

## USAGE

Make the .js .png .css files reachable from your web page and set up an audio player like this:
    
    <div id=1 class='player'></div>

Call this javascript function on document ready

    build_player (1, 'some_file.wav', 'some_file.png', 20, 600, 100);

The signature of build_player is

    build_player (id_of_player_div, path_to_wav_file, path_to_png_file,
        height_of_controls, width_of_player, height_of_player)

## EXAMPLE





