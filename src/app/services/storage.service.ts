import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  load = null;
  constructor(public ngZone: NgZone,
              public router: Router) { }

  getAllEmotions(){
    this.load = 'Les familles sont en train d\'être chargées';
    firebase.database().ref('familles').on('value', (test) => {
      const object = test.toJSON();
      const arr = [];
      // tslint:disable-next-line:forin
      for (const value in object) {
        // tslint:disable-next-line:forin
        for (const i in object[value].emotions){
          object[value].emotions[i].checked = false;
        }
        arr.push(object[value]);
      }
      localStorage.setItem('familles', JSON.stringify(arr));
      this.load = null;
      location.reload();
    });
  }

  testHistorique(){
    let r = true;
    if (localStorage.getItem('historique') === null){
      r = false;
    }
    return r;
  }

  testUtilisateur(){
    let r = true;
    if (localStorage.getItem('utilisateur') === null){
      r = false;
    }
    return r;
  }

  redirectToHome(){
    this.ngZone.run(() => {
      this.router.navigate(['home/0', {error: 'Vous êtes redirigé ici car votre historique a été supprimé'}]);
    });
  }
}
