import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  isHover = false;
  selected = '';
  divSvgDos = false;
  sensation = '';
  constructor(public ngZone: NgZone,
              public router: Router,
              public storage: StorageService
              ) { }

  ngOnInit(): void {
    if (this.storage.testHistorique()){
      const historique = JSON.parse(localStorage.getItem('historique'));
      if (historique.douleur !== undefined){
        this.sensation = historique.douleur.sensation;
        this.selected = historique.douleur.localisation;
      }
    }
  }

  onClick(value){
    this.selected = value;
  }

  onSubmit(sensasationDouleur){
    if (this.storage.testHistorique()){
      const historique = JSON.parse(localStorage.getItem('historique'));
      historique.douleur  = {
        localisation: this.selected,
        sensation: sensasationDouleur
      };
      localStorage.setItem('historique', JSON.stringify(historique));
      this.ngZone.run(() => {
        this.router.navigate(['ressentir']);
      });
    } else {
      this.storage.redirectToHome();
    }
  }

  onSubmitDF(){
    this.divSvgDos = this.divSvgDos ? false : true;
  }
}
