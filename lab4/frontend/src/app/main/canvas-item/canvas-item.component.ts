import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Point} from '../../model/point';
import {PlotParams} from '../../model/plot-params';

@Component({
  selector: 'app-canvas-item',
  templateUrl: './canvas-item.component.html',
  styleUrls: ['./canvas-item.component.css']
})
export class CanvasItemComponent implements OnInit, OnChanges {

  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;
  @Input() scaleParameter;
  private plotParams: PlotParams;
  @Input() points: Point[];
  @Output() updatePoints: EventEmitter<Point>;

  constructor() {
    this.plotParams = new PlotParams();
    this.updatePoints = new EventEmitter<Point>();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.drawPlane();
    if (this.points) {
     this.points.forEach((point) => this.drawClick(point));
    }
  }

  drawClick(point: Point) {
    let x = ((point.xCoordinate * this.plotParams.xScale) / point.radius) + 150;
    let y = (-((point.yCoordinate * this.plotParams.yScale) / point.radius) + 150);

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

    this.context.globalAlpha = 0.8;
    if (point.inside) {
      this.context.fillStyle = '#28a745';
    } else {
      this.context.fillStyle = '#dc3545';
    }

    this.context.beginPath();
    this.context.arc(x, y, 2, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
  }

  submitClick(event) {
    const rad = this.scaleParameter === 0 ? 0 : (this.scaleParameter - 30) / 20;

    const coords = this.canvas.nativeElement.getBoundingClientRect();
    const clickX = coords.width - (coords.right - event.clientX);
    const clickY = coords.height - (coords.bottom - event.clientY);
    const clickXOffset = (((clickX - 150) / this.plotParams.xScale) * rad).toFixed(1);
    const clickYOffset = (-((clickY - 150) / this.plotParams.yScale) * rad).toFixed(1);

    let point: Point;
    point = {
      id: null,
      xCoordinate: Number(clickXOffset),
      yCoordinate: Number(clickYOffset),
      radius: rad,
      inside: false
    };

    this.updatePoints.emit(point);
  }

  drawPlane() {
    this.plotParams.setScale(this.scaleParameter);
    this.canvas.nativeElement.height = this.plotParams.yCenter * 2;
    this.canvas.nativeElement.width = this.plotParams.xCenter * 2;
    this.drawAxes();
    this.drawAreas();
  }

  drawAxes() {
    this.context.font = '14px serif';
    this.context.strokeText('Y', this.plotParams.xCenter + 10, 15);
    this.context.strokeText('X', this.plotParams.xCenter * 2 - 10, this.plotParams.yCenter - 10);

    this.context.font = '12px serif';
    this.context.lineWidth = 1;

    // draw x-axis
    this.context.beginPath();
    this.context.moveTo(0, this.plotParams.yOffset);
    this.context.lineTo(this.plotParams.xCenter * 2, this.plotParams.yOffset);
    this.context.stroke();
    this.context.closePath();

    // draw arrow
    this.context.beginPath();
    this.context.moveTo(this.plotParams.xCenter * 2 + 0.5, this.plotParams.yCenter + 0.5);
    this.context.lineTo(this.plotParams.xCenter * 2 + 0.5 - 8, this.plotParams.yCenter + 0.5 - 3);
    this.context.lineTo(this.plotParams.xCenter * 2 + 0.5 - 8, this.plotParams.yCenter + 0.5 + 3);
    this.context.stroke();
    this.context.closePath();
    this.context.fill();

    // draw x values
    let j = -this.plotParams.xMax;
    while (j <= this.plotParams.xMax) {
      const x = j * this.plotParams.xScale;
      this.context.strokeStyle = '#aaa';
      this.context.beginPath();
      this.context.moveTo(x + this.plotParams.xOffset, this.plotParams.yOffset);
      this.context.lineTo(x + this.plotParams.xOffset, this.plotParams.yOffset - 5);
      this.context.stroke();
      this.context.closePath();

      this.context.strokeStyle = '#666';
      let label;
      if (j < 0) {
        label = '-';
        this.context.strokeText(j === -1 ? label += 'R' : label += 'R/2', x + this.plotParams.xOffset - 5, this.plotParams.yOffset - 10);
      } else {
        this.context.strokeText(j === 1 ? label = 'R' : label = 'R/2', x + this.plotParams.xOffset - 5, this.plotParams.yOffset - 10);
      }

      j += 0.5;
      if (j === 0) {
        j += 0.5;
      }
    }

    // draw y-axis
    this.context.beginPath();
    this.context.moveTo(this.plotParams.xOffset, 0);
    this.context.lineTo(this.plotParams.xOffset, this.plotParams.yCenter * 2);
    this.context.stroke();
    this.context.closePath();

    // draw arrow
    this.context.beginPath();
    this.context.moveTo(this.plotParams.xCenter + 0.5, 0.5);
    this.context.lineTo(this.plotParams.xCenter + 0.5 - 3, 0.5 + 8);
    this.context.lineTo(this.plotParams.xCenter + 0.5 + 3, 0.5 + 8);
    this.context.stroke();
    this.context.closePath();
    this.context.fill();

    // draw y values
    j = -this.plotParams.yMax;
    while (j <= this.plotParams.yMax) {
      const y = j * this.plotParams.yScale;
      this.context.strokeStyle = '#aaa';
      this.context.beginPath();
      this.context.moveTo(this.plotParams.xOffset, y + this.plotParams.yOffset);
      this.context.lineTo(this.plotParams.xOffset + 5, y + this.plotParams.yOffset);
      this.context.stroke();
      this.context.closePath();

      this.context.strokeStyle = '#666';
      let label;
      if (j < 0) {
        this.context.strokeText(j === -1 ? label = 'R' : label = 'R/2', this.plotParams.xOffset + 10, y + this.plotParams.yOffset + 5);
      } else {
        label = '-';
        this.context.strokeText(j === 1 ? label += 'R' : label += 'R/2', this.plotParams.xOffset + 10, y + this.plotParams.yOffset + 5);
      }

      j += 0.5;
      if (j === 0) {
        j += 0.5;
      }
    }
  }

  offsetX(v: number): number {
    return this.plotParams.xOffset + (v * this.plotParams.xScale);
  }

  offsetY(v: number): number {
    return this.plotParams.yOffset - (v * this.plotParams.yScale);
  }

  drawAreas() {
    this.context.lineWidth = 1;
    this.context.globalAlpha = 0.5;
    this.context.strokeStyle = '#007ad9';
    this.context.fillStyle = '#007ad9';

    this.context.beginPath();
    this.context.moveTo(this.offsetX(0), this.offsetY(0));
    this.context.lineTo(this.offsetX(-1), this.offsetY(0));
    this.context.lineTo(this.offsetX(0), this.offsetY(0.5));
    this.context.fill();
    this.context.closePath();

    this.context.beginPath();
    this.context.moveTo(this.offsetX(0), this.offsetY(0));
    this.context.lineTo(this.offsetX(-1), this.offsetY(0));
    this.context.lineTo(this.offsetX(-1), this.offsetY(-1));
    this.context.lineTo(this.offsetX(0), this.offsetY(-1));
    this.context.fill();
    this.context.closePath();

    this.context.beginPath();
    this.context.moveTo(this.offsetX(0), this.offsetY(0));
    this.context.arc(this.offsetX(0), this.offsetY(0), this.offsetX(0.5) - this.offsetX(0), 0, 3 * Math.PI / 2, true);
    this.context.fill();
    this.context.closePath();
  }
}
