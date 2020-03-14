import {Component, OnInit} from '@angular/core';
import {Point} from '../../model/point';
import {PointService} from '../../services/point.service';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  scaleParameter = 130;
  point: Point;
  points: Point[];

  constructor(private pointService: PointService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.getPoints();
  }

  changeScaleParameter(n: number) {
    switch (n) {
      case 5:
        this.scaleParameter = 130;
        break;
      case 4:
        this.scaleParameter = 110;
        break;
      case 3:
        this.scaleParameter = 90;
        break;
      case 2:
        this.scaleParameter = 70;
        break;
      case 1:
        this.scaleParameter = 50;
        break;
      case 0:
        this.scaleParameter = 0;
        break;
    }
  }

  deletePoints(b: boolean) {
    if (b) {
      this.pointService.deleteAllPoints().subscribe((result) => {
        this.points = [];
        this.messageService.add({severity: 'success', summary: 'Таблица очищена'});
      }, (error1) =>
        this.messageService.add({severity: 'error', summary: 'Произошла ошибка'}));
    }
  }

  updatePoints(point: Point) {
    this.pointService.savePoint(point).subscribe((result: Point) => {
      const pointsArray = this.points.slice(0);
      pointsArray.push(result);
      this.points = pointsArray;
    });
  }

  getPoints() {
    this.pointService.getAllPoints().subscribe((data) =>
      this.points = data);
  }
}
