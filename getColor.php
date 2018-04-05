<?php

  $serverColor = trim(file_get_contents('color.txt')); // get the color of the box stored on the server (w/o trim the color is followed by a newline)
  echo $serverColor; // respond to the client with the server color

?>
