import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataSource = new BehaviorSubject<any>('default data');
  currentData = this.dataSource.asObservable();
  // có thể subcribe theo dõi thay đổi value của biến này thay cho messageSource

  constructor() { }

  // method này để change source message
  changeData(data: any): any {
    this.dataSource.next(data);
  }
}
