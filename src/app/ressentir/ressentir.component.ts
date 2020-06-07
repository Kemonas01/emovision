import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ressentir',
  templateUrl: './ressentir.component.html',
  styleUrls: ['./ressentir.component.css']
})
export class RessentirComponent implements OnInit {

  constructor(public ngZone: NgZone, public router: Router) { }

  ngOnInit(): void {
  }

  onSubmitNo(){
    const historique = JSON.parse(localStorage.getItem('historique'));
    const ressentie = {
      dejaRessenti: false,
    };
    historique.dejaRessenti = ressentie;
    localStorage.setItem('historique', JSON.stringify(historique));
    this.ngZone.run(() => {
      this.router.navigate(['meditation']);
    });
  }

  onSubmitYes(){
    const historique = JSON.parse(localStorage.getItem('historique'));
    const ressentie = {
      dejaRessenti: true,
    };
    historique.ressenti = ressentie;
    localStorage.setItem('historique', JSON.stringify(historique));
    this.ngZone.run(() => {
      this.router.navigate(['ressentir-avant']);
    });
  }
}
