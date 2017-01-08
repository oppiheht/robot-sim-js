var FIELD_SIZE = 142;
var ROBOT_SIZE = 18;
var ctx, canvas;    

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