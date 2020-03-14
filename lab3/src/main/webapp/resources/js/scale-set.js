function setPlaneScale(radius) {
    let scaleParameter;

    switch (radius) {
        case 4:
            scaleParameter = 110;
            break;
        case 3.5:
            scaleParameter = 100;
            break;
        case 3:
            scaleParameter = 90;
            break;
        case 2.5:
            scaleParameter = 80;
            break;
        case 2:
            scaleParameter = 70;
            break;
        case 1.5:
            scaleParameter = 60;
            break;
        case 1:
            scaleParameter = 50;
            break;
        default:
            scaleParameter = 50;
            break;
    }
    drawPlane(scaleParameter);
}