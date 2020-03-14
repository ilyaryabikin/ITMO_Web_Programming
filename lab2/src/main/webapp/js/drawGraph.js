const xCenter = 125;
const yCenter = 125;

const xMax = 1;
const yMax = 1;

const xScale = xCenter / (xMax + 0.5);
const yScale = yCenter / (yMax + 0.5);

const xOffset = xCenter + 0.5;
const yOffset = yCenter + 0.5;
let canvas = document.getElementById('plot');

if (canvas.getContext) {
    canvas.height = yCenter * 2;
    canvas.width = xCenter * 2;
    let context = canvas.getContext("2d");
    drawAxes(context);
    drawAreas(context);
}

function drawAxes(ctx) {
    ctx.font = "14px serif";
    ctx.strokeText('Y', xCenter + 10, 15);
    ctx.strokeText('X', xCenter * 2 - 10, yCenter - 10);

    ctx.font = "12px serif";
    ctx.lineWidth = 1;

    // draw x-axis
    ctx.beginPath();
    ctx.moveTo(0, yOffset);
    ctx.lineTo(xCenter * 2, yOffset);
    ctx.stroke();
    ctx.closePath();

    // draw arrow
    ctx.beginPath();
    ctx.moveTo(xCenter * 2 + 0.5, yCenter + 0.5);
    ctx.lineTo(xCenter * 2 + 0.5 - 8, yCenter + 0.5 - 3);
    ctx.lineTo(xCenter * 2 + 0.5 - 8, yCenter + 0.5 + 3);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();

    // draw x values
    let j = -xMax;
    while (j <= xMax) {
        let x = j * xScale;
        ctx.strokeStyle = '#aaa';
        ctx.beginPath();
        ctx.moveTo(x + xOffset, yOffset);
        ctx.lineTo(x + xOffset, yOffset - 5);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = '#666';
        ctx.strokeText(j === 1 || j === -1 ? 'R' : 'R/2', x + xOffset - 5, yOffset - 10);

        j += 0.5;
        if (j === 0) {
            j += 0.5;
        }
    }

    // draw y-axis
    ctx.beginPath();
    ctx.moveTo(xOffset, 0);
    ctx.lineTo(xOffset, yCenter * 2);
    ctx.stroke();
    ctx.closePath();

    // draw arrow
    ctx.beginPath();
    ctx.moveTo(xCenter + 0.5, 0.5);
    ctx.lineTo(xCenter + 0.5 - 3, 0.5 + 8);
    ctx.lineTo(xCenter + 0.5 + 3, 0.5 + 8);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();

    // draw y values
    j = -yMax;
    while (j <= yMax) {
        let y = j * yScale;
        ctx.strokeStyle = '#aaa';
        ctx.beginPath();
        ctx.moveTo(xOffset, y + yOffset);
        ctx.lineTo(xOffset + 5, y + yOffset);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = '#666';
        ctx.strokeText(j === 1 || j === -1 ? 'R' : 'R/2', xOffset + 10, y + yOffset + 5);

        j += 0.5;
        if (j === 0) {
            j += 0.5;
        }
    }
}

function offsetX(v) {
    return xOffset + (v * xScale);
}

function offsetY(v) {
    return yOffset - (v * yScale);
}

function drawAreas(ctx) {
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = '#077bff';
    ctx.fillStyle = '#077bff';

    ctx.beginPath();
    ctx.moveTo(offsetX(0), offsetY(0));
    ctx.lineTo(offsetX(-0.5), offsetY(0));
    ctx.lineTo(offsetX(0), offsetY(0.5));
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(offsetX(0), offsetY(0));
    ctx.lineTo(offsetX(0.5), offsetY(0));
    ctx.lineTo(offsetX(0.5), offsetY(-1));
    ctx.lineTo(offsetX(0), offsetY(-1));
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(offsetX(0), offsetY(0));
    ctx.arc(offsetX(0), offsetY(0), offsetX(1) - offsetX(0), 0, 3 * Math.PI / 2, true);
    ctx.fill();
    ctx.closePath();
}