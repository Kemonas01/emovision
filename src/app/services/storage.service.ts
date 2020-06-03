import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getAllEmotions(){
    firebase.database().ref('familles').on('value', (test) => {
      const object = test.toJSON();
      const arr = [];
      // tslint:disable-next-line:forin
      for (const value in object) {
        arr.push(object[value]);
      }
      localStorage.setItem('familles', JSON.stringify(arr));
    });
  }
}
