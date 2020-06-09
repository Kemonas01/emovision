import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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
  constructor(public store: AuthService) { }

  ngOnInit(): void {
    const historique = JSON.parse(localStorage.getItem('historique'));
    this.degreAvant = historique.degreAvant;
    this.degreApres = historique.degreAprès;
  }

  onSubmit(){
    const historique = JSON.parse(localStorage.getItem('historique'));
    this.store.createHistorique(historique);
    localStorage.removeItem('historique');
  }
}
