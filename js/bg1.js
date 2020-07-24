// geting canvas by id background
var bg = document.getElementById("bg");
var ctx = bg.getContext("2d");

//making the canvas full screen
bg.height = window.innerHeight;
bg.width = window.innerWidth;


var matrix = "`1234567890-=!@#$%^&*()_+qwertyuiop[]asdfghjkl;'zxcvbnm,./QWERTYUIOPASDFGHJKLZXCVBNM<>?;'\"\|~";
matrix = matrix.split("");

var font_size = 10;
var columns = bg.width / font_size;
var drops = [];
for (var x = 0; x < columns; x++)
    drops[x] = 1;
function draw() {
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(0, 0, bg.width, bg.height);

    ctx.fillStyle = "rgb(0,31,86)";
    ctx.font = font_size + "px arial";
    for (var i = 0; i < drops.length; i++) {
        var text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        if (drops[i] * font_size > bg.height && Math.random() > 0.975)
            drops[i] = 0;
        drops[i]++;
    }
}

setInterval(draw, 35);