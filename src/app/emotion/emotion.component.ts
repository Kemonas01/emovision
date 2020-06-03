import { Component, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { StorageService } from '../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmotionService } from '../services/emotion.service';
@Component({
  selector: 'app-emotion',
  templateUrl: './emotion.component.html',
  styleUrls: ['./emotion.component.css']
})
export class EmotionComponent implements OnInit {
  emotions = [];
  emotionsSelected = [];
  title = '';
  index = null;
  indexS = null;
  defaultValue = '';
  constructor(public storage: StorageService,
              private route: ActivatedRoute,
              public emotionService: EmotionService,
              public ngZone: NgZone,
              public router: Router) { }

  ngOnInit() {
    this.storage.getAllEmotions();
    this.getEmotions();
  }

  getEmotions(){
    this.route.params.subscribe(params => {
      this.index = params.i;
    });
    this.title = JSON.parse(localStorage.getItem('familles'))[this.index].libelle;
    const data = JSON.parse(localStorage.getItem('familles'))[this.index].emotions;
      // tslint:disable-next-line:forin
    for (const value in data) {
      this.emotions.push(data[value].libelle);
    }
  }

  onClick(data){
    const historique = JSON.parse(localStorage.getItem('historique'));
    /*const ressentie = {
      famille: this.title,
      emotion: data
    };
    historique.emotionRessentie = ressentie;
    localStorage.setItem('historique', JSON.stringify(historique));*/
    const found  = this.emotionsSelected.some( ( text ) => {
      this.indexS = this.emotionsSelected.indexOf( data );
      return text.indexOf( data ) !== -1 ;
    });
    if ( !found ) {
      this.emotionsSelected.push(data);
    } else {
      this.emotionsSelected.splice(this.indexS, 1);
    }
    this.defaultValue = '';
    console.log(this.emotionsSelected);
  }

  onSubmitNext(){
    const historique = JSON.parse(localStorage.getItem('historique'));
    const ressentie = {
      famille: this.title,
      emotion: ''
    };
    historique.emotionRessentie = ressentie;
    localStorage.setItem('historique', JSON.stringify(historique));
    this.emotionService.setData(this.emotionsSelected);
    this.ngZone.run(() => {
      this.router.navigate(['emotions-selected']);
    });
  }
}
