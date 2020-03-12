import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Point} from '../model/point';

@Injectable()
export class PointService {

  private apiUrl = 'http://localhost:16680/backend/api/points';

  constructor(private http: HttpClient) { }

  getAllPoints(): Observable<Point[]> {
    return this.http.get<Point[]>(this.apiUrl);
  }

  savePoint(point: Point): Observable<Point> {
    return this.http.post<Point>(this.apiUrl, point);
  }

  deleteAllPoints(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }
}
