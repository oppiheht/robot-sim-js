var FIELD_SIZE = 144;
var ROBOT_SIZE = 18;
var ctx, canvas;
var pos = {x: 63, y: 9};
var angle = 0;

window.onload = function() {
    document.getElementById('commands').value = 'drive 5\nface 315\ndrive 20'
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    reset();
}

var run = function() {
    reset();
    var commands = document.getElementById('commands').value;
    commands = commands.split(/\r?\n/);

    for (var command in commands) {
        if (commands[command].includes('face')) {
            face(commands[command].match(/\d+/g));
            drawRobot();

        }
        if (commands[command].includes('drive')) {
            drive(commands[command].match(/\d+/g));
            drawRobot();
        }
    }
    document.getElementById('result').innerHTML = "{"+pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + "}";
}

function reset() {
    pos = {x: 63, y: 9};
    angle = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
    drawRobot();
}

function face(val) {
    angle = val;
}

function drive(distance) {
    pos.x += distance * Math.sin(angle * Math.PI / 180);
    pos.y += distance * Math.cos(angle * Math.PI / 180);
}

function drawRobot() {
    ctx.save();
    ctx.strokeStyle = "rgb(0, 0, 255)";
    ctx.translate(pos.x, pos.y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.strokeRect(-ROBOT_SIZE/2, -ROBOT_SIZE/2,  ROBOT_SIZE, ROBOT_SIZE);
    ctx.restore();
}

function drawField() {
    drawGrid();
}

function drawGrid() {
    for (var i = 0; i <= FIELD_SIZE; i+= FIELD_SIZE / 6) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, FIELD_SIZE);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(FIELD_SIZE, i);
        ctx.closePath();
        ctx.stroke();
    }
}