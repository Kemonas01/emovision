import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-avant-maintenant',
  templateUrl: './avant-maintenant.component.html',
  styleUrls: ['./avant-maintenant.component.css']
})
export class AvantMaintenantComponent implements OnInit {
  /**
   * degré avant de l'utilisateur
   */
  degreAvant = 0;
  /**
   * degré après de l'utilisateur
   */
  degreApres = 0;
  /**
   * La date
   */
  todayDate: Date = new Date();
  /**
   * La date en string
   */
  todayString: string;
  /**
   * Le format pour le slider de material design
   */
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
  /**
   * Lors de la soumission: Permet de sauvegarder les données dans le local storage dans la base de donnée
   * Si l'utilisateur n'accepte pas (la confidentialite) : il est simplement redirigé sur son profil avec une massage.
   * Pour les deux cas: cela supprime le localStorage
   */
  onSubmit(){
    if (this.storage.testUtilisateur()){
      if (JSON.parse(localStorage.getItem('utilisateur')).confidentialite){
        const historique = JSON.parse(localStorage.getItem('historique'));
        this.todayString = formatDate(this.todayDate, 'dd/MM/yyyy', 'en-US', '+0530');
        historique.date = this.todayString.toString();
        this.store.createHistorique(historique);
        localStorage.removeItem('historique');
        this.ngZone.run(() => {
          this.router.navigate(['dashboard', {error: 'Votre historique a bien été enregistré'}]);
        });
      } else {
        localStorage.removeItem('historique');
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
