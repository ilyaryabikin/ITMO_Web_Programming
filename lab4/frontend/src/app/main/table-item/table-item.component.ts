import {Component, Input} from '@angular/core';
import {Point} from '../../model/point';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.css']
})
export class TableItemComponent {

  @Input() points: Point[];

  constructor() { }

}
