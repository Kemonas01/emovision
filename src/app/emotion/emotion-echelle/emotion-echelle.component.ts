import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-emotion-echelle',
  templateUrl: './emotion-echelle.component.html',
  styleUrls: ['./emotion-echelle.component.css']
})
export class EmotionEchelleComponent implements OnInit {
  /**
   * l'emotion séléctionner dans emotions-selected
   */
  emotionSelected = null;
  /**
   * Valeur du slider
   */
  value: any = 0;
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }
  constructor(public ngZone: NgZone,
              public router: Router,
              public storage: StorageService) { }

  ngOnInit(): void {
    this.getEmotionSelected();
  }
  /**
   * Permet d'initialiser la valeur lors d'un changement du slider
   * @param event changement du slider
   */
  onSliderChangeEnd(event){
    this.value = event.value;
  }
  /**
   * Récupère si il y a un historique l'emotion séléctionnée
   */
  getEmotionSelected(){
    if (this.storage.testHistorique()){
      const historique = JSON.parse(localStorage.getItem('historique'));
      this.emotionSelected = historique.emotionRessentie.emotion;
    } else {
      this.storage.redirectToHome();
    }
  }
  /**
   * Enregistre dans le storage la valeur 'echelle' dans le storage et redirige sur perceptions
   */
  onSubmit(){
    if (this.storage.testHistorique()){
      const historique = JSON.parse(localStorage.getItem('historique'));
      historique.emotionRessentie.echelle = this.value;
      localStorage.setItem('historique', JSON.stringify(historique));
      this.ngZone.run(() => {
        this.router.navigate(['perceptions']);
      });
    } else {
      this.storage.redirectToHome();
    }
  }
}
