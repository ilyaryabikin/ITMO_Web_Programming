canvas.addEventListener('click', function (event) {
    let coords = canvas.getBoundingClientRect();
    let r = document.getElementById('radius').value;
    let clickX = coords.width - (coords.right - event.clientX);
    let clickY = coords.height - (coords.bottom - event.clientY);
    let clickXOffset = (((clickX - 125) / xScale) * r).toFixed(1);
    let clickYOffset = (-((clickY - 125) / yScale) * r).toFixed(1);

    document.getElementById('xClick').value = clickXOffset;
    document.getElementById('yClick').value = clickYOffset;

    document.getElementById('coordsForm').submit();
});