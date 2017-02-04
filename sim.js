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
            drive(Number(commands[command].match(/-?[0-9]\d*(\.\d+)?/g)));
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

function radioClick(value) {
    var commands = document.getElementById('commands');
    if (commands.value.length == 0) {
        commands.value = paths[value];
    }
}