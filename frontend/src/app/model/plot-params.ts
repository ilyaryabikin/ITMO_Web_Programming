export class PlotParams {
  xCenter = 150;
  yCenter = 150;
  xMax = 1;
  yMax = 1;
  xOffset = this.xCenter + 0.5;
  yOffset = this.yCenter + 0.5;
  xScale = 130;
  yScale = 130;

  constructor() {
  }

  setScale(scaleParameter: number) {
    this.xScale = scaleParameter;
    this.yScale = scaleParameter;
  }
}
