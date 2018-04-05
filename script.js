var box = document.getElementById('box'); // get the box
var button = document.getElementById('button'); // get the button

var boxColor; // stores the current color of the user's box
var serverColor; // stores the color of the box on the server

var getColorRequest = new XMLHttpRequest(); // AJAX request to get the color from the server
var changeColorRequest = new XMLHttpRequest(); // AJAX request to change the color on the server

// sends a getColorRequest
function getColor() {
  getColorRequest.open('GET', '/getColor.php', true); // prepare a GET request to /getColor.php
  getColorRequest.send(null); // send the request
}

// sends a changeColorRequest
function changeColor() {
  boxColor = box.className; // get the current color of the box

  changeColorRequest.open('POST', '/changeColor.php', true); // prepare a POST request to /changeColor.php
  changeColorRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  changeColorRequest.send('userColor=' + boxColor); // send the request with the box color as data
}

function toggleColor() {
  if (box.className === 'red') { // if the box is currently red
    box.className = 'blue'; // make it blue
  } else { // if the box is currently blue
    box.className = 'red'; // make it red
  }
}

getColorRequest.onload = function() {
  if (getColorRequest.status === 200) { // if the server status was ok
    boxColor = box.className; // get the current color of the user's box
    serverColor = getColorRequest.responseText; // store the server's response, the color of the box on the server

    if (boxColor !== serverColor) { // if the user's box is not up to date
      box.className = serverColor; // update the user's box
    }
  }
}

// toggle the box color after a changeColorRequest response is recieved
changeColorRequest.onload = function() {
  if (changeColorRequest.status === 200) { // if the server status was ok
    toggleColor(); // toggle the color
  }
};

getColor(); // get the initial box color from the server

setInterval(getColor, 1000); // get the box color ever second

button.addEventListener('click', changeColor, false); // calls changeColor() when the button is clicked
