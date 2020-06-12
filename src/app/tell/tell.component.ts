import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tell',
  templateUrl: './tell.component.html',
  styleUrls: ['./tell.component.css']
})
export class TellComponent implements OnInit {
  /**
   * Valeur de l'input
   */
  valueText = '';
  /**
   * Valeur de la modification
   */
  modification = false;
  constructor(public ngZone: NgZone,
              public router: Router,
              public storage: StorageService) { }

  /**
   * Change modification en fonction de si il y a ou non une valeur dans temoignage dans le storage
   */
  ngOnInit(): void {
    if (this.storage.testHistorique()){
      this.valueText = JSON.parse(localStorage.getItem('historique')).temoignage;
      if (this.valueText) {
        this.modification = (this.valueText.length === 0) ? false : true;
      }
    } else {
      this.ngZone.run(() => {
        this.router.navigate(['home/0', {error: 'Vous êtes redirigé ici car votre historique a été supprimé'}]);
      });
    }
  }
  /**
   * Ajoute au localStorage la valeur de l'input est reload la page
   * @param text valeur de l'input
   */
  onSubmit(text){
    if (this.storage.testHistorique()){
      const historique = JSON.parse(localStorage.getItem('historique'));
      historique.temoignage = text;
      localStorage.setItem('historique', JSON.stringify(historique));
      location.reload();
    } else {
      this.ngZone.run(() => {
        this.router.navigate(['home/0', {error: 'Vous êtes redirigé ici car votre historique a été supprimé'}]);
      });
    }
  }
  /**
   * Redirige sur perceptions
   */
  onSubmitNext(){
    this.ngZone.run(() => {
      this.router.navigate(['perceptions']);
    });
  }
}
