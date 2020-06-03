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
    this.data.next(value);
  }

  getData(): Observable<any> {
    return this.data.asObservable();
  }
}
