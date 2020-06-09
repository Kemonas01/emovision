import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmotionService {

  emotions;

  private data: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {}

  setData(value) {
    const test = [];
    // tslint:disable-next-line:forin
    for (const i in value){
      const json = {
        emotion: value[i],
        checked: false
      };
      test.push(json);
    }
    this.emotions = test;
    this.data.next(this.emotions);
  }

  getData(): Observable<any> {
    return this.data.asObservable();
  }
}
