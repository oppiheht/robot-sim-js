var FIELD_SIZE = 142;
var ROBOT_SIZE = 18;
var ctx, canvas;
var robot = {
    pos: {
        x: 0, 
        y: 0
    },
    angle: 0
}

window.onload = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    drawField();
}

var run = function() {
    drawField();
    setStartPosition();
    drawRobot();
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
    document.getElementById('result').innerHTML = "{"+robot.pos.x.toFixed(2) + ", " + robot.pos.y.toFixed(2) + "}";
}

function setStartPosition() {
    if (document.getElementById('blueRadio').checked) {
        robot.pos.x = startPos.blue.x;
        robot.pos.y = startPos.blue.y;
    }
    else {
        robot.pos.x = startPos.red.x;
        robot.pos.y = startPos.red.y;
    }
    robot.angle = 0;
}

function face(val) {
    robot.angle = val;
}

function drive(distance) {
    robot.pos.x -= distance * Math.sin(robot.angle * Math.PI / 180);
    robot.pos.y += distance * Math.cos(robot.angle * Math.PI / 180);
}

function drawRobot() {
    ctx.save();
    ctx.strokeStyle = "rgb(0, 0, 255)";
    ctx.translate(robot.pos.x, robot.pos.y);
    ctx.rotate(robot.angle * Math.PI / 180);
    ctx.strokeRect(-ROBOT_SIZE/2, -ROBOT_SIZE/2,  ROBOT_SIZE, ROBOT_SIZE);
    ctx.restore();
}

function drawField() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
}

function drawGrid() {
    for (var i = -1; i <= FIELD_SIZE; i+= 144 / 6) {
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

function radioClick(value) {
    var commands = document.getElementById('commands');
    if (commands.value.length == 0) {
        commands.value = paths[value];
    }
}
