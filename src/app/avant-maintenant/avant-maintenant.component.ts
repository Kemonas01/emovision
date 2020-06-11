import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avant-maintenant',
  templateUrl: './avant-maintenant.component.html',
  styleUrls: ['./avant-maintenant.component.css']
})
export class AvantMaintenantComponent implements OnInit {
  degreAvant = 0;
  degreApres = 0;
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }
  constructor(public store: AuthService,
              public storage: StorageService,
              public ngZone: NgZone,
              public router: Router) { }

  ngOnInit(): void {
    const historique = JSON.parse(localStorage.getItem('historique'));
    this.degreAvant = historique.degreAvant;
    this.degreApres = historique.degreApres;
  }

  onSubmit(){
    if (this.storage.testUtilisateur()){
      if (JSON.parse(localStorage.getItem('utilisateur')).confidentialite){
        const historique = JSON.parse(localStorage.getItem('historique'));
        this.store.createHistorique(historique);
        localStorage.removeItem('historique');
        this.ngZone.run(() => {
          this.router.navigate(['dashboard', {error: 'Votre historique a bien été enregistré'}]);
        });
      } else {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard', {error: 'Si vous voulez que vos informations soient enregistrées, cocher la case \'confidentialité\''}]);
        });
      }
    } else {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard', {error: 'Une erreur est survenue lors de la validation de votre historique'}]);
      });
    }
  }
}
