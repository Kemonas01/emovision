import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-ressentir',
  templateUrl: './ressentir.component.html',
  styleUrls: ['./ressentir.component.css']
})
export class RessentirComponent implements OnInit {

  constructor(public ngZone: NgZone, public router: Router, public storage: StorageService) { }

  ngOnInit(): void {
  }
  /**
   * Ajoute uniquement false au localStorage et test si il existe ou non
   */
  onSubmitNo(){
    if (this.storage.testHistorique()){
      const historique = JSON.parse(localStorage.getItem('historique'));
      const ressentie = {
        dejaRessenti: false,
      };
      historique.ressentie = ressentie;
      localStorage.setItem('historique', JSON.stringify(historique));
      this.ngZone.run(() => {
        this.router.navigate(['perceptions']);
      });
    } else {
      this.storage.redirectToHome();
    }
  }
  /**
   * rediriges sur ressentir avant et teste si le localStorage existe ou non
   */
  onSubmitYes(){
    if (this.storage.testHistorique()){
      const historique = JSON.parse(localStorage.getItem('historique'));
      const ressentie = {
        dejaRessenti: true,
      };
      historique.ressenti = ressentie;
      localStorage.setItem('historique', JSON.stringify(historique));
      this.ngZone.run(() => {
        this.router.navigate(['ressentir-avant']);
      });
    } else {
      this.storage.redirectToHome();
    }
  }
}
