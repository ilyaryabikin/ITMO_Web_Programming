import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Point} from '../../model/point';
import {AuthService} from '../../services/auth.service';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-create-point',
  templateUrl: './create-point.component.html',
  styleUrls: ['./create-point.component.css', ]
})
export class CreatePointComponent implements OnInit {

  point: Point;
  xSelected: number[];
  radiusSelected: number[];
  @Output() private radiusChange: EventEmitter<number>;
  @Output() private updatePoints: EventEmitter<Point>;
  @Output() private deletePoints: EventEmitter<boolean>;

  constructor(private authService: AuthService,
              private messageService: MessageService) {
    this.radiusChange = new EventEmitter<number>();
    this.updatePoints = new EventEmitter<Point>();
    this.deletePoints = new EventEmitter<boolean>();
    this.initializePoint();
  }

  ngOnInit() {
  }

  initializePoint() {
    this.point = {
      id: null,
      xCoordinate: null,
      yCoordinate: null,
      radius: null,
      inside: false
    };
  }

  changeX() {
    const lastX = this.xSelected[this.xSelected.length - 1];
    this.xSelected.length = 0;
    this.xSelected.push(lastX);
  }

  changeRadius() {
    const lastR = this.radiusSelected[this.radiusSelected.length - 1];
    this.radiusSelected.length = 0;
    this.radiusSelected.push(lastR);
    if (lastR != null) {
      this.radiusChange.emit(+lastR);
    }
  }

  savePoint(pointForm) {
    if ((+this.radiusSelected[0]) <= 0) {
      this.messageService.add({severity: 'error', summary: 'Неверно введен радиус', detail: 'Выберите положительный радиус'});
      return;
    }
    if (this.point.yCoordinate < -3 || this.point.yCoordinate > 3) {
      this.messageService.add({severity: 'error', summary: 'Неверно введена координата Y', detail: 'Не находится в интервале (-3;3)'});
      return;
    }
    if (pointForm.valid) {
      this.point.radius = +this.radiusSelected[0];
      this.point.xCoordinate = +this.xSelected[0];
      this.updatePoints.emit(this.point);
    } else {
      this.messageService.add({severity: 'error', summary: 'Неверно введены даные', detail: 'Введите данные корректно'});
    }
  }

  deleteAllPoints() {
    this.deletePoints.emit(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.isLoggedIn = false;
  }
}
