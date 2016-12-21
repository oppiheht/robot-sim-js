window.onload = function() {
    document.getElementById('commands').value = 'drive 5\nface 315\ndrive 20'
}

var pos = {x: 63, y: 9};
var angle = 0;

var run = function() {
    reset();
    var commands = document.getElementById('commands').value;
    commands = commands.split(/\r?\n/);

    for (var command in commands) {
        if (commands[command].includes('face')) {
            face(commands[command].match(/\d+/g));
        }
        if (commands[command].includes('drive')) {
            drive(commands[command].match(/\d+/g));
        }
    }
    document.getElementById('result').innerHTML = "{"+pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + "}";
}

function reset() {
    pos = {x: 63, y: 9};
    angle = 0;
}

function face(val) {
    angle = val;
}

function drive(distance) {
    pos.x += distance * Math.sin(angle * Math.PI / 180);
    pos.y += distance * Math.cos(angle * Math.PI / 180);
}