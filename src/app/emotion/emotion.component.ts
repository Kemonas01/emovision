import { Component, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { StorageService } from '../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmotionService } from '../services/emotion.service';
@Component({
  selector: 'app-emotion',
  templateUrl: './emotion.component.html',
  styleUrls: ['./emotion.component.scss']
})
export class EmotionComponent implements OnInit {
  /**
   * Liste des émotions
   */
  emotions = [];
  /**
   * Liste des émotions
   */
  checked = [];
  /**
   * Liste des émotions sélectionnées
   */
  emotionsSelected = [];
  /**
   * emotions ajoutées
   */
  emotionsAdd = [];
  /**
   * la famille
   */
  title = '';
  sizeEmotions = 0;
  index = null;
  indexS = null;
  /**
   * la valeur par défault de l'input
   */
  defaultValue = '';
  constructor(public storage: StorageService,
              private route: ActivatedRoute,
              public emotionService: EmotionService,
              public ngZone: NgZone,
              public router: Router) { }

  ngOnInit() {
    this.getEmotions();
  }
  /**
   * Permet de récupérer les familles (avec les émotions) du localStorage, si il y en a pas ->
   * retourne sur la famille pour recréer le local storage
   */
  getEmotions(){
    if (localStorage.getItem('familles') !== null){
      this.route.params.subscribe(params => {
        this.index = params.i;
      });
      this.title = JSON.parse(localStorage.getItem('familles'))[this.index].libelle;
      const data = JSON.parse(localStorage.getItem('familles'))[this.index].emotions;
        // tslint:disable-next-line:forin
      for (const value in data) {
        this.emotions.push(data[value].libelle);
        this.checked.push(data[value].checked);
      }
      this.sizeEmotions = this.emotions.length + 1;
    } else {
      this.ngZone.run(() => {
        this.router.navigate(['familles']);
      });
    }
  }
  /**
   * Lors d'un click de l'émotion change checked a true si il n'était pas sélectionner et l'ajoute à la liste emotionsSelected
   * Puis rajoute dans l'historique la valeur sélectionnée
   * @param data L'émotion choisie
   * @param i L'index de l'émotions
   */
  onClick(data, i){
    const found  = this.emotionsSelected.some( ( text ) => {
      this.indexS = this.emotionsSelected.indexOf( data );
      return text.indexOf( data ) !== -1 ;
    });
    if ( !found ) {
      this.checked[i] = true;
      this.emotionsSelected.push(data);
    } else {
      this.checked[i] = false;
      this.emotionsSelected.splice(this.indexS, 1);
    }
    this.defaultValue = '';
  }

  onClickAdd(data){
    this.sizeEmotions += 1;
    const found  = this.emotionsAdd.some( ( text ) => {
      this.indexS = this.emotionsAdd.indexOf( data );
      return text.indexOf( data ) !== -1 ;
    });
    if ( !found ) {
      this.emotionsAdd.push(data);
    } else {
      this.emotionsAdd.splice(this.indexS, 1);
    }
    this.defaultValue = '';
  }

  onSubmitNext(){
    if (this.storage.testHistorique()){
      const historique = JSON.parse(localStorage.getItem('historique'));
      const ressentie = {
        famille: this.title,
        emotion: ''
      };
      historique.emotionRessentie = ressentie;
      localStorage.setItem('historique', JSON.stringify(historique));
      if (this.emotionsAdd.length > 0){
        // tslint:disable-next-line:forin
        for (const i in this.emotionsAdd) {
          this.emotionsSelected.push(this.emotionsAdd[i]);
        }
      }
      this.emotionService.setData(this.emotionsSelected);
      this.ngZone.run(() => {
        this.router.navigate(['emotions-selected']);
      });
    } else {
      this.storage.redirectToHome();
    }

  }
}
