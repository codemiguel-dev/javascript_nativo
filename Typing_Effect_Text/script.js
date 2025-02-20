const text = "Hello World!";

let index = 0;
let speed = 150;

function writeText() {
  document.getElementById("typing").innerHTML = text.slice(0, index);
    index++;
    if (index > text.length) {
        index = 0;
    }
}
setInterval(writeText, speed);