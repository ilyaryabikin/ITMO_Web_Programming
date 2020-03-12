let radius = 1;

canvas.addEventListener('click', function (event) {
    let coords = canvas.getBoundingClientRect();
    let clickX = coords.width - (coords.right - event.clientX);
    let clickY = coords.height - (coords.bottom - event.clientY);
    let clickXOffset = (((clickX - 150) / xScale) * radius).toFixed(1);
    let clickYOffset = (-((clickY - 150) / yScale) * radius).toFixed(1);

    document.getElementsByTagName('input')[2].value = clickXOffset;
    document.getElementsByTagName('input')[3].value = clickYOffset;
    document.getElementsByTagName('input')[4].value = radius;
    document.getElementsByClassName('submit-coordinate')[0].click();

});