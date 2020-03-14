function drawClick(xCoordinate, yCoordinate, r, isInside) {

    let context = canvas.getContext('2d');

    let x = ((xCoordinate * xScale) / r) + 150;
    let y = (-((yCoordinate * yScale) / r) + 150);

    if (x >= 300) {
        x = 298;
    }
    if (x <= 0) {
        x = 2;
    }
    if (y >= 300) {
        y = 298;
    }
    if (y <= 0) {
        y = 2;
    }

    context.globalAlpha = 0.8;
    if(isInside === 'true') {
        context.fillStyle ='#28a745'
    }
    else {
        context.fillStyle ='#dc3545';}

    context.beginPath();
    context.arc(x, y, 2, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
}