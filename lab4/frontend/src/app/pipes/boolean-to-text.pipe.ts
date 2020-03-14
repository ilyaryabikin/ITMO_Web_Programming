import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'booleanToText'})
export class BooleanToText implements PipeTransform {
  transform(value: boolean, ...args): any {
    return value ? 'Да' : 'Нет';
  }
}
